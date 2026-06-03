# Complete Deployment Guide: ZeroG on Cloudflare Pages + D1

This guide provides exact step-by-step instructions to deploy your ZeroG fasting tracker on Cloudflare Pages with a D1 database backend.

---

## Part 1: GitHub Repository Setup

### Step 1.1: Initialize Git Repository

```bash
cd c:\Users\SCSM11\Dropbox\Fasting
git init
git add .
git commit -m "Initial commit: ZeroG fasting tracker with Next.js 14, Tailwind CSS, and Cloudflare D1"
```

### Step 1.2: Create a New Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `zerog-fasting-tracker`
3. **Description**: "A psychologically-driven fasting tracker powered by science"
4. **Visibility**: Public (or Private if preferred)
5. **Do NOT initialize with README, .gitignore, or LICENSE** (you already have these)
6. Click **Create repository**

### Step 1.3: Push to GitHub

After creating the repository on GitHub, you'll see instructions. Follow these exact commands:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/zerog-fasting-tracker.git
git push -u origin main
```

**Replace `YOUR_GITHUB_USERNAME`** with your actual GitHub username.

---

## Part 2: Cloudflare D1 Database Setup

### Step 2.1: Install Wrangler CLI

```bash
npm install -g @cloudflare/wrangler
```

### Step 2.2: Login to Cloudflare

```bash
wrangler login
```

This opens a browser window. Authorize Wrangler to access your Cloudflare account, then return to the terminal.

### Step 2.3: Create a D1 Database

```bash
wrangler d1 create zerog_db
```

**Important**: Save the database ID from the output. You'll need it later. The output will look like:

```
✓ Create d1 database 'zerog_db'
📝 Save the database id somewhere safe. You'll need it to reference the database in your code.
Database ID: 12345678-1234-1234-1234-123456789012
```

### Step 2.4: Create the Users Table

Create a file called `schema.sql` in your project root:

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  age INTEGER,
  weight REAL,
  height REAL,
  activityLevel TEXT,
  region TEXT,
  goal TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_username ON users(username);
```

### Step 2.5: Execute Schema Against D1

```bash
wrangler d1 execute zerog_db --file=schema.sql
```

**For local development database:**

```bash
wrangler d1 execute zerog_db --local --file=schema.sql
```

---

## Part 3: Update Wrangler Configuration

### Step 3.1: Update `wrangler.toml`

Replace the `wrangler.toml` file with this exact configuration:

```toml
name = "zerog-fasting-tracker"
type = "javascript"
compatibility_date = "2024-09-19"

[build]
command = "npm run build"
cwd = "."

[build.upload]
format = "modules"
main = "dist/index.js"

# Local development D1 database
[[d1_databases]]
binding = "DB"
database_name = "zerog_db"
database_id = "LOCAL"

# Production environment variables
[env.production]
name = "zerog-fasting-tracker-prod"
routes = [
  { pattern = "zerog.YOUR_DOMAIN.com/*", zone_name = "YOUR_DOMAIN.com" }
]

[[env.production.d1_databases]]
binding = "DB"
database_name = "zerog_db"
database_id = "YOUR_DATABASE_ID_HERE"
# Replace YOUR_DATABASE_ID_HERE with the ID from Step 2.3

[env.production.vars]
ENVIRONMENT = "production"

[env.development]
ENVIRONMENT = "development"
```

**Important**: Replace `YOUR_DATABASE_ID_HERE` with the actual database ID from Step 2.3.

---

## Part 4: Deploy to Cloudflare Pages

### Step 4.1: Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. In the left sidebar, click **Workers & Pages**
3. Click **Pages** tab
4. Click **Create application** → **Pages** → **Connect to Git**
5. **Authorize GitHub**: If prompted, authorize Cloudflare to access your GitHub account
6. **Select repository**: Choose `zerog-fasting-tracker`
7. Click **Begin setup**

### Step 4.2: Configure Build Settings

In the "Set up builds and deployments" page:

- **Project name**: `zerog-fasting-tracker`
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next/static`
- **Environment variables** (click "Add variable"):
  - Name: `NODE_VERSION`
  - Value: `18`

### Step 4.3: Add D1 Database Binding

1. Scroll down to **D1 databases**
2. Click **Bind resource** → **D1 database**
3. **Database**: Select `zerog_db`
4. **Variable name**: `DB`
5. Click **Save**

### Step 4.4: Deploy

Click **Save and Deploy**. Cloudflare will:
1. Clone your GitHub repository
2. Install dependencies
3. Build the Next.js project
4. Deploy to Cloudflare Pages

**Wait for deployment to complete** (usually 1-3 minutes). You'll see a success message with your preview URL like:

```
https://zerog-fasting-tracker.pages.dev
```

---

## Part 5: Attach a Custom Domain

### Step 5.1: Prerequisites

You must own a domain and have access to your domain registrar.

### Step 5.2: Add Domain in Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Add a site** or select your existing domain
3. Enter your domain name
4. Select the **Free** plan (or upgrade if needed)
5. Click **Continue**

### Step 5.3: Update Nameservers at Registrar

Cloudflare will provide two nameserver addresses. Update your domain registrar's nameserver settings:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **Nameserver settings**
3. Replace the default nameservers with Cloudflare's:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
4. Save changes (this can take 24-48 hours to fully propagate)

### Step 5.4: Connect Pages Project to Domain

1. In Cloudflare Dashboard, go to **Workers & Pages** → **Pages**
2. Select your `zerog-fasting-tracker` project
3. Go to **Settings** → **Domains & routes**
4. Click **Add route**
5. **Domain**: Enter your domain (e.g., `zerog.yourdomain.com`)
6. Click **Add domain**

### Step 5.5: Verify DNS Records

In your Cloudflare domain settings:
1. Go to **DNS** → **Records**
2. Verify the CNAME record points to:
   ```
   zerog-fasting-tracker.pages.dev
   ```

Once DNS propagates (can take up to 48 hours), your app will be live at your custom domain!

---

## Part 6: Testing and Verification

### Step 6.1: Test the Dashboard

Navigate to your deployed URL (either `https://zerog-fasting-tracker.pages.dev` or your custom domain):

1. You should see the ZeroG dashboard
2. Click **Settings** icon (gear) to go to `/onboarding`
3. Fill in the profile form with test data
4. Click **Generate Algorithm Baseline**
5. You should return to the dashboard
6. Click **Start Fast** to begin a fasting session

### Step 6.2: Verify Database Connection

Check that user profile data is being stored in D1:

```bash
wrangler d1 execute zerog_db --command="SELECT * FROM users;"
```

For production database:

```bash
wrangler d1 execute zerog_db --env=production --command="SELECT * FROM users;"
```

### Step 6.3: Monitor Deployment Logs

In Cloudflare Dashboard → **Workers & Pages** → **Pages** → Your project → **Deployments**:
- View real-time deployment logs
- Check for any build errors
- Monitor production errors

---

## Part 7: Updating Your Application

### Step 7.1: Make Local Changes

Edit your code locally and test:

```bash
npm run dev
```

### Step 7.2: Commit and Push to GitHub

```bash
git add .
git commit -m "Update: Add new feature or fix"
git push origin main
```

### Step 7.3: Automatic Deployment

Cloudflare Pages automatically detects the push to `main` and re-deploys your application. Check the **Deployments** tab in Cloudflare to monitor the build.

---

## Part 8: Troubleshooting

### Database Connection Issues

**Problem**: D1 queries fail in production

**Solution**:
1. Verify `wrangler.toml` has the correct `database_id`
2. Check that D1 database binding is active in Cloudflare Pages
3. Verify your table was created:
   ```bash
   wrangler d1 execute zerog_db --command=".schema"
   ```

### Build Failures

**Problem**: Deployment fails with build errors

**Solution**:
1. Check build logs in Cloudflare Dashboard
2. Ensure `next.config.js` has `output: 'standalone'`
3. Test locally:
   ```bash
   npm run build
   ```

### Domain Not Resolving

**Problem**: Custom domain shows 404 or doesn't connect

**Solution**:
1. DNS propagation takes 24-48 hours
2. Check CNAME record in Cloudflare DNS
3. Verify route is added in Pages **Domains & routes**
4. Use `nslookup yourdomain.com` to verify DNS propagation

### Environment Variables Not Loaded

**Problem**: App can't access environment variables

**Solution**:
1. Re-deploy after adding variables:
   ```bash
   git commit --allow-empty -m "Trigger redeployment"
   git push origin main
   ```
2. Verify variables are set in Cloudflare Pages settings

---

## Quick Reference: All Commands

### Local Development
```bash
npm install
npm run dev
```

### Database Management
```bash
# Create database
wrangler d1 create zerog_db

# Execute schema
wrangler d1 execute zerog_db --file=schema.sql

# Query local database
wrangler d1 execute zerog_db --local --command="SELECT * FROM users;"

# Query production database
wrangler d1 execute zerog_db --env=production --command="SELECT * FROM users;"
```

### Git & Deployment
```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/zerog-fasting-tracker.git
git push -u origin main

# Update and redeploy
git add .
git commit -m "Your message"
git push origin main
```

---

## Next Steps

1. **Enable HTTPS**: Cloudflare automatically provides SSL/TLS certificates
2. **Set up Analytics**: Enable Cloudflare Analytics Engine for insights
3. **Add API Routes**: Create Next.js API routes in `app/api/` to handle D1 queries
4. **Connect Frontend to D1**: Update the onboarding form to submit to Cloudflare Workers or API routes
5. **Add Authentication** (optional): Integrate Cloudflare Zero Trust if needed later

---

## Support

- **Cloudflare Docs**: https://developers.cloudflare.com/d1/
- **Next.js Docs**: https://nextjs.org/docs
- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/
