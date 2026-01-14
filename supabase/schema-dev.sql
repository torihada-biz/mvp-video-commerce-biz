-- Video Commerce MVP - Development Schema (認証なしで動作するバージョン)
-- 本番環境では使用しないでください

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

-- 4. RLSポリシー: 全ユーザーが全動画を読み取れる（開発用 - 本番では削除）
CREATE POLICY "Everyone can view all videos for development"
  ON videos FOR SELECT
  USING (true);

-- 5. RLSポリシー: 全ユーザーが動画を挿入できる（開発用 - 本番では削除）
CREATE POLICY "Everyone can insert videos for development"
  ON videos FOR INSERT
  WITH CHECK (true);

-- 6. RLSポリシー: 全ユーザーが動画を更新できる（開発用 - 本番では削除）
CREATE POLICY "Everyone can update videos for development"
  ON videos FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 7. RLSポリシー: 全ユーザーが動画を削除できる（開発用 - 本番では削除）
CREATE POLICY "Everyone can delete videos for development"
  ON videos FOR DELETE
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

-- 12. Storage RLSポリシー: 全ユーザーが動画をアップロードできる（開発用）
CREATE POLICY "Everyone can upload videos for development"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'videos');

-- 13. Storage RLSポリシー: 全ユーザーがサムネイルをアップロードできる（開発用）
CREATE POLICY "Everyone can upload thumbnails for development"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'thumbnails');

-- 14. Storage RLSポリシー: 全ユーザーが動画を削除できる（開発用）
CREATE POLICY "Everyone can delete videos for development"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'videos');

-- 15. Storage RLSポリシー: 全ユーザーがサムネイルを削除できる（開発用）
CREATE POLICY "Everyone can delete thumbnails for development"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'thumbnails');

-- インデックスの作成（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_videos_is_active ON videos(is_active);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
