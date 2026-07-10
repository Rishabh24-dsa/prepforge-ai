# PrepForge — AI Interview Coach

PrepForge analyzes your resume (or a quick self-description) against a target job description and generates a personalized interview prep package: a match score, technical questions, behavioral questions, skill-gap analysis, and a day-by-day preparation roadmap — all tailored by an LLM to the specific role you're targeting.

## Features

- **Resume + JD matching** — upload a PDF resume or paste a quick self-description, add the job description, and get a match score out of 100.
- **Difficulty / company-tier selector** — choose Easy, Standard, or FAANG-level, which recalibrates the depth and rigor of the generated questions via prompt engineering.
- **Technical & behavioral question sets** — each question includes the interviewer's likely intention and a model answer, not just the question itself.
- **Skill-gap analysis** — flags missing skills relevant to the job, tagged by severity.
- **Day-wise preparation roadmap** — a structured study plan generated specifically for the gap between your profile and the job.
- **Tailored resume PDF export** — generates and downloads a job-specific, ATS-friendly rewritten resume (via Gemini + Puppeteer).
- **Auth** — JWT-based register/login/logout with token blacklisting on logout.
- **Report history** — past reports are saved per user and revisitable.

## Tech Stack

**Frontend:** React 19, React Router, Vite, SCSS, Axios
**Backend:** Node.js, Express 5, MongoDB (Mongoose), JWT auth, Multer (file uploads), pdf-parse (resume text extraction), Puppeteer (PDF rendering)
**AI:** Google Gemini (`@google/genai`) with structured JSON output via Zod schemas

## Project Structure

```
prepforge-ai/
├── Backend/
│   ├── server.js                 # entry point
│   └── src/
│       ├── app.js                # express app, middleware, routes, error handler
│       ├── config/database.js    # MongoDB connection
│       ├── controllers/          # request handlers
│       ├── middlewares/          # auth + file upload middleware
│       ├── models/                # Mongoose schemas
│       ├── routes/                # route definitions
│       └── services/ai.service.js # Gemini prompt logic + PDF generation
└── Frontend/
    └── src/
        ├── components/Navbar.jsx
        ├── app.routes.jsx
        └── features/
            ├── auth/               # login, register, auth context/hooks
            └── interview/          # home page, report page, interview context/hooks
```

## Prerequisites

- Node.js v18+
- A MongoDB database (local install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A [Google Gemini API key](https://aistudio.google.com/apikey)

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd prepforge-ai

cd Backend
npm install

cd ../Frontend
npm install
```

> **Note (Windows/slow networks):** `npm install` in `Backend` also downloads a Chromium binary for Puppeteer, which can be large/flaky on some connections. If it fails, install it separately:
> ```bash
> npx puppeteer browsers install chrome
> ```

### 2. Configure environment variables

In `Backend/`, copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

```dotenv
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

### 3. Run the app

In one terminal:
```bash
cd Backend
npm run dev
```

In a second terminal:
```bash
cd Frontend
npm run dev
```

Open `http://localhost:5173`.

The backend runs on port `3000` and the frontend dev server on port `5173` — CORS in `Backend/src/app.js` is currently locked to `http://localhost:5173`, update it if you deploy elsewhere.

## API Overview

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login | Public |
| GET | `/api/auth/logout` | Logout (blacklists token) | Public |
| GET | `/api/auth/get-me` | Get current user | Private |
| POST | `/api/interview/` | Generate a new interview report (multipart: resume file + job/self description + difficulty) | Private |
| GET | `/api/interview/` | List all reports for the logged-in user | Private |
| GET | `/api/interview/report/:interviewId` | Get a single report | Private |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate & download a tailored resume PDF | Private |

## Known limitations

- Resume upload currently supports **PDF only** (not DOCX).
- The tailored-resume PDF export depends on Puppeteer's bundled Chromium; if it isn't installed, that one feature will fail while report generation still works.
- Gemini's free tier can occasionally return `503 UNAVAILABLE` under high demand — retrying after a short wait usually resolves it.

## License

For personal/educational use.