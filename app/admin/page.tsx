'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Video, VideoInsert } from '@/types/database'
import { Upload, X, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'

export default function AdminPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<VideoInsert>({
    video_url: '',
    thumbnail_url: '',
    product_link: '',
    title: '',
    is_active: true
  })

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
      setVideos(data || [])
    } catch (error) {
      console.error('Error fetching videos:', error)
      alert('動画の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File, type: 'video' | 'thumbnail') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', type === 'video' ? 'videos' : 'thumbnails')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'アップロードに失敗しました')
    }

    const data = await response.json()
    if (!data.url) {
      throw new Error('アップロードURLの取得に失敗しました')
    }
    return data.url
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const videoUrl = await handleFileUpload(file, 'video')
      setFormData(prev => ({ ...prev, video_url: videoUrl }))
    } catch (error) {
      console.error('Error uploading video:', error)
      alert('動画のアップロードに失敗しました')
    } finally {
      setUploading(false)
    }
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const thumbnailUrl = await handleFileUpload(file, 'thumbnail')
      setFormData(prev => ({ ...prev, thumbnail_url: thumbnailUrl }))
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
      alert('サムネイルのアップロードに失敗しました')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        // 更新
        const response = await fetch(`/api/videos/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error('更新に失敗しました')
      } else {
        // 新規作成
        const response = await fetch('/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error('作成に失敗しました')
      }

      setFormData({
        video_url: '',
        thumbnail_url: '',
        product_link: '',
        title: '',
        is_active: true
      })
      setEditingId(null)
      fetchVideos()
    } catch (error) {
      console.error('Error saving video:', error)
      alert('保存に失敗しました')
    }
  }

  const handleEdit = (video: Video) => {
    setFormData({
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || '',
      product_link: video.product_link,
      title: video.title,
      is_active: video.is_active
    })
    setEditingId(video.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('この動画を削除しますか？')) return

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('削除に失敗しました')
      fetchVideos()
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('削除に失敗しました')
    }
  }

  const toggleActive = async (video: Video) => {
    try {
      const response = await fetch(`/api/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !video.is_active })
      })
      if (!response.ok) throw new Error('更新に失敗しました')
      fetchVideos()
    } catch (error) {
      console.error('Error toggling active:', error)
      alert('更新に失敗しました')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">動画管理画面</h1>
          <Button
            onClick={() => {
              setEditingId(null)
              setFormData({
                video_url: '',
                thumbnail_url: '',
                product_link: '',
                title: '',
                is_active: true
              })
            }}
            variant="outline"
          >
            新規作成
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{editingId ? '動画を編集' : '新規動画を追加'}</CardTitle>
            <CardDescription>
              動画ファイルと商品リンクを設定してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video">動画ファイル</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={uploading}
                  />
                  {formData.video_url && (
                    <span className="text-sm text-green-600">✓ アップロード済み</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">サムネイル画像（オプション）</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                  />
                  {formData.thumbnail_url && (
                    <span className="text-sm text-green-600">✓ アップロード済み</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="動画のタイトル"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product_link">商品購入ページURL</Label>
                <Input
                  id="product_link"
                  type="url"
                  value={formData.product_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, product_link: e.target.value }))}
                  placeholder="https://example.com/product"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="is_active">公開する</Label>
              </div>

              <Button type="submit" disabled={uploading || !formData.video_url}>
                {editingId ? '更新' : '作成'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>アップロード済み動画一覧</CardTitle>
            <CardDescription>
              {videos.length}件の動画が登録されています
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">読み込み中...</div>
            ) : videos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                動画がまだ登録されていません
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative aspect-[9/16] bg-gray-100">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          サムネイルなし
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        {video.is_active ? (
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                            公開中
                          </span>
                        ) : (
                          <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                            非公開
                          </span>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                        {video.product_link}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(video)}
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          編集
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleActive(video)}
                        >
                          {video.is_active ? (
                            <EyeOff className="w-4 h-4 mr-1" />
                          ) : (
                            <Eye className="w-4 h-4 mr-1" />
                          )}
                          {video.is_active ? '非公開' : '公開'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(video.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
