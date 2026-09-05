# 🚀 ProjectPilot AI — Backend Architecture

## Overview

The backend is an **Express.js v5 server** that serves as a smart AI proxy, routing requests to Google Gemini or OpenAI on behalf of the frontend. This keeps API keys secure server-side and provides a single unified API surface.

---

## Architecture: 3-Layer AI Engine

```
Browser Request
      │
      ▼
[1] Backend Proxy (localhost:3001)    ← Server-side, keys in .env
      │ (fails or offline?)
      ▼
[2] Direct Browser LLM Call           ← Gemini / OpenAI from browser
      │ (no key or API error?)
      ▼
[3] Intelligent Mock Engine           ← Always works, no key needed
```

---

## Running the Backend

```bash
# Start backend only
npm run server

# Start frontend + backend together (recommended)
npm run start

# Frontend only
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check, shows API key status |
| POST | `/api/generate-projects` | Generate 5 personalized project candidates |
| POST | `/api/evaluate-viva` | Evaluate professor viva answer |
| POST | `/api/mentor-chat` | AI mentor chat response |
| POST | `/api/analyze-feasibility` | Deep feasibility analysis |
| POST | `/api/innovate-project` | Innovation tier upgrade |

---

## Configuration

Copy `.env.example` to `.env` and set your keys:

```bash
cp .env.example .env
```

```env
# Google Gemini (Recommended — free tier available)
GEMINI_API_KEY=AIza...

# OpenAI (Alternative)
OPENAI_API_KEY=sk-proj-...

PORT=3001
```

**Get a free Gemini key:** https://aistudio.google.com/

---

## Request Format

All POST endpoints accept:

```json
{
  "apiKey": "optional-override-key",
  "provider": "gemini | openai",
  "model": "gemini-1.5-flash",
  ...endpoint-specific-fields
}
```

If `apiKey` is not in the request body, the server uses `.env` keys.

---

## Provider Detection

- Keys starting with `sk-` → **OpenAI**
- All other keys → **Google Gemini**
- No key → Backend returns 400, frontend falls back to mock engine

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ESM) |
| Framework | Express.js v5 |
| AI Providers | Google Gemini 1.5, OpenAI GPT-4o |
| Env Config | dotenv |
| CORS | cors middleware |
| Concurrency | concurrently (dev) |
