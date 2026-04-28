# Video Commerce Widget MVP

<!-- AUTO:BADGES:START -->
[![Release](https://img.shields.io/github/v/release/torihada-biz/mvp-video-commerce-biz?include_prereleases)](https://github.com/torihada-biz/mvp-video-commerce-biz/releases)
<!-- AUTO:BADGES:END -->

Last updated: <!-- AUTO:LAST_UPDATED:START -->
Last updated: **2026-04-28 00:57 UTC** (commit: `b3ceb94`)
<!-- AUTO:LAST_UPDATED:END -->

ECサイト・LPに貼るだけで動く、TikTok風ショート動画コマースウィジェット。

> **Video Commerce Widget = 動画でモノを売る最小構成**。管理画面で動画をアップロードし、`/embed` を iframe で埋め込むだけで、縦型ショート動画 + CTA ボタンが即日稼働します。

## 概要

TikTok/Instagram Reels 風のショート動画ウィジェットを任意の EC サイトや LP に追加できる MVP です。

管理者が `/admin` から動画を登録 → 公開設定を ON にする → `/embed` を iframe タグで貼る、という 3 ステップだけで、Z 世代向けのモダンな動画体験を提供できます。

```
管理者: 動画アップロード (/admin)
  → Supabase Storage に保存
  → DB (videos テーブル) にメタ情報を記録
  → is_active = true で公開
エンドユーザー: iframe で /embed を参照
  → Masonry グリッドでサムネイル一覧
  → クリックで全画面再生
  → 「商品を見る」ボタンで ECサイトへ遷移
```

- **管理画面（/admin）**: 動画・サムネイルアップロード、タイトル・CTA リンク設定、公開/非公開の切り替え、一覧表示・削除・編集
- **公開ウィジェット（/embed）**: 9:16 縦型動画の Masonry グリッド、サムネイルクリックで全画面再生、ShoppingBag CTA ボタン、ESC キーで閉じる
- **iframe 埋め込み**: 1 行の HTML タグで任意サイトに設置可能

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フレームワーク | Next.js 14 (App Router) |
| 言語 | TypeScript 5.3 |
| スタイリング | Tailwind CSS 3.4 + Shadcn UI (Button / Card / Input / Label) |
| アイコン | Lucide React |
| フォーム | react-hook-form 7.49 + Zod 3.22 + @hookform/resolvers |
| バックエンド / DB | Supabase (PostgreSQL + Storage) |
| Supabase クライアント | @supabase/supabase-js 2.38 + @supabase/ssr 0.1 |
| デプロイ | Vercel 推奨 / Cloudflare Pages 対応 (`pages:deploy` スクリプト) |
| CI/CD | GitHub Actions (`update-readme.yml`) |

## セットアップ

### 前提条件

- Node.js 20 以上
- npm または pnpm
- [Supabase](https://supabase.com) アカウント（無料プランで動作）

### 1. リポジトリをクローン

```bash
git clone https://github.com/torihada-biz/mvp-video-commerce-biz.git
cd mvp-video-commerce-biz
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Supabase プロジェクトを作成

1. [Supabase ダッシュボード](https://supabase.com/dashboard) で新規プロジェクトを作成
2. Settings → API から以下を控える:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` に設定
   - **anon public** キー → `NEXT_PUBLIC_SUPABASE_ANON_KEY` に設定

### 4. 環境変数を設定

プロジェクトルートに `.env.local` を作成:

```env
# Supabase プロジェクト URL（Settings > API > Project URL）
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Supabase 匿名公開キー（Settings > API > anon public）
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **注意**: 両変数とも `NEXT_PUBLIC_` プレフィックスが必須です（ブラウザからも参照するため）。

### 5. データベーススキーマを適用

Supabase ダッシュボードの **SQL Editor** で以下を実行:

| 用途 | 使用ファイル | 特徴 |
|------|------------|------|
| 開発環境（推奨） | `supabase/schema-dev.sql` | 認証なしで全 CRUD 可能 |
| 本番環境 | `supabase/schema.sql` | 認証済みユーザーのみ書き込み可 |

実行内容: `videos` テーブル作成 / RLS ポリシー設定 / Storage バケット（`videos` / `thumbnails`）作成

### 6. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで以下にアクセス:

- トップ: http://localhost:3000
- 管理画面: http://localhost:3000/admin
- ウィジェット: http://localhost:3000/embed

### Docker で起動する場合

> Dockerfile は現時点で含まれていません。ローカル実行は npm run dev を使用してください。

### Cloudflare Pages へのデプロイ

```bash
npm run pages:build   # @cloudflare/next-on-pages でビルド
npm run pages:deploy  # wrangler pages deploy で公開
```

## 開発コマンド

| コマンド | 内容 |
|---------|------|
| `npm run dev` | 開発サーバー起動（localhost:3000） |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint による静的解析 |
| `npm run pages:build` | Cloudflare Pages 向けビルド |
| `npm run pages:deploy` | Cloudflare Pages へのデプロイ |

## CI（GitHub Actions）

`.github/workflows/update-readme.yml` で以下を自動実行:

| ジョブ | トリガー | 内容 | ブロック |
|--------|---------|------|---------|
| `update` | push (main) / PR open・更新 / 手動 | `torihada-biz/.github/actions/update-readme@main` を呼び出し README の AUTO マーカー区間を自動更新 | なし |

> 同一 PR への複数 push では前のジョブをキャンセル（`concurrency` 設定）。Workflow permissions = "Read and write" が必要。

## 使い方フロー

### 管理者: 動画を登録する

**Step 1**: ブラウザで `/admin` にアクセス

**Step 2**: フォームに以下を入力:
- 動画ファイル（mp4 / mov 等）をアップロード → Supabase Storage `videos` バケットへ保存
- サムネイル画像（任意）→ `thumbnails` バケットへ保存
- タイトルを入力
- 商品購入ページ URL（CTA リンク）を入力
- 「公開する」チェックボックスを ON に設定

**Step 3**: 「作成」をクリック → `POST /api/videos` で DB に登録

**Step 4**: 登録済み動画一覧で「編集」「公開/非公開切替」「削除」を操作

### 開発者: ウィジェットを EC サイトに埋め込む

**iframe 形式（推奨）**:

```html
<iframe
  src="https://your-domain.com/embed"
  width="100%"
  height="800px"
  frameborder="0"
  allow="autoplay"
></iframe>
```

### エンドユーザー: 動画を見て商品を購入する

**Step 1**: ウィジェットに Masonry グリッドで動画サムネイルが並ぶ

**Step 2**: 気になるサムネイルをクリック → 9:16 全画面プレーヤーで自動再生

**Step 3**: 画面下部の「商品を見る」ボタンをクリック → 新しいタブで EC サイトへ遷移

**Step 4**: ESC キーまたは × ボタンでグリッドに戻る

## ディレクトリ構成

<!-- AUTO:STRUCTURE:START -->
```
mvp-video-commerce-biz/
├── .github
│   └── workflows
├── app
│   ├── admin
│   ├── api
│   ├── embed
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── ui
├── lib
│   ├── supabase
│   └── utils.ts
├── supabase
│   ├── schema-dev.sql
│   └── schema.sql
├── types
│   └── database.ts
├── GIT_SETUP.md
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── PROJECT_STRUCTURE.md
├── QUICK_START.md
├── README.md
├── setup-git.ps1
├── SETUP.md
├── START_HERE.md
├── SUPABASE_SETUP.md
├── tailwind.config.ts
└── tsconfig.json
```
<!-- AUTO:STRUCTURE:END -->

```
mvp-video-commerce-biz/
├── app/
│   ├── admin/
│   │   └── page.tsx          # 管理画面（アップロード・編集・削除）
│   ├── embed/
│   │   └── page.tsx          # 公開ウィジェット（グリッド・全画面プレーヤー）
│   ├── api/
│   │   ├── videos/
│   │   │   ├── route.ts      # GET: 一覧 / POST: 作成
│   │   │   └── [id]/
│   │   │       └── route.ts  # GET: 詳細 / PATCH: 更新 / DELETE: 削除
│   │   └── upload/
│   │       └── route.ts      # POST: ファイルアップロード（Supabase Storage）
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # トップページ（管理画面・ウィジェットへのリンク）
├── components/
│   └── ui/                   # Shadcn UI（Button / Card / Input / Label）
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # ブラウザ用クライアント（createBrowserClient）
│   │   └── server.ts         # サーバー用クライアント（createServerClient + cookie）
│   └── utils.ts              # cn() ユーティリティ
├── supabase/
│   ├── schema.sql            # 本番用スキーマ（認証必須）
│   └── schema-dev.sql        # 開発用スキーマ（認証なし）
├── types/
│   └── database.ts           # Video / VideoInsert / VideoUpdate 型定義
├── .github/
│   └── workflows/
│       └── update-readme.yml # README 自動更新 CI
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

主要なパス:
- `app/embed/page.tsx` — 公開ウィジェット本体。VideoGrid + VideoPlayer コンポーネントを同梱
- `app/api/upload/route.ts` — ランダムファイル名生成 + Supabase Storage アップロード
- `supabase/schema-dev.sql` — 開発時に使う RLS オープン設定（本番では使用しないこと）

## API エンドポイント

### 動画管理 (`/api/videos`)

| メソッド | パス | 説明 | リクエストボディ |
|---------|------|------|--------------|
| `GET` | `/api/videos` | 動画一覧を取得（created_at DESC） | なし |
| `POST` | `/api/videos` | 動画を新規作成 | `VideoInsert` JSON |
| `GET` | `/api/videos/:id` | 指定 ID の動画を取得 | なし |
| `PATCH` | `/api/videos/:id` | 指定 ID の動画を部分更新 | `VideoUpdate` JSON |
| `DELETE` | `/api/videos/:id` | 指定 ID の動画を削除 | なし |

### ファイルアップロード (`/api/upload`)

| メソッド | パス | 説明 | リクエスト |
|---------|------|------|---------|
| `POST` | `/api/upload` | ファイルを Supabase Storage にアップロード | `multipart/form-data` (`file`, `bucket`) |

**レスポンス例（アップロード成功）:**

```json
{
  "url": "https://xxxxx.supabase.co/storage/v1/object/public/videos/abc123-1234567890.mp4",
  "path": "abc123-1234567890.mp4"
}
```

**`bucket` パラメータ:**
- `videos`（デフォルト）: 動画ファイル
- `thumbnails`: サムネイル画像

## データモデル

### `videos` テーブル

| カラム | 型 | 必須 | デフォルト | 説明 |
|-------|---|------|---------|------|
| `id` | UUID | ✅ | `gen_random_uuid()` | 主キー |
| `created_at` | TIMESTAMPTZ | ✅ | UTC NOW | 作成日時 |
| `video_url` | TEXT | ✅ | - | 動画の公開 URL |
| `thumbnail_url` | TEXT | - | NULL | サムネイルの公開 URL |
| `product_link` | TEXT | ✅ | - | CTA リンク先 URL |
| `title` | TEXT | ✅ | - | 動画タイトル |
| `is_active` | BOOLEAN | ✅ | `true` | 公開フラグ |

**インデックス:**
- `idx_videos_is_active` — 公開/非公開フィルタリング用
- `idx_videos_created_at` — 新着順ソート用

### TypeScript 型定義 (`types/database.ts`)

```typescript
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
```

## 認証・セキュリティ

### 現在の状態（MVP）

管理画面への認証は**未実装**です。開発用スキーマ（`schema-dev.sql`）では全ユーザーが全 CRUD 操作を実行できます。

| ロール | 権限 |
|-------|------|
| 匿名ユーザー（開発用スキーマ） | 全動画の読み書き・削除（RLS 無制限） |
| 匿名ユーザー（本番スキーマ） | `is_active = true` の動画のみ読み取り可 |
| 認証済みユーザー（本番スキーマ） | 全動画の読み書き・削除 |

### 本番運用前に必要な対応

1. Supabase Auth を使った管理者認証を実装
2. `/admin` ルートを認証ガードで保護
3. API Routes（`/api/videos` POST/PATCH/DELETE）に認証チェックを追加
4. `supabase/schema.sql`（認証必須版）に切り替え

## Storage バケット構成

| バケット名 | 公開設定 | 用途 |
|-----------|---------|------|
| `videos` | Public | 動画ファイル（mp4 等） |
| `thumbnails` | Public | サムネイル画像（jpg / png 等） |

ファイル名はアップロード時にランダム文字列 + タイムスタンプで自動生成（例: `xk3q7z-1714234567890.mp4`）。

## バージョン履歴

| コミット | 内容 |
|---------|------|
| `73150ae` | CI: update-readme ワークフロー追加 |
| `bff6883` | package.json 更新（Cloudflare Pages 対応スクリプト追加） |
| `184c61e` | 初回コミット: Video Commerce MVP（管理画面・ウィジェット・API・DB スキーマ） |

## 主要コマンド（自動更新）

<!-- AUTO:SCRIPTS:START -->
<!-- AUTO:SCRIPTS:END -->

## ライセンス

TBD（社内検証用 MVP）

---

## 関連リンク

- [Supabase ダッシュボード](https://supabase.com/dashboard)
- [Next.js 14 App Router ドキュメント](https://nextjs.org/docs/app)
- [Shadcn UI](https://ui.shadcn.com)
- README 自動更新: [torihada-biz/.github/actions/update-readme](https://github.com/torihada-biz/.github/tree/main/actions/update-readme)
