🕵️‍♂️ FindYours

A community-driven platform to help people find their lost items with the power of public collaboration.

🚀 Overview

FindYours is a MERN-based web application that connects people who have lost items with those who find them in public. Users can post details of lost or found items, and others can search by item name, location, and date. Authentication and secure access are handled via Firebase.

✨ Features

🔑 Firebase Authentication (Email/Google sign-in)

📝 Post lost or found items with name, description, image, and location

🔍 Search & filter items by name, last location, and date

🖼️ Image upload support (for better identification)

🛡️ Secure & scalable backend with Express + MongoDB

👩‍💻 Admin moderation for duplicate/inappropriate entries

🛠️ Tech Stack

Frontend: React.js
Backend: Node.js + Express.js
Database: MongoDB Atlas
Authentication: Firebase Auth
Hosting: Vercel (Frontend) / Heroku or AWS (Backend)

📂 Project Structure
FindYours/
├── frontend/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
├── backend/               # Express backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   └── backend.js
├── .env.example          # Environment variables sample
├── package.json
└── README.md

⚙️ Installation & Setup
Prerequisites

Node.js & npm

MongoDB Atlas account

Firebase project for authentication

1️⃣ Clone Repository
git clone https://github.com/your-username/findyours.git
cd findyours

2️⃣ Setup Environment Variables

Create a .env file in both frontend/ and backend/ folders. Example:

backend/.env

MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
JWT_SECRET=your_jwt_secret


frontend/.env

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

3️⃣ Install Dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

4️⃣ Run Development server
# Start backend (backend/)
npm run dev

# Start frontend (frontend/)
npm start


The app will be running on:

Frontend → http://localhost:3000

Backend → http://localhost:5000

🔒 Security

Firebase Authentication for secure login

JWT for backend API access

Input validation & sanitization

Admin role for moderation

🌟 Future Enhancements

📱 Mobile app (React Native)

📍 Geolocation-based search

🤖 AI-based image recognition for item matching

🔔 Push notifications for item matches

🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.
