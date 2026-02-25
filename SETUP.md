# 🚀 NewsXpress — Complete Setup Guide (From Scratch)

This guide will take you from a fresh clone to a fully running local development environment.

---

## 📋 Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Clone the Repository](#2-clone-the-repository)
3. [Install Dependencies](#3-install-dependencies)
4. [Set Up External Services](#4-set-up-external-services)
   - [Supabase (Database)](#-supabase--postgresql-database)
   - [Firebase (Authentication)](#-firebase--authentication)
   - [Groq AI (Summarization)](#-groq-ai--news-summarization)
   - [SerpAPI (News Fetching)](#-serpapi--news-fetching)
   - [Google Cloud (Translation + TTS)](#-google-cloud--translation--text-to-speech)
   - [YouTube API (Live Streams)](#-youtube-api--live-streams)
   - [Brevo (Email)](#-brevo--transactional-email)
5. [Configure Environment Variables](#5-configure-environment-variables)
6. [Run the Application](#6-run-the-application)
7. [Verify Everything Works](#7-verify-everything-works)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prerequisites

Make sure the following are installed on your machine before starting.

### Node.js (v18 or higher)
Download from: https://nodejs.org/en/download  
Verify installation:
```bash
node --version   # Should print v18.x.x or higher
npm --version    # Should print 9.x.x or higher
```

### Python (3.11, 3.12, or 3.13)
Download from: https://www.python.org/downloads  
Verify installation:
```bash
python --version   # Should print Python 3.11.x / 3.12.x / 3.13.x
pip --version
```

> ⚠️ On Windows, make sure to check **"Add Python to PATH"** during installation.

### Git
Download from: https://git-scm.com/downloads  
Verify installation:
```bash
git --version
```

---

## 2. Clone the Repository

```bash
git clone https://github.com/DRITI2906/NewsXpress.git
cd NewsXpress
```

Your folder structure should look like:
```
NewsXpress/
├── backend/
├── frontend/
├── testing/
├── Docs/
└── README.md
```

---

## 3. Install Dependencies

Run all three installs before anything else.

### Backend (Node.js)
```bash
cd backend
npm install
cd ..
```

### Frontend (React/Vite)
```bash
cd frontend
npm install
cd ..
```

### ML Engine (Python)
```bash
cd backend/Ml_model
pip install -r requirements.txt
cd ../..
```

---

## 4. Set Up External Services

The app depends on **7 external services**. Follow each section below to get your credentials.

---

### 🗄️ Supabase — PostgreSQL Database

> **Free tier:** Unlimited — no credit card required

1. Go to https://supabase.com and click **"Start for free"**
2. Sign up / log in
3. Click **"New project"**
   - Give it a name (e.g. `newsxpress`)
   - Set a **Database Password** — write this down, you'll need it!
   - Choose a region close to you
   - Click **"Create new project"** and wait ~2 minutes
4. Once ready, go to: **Project Settings** → **Database** (left sidebar)
5. Scroll down to **"Connection string"** section
6. Select the **"URI"** tab
7. Copy the connection string — it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   ```
8. Replace `[YOUR-PASSWORD]` with the password you set in step 3

**You'll use this as:** `DATABASE_URL` in `backend/.env`

---

### 🔥 Firebase — Authentication

> **Free tier (Spark plan):** 10,000 auth users/month — no credit card required

Firebase provides **two separate things** — an Admin SDK (backend) and a Client SDK (frontend).

#### Step A — Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Enter a name (e.g. `NewsXpress`) → Continue
4. Disable Google Analytics if asked (not needed) → Click **"Create project"**
5. Wait for it to finish, then click **"Continue"**

#### Step B — Enable Email/Password Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click **"Email/Password"**
4. Toggle **"Enable"** → Click **"Save"**

#### Step C — Get the Admin SDK Key (for Backend)

1. Click the ⚙️ gear icon → **"Project settings"**
2. Click the **"Service accounts"** tab
3. Click **"Generate new private key"** → **"Generate key"**
4. A `.json` file will download — open it in any text editor
5. Copy **all** the contents of the file
6. Go to https://jsonformatter.org/json-minifier → paste → click **"Minify"**
7. Copy the minified single-line JSON

**You'll use this as:** `FIREBASE_ADMIN_CREDENTIALS` in `backend/.env`

#### Step D — Get the Client SDK Config (for Frontend)

1. Still in **"Project settings"** → click the **"General"** tab
2. Scroll down to **"Your apps"** section
3. Click the **`</>`** (Web) icon to register a web app
4. Enter a nickname (e.g. "NewsXpress Web") → Click **"Register app"**
5. You'll see a `firebaseConfig` object like:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123:web:abc123",
     measurementId: "G-XXXXXXX"
   };
   ```
6. Copy each value

**You'll use these as:** All `VITE_FIREBASE_AUTH_*` vars in `frontend/.env`

#### Step E — Get VAPID Key (for Push Notifications — optional)

1. In Project settings → **"Cloud Messaging"** tab
2. Scroll to **"Web Push certificates"**
3. Click **"Generate key pair"**
4. Copy the **Key pair** value

**You'll use this as:** `VITE_FIREBASE_VAPID_KEY` in `frontend/.env`

---

### 🤖 Groq AI — News Summarization

> **Free tier:** 30 requests/minute, 6,000 tokens/minute — no credit card required

1. Go to https://console.groq.com
2. Sign up / log in
3. In the left sidebar, click **"API Keys"**
4. Click **"Create API Key"**
5. Give it a name (e.g. `newsxpress`) → click **"Submit"**
6. **Copy the key immediately** — it will only be shown once! It starts with `gsk_`

**You'll use this as:** `GROQ_API_KEY` in `backend/.env`

---

### 🔍 SerpAPI — News Fetching

> **Free tier:** 100 searches/month — no credit card required

1. Go to https://serpapi.com
2. Click **"Register"** → create a free account
3. Verify your email
4. Go to your **Dashboard** (https://serpapi.com/dashboard)
5. Your **API Key** is displayed on the dashboard — copy it

**You'll use this as:** `SERPAPI_API_KEY` in `backend/.env`

---

### ☁️ Google Cloud — Translation & Text-to-Speech

> **Free tier:** 500,000 chars/month for Translation, 1M chars/month for TTS

> ⚠️ Requires a Google Cloud account. You'll need a credit/debit card to activate, but **you won't be charged** on the free tier.

1. Go to https://console.cloud.google.com
2. Sign in with your Google account
3. Click **"Select a Project"** → **"New Project"**
   - Name: `newsxpress` → **"Create"**

#### Enable the APIs

4. In the search bar at top, search **"Cloud Translation API"** → click on it → click **"Enable"**
5. Go back → search **"Cloud Text-to-Speech API"** → click on it → click **"Enable"**

#### Create a Service Account & Download Key

6. In the left sidebar: **IAM & Admin** → **"Service Accounts"**
7. Click **"+ Create Service Account"**
   - Name: `newsxpress-app` → click **"Create and Continue"**
8. Under **"Grant this service account access to project"**, add these roles:
   - `Cloud Translation API User`
   - `Cloud Text-to-Speech API User`
   - Click **"Continue"** → **"Done"**
9. Click on your new service account from the list
10. Go to the **"Keys"** tab → **"Add Key"** → **"Create new key"**
11. Select **JSON** → click **"Create"** → a `.json` file downloads
12. **Move this file into the `backend/` folder** and rename it to `google-credentials.json`

**You'll use this as:** `GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json` in `backend/.env`

---

### 📺 YouTube API — Live News Streams

> **Free tier:** 10,000 units/day — no credit card required

1. Go to https://console.cloud.google.com (same project as above)
2. Search **"YouTube Data API v3"** → click → **"Enable"**
3. Go to **APIs & Services** → **"Credentials"**
4. Click **"+ Create Credentials"** → **"API key"**
5. Copy the API key shown

> (Optional) Click **"Restrict Key"** → API restrictions → select **"YouTube Data API v3"** → Save — this is good security practice.

**You'll use this as:** `YOUTUBE_API_KEY` in `backend/.env`

---

### 📧 Brevo — Transactional Email

> **Free tier:** 300 emails/day — no credit card required  
> Used for: email verification and password reset emails

1. Go to https://app.brevo.com
2. Sign up for a free account
3. Verify your email address
4. In the dashboard, click your name (top right) → **"SMTP & API"**
5. Click the **"API Keys"** tab → **"Generate a new API key"**
6. Name it `newsxpress` → **"Generate"** → copy the key

#### Set a Verified Sender Email

7. Go to **Senders & IP** (left sidebar) → **"Senders"**
8. Click **"Add a sender"**
9. Enter a name (e.g. `NewsXpress`) and an email address you own
10. Verify the email address via the link Brevo sends you

**You'll use:**
- The API key as `BREVO_API_KEY`
- The verified sender email as `BREVO_USER`
- A support/admin email as `ADMIN_EMAIL`

---

## 5. Configure Environment Variables

### Backend — `backend/.env`

Open `backend/.env` (already created) and fill in every value:

```env
# Server
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Supabase Database (from Section 4 → Supabase)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres

# Firebase Admin SDK (from Section 4 → Firebase → Step C)
# Paste the minified single-line JSON here
FIREBASE_ADMIN_CREDENTIALS={"type":"service_account","project_id":"..."}

# Firebase Realtime DB (optional — leave blank if not using it)
FIREBASE_REALTIME_DATABASE_URL=

# Groq AI (from Section 4 → Groq)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx

# SerpAPI (from Section 4 → SerpAPI)
SERPAPI_API_KEY=your_serpapi_key

# Google Cloud (from Section 4 → Google Cloud)
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json

# YouTube API (from Section 4 → YouTube)
YOUTUBE_API_KEY=AIzaxxxxxxxxxxxxxxxx

# Brevo Email (from Section 4 → Brevo)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxx
BREVO_USER=your-verified-sender@example.com
BREVO_SENDER_NAME=NewsXpress
ADMIN_EMAIL=your-admin@example.com

# ML Service (no change needed for local dev)
ML_API_URL=http://localhost:5001
PUBLIC_BASE_URL=http://localhost:4000
CRON_SECRET=
ML_API_ALLOWED_ORIGINS=
```

---

### Frontend — `frontend/.env`

Open `frontend/.env` (already created) and fill in the Firebase values:

```env
# Backend URLs (no change needed for local dev)
VITE_BACKEND_URL=http://localhost:4000
VITE_BACKEND_API_URL=http://localhost:4000
VITE_API_BASE=http://localhost:4000
VITE_ML_API_URL=http://localhost:5001

# Firebase Client SDK (from Section 4 → Firebase → Step D)
VITE_FIREBASE_AUTH_API_KEY=AIzaxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_AUTH_PROJECT_ID=your-project-id
VITE_FIREBASE_AUTH_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_AUTH_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_AUTH_APP_ID=1:000000000000:web:xxxxxxxx
VITE_FIREBASE_AUTH_MEASUREMENT_ID=G-XXXXXXXXXX

# Firebase VAPID Key (from Section 4 → Firebase → Step E)
VITE_FIREBASE_VAPID_KEY=Bxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 6. Run the Application

You need **3 terminals** running simultaneously.

### Terminal 1 — Backend API Server
```bash
cd NewsXpress/backend
npm run dev
```
✅ You should see:
```
✅ Supabase PostgreSQL database connected successfully.
✅ All models were synchronized successfully.
Server running on port 4000
```

### Terminal 2 — Frontend Dev Server
```bash
cd NewsXpress/frontend
npm run dev
```
✅ You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Terminal 3 — ML Recommendation Engine
```bash
cd NewsXpress/backend/Ml_model
python api_server.py
```
✅ You should see:
```
INFO - Starting ML Recommendation API on port 5001
```

---

## 7. Verify Everything Works

Open your browser and check:

| Service | URL | Expected Response |
|---|---|---|
| **Frontend** | http://localhost:5173 | Login page loads |
| **Backend API** | http://localhost:4000/articles | JSON response with articles |
| **ML Engine** | http://localhost:5001/health | `{"status":"healthy","models_loaded":...}` |

---

## 8. Troubleshooting

### ❌ `DATABASE_URL: ❌ Not set` — Backend crashes on start
- Make sure `backend/.env` exists and `DATABASE_URL` is filled in
- Check for typos — the password in the URL can't contain special characters without URL-encoding

### ❌ `FIREBASE_ADMIN_CREDENTIALS environment variable not set`
- Make sure you pasted the minified JSON (all on one line) from Step C
- Check for stray newlines or extra spaces

### ❌ `Missing Brevo API key` — Backend crashes on start
- If you don't have Brevo yet, temporarily comment out the email config in `backend/config/email/email.js`
- Or just fill in `BREVO_API_KEY` and `BREVO_USER` with placeholder values — email won't work but the app will start

### ❌ Frontend shows blank page / Firebase errors
- Make sure all `VITE_FIREBASE_AUTH_*` values in `frontend/.env` are filled in correctly
- Ensure Email/Password sign-in is enabled in Firebase Authentication

### ❌ ML Engine import errors
- Make sure you're running Python 3.11+ not Python 2
- Try: `pip install -r requirements.txt --upgrade`
- On Windows, use `python` not `python3`

### ❌ Translation/TTS not working
- Make sure `google-credentials.json` is placed inside the `backend/` folder
- Verify the file path in `.env` matches: `GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json`
- Make sure both APIs are enabled in Google Cloud Console

---

## 🧪 Running Tests

```bash
# Backend unit tests (Jest)
cd backend
npm test

# Backend test coverage report
npm run coverage

# Frontend unit tests (Vitest)
cd frontend
npm test

# Frontend coverage report
npm run coverage
```

---

## 📁 Key Project Files Reference

```
NewsXpress/
├── backend/
│   ├── .env                    ← Your backend env file (created by you)
│   ├── google-credentials.json ← Google Cloud service account key (downloaded)
│   ├── index.js                ← Main Express server
│   ├── FetchingNews.js         ← SerpAPI integration
│   ├── Summarizing.js          ← Groq AI summarization
│   ├── config/
│   │   ├── db.js               ← Supabase/Sequelize connection
│   │   └── firebaseAdmin.js    ← Firebase Admin SDK init
│   ├── models/                 ← Database models (Article, Profile, etc.)
│   ├── services/               ← Business logic
│   ├── routes/                 ← API routers
│   └── Ml_model/
│       ├── api_server.py       ← Flask ML API (port 5001)
│       ├── requirements.txt    ← Python dependencies
│       └── Recommender_Models.py
├── frontend/
│   ├── .env                    ← Your frontend env file (created by you)
│   └── src/
│       ├── components/         ← All UI components
│       ├── hooks/              ← Custom React hooks
│       └── services/
│           └── auth/firebase.js ← Firebase client init
└── SETUP.md                    ← This file
```

---

## 💡 Minimum Required Services to Get Started

If you want to get the app running as fast as possible, these are the **must-haves**:

| Priority | Service | Required For |
|---|---|---|
| 🔴 Must | Supabase | Database — app crashes without it |
| 🔴 Must | Firebase | Authentication — can't log in without it |
| 🔴 Must | Groq AI | News summarization |
| 🔴 Must | SerpAPI | Fetching news articles |
| 🟡 Nice | Google Cloud | Translation & Text-to-Speech features |
| 🟡 Nice | YouTube API | Live news stream feed |
| 🟢 Optional | Brevo | Email verification & password reset |
| 🟢 Optional | Python ML server | Smart recommendations (falls back gracefully) |

---

*Last updated: February 2026*
