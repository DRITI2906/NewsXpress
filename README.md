<div align="center">

# 📰 NewsXpress

### AI-Powered News Aggregation & Summarization Platform

[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Python](https://img.shields.io/badge/Python-ML_Engine-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

*NewsXpress fetches real-time news from across the web, generates AI-powered summaries using Groq LLMs, and delivers personalized content through an ML-based recommendation engine — all wrapped in a modern, responsive UI.*

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Project Structure](#-project-structure)

</div>

---

## ✨ Features

### 📰 News Aggregation & AI Summarization
- **Real-time news fetching** via SerpAPI across 10+ categories (Technology, Sports, Science, Business, Politics, Health, Entertainment, Crime, Environment, and more)
- **AI-powered summaries** generated using Groq's Llama models — concise, readable, and fast
- **Automatic caching** — articles are saved to Supabase PostgreSQL for instant subsequent loads

### 🔐 Authentication
- **Firebase Authentication** with email/password and Google Sign-In
- **Profile management** with username, avatar, bio, and preferred categories
- **Session persistence** across page reloads

### 🤖 ML-Powered Recommendations
- **Content-based filtering** using TF-IDF vectorization and cosine similarity
- **Collaborative filtering** for user-behavior-based recommendations
- **Hybrid recommendation engine** combining both approaches with configurable weighting
- **Automatic model retraining** via scheduled jobs
- **Smart caching** for fast recommendation delivery

### 🎥 News Reels
- **Instagram/TikTok-style vertical swipe** interface for consuming news
- **AI-generated audio narration** using Google Cloud Text-to-Speech
- **Multi-language support** with translation via Google Cloud Translate

### 🔔 Push Notifications
- **Firebase Cloud Messaging (FCM)** for real-time alerts
- **Category-based subscriptions** — users only get notified about topics they care about
- **Service worker integration** for background notifications

### 🔖 Bookmarks & Personalization
- **Save articles** for later reading
- **Category onboarding** — choose preferred news categories on first login
- **Personalized feed** based on user preferences and reading history

### 🌐 Additional Features
- **Live Feed** — real-time news updates
- **Multi-language article translation**
- **Text-to-Speech** for articles
- **Help & Support** system with email integration
- **Developer credits page**
- **Responsive design** — works on desktop, tablet, and mobile

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework with hooks and context |
| **Vite 7** | Build tool and dev server |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **React Router 7** | Client-side routing |
| **Firebase SDK 12** | Authentication & FCM |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **React Toastify** | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Express 5** | REST API framework |
| **Sequelize 6** | PostgreSQL ORM |
| **Groq SDK** | AI summarization (Llama models) |
| **Firebase Admin 13** | Server-side auth verification & FCM |
| **SerpAPI** | News data fetching |
| **Google Cloud TTS** | Text-to-Speech |
| **Google Cloud Translate** | Article translation |
| **Brevo (Sendinblue)** | Transactional email |
| **Nodemon** | Dev server with hot reload |

### ML Engine (Python)
| Technology | Purpose |
|---|---|
| **Flask** | ML API server |
| **scikit-learn** | TF-IDF, cosine similarity, NMF |
| **pandas / NumPy** | Data processing |
| **psycopg2** | Direct PostgreSQL access |
| **Redis** | Recommendation caching |
| **schedule** | Automated model retraining |

### Database & Infrastructure
| Technology | Purpose |
|---|---|
| **Supabase (PostgreSQL)** | Primary database |
| **Firebase** | Authentication & push notifications |
| **Render** | Deployment (configured) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ All News │ │ Category │ │  Reels   │ │  Bookmarks/Feed  │   │
│  │   Page   │ │   Pages  │ │   View   │ │   Personalized   │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘   │
│       │             │            │                 │             │
│  ┌────┴─────────────┴────────────┴─────────────────┴──────┐     │
│  │             Firebase Auth + Context API                │     │
│  └────────────────────────┬───────────────────────────────┘     │
└───────────────────────────┼─────────────────────────────────────┘
                            │ HTTP/REST
┌───────────────────────────┼─────────────────────────────────────┐
│                    BACKEND (Express.js)                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  News    │ │   Auth   │ │Bookmarks │ │  Notifications   │   │
│  │  Routes  │ │  Routes  │ │  Routes  │ │  (FCM + Brevo)   │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘   │
│       │             │            │                 │             │
│  ┌────┴─────┐  ┌────┴────┐ ┌────┴─────┐  ┌───────┴────────┐   │
│  │ SerpAPI  │  │Firebase │ │Sequelize │  │  Google Cloud   │   │
│  │ + Groq   │  │ Admin   │ │   ORM    │  │  TTS/Translate  │   │
│  └──────────┘  └─────────┘ └────┬─────┘  └────────────────┘   │
└──────────────────────────────────┼──────────────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────┐
│              ML ENGINE (Python Flask)                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │
│  │  Content-    │ │Collaborative │ │   Hybrid Recommender  │    │
│  │  Based TF-IDF│ │  Filtering   │ │   (Weighted Blend)    │    │
│  └──────────────┘ └──────────────┘ └──────────────────────┘    │
└──────────────────────────────────┼──────────────────────────────┘
                                   │
                        ┌──────────┴──────────┐
                        │  Supabase PostgreSQL │
                        │    (Cloud Database)  │
                        └─────────────────────┘
```
---
 ## 📸 ScreenShots

![SignUp page](<screenshots/signup.png>)
![Signed In](<screenshots/signin.png>)
![Home Page](<screenshots/home.png>)
![Reels Page](<screenshots/news.png>)
![Book Mark](<screenshots/bookmark.png>)
![Book Marks Page](<screenshots/allbm.png>)
![Readmore redirect](<screenshots/readmore.png>)
![Translation Feature](<screenshots/translation.png>)

---
---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.11
- **npm** ≥ 9.x
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/JeetGupta2506/NewsXpress.git
cd NewsXpress
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` with the following variables:

```env
# Server
PORT=4000
NODE_ENV=development

# Database (Supabase Connection Pooler)
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-1-<region>.pooler.supabase.com:6543/postgres

# Firebase Admin SDK (JSON on a single line)
FIREBASE_ADMIN_CREDENTIALS={"type":"service_account","project_id":"..."}

# API Keys
SERP_API_KEY=your_serpapi_key
GROQ_API_KEY=your_groq_api_key

# Google Cloud (for TTS and Translation)
GOOGLE_CLOUD_API_KEY=your_google_cloud_key

# Brevo (for emails)
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=noreply@yourdomain.com

# Frontend URL (for CORS and redirects)
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
# Backend API
VITE_BACKEND_URL=http://localhost:4000
VITE_BACKEND_API_URL=http://localhost:4000
VITE_API_BASE=http://localhost:4000

# ML API
VITE_ML_API_URL=http://localhost:5001

# Firebase Client SDK
VITE_FIREBASE_AUTH_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_AUTH_PROJECT_ID=your-project-id
VITE_FIREBASE_AUTH_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_AUTH_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_AUTH_APP_ID=1:000000000000:web:xxxxxxxxxx

# Push Notifications
VITE_FIREBASE_VAPID_KEY=your_vapid_key
```

Start the frontend:

```bash
npm run dev
```

### 4. ML Engine Setup (Optional)

```bash
cd backend/Ml_model
pip install -r requirements.txt
python api_server.py
```

The ML API runs on `http://localhost:5001` and provides recommendation endpoints.

### 5. Verify Everything is Running

| Service | URL | Expected |
|---|---|---|
| Frontend | http://localhost:5173 | NewsXpress UI |
| Backend API | http://localhost:4000 | Express server |
| ML Engine | http://localhost:5001 | Flask API |

---

## 📡 API Reference

### News Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/get-summarized-news` | Get all AI-summarized news articles |
| `GET` | `/get-summarized-news/:category` | Get news by category |
| `GET` | `/articles` | Get raw articles from DB |
| `POST` | `/save-articles` | Manually trigger fetch & save |

**Query Parameters:**
- `limit` — Max number of articles (default: all)
- `live=1` — Force live fetch from SerpAPI (skip DB cache)

### Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/sync` | Sync Firebase user with backend profile |
| `DELETE` | `/api/auth/delete-user` | Delete user account |

### Profile Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/profiles` | Create new profile |
| `GET` | `/api/profiles/:id` | Get profile by ID |
| `PUT` | `/api/profiles/:id` | Update profile |
| `GET` | `/api/profiles/check-username/:username` | Check username availability |

### Bookmarks Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookmarks/:userId` | Get user's bookmarks |
| `POST` | `/api/bookmarks` | Add bookmark |
| `DELETE` | `/api/bookmarks/:id` | Remove bookmark |

### ML Recommendations

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/recommendations/:userId` | Get personalized recommendations |

### Translation & Speech

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/translate` | Translate article text |
| `POST` | `/api/tts` | Convert text to speech |

### Cron

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/cron/fetch-latest` | Trigger bulk news fetch (protected by `CRON_SECRET`) |

---

## 📁 Project Structure

```
NewsXpress/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/          # UI Components
│   │   │   ├── AllNews.jsx          # Main news feed
│   │   │   ├── CategoryNews.jsx     # Category-filtered news
│   │   │   ├── ReelView.jsx         # TikTok-style news reels
│   │   │   ├── ReelCard.jsx         # Individual reel card
│   │   │   ├── Bookmarks.jsx        # Saved articles
│   │   │   ├── PersonalizedFeed.jsx # ML-powered feed
│   │   │   ├── SmartRecommendations.jsx # AI recommendations
│   │   │   ├── Profile.jsx          # User profile management
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── NewsCard.jsx         # Article card component
│   │   │   ├── LoginPage.jsx        # Login modal
│   │   │   ├── SignUp.jsx           # Registration modal
│   │   │   ├── CategoryOnboarding.jsx # First-login category picker
│   │   │   ├── LanguageSelector.jsx # Language picker
│   │   │   ├── LiveFeed.jsx         # Real-time news feed
│   │   │   ├── HelpSupport.jsx      # Help & support page
│   │   │   ├── Developers.jsx       # Developer credits
│   │   │   └── auth/               # Firebase auth utilities
│   │   ├── contexts/            # React Context providers
│   │   │   └── AuthContext.jsx      # Authentication state
│   │   ├── services/            # API service layer
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   ├── styles/              # Global styles
│   │   ├── test/                # Frontend tests (Vitest)
│   │   ├── App.jsx              # Root component with routing
│   │   └── main.jsx             # App entry point
│   ├── .env                     # Frontend environment variables
│   └── package.json
│
├── backend/                     # Express.js backend
│   ├── index.js                 # Main server & route definitions
│   ├── FetchingNews.js          # SerpAPI news fetching
│   ├── Summarizing.js           # Groq AI summarization
│   ├── config/
│   │   ├── db.js                # Sequelize + Supabase connection
│   │   └── firebaseAdmin.js     # Firebase Admin SDK init
│   ├── models/                  # Sequelize data models
│   ├── services/                # Business logic services
│   ├── auth/                    # Auth controllers & middleware
│   ├── routes/                  # Express route modules
│   ├── middleware/              # Express middleware
│   ├── translation-and-speech/  # Google Cloud TTS & Translate
│   ├── support/                 # Help & support handlers
│   ├── src/
│   │   ├── cron/                # Scheduled news fetching
│   │   └── services/            # FCM notification service
│   ├── Ml_model/                # Python ML engine
│   │   ├── api_server.py            # Flask API server
│   │   ├── Recommender_Models.py    # Recommendation algorithms
│   │   ├── Train_modules.py         # Model training pipelines
│   │   ├── Retrain_scheduler.py     # Auto-retraining scheduler
│   │   ├── cache_manager.py         # Redis cache management
│   │   └── requirements.txt         # Python dependencies
│   ├── __tests__/               # Backend tests (Jest)
│   ├── .env                     # Backend environment variables
│   └── package.json
│
├── testing/                     # Integration & E2E tests
├── Figma Design files/          # UI/UX design assets
├── SETUP.md                     # Detailed setup guide
└── README.md                    # This file
```

---

## 🧪 Testing

### Frontend Tests (Vitest)
```bash
cd frontend
npm test              # Run all tests
npm run coverage      # Run with coverage report
```

### Backend Tests (Jest)
```bash
cd backend
npm test              # Run all tests
npm run coverage      # Run with coverage report
```

---

## 🔑 Required API Keys

| Service | Get it from | Used for |
|---|---|---|
| **SerpAPI** | [serpapi.com](https://serpapi.com/) | Fetching news articles |
| **Groq** | [console.groq.com](https://console.groq.com/) | AI summarization |
| **Firebase** | [console.firebase.google.com](https://console.firebase.google.com/) | Auth + push notifications |
| **Supabase** | [supabase.com](https://supabase.com/) | PostgreSQL database |
| **Google Cloud** | [console.cloud.google.com](https://console.cloud.google.com/) | TTS + Translation |

