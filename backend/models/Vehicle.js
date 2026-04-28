const pool = require('../config/database');

class Vehicle {
    static async createTable() {
        const connection = await pool.getConnection();
        try {
            await connection.execute(`
        CREATE TABLE IF NOT EXISTS vehicles (
          id INT AUTO_INCREMENT PRIMARY KEY,
          vehicleNumber VARCHAR(50) NOT NULL,
          slotNumber INT NOT NULL,
          entryTime DATETIME NOT NULL,
          exitTime DATETIME,
          status ENUM('parked', 'exited') DEFAULT 'parked',
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (slotNumber) REFERENCES slots(slotNumber)
        )
      `);
        } finally {
            connection.release();
        }
    }

    static async parkVehicle(vehicleNumber, slotNumber) {
        const connection = await pool.getConnection();
        try {
            const now = new Date();
            const [result] = await connection.execute(
                'INSERT INTO vehicles (vehicleNumber, slotNumber, entryTime, status) VALUES (?, ?, ?, ?)',
                [vehicleNumber, slotNumber, now, 'parked']
            );
            return result;
        } finally {
            connection.release();
        }
    }

    static async exitVehicle(vehicleNumber) {
        const connection = await pool.getConnection();
        try {
            const now = new Date();
            const [result] = await connection.execute(
                'UPDATE vehicles SET exitTime = ?, status = ? WHERE vehicleNumber = ? AND status = ?',
                [now, 'exited', vehicleNumber, 'parked']
            );
            return result;
        } finally {
            connection.release();
        }
    }

    static async getVehicleByNumber(vehicleNumber) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM vehicles WHERE vehicleNumber = ? AND status = ?',
                [vehicleNumber, 'parked']
            );
            return rows[0] || null;
        } finally {
            connection.release();
        }
    }

    static async getAllVehicles() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM vehicles ORDER BY createdAt DESC LIMIT 100'
            );
            return rows;
        } finally {
            connection.release();
        }
    }

    static async getParkedVehicles() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM vehicles WHERE status = ? ORDER BY entryTime DESC',
                ['parked']
            );
            return rows;
        } finally {
            connection.release();
        }
    }
}

module.exports = Vehicle;
