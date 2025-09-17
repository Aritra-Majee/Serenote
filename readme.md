# Serenote

Serenote is a full-stack mood tracking and journaling web application. Users can register, log in, track their moods, and visualize their emotional trends over time.

## Features

- User registration and authentication
- Mood logging with notes
- Mood timeline and calendar views
- Data visualization with charts
- Responsive and modern UI

## Tech Stack

- **Frontend:** React, Vite, Context API, CSS
- **Backend:** Node.js, Express, MongoDB
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Setup

#### 1. Clone the repository

```bash
git clone <repo-url>
cd Serenote
```

#### 2. Start the backend

```bash
cd server
npm install
npm start
```

#### 3. Start the frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

### Environment Variables

#### Frontend (`client/.env`)

```
VITE_API_URL = https://serenote-backend.vercel.app
VITE_WEB3FORMS_KEY = "<your_web3forms_key>"
```

#### Backend (`server/.env`)

```
PORT=8000
CONNECTION_STRING=<your_mongodb_connection_string>
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
NODE_ENV=production
```

## Project Structure

```
Serenote/
├── client/      # Frontend (React)
└── server/      # Backend (Express)
```

## Deployment

Both frontend and backend are configured for deployment on Vercel.  
See `vercel.json` in each directory for details.

## License

MIT

---

**Made with ❤️ by the Serenote team**