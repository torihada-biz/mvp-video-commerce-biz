# Git セットアップ手順

日本語文字を含むパスでPowerShellが正しく動作しないため、以下の手順を手動で実行してください。

## 問題
現在、Gitリポジトリがホームディレクトリ（`C:/Users/若井映亮`）に初期化されています。プロジェクトディレクトリ（`C:\Users\若井映亮\Desktop\video ec mvp`）で正しく初期化する必要があります。

## 解決方法

### 方法1: PowerShellで手動実行（推奨）

1. **PowerShellを開く**（管理者権限は不要）

2. **プロジェクトディレクトリに移動**
   ```powershell
   cd "C:\Users\若井映亮\Desktop\video ec mvp"
   ```

3. **既存の.gitフォルダを削除**（ホームディレクトリにある場合）
   ```powershell
   # ホームディレクトリの.gitフォルダを削除
   if (Test-Path "C:\Users\若井映亮\.git") {
       Remove-Item -Recurse -Force "C:\Users\若井映亮\.git"
   }
   ```

4. **プロジェクトディレクトリでGitを初期化**
   ```powershell
   git init
   git branch -M main
   ```

5. **ファイルをステージング**
   ```powershell
   git add .
   ```

6. **コミット**
   ```powershell
   git commit -m "Initial commit: Video Commerce MVP"
   ```

7. **リモートリポジトリを追加**
   ```powershell
   git remote add origin https://github.com/torihada-biz/video-commerce-mvp.git
   ```

8. **GitHubにプッシュ**
   ```powershell
   git push -u origin main
   ```

### 方法2: GitHub Desktopを使用

1. **GitHub Desktopをインストール**（未インストールの場合）
   - https://desktop.github.com/ からダウンロード

2. **GitHub Desktopを開く**

3. **File > Add Local Repository**を選択

4. **プロジェクトディレクトリを選択**
   - `C:\Users\若井映亮\Desktop\video ec mvp`

5. **Publish repository**をクリック
   - Repository name: `video-commerce-mvp`
   - Description: （任意）
   - Keep this code private: （必要に応じて）

6. **Publish repository**をクリック

### 方法3: Git Bashを使用

1. **Git Bashを開く**

2. **プロジェクトディレクトリに移動**
   ```bash
   cd "/c/Users/若井映亮/Desktop/video ec mvp"
   ```

3. **Gitを初期化**
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit: Video Commerce MVP"
   git remote add origin https://github.com/torihada-biz/video-commerce-mvp.git
   git push -u origin main
   ```

## 注意事項

- `.gitignore`ファイルは既に正しく設定されています（`.cursor/`、`.vscode/`、`.idea/`が含まれています）
- `.env.local`ファイルは自動的に無視されます（`.gitignore`に含まれています）
- 認証が必要な場合、GitHubの認証情報を入力してください

## 確認方法

プッシュが成功したら、以下のURLで確認できます：
https://github.com/torihada-biz/video-commerce-mvp
