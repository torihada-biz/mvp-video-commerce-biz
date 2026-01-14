# プロジェクト構造

```
video-ec-mvp/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 admin/
│   │   └── page.tsx                # 管理画面（動画アップロード・編集・削除）
│   │
│   ├── 📁 embed/
│   │   └── page.tsx                # 公開ウィジェット（動画グリッド・再生）
│   │
│   ├── 📁 api/                     # API Routes
│   │   ├── 📁 videos/
│   │   │   ├── route.ts           # GET: 一覧, POST: 作成
│   │   │   └── 📁 [id]/
│   │   │       └── route.ts       # GET: 取得, PATCH: 更新, DELETE: 削除
│   │   └── 📁 upload/
│   │       └── route.ts           # POST: ファイルアップロード（Supabase Storage）
│   │
│   ├── globals.css                 # Tailwind CSSグローバルスタイル
│   ├── layout.tsx                  # ルートレイアウト
│   └── page.tsx                    # トップページ（リンク集）
│
├── 📁 components/
│   └── 📁 ui/                      # Shadcn UIコンポーネント
│       ├── button.tsx              # ボタンコンポーネント
│       ├── card.tsx                # カードコンポーネント
│       ├── input.tsx               # 入力フィールドコンポーネント
│       └── label.tsx               # ラベルコンポーネント
│
├── 📁 lib/
│   ├── 📁 supabase/
│   │   ├── client.ts              # ブラウザ用Supabaseクライアント
│   │   └── server.ts              # サーバー用Supabaseクライアント
│   └── utils.ts                    # ユーティリティ関数（cn関数など）
│
├── 📁 supabase/
│   └── schema.sql                  # データベーススキーマ（実行用SQL）
│
├── 📁 types/
│   └── database.ts                 # TypeScript型定義（Video, VideoInsert, VideoUpdate）
│
├── 📄 package.json                 # 依存関係
├── 📄 tsconfig.json                # TypeScript設定
├── 📄 tailwind.config.ts           # Tailwind CSS設定
├── 📄 next.config.js               # Next.js設定
├── 📄 postcss.config.js            # PostCSS設定
├── 📄 .gitignore                   # Git除外設定
├── 📄 README.md                    # プロジェクト説明
├── 📄 SETUP.md                     # セットアップガイド
└── 📄 PROJECT_STRUCTURE.md         # このファイル
```

## 主要ファイルの説明

### 管理画面 (`app/admin/page.tsx`)
- 動画ファイルのアップロード機能
- サムネイル画像のアップロード機能
- 動画情報（タイトル、商品リンク）の編集
- 公開/非公開の切り替え
- 動画一覧表示と削除機能

### 公開ウィジェット (`app/embed/page.tsx`)
- Masonryレイアウトで動画グリッド表示
- サムネイルクリックで全画面動画再生
- 商品購入ページへのCTAボタン
- TikTok/Instagram Reels風のUI

### API Routes
- `/api/videos`: 動画の一覧取得・作成
- `/api/videos/[id]`: 動画の取得・更新・削除
- `/api/upload`: ファイルアップロード（Supabase Storage）

### データベーススキーマ (`supabase/schema.sql`)
- `videos`テーブルの作成
- RLS（Row Level Security）ポリシー
- Storageバケット（`videos`, `thumbnails`）の作成
- Storage RLSポリシー
