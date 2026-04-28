@echo off
REM Setup script for Vehicle Parking Management System on Windows

echo 🚗 Vehicle Parking Management System - Setup Script
echo ===================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if MySQL is installed
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  MySQL is not installed. Please install from https://dev.mysql.com/downloads/mysql/
    echo You can continue without MySQL if you haven't installed it yet.
)

echo ✓ Node.js version:
node --version
echo ✓ npm version:
npm --version
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✓ Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file for backend...
    if exist ".env.example" (
        copy .env.example .env
    ) else (
        (
            echo NODE_ENV=development
            echo PORT=5000
            echo DB_HOST=localhost
            echo DB_USER=root
            echo DB_PASSWORD=password
            echo DB_NAME=parking_system
        ) > .env
    )
    echo ✓ Created .env file - Update with your MySQL credentials if needed
)

cd ..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✓ Frontend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file for frontend...
    if exist ".env.example" (
        copy .env.example .env
    ) else (
        (
            echo REACT_APP_API_URL=http://localhost:5000/api
        ) > .env
    )
    echo ✓ Created .env file
)

cd ..

echo.
echo ===================================================
echo ✅ Setup Complete!
echo.
echo 📝 Next Steps:
echo 1. Update database credentials in 'backend\.env' if needed
echo 2. Ensure MySQL is running
echo 3. Open TWO terminals and run:
echo.
echo    Terminal 1 (Backend^):
echo    cd backend
echo    npm start
echo.
echo    Terminal 2 (Frontend^):
echo    cd frontend
echo    npm start
echo.
echo 🌐 Application will open at http://localhost:3000
echo 🔗 Backend API at http://localhost:5000
echo.
pause
