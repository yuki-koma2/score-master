# 設計書

## 1. アーキテクチャ概要

**ScoreMaster**は、以下の主要なコンポーネントで構成されます。

- **フロントエンド**: Next.jsを使用したReactベースのユーザーインターフェース。
- **バックエンド**: Next.jsのAPI Routesを使用してSupabaseと連携。
- **データベース**: Supabase（PostgreSQL）を使用したデータストレージ。
- **認証**: SupabaseのOAuth認証（Googleアカウント）を利用。

## 2. データフロー

1. **ユーザー認証**
    - ユーザーがGoogleアカウントを使用してログイン。
    - Supabase Authが認証を管理し、セッションを発行。

2. **採点対象の管理**
    - 管理者が新しい採点対象を登録。
    - データベースの`subjects`テーブルに情報が保存。

3. **スコア入力**
    - ユーザーがスコアを入力。
    - 入力データが`/api/scores`エンドポイントに送信。
    - サーバー側でバリデーション後、`scores`テーブルに保存。

4. **スコア表示**
    - フロントエンドが`/api/scores`からデータを取得。
    - スコアボードコンポーネントでデータを表示。

## 3. データベース設計

### 3.1 テーブル構成

#### `users` テーブル

| カラム名       | 型         | 制約               | 説明      |
|------------|-----------|------------------|---------|
| id         | UUID      | PRIMARY KEY      | ユーザーID  |
| email      | TEXT      | UNIQUE, NOT NULL | メールアドレス |
| name       | TEXT      | NOT NULL         | ユーザー名   |
| created_at | TIMESTAMP | DEFAULT NOW()    | 作成日時    |

#### `subjects` テーブル

| カラム名       | 型         | 制約            | 説明       |
|------------|-----------|---------------|----------|
| id         | UUID      | PRIMARY KEY   | 採点対象ID   |
| name       | TEXT      | NOT NULL      | 採点対象の名前  |
| theme      | TEXT      |               | 採点対象のテーマ |
| created_at | TIMESTAMP | DEFAULT NOW() | 作成日時     |

#### `scores` テーブル

| カラム名       | 型         | 制約                        | 説明           |
|------------|-----------|---------------------------|--------------|
| id         | UUID      | PRIMARY KEY               | スコアID        |
| user_id    | UUID      | FOREIGN KEY               | ユーザーID（外部キー） |
| subject_id | UUID      | FOREIGN KEY               | 採点対象ID（外部キー） |
| score      | INTEGER   | CHECK (0 <= score <= 100) | スコア（0〜100）   |
| reason     | TEXT      |                           | 評価理由         |
| created_at | TIMESTAMP | DEFAULT NOW()             | 作成日時         |

### 3.2 インデックス

クエリのパフォーマンスを向上させるために、以下のインデックスを作成します。

```sql
CREATE INDEX idx_scores_subject_id ON scores(subject_id);
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_score ON scores(score);
```

## 4. コンポーネント設計

### 4.1 フロントエンドコンポーネント

#### 4.1.1 Navbar

- 機能: ナビゲーションメニューを提供し、ログイン/ログアウトボタンを表示。

#### 4.1.2 LoginForm

- 機能: ユーザーがGoogleアカウントでログインできるフォーム。

#### 4.1.3 ScoreBoard

- 機能: 採点結果を一覧表示。
- 機能: スコアの表示/非表示を切り替え可能。
- 機能: 合計スコアに基づいてランキングを表示。

#### 4.1.4 AddScoreForm

- 機能: ユーザーがスコアと評価理由を入力できるフォーム。

## 5. APIエンドポイント設計

### 5.1 `/api/auth`

- **POST /login**: ユーザーのログインを処理する。
- **POST /signup**: ユーザーのサインアップを処理する。
- **GET /logout**: ユーザーのログアウトを処理する。

### 5.2 `/api/scores`

- **GET /**: 全スコアを取得する（認証済みユーザーのみ）。
- **POST /**: 新しいスコアを追加する（認証済みユーザーのみ）。

## 6. UI/UX デザイン

- **レスポンシブデザイン**: デスクトップ、タブレット、モバイルに対応。
- **直感的なUI**: ユーザーが迷わず操作できるデザイン。
- **リアルタイムフィードバック**: 入力エラーや成功時のメッセージを即時表示。

## 7. セキュリティ設計

- **認証と認可**: Supabase Authを使用して認証を管理し、APIエンドポイントへのアクセスを制御。
- **データバリデーション**: クライアント側とサーバー側の両方でバリデーションを行い、不正データの入力を防ぐ。
- **環境変数の管理**: 機密情報は`.env.local`に保存し、ソースコードに含めない。

## 8. デプロイメント設計

- **Vercel**: GitHubリポジトリと連携し、プッシュ時に自動デプロイ。
- **Supabase**: データベースのスキーマ管理やバックアップを実施。

## 9. マイグレーションフロー

1. **新しいマイグレーションファイルの作成**  
   `db/migrations/`ディレクトリに新しいSQLファイルを追加し、ファイル名は連番で管理します（例: `004_add_new_feature.sql`）。

2. **マイグレーションの適用**  
   Supabase CLIを使ってデータベースにマイグレーションを適用します。

   ```bash
   supabase db push
   ```

3. **バージョン管理**  
   マイグレーションファイルはGitで管理し、チーム全体で共有します。

## 10. 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
