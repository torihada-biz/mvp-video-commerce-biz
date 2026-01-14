# 🚀 動作確認手順

プロジェクトは動作可能な状態になっています。以下の手順でセットアップしてください。

## 1. 依存関係のインストール

ターミナル（PowerShellまたはコマンドプロンプト）でプロジェクトフォルダに移動し、以下を実行：

```bash
npm install
```

## 2. Supabaseプロジェクトのセットアップ

1. [Supabase](https://supabase.com)にアクセスしてアカウントを作成（無料）
2. 新しいプロジェクトを作成
3. プロジェクトが作成されるまで数分待つ

## 3. データベーススキーマの実行

1. Supabaseダッシュボード → **SQL Editor**を開く
2. `supabase/schema-dev.sql`ファイルを開く
3. 内容をすべてコピーしてSQL Editorに貼り付け
4. **Run**ボタンをクリック
5. 成功メッセージを確認

## 4. 環境変数の設定

プロジェクトルート（`package.json`がある場所）に`.env.local`ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**環境変数の取得方法：**
- Supabaseダッシュボード → **Settings**（⚙️） → **API**
- `Project URL`をコピー → `NEXT_PUBLIC_SUPABASE_URL`に設定
- `anon public`キーをコピー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`に設定

## 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## ✅ 動作確認チェックリスト

### トップページ
- [ ] `/`にアクセスして、管理画面とウィジェットへのリンクが表示される

### 管理画面
- [ ] `/admin`にアクセスできる
- [ ] 動画ファイルをアップロードできる
- [ ] タイトルと商品リンクを入力できる
- [ ] 「作成」ボタンで動画を登録できる
- [ ] 登録した動画が一覧に表示される

### 公開ウィジェット
- [ ] `/embed`にアクセスできる
- [ ] 登録した動画がグリッド表示される
- [ ] サムネイルをクリックして動画が再生される
- [ ] 「商品を見る」ボタンで商品ページに遷移する

## 🐛 エラーが発生した場合

### "Missing Supabase environment variables"
→ `.env.local`ファイルが正しく作成されているか確認

### "動画の取得に失敗しました"
→ SupabaseのSQLスキーマが正しく実行されているか確認

### "アップロードに失敗しました"
→ Supabase Storageバケットが作成されているか確認（SQLスキーマを再実行）

## 📚 詳細情報

- `QUICK_START.md` - クイックスタートガイド
- `README.md` - プロジェクト概要
- `SETUP.md` - 詳細なセットアップガイド
