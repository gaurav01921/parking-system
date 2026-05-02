https://parking-system-1-gm8p.onrender.com

# 🚗 Vehicle Parking Management System

A full-stack web application for managing parking slots and vehicles. Built with React, Node.js/Express, and MySQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Features
✅ Display 10 parking slots with real-time status (free/occupied)
✅ Park vehicles with automatic slot assignment
✅ Exit vehicles and free up slots
✅ Real-time updates every 5 seconds
✅ View currently parked vehicles
✅ Complete vehicle history

### Frontend Features
✅ Modern, responsive UI with Tailwind CSS
✅ Dashboard with statistics
✅ Parking slot grid with visual status
✅ Real-time notifications (alerts)
✅ Vehicle management forms
✅ Complete responsive design
✅ Smooth animations and transitions
✅ Mobile-friendly interface

### Backend Features
✅ RESTful API with Express.js
✅ MySQL database with Sequelize ORM
✅ Automatic database initialization
✅ Error handling and validation
✅ CORS support
✅ Health check endpoint

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Styling** | Tailwind CSS | 3.3.0 |
| **Icons** | React Icons | 4.11.0 |
| **HTTP Client** | Axios | 1.4.0 |
| **Backend** | Node.js/Express | Latest |
| **Database** | MySQL | 8.0+ |
| **ORM** | mysql2 | 3.6.0 |
| **Environment** | dotenv | 16.0.3 |

## 📁 Project Structure

```
parking-system/
├── frontend/                    # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ParkingSlotCard.js
│   │   │   ├── ParkingForm.js
│   │   │   ├── Alert.js
│   │   │   ├── ParkedVehicles.js
│   │   │   └── VehicleHistory.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   └── HistoryPage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
├── backend/                     # Node.js/Express Backend
│   ├── models/
│   │   ├── Slot.js
│   │   └── Vehicle.js
│   ├── routes/
│   │   └── parkingRoutes.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── cors.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)

### Verify Installation

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check MySQL (after installation)
mysql --version
```

## ⚙️ Installation

### 1. Clone or Download the Repository

```bash
cd parking-system
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MySQL credentials (if different from defaults)
# Default credentials:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=password
# DB_NAME=parking_system
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env if backend is on different URL
# REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Step 1: Start MySQL Server

**On Windows:**
- MySQL service should start automatically
- Or go to Services and start "MySQL" service

**On macOS (using Homebrew):**
```bash
brew services start mysql
```

**On Linux:**
```bash
sudo service mysql start
```

### Step 2: Start Backend Server

```bash
cd backend
npm start
# Or for development with auto-reload:
npm run dev
```

You should see:
```
✓ Database initialized successfully
🚗 Parking System Server running on http://localhost:5000
```

### Step 3: Start Frontend Application (in a new terminal)

```bash
cd frontend
npm start
```

The application will automatically open at `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Parking Slots
```http
GET /slots
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "slotNumber": 1,
      "isOccupied": false,
      "currentVehicles": null
    }
  ],
  "total": 10
}
```

#### 2. Get Available Slots Count
```http
GET /slots/available/count
```
**Response:**
```json
{
  "success": true,
  "available": 8,
  "total": 10
}
```

#### 3. Park a Vehicle
```http
POST /park
Content-Type: application/json

{
  "vehicleNumber": "ABC123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Vehicle parked successfully",
  "data": {
    "vehicleNumber": "ABC123",
    "slotNumber": 5,
    "entryTime": "2024-04-28T10:30:45.000Z"
  }
}
```

#### 4. Exit a Vehicle
```http
POST /exit
Content-Type: application/json

{
  "vehicleNumber": "ABC123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Vehicle exited successfully",
  "data": {
    "vehicleNumber": "ABC123",
    "slotNumber": 5,
    "entryTime": "2024-04-28T10:30:45.000Z",
    "exitTime": "2024-04-28T11:15:30.000Z"
  }
}
```

#### 5. Get Parked Vehicles
```http
GET /vehicles/parked
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "vehicleNumber": "ABC123",
      "slotNumber": 5,
      "entryTime": "2024-04-28T10:30:45.000Z",
      "exitTime": null,
      "status": "parked"
    }
  ],
  "total": 3
}
```

#### 6. Get Vehicle History
```http
GET /vehicles
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "vehicleNumber": "ABC123",
      "slotNumber": 5,
      "entryTime": "2024-04-28T10:30:45.000Z",
      "exitTime": "2024-04-28T11:15:30.000Z",
      "status": "exited"
    }
  ],
  "total": 50
}
```

#### 7. Health Check
```http
GET /health
```
**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-04-28T10:30:45.000Z"
}
```

## 📸 Screenshots

### Dashboard
- Real-time parking statistics (Available, Occupied, Total slots)
- Parking form for vehicle entry/exit
- Currently parked vehicles display
- Parking slot grid with status indicators

### Parking Slot Card
- Shows slot number
- Visual status indicator (Green = Available, Red = Occupied)
- Current vehicle number display
- Hover effects and smooth transitions

### Vehicle History
- Complete history of all vehicles
- Entry and exit times
- Vehicle status (PARKED/EXITED)
- Sortable and searchable

## 🔧 Troubleshooting

### MySQL Connection Error

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solution:**
1. Ensure MySQL is running
2. Check connection credentials in `.env`
3. Verify MySQL is listening on port 3306

```bash
# Windows - Check if MySQL is running
tasklist | findstr mysql

# macOS/Linux - Check if MySQL process exists
ps aux | grep mysql
```

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Errors in Frontend

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
1. Ensure backend is running
2. Check `REACT_APP_API_URL` in `.env` matches backend URL
3. Verify backend has CORS enabled

### Database Not Initializing

**Error:** `Error creating tables` or slots not showing up

**Solution:**
1. Delete the existing database: `DROP DATABASE parking_system;`
2. Restart the backend server
3. Database and tables will be auto-created

### Frontend Not Loading

**Error:** Page is blank or `Cannot GET /`

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📝 Testing the Application

### Using cURL

```bash
# Get all slots
curl http://localhost:5000/api/slots

# Park a vehicle
curl -X POST http://localhost:5000/api/park \
  -H "Content-Type: application/json" \
  -d '{"vehicleNumber":"ABC123"}'

# Exit a vehicle
curl -X POST http://localhost:5000/api/exit \
  -H "Content-Type: application/json" \
  -d '{"vehicleNumber":"ABC123"}'

# Get parked vehicles
curl http://localhost:5000/api/vehicles/parked

# Check health
curl http://localhost:5000/api/health
```

### Using Postman

1. Import the API endpoints from above
2. Test each endpoint individually
3. Verify responses match expected format

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the 'build' folder to Vercel or Netlify
```

### Backend (Heroku/Railway)

```bash
# Ensure DATABASE_URL is set in environment
git push heroku main
```

## 📚 Additional Documentation

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review the API Documentation
3. Check console logs for error messages
4. Verify all prerequisites are installed

---

**Happy Parking! 🚗**

*Last Updated: April 28, 2024*
