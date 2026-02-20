# Word Game - Anagram Desktop App

A desktop word game built with Electron, inspired by iMessage word games. Players form words from scrambled letters within a time limit and compete on a leaderboard.

## 🎮 Features

- **Anagram Game**: Form words from 7 scrambled letters
- **Scoring System**: Points based on word length (3-7 letters)
- **Timer**: 60-second countdown
- **Dictionary Validation**: Real-time word validation with definitions
- **Leaderboard**: PostgreSQL-backed score tracking
- **Desktop App**: Cross-platform Electron application

## 🏗️ Architecture

### Project Structure
```
Word-Game/
├── frontend/                   # Electron app
│   ├── assets/
│   │   ├── images/            # Game images and logos
│   │   ├── sounds/            # Audio files
│   │   └── styles/            # CSS stylesheets
│   ├── pages/                 # HTML pages
│   │   ├── index.html         # Main menu
│   │   ├── anagram.html       # Game page
│   │   └── leaderboard.html   # Leaderboard
│   ├── scripts/               # Frontend JavaScript
│   │   ├── anagram.js         # Game logic
│   │   ├── leaderboard.js     # Leaderboard display
│   │   └── renderer.js        # Electron renderer
│   └── main.js                # Electron main process
│
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # PostgreSQL connection
│   │   ├── controllers/
│   │   │   └── scoresController.js
│   │   ├── routes/
│   │   │   └── scoresRoutes.js
│   │   ├── services/
│   │   │   └── scoresService.js
│   │   └── server.js          # API entry point
│   ├── .env                   # Environment variables (not in git)
│   ├── .env.example           # Environment template
│   └── package.json
│
├── package.json               # Root package.json
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **Electron** - Desktop application framework
- **Vanilla JavaScript** - No framework dependencies
- **HTML5 & CSS3** - UI and styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - REST API framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js

### External APIs
- **Dictionary API** - Word validation and definitions
- **Random Word API** - Word generation

## 📝 REST API Endpoints

Base URL: `http://localhost:4000/api/v1`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/scores` | Get all scores (leaderboard) | - |
| POST | `/scores` | Submit new score | `{ playerName: string, score: number }` |

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": [...]
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Word-Game
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Database Setup

**Create Database:**
```bash
psql -U postgres
CREATE DATABASE anagram_leaderboard;
\c anagram_leaderboard
```

**Create Table:**
```sql
CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leaderboard_score ON leaderboard(score DESC);
```

### 4. Environment Variables

Create `backend/.env` from the template:
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=anagram_leaderboard
DB_USER=your_username
DB_PASSWORD=your_password
```

**⚠️ Important:** No spaces around the `=` sign!

### 5. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
npm start
```

## 🎯 How to Play

1. **Enter Your Name** - Type your name to start
2. **Form Words** - Click letters or use keyboard to select
3. **Submit Words** - Click "Enter" or press Enter key
4. **Score Points**:
   - 3 letters: 100 points
   - 4 letters: 400 points
   - 5 letters: 1,200 points
   - 6 letters: 2,000 points
   - 7 letters: 3,000 points
5. **Beat the Clock** - 60 seconds to find as many words as possible

## 🔧 Development

### Frontend Development
```bash
npm run dev  # Start with hot reload
```

### Backend Development
```bash
cd backend
npm run dev  # Start with auto-restart
```

## 📚 Lessons & Best Practices

### REST API Design
- Use plural nouns for resources (`/scores` not `/score`)
- Use HTTP methods semantically (GET, POST, PUT, DELETE)
- Version your API (`/api/v1/`)
- Return consistent response structures
- Use proper HTTP status codes

### Project Structure
- Separate frontend and backend concerns
- Organize by feature/resource (controllers, services, routes)
- Keep configuration centralized
- Use environment variables for secrets

### Database
- Use connection pooling for efficiency
- Implement proper error handling
- Never commit `.env` files
- Use parameterized queries to prevent SQL injection

## 🐛 Common Issues

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Verify `.env` file exists in `backend/` directory
- Ensure no spaces in `.env` key-value pairs

### Database connection errors
- Verify credentials in `.env`
- Check database exists: `psql -l`
- Ensure table is created

### Frontend can't load
- Check `package.json` main points to `frontend/main.js`
- Verify all assets paths are correct

## 📄 License

ISC

## 👤 Author

Richard Olisemeduan Akwuzie

---

**Version:** 1.0.0
