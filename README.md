# ZeroG - Psychologically-Driven Fasting Tracker

A beautiful, science-backed fasting tracker built with Next.js 14, Tailwind CSS, and Cloudflare technologies.

## Features

- **Real-time Fasting Progress Ring**: Visual countdown with animated progress indicator
- **Fasting Biological Phases**: 7 distinct metabolic phases from Anabolic Phase to Deep Fasting
- **Caloric Burn Tracking**: Estimated calorie expenditure based on fasting duration
- **Dark Mode Theme**: Sleek, modern dark interface by default
- **Open Access Design**: No authentication required—anyone can view and edit profiles
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Scientific Calculations**: Mifflin-St Jeor equation for BMR and TDEE calculations

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4+
- **Icons**: lucide-react
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **Font**: Inter from Google Fonts

## Project Structure

```
├── app/
│   ├── components/
│   │   └── FastingRing.jsx       # Core visual component
│   ├── layout.jsx                 # Root layout with dark mode
│   ├── page.jsx                   # Main dashboard
│   ├── onboarding/
│   │   └── page.jsx              # User profile setup
│   └── globals.css                # Global Tailwind styles
├── lib/
│   └── db.js                      # Cloudflare D1 wrapper functions
├── utils/
│   └── algorithm.js               # BMR, TDEE, and fasting phase logic
├── public/                        # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── wrangler.toml                  # Cloudflare configuration
└── README.md
```

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Wrangler CLI: `npm install -g @cloudflare/wrangler`

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions to deploy on Cloudflare Pages with D1 database integration.

## Database Schema

The D1 database uses a `users` table with the following schema:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  age INTEGER,
  weight REAL,
  height REAL,
  activityLevel TEXT,
  region TEXT,
  goal TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## License

MIT
"# zerog-fasting-tracker" 
