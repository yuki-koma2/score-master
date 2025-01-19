This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash

pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## 

```plainText
scoremaster/
├── app/                            # アプリケーションコード
│   ├── components/                 # 再利用可能なReactコンポーネント
│   │   ├── Auth/                   # 認証関連コンポーネント
│   │   │   ├── LoginForm.js
│   │   │   └── SignupForm.js
│   │   ├── ScoreBoard/             # スコアボード関連コンポーネント
│   │   │   ├── ScoreList.js
│   │   │   ├── ScoreItem.js
│   │   │   └── AddScoreForm.js
│   │   └── Layout/                 # レイアウト関連コンポーネント
│   │       └── Navbar.js
│   ├── pages/                      # Next.jsのページ
│   │   ├── api/                    # APIルート
│   │   │   ├── auth.js             # 認証関連API
│   │   │   └── scores.js           # スコア関連API
│   │   ├── index.js                # ホームページ
│   │   ├── dashboard.js            # ユーザーダッシュボードページ
│   │   └── login.js                # ログインページ
│   ├── lib/                        # アプリケーションのロジック
│   │   └── supabase.js             # Supabaseクライアント設定
│   ├── styles/                     # CSS/SCSSファイル
│   │   ├── globals.css
│   │   └── components/             # コンポーネント固有のスタイル
│   └── public/                     # 静的ファイル（画像、フォントなど）
├── db/                             # データベース関連のコード
│   ├── migrations/                 # SQLマイグレーションファイル
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_scores.sql
│   │   └── 003_create_subjects.sql
│   ├── seed/                       # データベース初期データ
│   │   └── seed_data.sql
│   └── supabase_schema.sql         # Supabaseのスキーマ定義ファイル
├── docs/                           # ドキュメント
│   ├── requirements.md             # 要件定義書
│   └── design.md                   # 設計書
├── .env.local                      # 環境変数
├── next.config.js                  # Next.js設定ファイル
├── package.json
├── README.md
└── yarn.lock / package-lock.json
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


6. 参考資料
   •	Next.js Documentation: https://nextjs.org/docs
   •	Supabase Documentation: https://supabase.com/docs
   •	Vercel Documentation: https://vercel.com/docs
   •	Tailwind CSS Documentation: https://tailwindcss.com/docs