'use client'

import React, { useState, useEffect } from 'react'
import { Video } from '@/types/database'
import { X, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EmbedPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos')
      if (!response.ok) {
        throw new Error('動画の取得に失敗しました')
      }
      const data = await response.json()
      // 公開中の動画のみ表示
      setVideos((data || []).filter((v: Video) => v.is_active))
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
  }

  const handleClose = () => {
    setSelectedVideo(null)
  }

  const handleCTA = () => {
    if (selectedVideo?.product_link) {
      window.open(selectedVideo.product_link, '_blank')
    }
  }

  // キーボードイベント（ESCキーで閉じる）
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    if (selectedVideo) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedVideo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4">
      {selectedVideo ? (
        <VideoPlayer
          video={selectedVideo}
          onClose={handleClose}
          onCTA={handleCTA}
        />
      ) : (
        <VideoGrid videos={videos} onVideoClick={handleVideoClick} />
      )}
    </div>
  )
}

function VideoGrid({ videos, onVideoClick }: { videos: Video[], onVideoClick: (video: Video) => void }) {
  if (videos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-2">動画がまだありません</p>
          <p className="text-gray-400">管理画面から動画を追加してください</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoClick(video)}
            className="mb-4 break-inside-avoid cursor-pointer group relative"
          >
            <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {video.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {video.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VideoPlayer({ video, onClose, onCTA }: { video: Video, onClose: () => void, onCTA: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [video])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="閉じる"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full aspect-[9/16] bg-black">
          <video
            ref={videoRef}
            src={video.video_url}
            className="w-full h-full object-contain"
            controls
            playsInline
            loop
          />

          {/* CTAボタン */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
            <div className="mb-4">
              {video.title && (
                <h2 className="text-white text-xl font-bold mb-2">{video.title}</h2>
              )}
            </div>
            <Button
              onClick={onCTA}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 text-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              商品を見る
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
