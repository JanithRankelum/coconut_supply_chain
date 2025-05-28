# 🥥 Coconut Supply Chain Analytics

A data-driven web platform powered by React and Firebase that optimizes coconut supply chain operations using machine learning. This system provides real-time price tracking, demand forecasting, logistics optimization, and more through intuitive dashboards and predictive analytics.

![image](https://github.com/user-attachments/assets/eec2184b-327e-4222-b503-bf3c13648638)

---

## 🚀 Features

- 🔐 Firebase Authentication (Google & Email/Password)
- 📊 Real-Time Price Tracking
- 📦 Demand Forecasting
- 🔍 Supply-Demand Gap Analysis
- 📈 Cost-Profit Optimization
- 🌍 Export Opportunity Identification
- 🚚 Transportation Cost Reduction
- 🧠 AI-Powered Quality Grading
- 📡 Live Monitoring Dashboard

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router
- **Backend/Auth**: Hugginface (API) ,Firebase (Auth)
- **Styling**: Inline CSS (can be replaced with Tailwind or CSS Modules)
- **Images**: Custom assets for branding and layout

---

## 📁 Project Structure
src/
├── assets/ # Static images (e.g., logo, coc2.png, coc3.png)
├── components/ # React components (if modularized)
├── firebase.js # Firebase config and initialization
├── pages/
│ └── Home.jsx # Main homepage component
├── App.jsx # Main app with routes
└── index.js # React entry point


---

## 🔧 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/coconut-supply-chain.git
cd coconut-supply-chain


### 2. Install Dependencies
npm install

### 3. Firebase Setup
Go to Firebase Console

Create a new project

Enable Email/Password and Google authentication

Copy your Firebase config to firebase.js:


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

### 4. Start the Development Server

npm run dev
Visit http://localhost:5173 to see your app running (if using Vite).

## 📸 Screenshots
### 🔐 Auth UI
![image](https://github.com/user-attachments/assets/20d978d7-542a-4143-9cd7-a638ebfd1ff7)
![image](https://github.com/user-attachments/assets/ef5a5568-23d2-4831-b1b8-3a37c209ec7b)

### 🏠 Homepage
![image](https://github.com/user-attachments/assets/eec2184b-327e-4222-b503-bf3c13648638)
![image](https://github.com/user-attachments/assets/b2164dab-629a-410f-90c0-05a71f34eb57)

## 📬 Contact
Email: manupriyanipun@gmail.com
Support: 24/7 Available

