export interface Video {
  id: string
  created_at: string
  video_url: string
  thumbnail_url: string | null
  product_link: string
  title: string
  is_active: boolean
}

export interface VideoInsert {
  video_url: string
  thumbnail_url?: string | null
  product_link: string
  title: string
  is_active?: boolean
}

export interface VideoUpdate {
  video_url?: string
  thumbnail_url?: string | null
  product_link?: string
  title?: string
  is_active?: boolean
}
