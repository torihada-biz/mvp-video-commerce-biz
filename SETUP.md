# セットアップガイド

## 1. プロジェクト構造

```
video-ec-mvp/
├── app/
│   ├── admin/
│   │   └── page.tsx              # 管理画面（動画アップロード・編集）
│   ├── embed/
│   │   └── page.tsx              # 公開ウィジェット（動画グリッド表示）
│   ├── api/
│   │   ├── videos/
│   │   │   ├── route.ts          # GET: 一覧取得, POST: 新規作成
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET: 取得, PATCH: 更新, DELETE: 削除
│   │   └── upload/
│   │       └── route.ts          # POST: ファイルアップロード
│   ├── globals.css               # Tailwind CSS設定
│   ├── layout.tsx                # ルートレイアウト
│   └── page.tsx                  # トップページ
├── components/
│   └── ui/                       # Shadcn UIコンポーネント
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # ブラウザ用Supabaseクライアント
│   │   └── server.ts             # サーバー用Supabaseクライアント
│   └── utils.ts                  # ユーティリティ関数（cn関数など）
├── supabase/
│   └── schema.sql                # データベーススキーマ（実行用SQL）
├── types/
│   └── database.ts               # TypeScript型定義
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 2. Supabase SQLスキーマの実行

Supabaseダッシュボードで以下を実行：

1. **SQL Editor**を開く
2. **開発環境用（推奨）:** `supabase/schema-dev.sql`の内容をコピー＆ペースト
   - 認証なしで動作します（MVP段階で便利）
3. **本番環境用:** `supabase/schema.sql`の内容をコピー＆ペースト
   - 認証必須（本番環境で使用）
4. **Run**ボタンをクリック

これにより以下が作成されます：
- `videos`テーブル
- RLSポリシー（開発用は全員が操作可能、本番用は認証必須）
- Storageバケット（`videos`と`thumbnails`）
- Storage RLSポリシー

## 3. 環境変数の設定

`.env.local`ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**取得方法：**
1. Supabaseダッシュボード → Settings → API
2. `Project URL`をコピー → `NEXT_PUBLIC_SUPABASE_URL`
3. `anon public`キーをコピー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. 依存関係のインストール

```bash
npm install
```

## 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 6. 動作確認

### 管理画面
1. `/admin`にアクセス
2. 動画ファイルをアップロード
3. タイトルと商品リンクを入力
4. 「作成」をクリック

### 公開ウィジェット
1. `/embed`にアクセス
2. アップロードした動画がグリッド表示されることを確認
3. サムネイルをクリックして動画再生を確認
4. 「商品を見る」ボタンで商品ページに遷移することを確認

## トラブルシューティング

### 動画がアップロードできない
- Supabase Storageバケットが正しく作成されているか確認
- Storage RLSポリシーが正しく設定されているか確認
- ブラウザのコンソールでエラーを確認

### 動画が表示されない
- `.env.local`の環境変数が正しく設定されているか確認
- SupabaseのRLSポリシーで公開動画が読み取り可能になっているか確認

### ビルドエラー
- `npm install`を再実行
- `node_modules`を削除して再インストール
