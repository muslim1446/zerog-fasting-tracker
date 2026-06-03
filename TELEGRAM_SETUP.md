# Telegram Notification Setup for ZeroG Fasting Tracker

## Overview
This guide explains how to integrate Telegram notifications with your existing ZeroG fasting tracker to receive alerts about fasting phase changes.

## What Was Added
1. **Telegram Bot Integration** (`lib/telegramService.js`) - Handles bot initialization, user registration, and sending notifications
2. **Telegram Webhook API** (`app/api/telegram/route.js`) - Receives updates from Telegram (/start, /stop commands)
3. **Fasting Tracker Service** (`lib/fastingTracker.js`) - Checks users' fasting phases and sends notifications when changed
4. **Check Fasting Phases API** (`app/api/check-fasting-phases/route.js`) - Endpoint to trigger phase checks for all fasting users
5. **Database Schema Updates** - Added `telegram_chat_id` and `last_notified_phase` columns to users table

## Setup Instructions

### 1. Create Telegram Bot
1. Open Telegram and chat with [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Save the bot token (looks like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

### 2. Configure Environment Variables
Create `.env.local` in your project root:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
```

### 3. Update Database Schema
Run this SQL against your Cloudflare D1 database:
```sql
ALTER TABLE users ADD COLUMN telegram_chat_id INTEGER;
ALTER TABLE users ADD COLUMN last_notified_phase TEXT;
```

### 4. Install Dependencies
```bash
npm install node-telegram-bot-api dotenv
```

### 5. Deploy Your Application
Deploy to Cloudflare Pages (or your preferred host) as usual.

### 6. Set Up Telegram Webhook
Replace `YOUR_BOT_TOKEN` and `YOUR_DOMAIN`:
```bash
curl -F "url=https://YOUR_DOMAIN.com/api/telegram" https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook
```

### 7. Set Up Periodic Checks
You need to periodically check fasting phases. Options:

**Option A: Cron Job Service** (e.g., cron-job.org)
- Set up a job to call: `https://YOUR_DOMAIN.com/api/check-fasting-phases`
- Recommended interval: every 30-60 minutes

**Option B: Serverless Cron** (if using Cloudflare)
- Add a scheduled trigger in your wrangler.toml:
```toml
[[triggers]]
crons = ["0 */30 * * *"]  # Every 30 minutes
```

### 8. User Subscription Process
Users can subscribe to notifications by:
1. Opening Telegram and searching for your bot (by username)
2. Sending `/start` to the bot
3. They will receive a confirmation message

Users can unsubscribe anytime by sending `/stop`.

## How It Works
1. When a user starts fasting in your app, set `fasting_start_time` in their user record
2. The periodic check endpoint (`/api/check-fasting-phases`) runs:
   - Finds all users with a `fasting_start_time`
   - Calculates hours fasted and current fasting phase
   - Compares with `last_notified_phase`
   - If phase changed, sends Telegram notification to the user's `telegram_chat_id`
   - Updates `last_notified_phase` in database

## Customization
- Modify notification messages in `lib/fastingTracker.js`
- Adjust check frequency in your cron setup
- Add more fasting phases by modifying the logic in `utils/algorithm.js` and `lib/fastingTracker.js`

## Troubleshooting
- **Bot not responding**: Check TELEGRAM_BOT_TOKEN and webhook URL
- **No notifications**: Verify users have set `fasting_start_time` and have linked Telegram (`telegram_chat_id` not null)
- **Database errors**: Ensure the schema updates were applied successfully