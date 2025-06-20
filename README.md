Backend - Phone Verification & GitHub User Search API
Overview
This is an Express.js backend API that provides phone verification services and GitHub user search functionality. It integrates with Firebase for database operations, Twilio/SMS service for text messaging, and GitHub API for user search.
Features

Phone Verification: Generate and validate SMS access codes
GitHub Integration: Search users and fetch profile details
User Management: Handle user favorites and profile data
Database Operations: Firebase Firestore for data persistence
SMS Service: Twilio integration for sending access codes

Technology Stack

Node.js: Runtime environment
Express.js: Web framework
Firebase Admin SDK: Database operations
Twilio SDK: SMS service (or alternative SMS API)
Axios: HTTP client for GitHub API calls
CORS: Cross-origin resource sharing
dotenv: Environment variable management

Project Structure
├── src/
│ ├── controllers/
│ │ ├── authController.js # Phone verification logic
│ │ ├── githubController.js # GitHub API integration
│ ├── routes/
│ │ ├── index.js # routes
│ ├── dbs/
│ │ ├── index.js # Firebase configuration
│ └── utils/
│ ├── index.js
├── app.js # Express app configuration
├── index.js # Server entry point
├── package.json # Dependencies and scripts
└── .env.example # Environment variables template

Installation

Clone the repository
git clone <repository-url>
cd backend

Install dependencies
npm install

Environment Setup
Copy the example environment file:
cp .env.example .env
Configure your .env file:
env# Server Configuration
PORT=8080
NODE_ENV=development

# Firebase Configuration

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Twilio Configuration (or your SMS service)

TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# CORS Configuration

FRONTEND_URL=http://localhost:3000

Firebase Setup

Create a Firebase project at https://firebase.google.com
Enable Firestore Database
Generate a service account key
Download the JSON file and extract the required fields for .env

Available Scripts
npm start
Starts the production server
npm run dev
Starts the development server with nodemon for auto-restart
npm test
Runs the test suite
npm run lint
Runs ESLint for code quality checks
