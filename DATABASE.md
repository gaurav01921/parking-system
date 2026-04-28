# Database Schema Documentation

## Table: slots

Stores information about parking slots.

### Schema SQL

```sql
CREATE TABLE IF NOT EXISTS slots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slotNumber INT NOT NULL UNIQUE,
  isOccupied BOOLEAN DEFAULT FALSE,
  currentVehicles VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| slotNumber | INT | UNIQUE, NOT NULL | Parking slot number (1-10) |
| isOccupied | BOOLEAN | DEFAULT FALSE | Slot occupancy status |
| currentVehicles | VARCHAR(50) | NULL | Vehicle number currently in slot |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |

### Sample Data

```sql
INSERT INTO slots (slotNumber, isOccupied) VALUES
(1, FALSE),
(2, FALSE),
(3, FALSE),
(4, FALSE),
(5, FALSE),
(6, FALSE),
(7, FALSE),
(8, FALSE),
(9, FALSE),
(10, FALSE);
```

### Indexes

```sql
ALTER TABLE slots ADD INDEX idx_slotNumber (slotNumber);
ALTER TABLE slots ADD INDEX idx_isOccupied (isOccupied);
```

---

## Table: vehicles

Stores parking history and current parking records.

### Schema SQL

```sql
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
);
```

### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| vehicleNumber | VARCHAR(50) | NOT NULL | Vehicle registration number |
| slotNumber | INT | NOT NULL, FK | Assigned parking slot |
| entryTime | DATETIME | NOT NULL | Parking entry timestamp |
| exitTime | DATETIME | NULL | Parking exit timestamp |
| status | ENUM | DEFAULT 'parked' | Current status (parked/exited) |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last record update |

### Sample Data

```sql
INSERT INTO vehicles (vehicleNumber, slotNumber, entryTime, status) 
VALUES ('ABC123', 1, NOW(), 'parked');

INSERT INTO vehicles (vehicleNumber, slotNumber, entryTime, exitTime, status) 
VALUES ('XYZ789', 3, DATE_SUB(NOW(), INTERVAL 2 HOUR), NOW(), 'exited');
```

### Indexes

```sql
ALTER TABLE vehicles ADD INDEX idx_vehicleNumber (vehicleNumber);
ALTER TABLE vehicles ADD INDEX idx_slotNumber (slotNumber);
ALTER TABLE vehicles ADD INDEX idx_status (status);
ALTER TABLE vehicles ADD INDEX idx_entryTime (entryTime);
```

---

## Relationships

```
slots (1) ------ (M) vehicles
  id (PK)          slotNumber (FK)
```

- One slot can have many vehicles (history)
- Each vehicle record belongs to one slot
- Cascading updates maintain referential integrity

---

## Database Operations

### Query Examples

#### Get Available Slots

```sql
SELECT id, slotNumber, isOccupied 
FROM slots 
WHERE isOccupied = FALSE 
ORDER BY slotNumber ASC;
```

#### Get First Available Slot

```sql
SELECT id, slotNumber 
FROM slots 
WHERE isOccupied = FALSE 
ORDER BY slotNumber ASC 
LIMIT 1;
```

#### Park a Vehicle

```sql
-- Insert vehicle record
INSERT INTO vehicles (vehicleNumber, slotNumber, entryTime, status) 
VALUES ('ABC123', 1, NOW(), 'parked');

-- Update slot occupancy
UPDATE slots 
SET isOccupied = TRUE, currentVehicles = 'ABC123' 
WHERE slotNumber = 1;
```

#### Exit a Vehicle

```sql
-- Get vehicle details
SELECT id, slotNumber 
FROM vehicles 
WHERE vehicleNumber = 'ABC123' AND status = 'parked' 
LIMIT 1;

-- Update vehicle record
UPDATE vehicles 
SET exitTime = NOW(), status = 'exited' 
WHERE vehicleNumber = 'ABC123' AND status = 'parked';

-- Free the slot
UPDATE slots 
SET isOccupied = FALSE, currentVehicles = NULL 
WHERE slotNumber = 1;
```

#### Get Parked Vehicles

```sql
SELECT id, vehicleNumber, slotNumber, entryTime, status 
FROM vehicles 
WHERE status = 'parked' 
ORDER BY entryTime DESC;
```

#### Get Vehicle History

```sql
SELECT id, vehicleNumber, slotNumber, entryTime, exitTime, status 
FROM vehicles 
ORDER BY createdAt DESC 
LIMIT 100;
```

#### Get Slot Statistics

```sql
SELECT 
  COUNT(*) AS total_slots,
  SUM(CASE WHEN isOccupied = TRUE THEN 1 ELSE 0 END) AS occupied,
  SUM(CASE WHEN isOccupied = FALSE THEN 1 ELSE 0 END) AS available
FROM slots;
```

#### Get Parking Duration

```sql
SELECT 
  vehicleNumber,
  slotNumber,
  entryTime,
  exitTime,
  TIMESTAMPDIFF(MINUTE, entryTime, exitTime) AS duration_minutes
FROM vehicles 
WHERE status = 'exited'
ORDER BY exitTime DESC;
```

---

## Backup & Restore

### Backup Database

```bash
# Backup all data
mysqldump -u root -p parking_system > backup.sql

# Backup specific table
mysqldump -u root -p parking_system vehicles > vehicles_backup.sql
```

### Restore Database

```bash
# Restore from backup
mysql -u root -p parking_system < backup.sql

# Restore specific table
mysql -u root -p parking_system < vehicles_backup.sql
```

---

## Performance Notes

### Recommended Indexes
- `slots.slotNumber` - Already UNIQUE
- `slots.isOccupied` - For quick availability queries
- `vehicles.vehicleNumber` - For vehicle lookups
- `vehicles.slotNumber` - Foreign key
- `vehicles.status` - For filtering parked/exited
- `vehicles.entryTime` - For time-based queries

### Query Optimization
- Use LIMIT for large result sets
- Index frequently filtered columns
- Connection pooling (max 10 connections)
- Consider archiving old records for large datasets

### Data Retention
- Current records: Keep in `vehicles` table
- Historical data: Consider archiving after 30/90 days
- Cleanup script for old exited vehicles (optional)

---

## Maintenance Scripts

### Initialize Database

```sql
CREATE DATABASE IF NOT EXISTS parking_system;
USE parking_system;

-- Create tables (auto-executed by app)
-- Create indexes
ALTER TABLE slots ADD INDEX idx_isOccupied (isOccupied);
ALTER TABLE vehicles ADD INDEX idx_vehicleNumber (vehicleNumber);
ALTER TABLE vehicles ADD INDEX idx_status (status);
```

### Reset Database

```sql
-- Warning: This deletes all data
TRUNCATE TABLE vehicles;
TRUNCATE TABLE slots;

-- Re-initialize slots
INSERT INTO slots (slotNumber, isOccupied) VALUES
(1, 0), (2, 0), (3, 0), (4, 0), (5, 0),
(6, 0), (7, 0), (8, 0), (9, 0), (10, 0);
```

### Archive Old Records

```sql
-- Archive vehicles exited more than 90 days ago
CREATE TABLE vehicles_archive AS
SELECT * FROM vehicles
WHERE status = 'exited' AND exitTime < DATE_SUB(NOW(), INTERVAL 90 DAY);

DELETE FROM vehicles
WHERE status = 'exited' AND exitTime < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

---

*Database schema documentation - Last updated: April 28, 2024*
