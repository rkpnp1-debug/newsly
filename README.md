# Newsly 📰

**Beautiful, distraction-free news reader** with a points system that rewards real reading time and engagement.

## Features

- ✨ Clean, modern UI optimized for reading (large typography, excellent contrast)
- 🌙 Dark / Light mode
- 🏆 Points system — earn points for time spent reading + article clicks
- 🔐 Ready for Google / Facebook / Guest login
- 💾 Guest data saved in localStorage
- ⚡ Fast skeleton loaders + image optimization
- 🔍 Categories, search, and smooth feed
- 📱 Fully responsive
- Powered by [NewsAPI.org](https://newsapi.org)

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS
- TypeScript
- NewsAPI.org

## Quick Start

```bash
git clone https://github.com/rkpnp1-debug/newsly.git
cd newsly
npm install
cp .env.example .env.local
# Add your NEWS_API_KEY from https://newsapi.org
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEWS_API_KEY` | Yes | Key from [newsapi.org](https://newsapi.org) |
| `NEXTAUTH_SECRET` | Optional | For auth later |
| `NEXTAUTH_URL` | Optional | Your app URL |

> **Note:** NewsAPI.org free developer plan is intended for development / localhost. Production use requires a paid plan.

## Deploy to Vercel

1. Import the repo on [vercel.com](https://vercel.com)
2. Add `NEWS_API_KEY` in Environment Variables
3. Deploy

## About

Built by [RKP](https://www.linkedin.com/in/rkpnp1/)

---

Made with ❤️ for better news reading experiences.
