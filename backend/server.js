const express = require('express');
const cors = require('cors');
require('dotenv').config();

const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const parkingRoutes = require('./routes/parkingRoutes');
const Slot = require('./models/Slot');
const Vehicle = require('./models/Vehicle');

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database tables and slots
const initializeDatabase = async () => {
    try {
        console.log('Initializing database...');
        await Slot.createTable();
        await Vehicle.createTable();
        await Slot.initializeSlots();
        console.log('✓ Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date(),
    });
});

// API Routes
app.use('/api', parkingRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await initializeDatabase();
    console.log(`\n🚗 Parking System Server running on http://localhost:${PORT}`);
    console.log(`📊 API Documentation: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
