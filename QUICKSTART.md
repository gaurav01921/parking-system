# Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Prerequisites
- Node.js installed
- MySQL running
- Port 3000 and 5000 available

### 1. Backend Setup (Terminal 1)

```bash
cd backend
npm install
npm start
```

Expected output:
```
✓ Database initialized successfully
🚗 Parking System Server running on http://localhost:5000
```

### 2. Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm start
```

Application opens at `http://localhost:3000`

## 📝 Testing Workflow

1. **View Dashboard**: See 10 parking slots (all green/available)
2. **Park Vehicle**: Enter "ABC123" and click "Park Vehicle"
3. **Check Slot**: First slot should now be red/occupied
4. **Exit Vehicle**: Enter "ABC123" and click "Exit Vehicle"
5. **Verify**: Slot should be green/available again
6. **View History**: Click "History" to see all records

## 🐛 If Something Goes Wrong

### Backend won't start
```bash
# Check if port 5000 is free
netstat -ano | findstr :5000

# Check MySQL is running
mysql -u root -p -e "SELECT 1"
```

### Frontend won't compile
```bash
cd frontend
rm -rf node_modules
npm install
npm start
```

### Database errors
```bash
# Restart MySQL service
# On macOS: brew services restart mysql
# On Windows: Restart MySQL service from Services
# On Linux: sudo service mysql restart
```

## 📊 API Quick Test

```bash
# Get all slots
curl http://localhost:5000/api/slots

# Park vehicle
curl -X POST http://localhost:5000/api/park \
  -H "Content-Type: application/json" \
  -d '{"vehicleNumber":"TEST001"}'

# Exit vehicle
curl -X POST http://localhost:5000/api/exit \
  -H "Content-Type: application/json" \
  -d '{"vehicleNumber":"TEST001"}'
```

## 📁 File Structure at a Glance

```
parking-system/
├── frontend/
│   ├── src/
│   │   ├── components/    # UI Components
│   │   ├── pages/         # Page views
│   │   ├── services/      # API calls
│   │   └── App.js         # Main app
│   └── package.json
│
├── backend/
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Database config
│   ├── server.js          # Main server
│   └── package.json
│
└── README.md              # Full documentation
```

## 🎯 Features Demo

| Feature | Action | Result |
|---------|--------|--------|
| View Slots | Load Dashboard | 10 slots displayed |
| Park | Enter ABC123 → Click Park | Assigned to Slot #1 |
| View Parked | Scroll down | Shows "ABC123 at Slot #1" |
| Exit | Enter ABC123 → Click Exit | Slot #1 becomes free |
| History | Click "History" tab | See all activity |

## 💡 Tips

- Slots auto-refresh every 5 seconds
- Use uppercase for vehicle numbers
- Check browser console for API errors
- Check backend terminal for server logs

## 🆘 Still Stuck?

1. Make sure BOTH frontend (port 3000) and backend (port 5000) are running
2. MySQL must be running for database
3. Check `.env` files have correct settings
4. Clear browser cache (Ctrl+Shift+Delete)
5. Restart both servers

**Enjoy your Parking Management System! 🚗✨**
