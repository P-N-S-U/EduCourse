# EduCourse

EduCourse is a small full-stack tutorial web application (Node.js + Express) that demonstrates a simple course-exploration frontend and a minimal authentication API backed by a JSON file.

**What this repository contains:**
- **Frontend:** static HTML/CSS/JS pages in the `public/` folder (landing page, login/register, user profile, course pages).
- **Backend:** a lightweight Express server in `server3.js` that exposes authentication endpoints and a login-status endpoint.
- **Demo credentials:** stored in `SRC/cred.json` (this is for demonstration only — do NOT use in production).

**Quick Start**

Prerequisites:
- Node.js (v14+ recommended)

Install dependencies:

```
npm install
```

Start the API server (uses `nodemon` as configured in `package.json`):

```
npm start
```

The server listens on port `8000` by default. Open your browser to:

- `http://localhost:8000/` — root landing page (served from the project root)

Notes about serving the frontend:
- The frontend pages are in the `public/` folder. `server3.js` currently serves the root landing page but does not automatically expose the entire `public/` folder.
- To serve the static frontend from the same Express server, add this line to `server3.js` (near other `app.use(...)` calls):

```js
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
```

Alternatively you can serve the `public/` folder with a static file server and run the API server concurrently. Example using `http-server`:

```
npx http-server public -p 8080
npm start
# then open http://localhost:8080 for frontend and http://localhost:8000 for API
```

**API Endpoints (server3.js)**

- `GET /` — returns the root landing page (`landing-page.html` from repository root).
- `GET /isLogedIn` — returns the currently logged-in user as JSON or `null`.
- `POST /login` — expects JSON `{ username, password }`. On success the server responds with a redirect path (frontend will redirect). On failure it returns an error message.
- `POST /logout` — logs out the current user and returns a redirect.
- `POST /register` — expects JSON `{ name, username, password, email }` and appends a new user to `SRC/cred.json`.

**Authentication / Data**

- User credentials and session state are stored in `SRC/cred.json` (this is a simple JSON file used for the demo). Example default accounts are included (e.g. username: `admin`, password: `admin`).
- The server-side auth logic lives in `SRC/AUTH.js`, `SRC/loginStatus.js`, and `SRC/Logout.js`.

Security NOTE: This project is for learning/demo purposes only. Storing plaintext passwords in a JSON file and using `isLogedIn` flags is NOT secure. Do not use this pattern in production.

**Known issues & suggested fixes**

- Static files: as noted above, `server3.js` does not call `express.static(...)` by default so many files in `public/` will 404 if you only run the server as-is. Add the `app.use(express.static(...))` line shown earlier to serve the frontend from the same server.
- `validateLogin` behavior: `SRC/AUTH.js` sometimes calls `res.json(...)` inside the helper, but `server3.js` also expects a return value from `validateLogin`. This can produce inconsistent behavior. Recommended fix: make `validateLogin` return a result object and let the route handler call `res.json(...)` (or keep the helper responsible for sending the response but adjust `server3.js` accordingly).

**Project file map (important files)**

- `server3.js` — Express server and API routes (port `8000`).
- `package.json` — project scripts and dependencies (`npm start` runs `nodemon server3.js`).
- `public/` — frontend HTML/CSS/JS files (landing, login, profile, course pages).
- `SRC/cred.json` — demo user database (JSON array of users).
- `SRC/AUTH.js` — registration and login helper functions.
- `SRC/loginStatus.js` — helper to read which user is flagged as logged in.
- `SRC/Logout.js` — helper to clear `isLogedIn` for the current user.

**How the auth flow works (quick explanation)**

1. Frontend (e.g. `public/Login.html`) sends `POST /login` with `{ username, password }`.
2. Backend checks `SRC/cred.json` for a matching user and sets `isLogedIn: true` on success.
3. Frontend uses `GET /isLogedIn` to decide whether to show user profile elements and to populate `user-profile.html`.
4. `POST /logout` clears `isLogedIn` for the user.

If you'd like, I can: add the `express.static` line to `server3.js` so the server serves `public/` automatically, and/or fix the `validateLogin` return/response inconsistency. Tell me which change you prefer and I will make it.

---

If you want me to update the code (serve static files, fix auth response), say which change to apply and I'll patch the files and run quick checks.

