# StyleBook — Salon Appointment Booking (MERN Stack)

A beginner-friendly full-stack salon booking website built with
**MongoDB, Express, React, Node.js (MERN)**, designed for a B.Tech
Web Technologies lab where one project demonstrates all 10 practicals.
See **PRACTICAL_MAPPING.md** for which file to open for each practical.

---

## 1. Folder Structure

```
StyleBook/
│
├── practical1-3-html-css-js/     # Plain HTML/CSS/JS (Practicals 1-3)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── practical7-nodejs-core/       # Pure Node.js, no npm packages (Practical 7)
│   ├── 01-http-server.js
│   ├── 02-modules-demo.js
│   ├── 03-file-handling.js
│   ├── myModule.js
│   └── package.json
│
├── backend/                      # Express + MongoDB REST API
│   ├── config/db.js
│   ├── models/ (User.js, Service.js, Appointment.js)
│   ├── controllers/ (authController.js, serviceController.js, appointmentController.js)
│   ├── routes/ (authRoutes.js, serviceRoutes.js, appointmentRoutes.js)
│   ├── middleware/ (auth.js, validate.js)
│   ├── seed/seedServices.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/                     # React application
│   ├── public/index.html
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/ (Navbar, Footer, ServiceCard, ProtectedRoute)
│   │   ├── context/AuthContext.js
│   │   ├── hooks/useAuth.js
│   │   ├── pages/ (Home, Services, Register, Login, BookAppointment, MyAppointments)
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── PRACTICAL_MAPPING.md
└── README.md
```

---

## 2. Prerequisites

- Node.js (v18+) and npm installed — check with `node -v` and `npm -v`
- MongoDB installed locally **OR** a free MongoDB Atlas cloud account
- A code editor (VS Code recommended)

---

## 3. MongoDB Setup

**Option A — Local MongoDB**
1. Install MongoDB Community Server and start the `mongod` service.
2. Your connection string will be: `mongodb://127.0.0.1:27017/stylebook`

**Option B — MongoDB Atlas (cloud, no local install needed)**
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Click "Connect" → "Drivers" → copy the connection string
3. Replace `<username>` and `<password>` with your database user credentials

---

## 4. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your `MONGO_URI` and `JWT_SECRET`:

```
MONGO_URI=mongodb://127.0.0.1:27017/stylebook
PORT=5000
JWT_SECRET=stylebook_super_secret_key_change_this
```

Seed the 8 salon services into the database (run once):

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

You should see:
```
MongoDB Connected: ...
StyleBook backend server running on http://localhost:5000
```

Test it works by opening: http://localhost:5000/api/services in your browser —
you should see a JSON list of 8 services.

---

## 5. Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
cd frontend
npm install
npm start
```

This opens the React app at http://localhost:3000

The frontend is already configured to call the backend at
`http://localhost:5000/api` (see `frontend/src/api/axios.js`). If you
change the backend port, update that file too.

---

## 6. Practical 1–3 (Static HTML/CSS/JS) — No installation needed

Just open the file directly in a browser:

```
practical1-3-html-css-js/index.html
```
(Right-click → Open with Browser, or use VS Code's "Live Server" extension.)

---

## 7. Practical 7 (Pure Node.js demos) — No npm install needed

```bash
cd practical7-nodejs-core
node 01-http-server.js       # then visit http://localhost:5001
node 02-modules-demo.js      # prints module output to terminal
node 03-file-handling.js     # creates bookings-log.txt in this folder
```

---

## 8. How to Use the Website (End-to-End Test)

1. Go to http://localhost:3000
2. Click **Register** → create an account (name, email, password, 10-digit phone)
3. You'll be logged in automatically and redirected to **Services**
4. Click **Book Now** on any service (e.g. Haircut ₹300)
5. Pick a date and time → **Confirm Booking**
6. Go to **My Appointments** → see your booking, try **Cancel** or **Delete**
7. Click **Logout**, then **Login** again with the same credentials to confirm auth works

---

## 9. REST API Reference (for Postman / viva demo)

| Method | Endpoint | Auth Required | Purpose |
|--------|----------|----------------|---------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/services` | No | List all services |
| GET | `/api/services/:id` | No | Get one service |
| POST | `/api/services` | No | Create a service (admin/demo) |
| PUT | `/api/services/:id` | No | Update a service |
| DELETE | `/api/services/:id` | No | Delete a service |
| POST | `/api/appointments` | Yes | Book an appointment |
| GET | `/api/appointments/my` | Yes | Get logged-in user's appointments |
| GET | `/api/appointments` | Yes | Get all appointments |
| PUT | `/api/appointments/:id` | Yes | Update/cancel appointment |
| DELETE | `/api/appointments/:id` | Yes | Delete appointment |

For protected routes, add header: `Authorization: Bearer <token>`
(token is returned by the login/register response).

---

## 10. Deployment Instructions (Optional, for demonstrating "production-ready")

**Backend (e.g. Render / Railway):**
1. Push the `backend/` folder to a GitHub repo
2. Create a new Web Service, connect the repo
3. Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) in the host's dashboard
4. Build command: `npm install` — Start command: `npm start`

**Frontend (e.g. Netlify / Vercel):**
1. Push the `frontend/` folder to a GitHub repo
2. Build command: `npm run build` — Publish directory: `build`
3. Before deploying, update `frontend/src/api/axios.js` `baseURL` to point
   to your deployed backend URL (e.g. `https://stylebook-api.onrender.com/api`)

**MongoDB:** Use MongoDB Atlas (cloud) for deployment since a locally
installed MongoDB is not reachable by a hosted backend.

---

## 11. Troubleshooting

| Problem | Fix |
|---------|-----|
| "MongoDB Connected" never prints | Check `MONGO_URI` in `.env`, ensure MongoDB is running |
| Frontend shows "Could not load services" | Make sure backend is running on port 5000 |
| 401 Unauthorized on booking | Log out and log in again to get a fresh token |
| CORS error in browser console | Confirm `cors()` middleware is active in `backend/server.js` |
