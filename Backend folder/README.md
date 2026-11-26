# Mythiorapy Backend

MERN API for Mythiorapy. The API uses MongoDB when `MONGODB_URI` is configured and a clearly reported in-memory development fallback otherwise.

## Run

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The API exposes `/api/health`, authentication, modular assessments, dashboard, mood, journal, and RAG-style safety-aware chat endpoints. The local chat provider is intentionally a fallback and does not pretend to be an LLM; add a provider behind `src/routes/chat.js` when production AI credentials are available.

Never use the in-memory fallback for production or real sensitive data.
