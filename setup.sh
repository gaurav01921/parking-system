#!/bin/bash
# Setup script for Vehicle Parking Management System

echo "🚗 Vehicle Parking Management System - Setup Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
command -v node &> /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if MySQL is installed
command -v mysql &> /dev/null
if [ $? -ne 0 ]; then
    echo "❌ MySQL is not installed. Please install MySQL from https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✓ Backend dependencies already installed"
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file for backend..."
    cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=parking_system
EOF
    echo "✓ Created .env file - Update with your MySQL credentials if needed"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✓ Frontend dependencies already installed"
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file for frontend..."
    cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:5000/api
EOF
    echo "✓ Created .env file"
fi

cd ..

echo ""
echo "=================================================="
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update database credentials in 'backend/.env' if needed"
echo "2. Ensure MySQL is running"
echo "3. Run the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd backend"
echo "   npm start"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "🌐 Application will open at http://localhost:3000"
echo "🔗 Backend API at http://localhost:5000"
echo ""
