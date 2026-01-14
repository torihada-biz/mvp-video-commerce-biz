-- Video Commerce MVP - Database Schema

-- 1. videosテーブルの作成
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  product_link TEXT NOT NULL,
  title TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- 2. RLS (Row Level Security) の有効化
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- 3. RLSポリシー: 全ユーザーが公開中の動画を読み取れる
CREATE POLICY "Public videos are viewable by everyone"
  ON videos FOR SELECT
  USING (is_active = true);

-- 4. RLSポリシー: 認証済みユーザーが全動画を読み取れる（管理用）
-- 注意: 本番環境では適切な認証チェックを追加してください
CREATE POLICY "Authenticated users can view all videos"
  ON videos FOR SELECT
  TO authenticated
  USING (true);

-- 5. RLSポリシー: 認証済みユーザーが動画を挿入できる
CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 6. RLSポリシー: 認証済みユーザーが動画を更新できる
CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. RLSポリシー: 認証済みユーザーが動画を削除できる
CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

-- 8. Storageバケットの作成（動画ファイル用）
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- 9. Storageバケットの作成（サムネイル用）
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- 10. Storage RLSポリシー: 全ユーザーが動画を読み取れる
CREATE POLICY "Public videos are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'videos');

-- 11. Storage RLSポリシー: 全ユーザーがサムネイルを読み取れる
CREATE POLICY "Public thumbnails are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

-- 12. Storage RLSポリシー: 認証済みユーザーが動画をアップロードできる
CREATE POLICY "Authenticated users can upload videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos');

-- 13. Storage RLSポリシー: 認証済みユーザーがサムネイルをアップロードできる
CREATE POLICY "Authenticated users can upload thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'thumbnails');

-- 14. Storage RLSポリシー: 認証済みユーザーが動画を削除できる
CREATE POLICY "Authenticated users can delete videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'videos');

-- 15. Storage RLSポリシー: 認証済みユーザーがサムネイルを削除できる
CREATE POLICY "Authenticated users can delete thumbnails"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'thumbnails');

-- インデックスの作成（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_videos_is_active ON videos(is_active);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
