# Video Commerce MVP

動画コマース（Video Commerce）ウィジェットのMVP実装です。ECサイトやLPに埋め込むためのショート動画ウィジェットを提供します。

## 🚀 機能

### 管理画面 (`/admin`)
- 動画ファイルのアップロード（Supabase Storage）
- 商品購入ページURL（CTA Link）の設定
- タイトル/キャプションの設定
- 公開/非公開ステータスの切り替え
- 動画一覧表示と削除機能

### 公開ウィジェット (`/embed`)
- スマホ縦型動画（9:16）のMasonryレイアウト表示
- サムネイルクリックで全画面動画再生
- 商品購入ページへのCTAボタン
- TikTok/Instagram Reels風のモダンなUI

## 📋 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Backend/DB**: Supabase (PostgreSQL, Storage)
- **Deployment**: Vercel (想定)

## 🛠️ セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseプロジェクトのセットアップ

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. プロジェクトのURLとAnon Keyを取得

### 3. データベーススキーマの適用

SupabaseダッシュボードのSQL Editorで、以下のいずれかのSQLを実行してください：

**開発環境用（認証なしで動作）:**
- `supabase/schema-dev.sql` を実行

**本番環境用（認証必須）:**
- `supabase/schema.sql` を実行

このSQLは以下を実行します：
- `videos`テーブルの作成
- RLS（Row Level Security）ポリシーの設定
- Storageバケット（`videos`と`thumbnails`）の作成
- Storage RLSポリシーの設定

**注意:** MVP段階では認証機能が未実装のため、開発環境用のスキーマ（`schema-dev.sql`）を使用することを推奨します。

### 4. 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成し、以下を設定してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 📁 プロジェクト構造

```
.
├── app/
│   ├── admin/          # 管理画面
│   ├── embed/          # 公開ウィジェット
│   ├── api/            # API Routes
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # ルートレイアウト
│   └── page.tsx        # トップページ
├── components/
│   └── ui/             # Shadcn UIコンポーネント
├── lib/
│   ├── supabase/       # Supabaseクライアント
│   └── utils.ts        # ユーティリティ関数
├── supabase/
│   └── schema.sql      # データベーススキーマ
├── types/
│   └── database.ts     # TypeScript型定義
└── package.json
```

## 🎨 デザイン

- Z世代向けのモダンなUI
- TikTok/Instagram Reels風の没入感のあるデザイン
- グラデーションとアニメーションを活用
- レスポンシブデザイン対応

## 📝 使用方法

### 管理画面での動画追加

1. `/admin`にアクセス
2. 「新規動画を追加」フォームで：
   - 動画ファイルをアップロード
   - サムネイル画像をアップロード（オプション）
   - タイトルを入力
   - 商品購入ページURLを入力
   - 公開/非公開を選択
3. 「作成」ボタンをクリック

### ウィジェットの埋め込み

`/embed`ページをiframeで埋め込むか、直接リンクとして使用できます。

```html
<iframe src="https://your-domain.com/embed" width="100%" height="800px" frameborder="0"></iframe>
```

## 🔒 セキュリティ注意事項

現在の実装では、認証なしで管理画面にアクセスできます。本番環境では以下を実装してください：

1. Supabase Authを使用した認証機能
2. 管理画面へのアクセス制限
3. API Routesでの認証チェック
4. 適切なRLSポリシーの設定

## 🚢 デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com)でプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

## 📄 ライセンス

このプロジェクトは社内検証用のMVPです。
