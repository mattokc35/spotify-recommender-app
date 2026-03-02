# Spotify Recommender App

A Next.js (App Router) frontend for a Spotify Recommender application. Users log in via Spotify OAuth 2.0 (handled by the Express.js backend) and receive personalised music recommendations.

---

## Tech Stack

| Layer     | Technology                                |
|-----------|-------------------------------------------|
| Framework | Next.js 15 (App Router)                   |
| Language  | TypeScript                                |
| Styling   | Tailwind CSS                              |
| Auth      | Spotify OAuth 2.0 (via Express.js backend)|
| Session   | Cookie-based (set by backend)             |

---

## Project Structure

```
spotify-recommender-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx          # Home / landing page ("Login with Spotify")
│   └── dashboard/
│       └── page.tsx      # Protected page – shows Spotify profile
├── components/
│   └── LoginButton.tsx   # "Login with Spotify" button
├── lib/
│   └── api.ts            # fetch wrapper (credentials: 'include')
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Spotify Developer Dashboard Setup

Before the app can authenticate users you must register it in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard):

1. Go to <https://developer.spotify.com/dashboard> and create (or open) your app.
2. Under **Edit Settings → Redirect URIs**, add:

   ```
   http://localhost:5000/auth/spotify/callback
   ```

   This is the URL Spotify sends the user back to after they approve the login. It points to the Express backend's OAuth callback handler. Click **Save**.

3. Copy your **Client ID** and **Client Secret** — you will need them in the backend's environment variables.

> When deploying to production, add your production callback URL alongside the localhost one, e.g. `https://your-api.example.com/auth/spotify/callback`.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and set the URL of the running Express backend:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

The Express backend needs its own `.env` file with the Spotify credentials and the matching redirect URI:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:5000/auth/spotify/callback
SESSION_SECRET=a_long_random_string
```

### 3. Run in development

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## How Spotify Login Works

1. The user clicks **"Login with Spotify"** on the home page.
2. The browser is redirected to `GET /auth/spotify` on the Express backend.
3. The backend redirects to Spotify's OAuth 2.0 authorisation page.
4. After the user grants permission, Spotify redirects back to the backend callback URL.
5. The backend exchanges the authorisation code for access/refresh tokens, creates a session, and sets a **session cookie** in the browser.
6. The backend redirects the user to `/dashboard` on the frontend.
7. The dashboard page calls `GET /auth/me` (with `credentials: 'include'`) to fetch the Spotify profile stored in the session.
8. Clicking **Logout** sends `POST /auth/logout` to the backend, which clears the session cookie, then the frontend redirects back to the home page.

> **Note:** The frontend never handles OAuth tokens directly. All Spotify OAuth logic lives in the Express backend.

---

## Available Scripts

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start development server       |
| `npm run build` | Build for production           |
| `npm run start` | Start production server        |
| `npm run lint`  | Run ESLint                     |
