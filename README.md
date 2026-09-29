# StyleBook — Salon Appointment Booking

StyleBook is a MERN Stack web application for salon appointment booking. It allows users to view salon services, register/login, and book appointments online.

## Features

- User registration and login
- JWT-based authentication
- View salon services and prices
- Book salon appointments
- View bookings
- Cancel bookings
- Responsive React frontend
- MongoDB database
- REST API using Express.js

## Project Structure

```text
STYLEBOOK/
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

## Technologies Used

### Frontend

- React.js
- React Router
- Axios
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Deployment

- MongoDB Atlas — Database
- Render — Backend
- Netlify — Frontend

## Prerequisites

Before running the project, install:

- Node.js
- npm
- MongoDB Atlas account
- Git
- VS Code

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add your IP address in Network Access.
4. For cloud deployment, allow access from `0.0.0.0/0`.
5. Get the MongoDB connection string.
6. Use the connection string in the backend `.env` file.

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stylebook
JWT_SECRET=your_secret_key
PORT=5000
```

**Do not upload the `.env` file to GitHub.**

## Backend Setup

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

To seed the salon services:

```bash
npm run seed
```

To start the backend in development mode:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

The services API can be tested at:

```text
http://localhost:5000/api/services
```

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The React application runs on:

```text
http://localhost:3000
```

## Salon Services

The application contains the following services:

| Service | Price |
|---|---:|
| Haircut | ₹300 |
| Hair Styling | ₹500 |
| Hair Spa | ₹800 |
| Facial | ₹700 |
| Manicure | ₹400 |
| Pedicure | ₹500 |
| Bridal Makeup | ₹5000 |
| Hair Coloring | ₹1500 |

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/services` | Get all salon services |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/bookings` | Get bookings |
| POST | `/api/bookings` | Create a booking |
| DELETE | `/api/bookings/:id` | Cancel a booking |

## Deployment

### 1. MongoDB Atlas

Use MongoDB Atlas as the cloud database.

The MongoDB connection string should be added as the `MONGO_URI` environment variable in Render.

### 2. Deploy Backend on Render

Create a new Web Service on Render and connect the GitHub repository.

Use these settings:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Add the following environment variables:

```text
MONGO_URI = your MongoDB Atlas connection string
JWT_SECRET = your secret key
PORT = 5000
```

After deployment, Render provides a backend URL such as:

```text
https://stylebook-api.onrender.com
```

Test the backend using:

```text
https://your-render-url.onrender.com/api/services
```

### 3. Update Frontend API URL

After deploying the backend, update the frontend Axios configuration so that it uses the Render backend URL instead of:

```text
http://localhost:5000
```

For example:

```text
https://your-render-url.onrender.com
```

### 4. Deploy Frontend on Netlify

Connect the GitHub repository to Netlify.

Use:

```text
Base Directory: frontend
Build Command: npm run build
Publish Directory: build
```

Netlify will provide a live URL for the StyleBook frontend.

## End-to-End Testing

After deployment, test the complete application:

1. Open the deployed website.
2. Register a new user.
3. Login with the registered account.
4. View salon services.
5. Book an appointment.
6. Check the booking.
7. Cancel the booking.
8. Logout.
9. Login again.

## GitHub Repository

The source code for this project is available on GitHub:

**StyleBook MERN Project**

https://github.com/sayaliphanse14-prog/StyleBook

## Conclusion

StyleBook demonstrates the development and deployment of a MERN Stack application using React, Node.js, Express.js, MongoDB Atlas, Render, and Netlify.
