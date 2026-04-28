# Environment Configuration Examples

## Frontend Environment (.env)

Location: `frontend/.env`

```env
# React App Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Optional: Development settings
REACT_APP_ENV=development
```

## Backend Environment (.env)

Location: `backend/.env`

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=parking_system

# Optional Settings
DATABASE_POOL_SIZE=10
LOG_LEVEL=info
```

## MySQL Setup

### Default Credentials (in .env)
- **Host**: localhost
- **User**: root
- **Password**: password
- **Database**: parking_system (auto-created)
- **Port**: 3306 (default)

### Change MySQL Credentials

If your MySQL has different credentials:

**Windows/Mac/Linux:**
1. Open `backend/.env`
2. Update these values:
```env
DB_HOST=your_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=parking_system
```

### MySQL Root Password Reset

**Windows:**
```bash
mysql -u root
# If prompted for password, just press Enter
```

**macOS (Homebrew):**
```bash
mysql -u root
# No password by default
```

**Linux:**
```bash
sudo mysql -u root
# Requires sudo
```

## Production Environment

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_ENV=production
```

### Backend (.env.production)
```env
NODE_ENV=production
PORT=5000
DB_HOST=your_production_db_host
DB_USER=prod_user
DB_PASSWORD=strong_production_password
DB_NAME=parking_system_prod
DATABASE_POOL_SIZE=20
LOG_LEVEL=error
```

## Database Configuration Details

### Connection Pool Settings

The backend uses MySQL connection pooling:
- **waitForConnections**: true (wait if no connection available)
- **connectionLimit**: 10 (max connections)
- **queueLimit**: 0 (unlimited queued requests)

To adjust these, modify `backend/config/database.js`:

```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'parking_system',
  waitForConnections: true,
  connectionLimit: 10,    // Increase for production
  queueLimit: 0,
});
```

## API URL Configuration

### Local Development
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Development with External Backend
```env
REACT_APP_API_URL=http://192.168.1.100:5000/api
```

### Production (with HTTPS)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

## Troubleshooting Configuration

### "Cannot connect to database"
1. Verify MySQL is running
2. Check credentials in `.env`
3. Ensure database exists or let app create it

### "Port 5000 already in use"
1. Change `PORT=5000` to another number in `.env`
2. Or kill the process using port 5000

### "CORS blocked"
1. Check `REACT_APP_API_URL` points to correct backend
2. Verify backend CORS middleware is active
3. Ensure both frontend and backend are running

### "Cannot reach backend from frontend"
1. Check backend is running: `curl http://localhost:5000/api/health`
2. Try using IP instead of localhost: `http://192.168.x.x:5000/api`
3. Check firewall settings

---

**Remember**: Never commit `.env` files with actual credentials to version control!
