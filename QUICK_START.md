# クイックスタートガイド

## 🚀 5分で始める

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトが作成されるまで数分待つ

### 3. データベーススキーマの実行

1. Supabaseダッシュボード → **SQL Editor**を開く
2. `supabase/schema-dev.sql`の内容をコピー＆ペースト
3. **Run**ボタンをクリック
4. 成功メッセージを確認

### 4. 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**環境変数の取得方法：**
- Supabaseダッシュボード → **Settings** → **API**
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public`キー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## ✅ 動作確認

### 管理画面で動画を追加

1. `/admin`にアクセス
2. 動画ファイルを選択してアップロード
3. タイトルと商品リンクを入力
4. 「作成」をクリック

### ウィジェットで動画を確認

1. `/embed`にアクセス
2. アップロードした動画が表示されることを確認
3. サムネイルをクリックして動画再生
4. 「商品を見る」ボタンで商品ページに遷移

## 🐛 トラブルシューティング

### エラー: "Missing Supabase environment variables"
- `.env.local`ファイルが正しく作成されているか確認
- 環境変数名が正確か確認（`NEXT_PUBLIC_`プレフィックス必須）

### エラー: "動画の取得に失敗しました"
- SupabaseのSQLスキーマが正しく実行されているか確認
- Supabaseダッシュボードで`videos`テーブルが存在するか確認

### エラー: "アップロードに失敗しました"
- Supabase Storageバケット（`videos`と`thumbnails`）が作成されているか確認
- Storage RLSポリシーが正しく設定されているか確認

### 動画が表示されない
- ブラウザのコンソールでエラーを確認
- ネットワークタブでAPIリクエストのステータスを確認
- Supabaseのログを確認

## 📚 次のステップ

詳細な情報は以下を参照：
- `README.md` - プロジェクト概要
- `SETUP.md` - 詳細なセットアップガイド
- `PROJECT_STRUCTURE.md` - プロジェクト構造
