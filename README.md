# Newsly 📰

**Beautiful, distraction-free news reader** with a points system that rewards real reading time and engagement.

## Features

- ✨ Clean, modern UI optimized for reading (large typography, excellent contrast)
- 🌙 Dark / Light mode
- 🏆 Points system — earn points for time spent reading + article clicks
- 🔐 Login with Google, Facebook, or continue as Guest
- 💾 Guest data saved in localStorage (session)
- ☁️ Authenticated users ready for Vercel / Upstash / Neon DB
- ⚡ Fast skeleton loaders + image optimization
- 🔍 Categories, search, and smooth feed
- 📱 Fully responsive

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS
- NextAuth.js (Google + Facebook + Guest)
- NewsData.io (or any news API)
- TypeScript

## Quick Start

```bash
git clone https://github.com/rkpnp1-debug/newsly.git
cd newsly
npm install
cp .env.example .env.local
# Add your NEWSDATA_API_KEY and NEXTAUTH_SECRET
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEWSDATA_API_KEY` | Yes | Free key from [newsdata.io](https://newsdata.io) |
| `NEXTAUTH_SECRET` | Yes | Random string (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Yes | Your app URL |
| `GOOGLE_CLIENT_ID` / `SECRET` | Optional | For Google login |
| `FACEBOOK_CLIENT_ID` / `SECRET` | Optional | For Facebook login |

## Deploy to Vercel

1. Push to GitHub (already done)
2. Import the repo on [vercel.com](https://vercel.com)
3. Add the environment variables
4. Deploy

## About

Built by [RKP](https://www.linkedin.com/in/rkpnp1/)

---

Made with ❤️ for better news reading experiences.
