# Supabaseセットアップガイド

このガイドに従って、Supabaseプロジェクトをセットアップしてください。

## ステップ1: Supabaseアカウントの作成

1. [Supabase](https://supabase.com)にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインイン（またはメールアドレスで登録）

## ステップ2: プロジェクトの作成

1. ダッシュボードで「New Project」をクリック
2. 以下の情報を入力：
   - **Organization**: 既存の組織を選択、または新規作成
   - **Name**: プロジェクト名（例: `video-commerce-mvp`）
   - **Database Password**: 強力なパスワードを設定（必ず保存してください）
   - **Region**: 最寄りのリージョンを選択（例: `Tokyo (ap-northeast-1)`）
3. 「Create new project」をクリック
4. プロジェクトの作成が完了するまで2-3分待つ

## ステップ3: 環境変数の取得

1. プロジェクトダッシュボードで、左サイドバーの **Settings**（⚙️アイコン）をクリック
2. **API** を選択
3. 以下の情報をコピー：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** キー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## ステップ4: 環境変数ファイルの設定

1. プロジェクトルートの `.env.local` ファイルを開く
2. コピーした値を貼り付ける：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**重要**: `.env.local`ファイルは既に`.gitignore`に含まれているため、Gitにコミットされません。

## ステップ5: データベーススキーマの実行

1. Supabaseダッシュボードで、左サイドバーの **SQL Editor** をクリック
2. **New query** をクリック
3. `supabase/schema-dev.sql` ファイルを開く
4. ファイルの内容をすべてコピー
5. SQL Editorに貼り付け
6. **Run** ボタン（または `Ctrl+Enter`）をクリック
7. 成功メッセージを確認

### 実行される内容

- `videos`テーブルの作成
- RLS（Row Level Security）ポリシーの設定
- Storageバケット（`videos`と`thumbnails`）の作成
- Storage RLSポリシーの設定

## ステップ6: Storageバケットの確認

1. 左サイドバーの **Storage** をクリック
2. 以下のバケットが作成されていることを確認：
   - `videos` - 動画ファイル用
   - `thumbnails` - サムネイル画像用

## ステップ7: 動作確認

1. ターミナルで以下を実行：
   ```bash
   npm run dev
   ```

2. ブラウザで `http://localhost:3000` を開く

3. `/admin` にアクセスして、動画のアップロードを試す

## トラブルシューティング

### エラー: "Missing Supabase environment variables"
- `.env.local`ファイルが正しく作成されているか確認
- 環境変数名が正確か確認（`NEXT_PUBLIC_`プレフィックス必須）
- 開発サーバーを再起動

### エラー: "動画の取得に失敗しました"
- SQLスキーマが正しく実行されているか確認
- Supabaseダッシュボードで`videos`テーブルが存在するか確認
- ブラウザのコンソールでエラーを確認

### エラー: "アップロードに失敗しました"
- Storageバケットが作成されているか確認
- Storage RLSポリシーが正しく設定されているか確認
- SupabaseダッシュボードのStorageセクションで確認

### SQLスキーマの実行でエラーが出る場合
- 既にテーブルやバケットが存在する場合は、エラーを無視して続行可能
- エラーメッセージを確認し、必要に応じて個別に実行

## 次のステップ

セットアップが完了したら：
1. `/admin` で動画をアップロード
2. `/embed` で動画を確認

詳細は `START_HERE.md` を参照してください。
