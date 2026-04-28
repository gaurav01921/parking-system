const pool = require('../config/database');

class Slot {
    static async createTable() {
        const connection = await pool.getConnection();
        try {
            await connection.execute(`
        CREATE TABLE IF NOT EXISTS slots (
          id INT AUTO_INCREMENT PRIMARY KEY,
          slotNumber INT NOT NULL UNIQUE,
          isOccupied BOOLEAN DEFAULT FALSE,
          currentVehicles VARCHAR(50),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
        } finally {
            connection.release();
        }
    }

    static async initializeSlots() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT COUNT(*) as count FROM slots');
            if (rows[0].count === 0) {
                for (let i = 1; i <= 10; i++) {
                    await connection.execute(
                        'INSERT INTO slots (slotNumber, isOccupied) VALUES (?, ?)',
                        [i, false]
                    );
                }
                console.log('✓ 10 parking slots initialized');
            }
        } finally {
            connection.release();
        }
    }

    static async getAllSlots() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT * FROM slots ORDER BY slotNumber ASC');
            return rows;
        } finally {
            connection.release();
        }
    }

    static async getAvailableSlot() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM slots WHERE isOccupied = FALSE ORDER BY slotNumber ASC LIMIT 1'
            );
            return rows[0] || null;
        } finally {
            connection.release();
        }
    }

    static async updateSlotOccupancy(slotNumber, isOccupied, vehicleNumber = null) {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                'UPDATE slots SET isOccupied = ?, currentVehicles = ? WHERE slotNumber = ?',
                [isOccupied, isOccupied ? vehicleNumber : null, slotNumber]
            );
        } finally {
            connection.release();
        }
    }

    static async getSlotByNumber(slotNumber) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM slots WHERE slotNumber = ?',
                [slotNumber]
            );
            return rows[0] || null;
        } finally {
            connection.release();
        }
    }
}

module.exports = Slot;
