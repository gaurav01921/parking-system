# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│                  (http://localhost:3000)                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            │
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React.js)                      │
│                    ─────────────────────                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            React Components                         │  │
│  │  • Navbar          • ParkingSlotCard               │  │
│  │  • Dashboard       • ParkingForm                   │  │
│  │  • HistoryPage     • ParkedVehicles                │  │
│  │  • Alert           • VehicleHistory                │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     API Service Layer (src/services/api.js)        │  │
│  │     • getSlots()                                   │  │
│  │     • parkVehicle()                                │  │
│  │     • exitVehicle()                                │  │
│  │     • getParkedVehicles()                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     State Management (React Hooks)                 │  │
│  │     • useState (slots, vehicles, loading)          │  │
│  │     • useEffect (auto-refresh every 5s)            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API
                            │ (http://localhost:5000/api)
                            │
┌─────────────────────────────────────────────────────────────┐
│                BACKEND (Node.js/Express)                    │
│              (http://localhost:5000)                        │
│                 ─────────────────────                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Express Server & Api Routes               │  │
│  │   GET  /api/slots                                  │  │
│  │   GET  /api/slots/available/count                  │  │
│  │   POST /api/park                                   │  │
│  │   POST /api/exit                                   │  │
│  │   GET  /api/vehicles/parked                        │  │
│  │   GET  /api/vehicles                               │  │
│  │   GET  /api/health                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Middleware Layer                         │  │
│  │  • CORS Middleware (Enable cross-origin requests)  │  │
│  │  • Error Handler (Centralized error handling)      │  │
│  │  • JSON Parser (Parse request bodies)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Models / Business Logic                  │  │
│  │  ┌───────────────────┬──────────────────────────┐  │  │
│  │  │   Slot Model      │   Vehicle Model         │  │  │
│  │  ├───────────────────┼──────────────────────────┤  │  │
│  │  │ • createTable()   │ • createTable()         │  │  │
│  │  │ • getAllSlots()   │ • parkVehicle()         │  │  │
│  │  │ • getAvailable()  │ • exitVehicle()         │  │  │
│  │  │ • updateOccupancy │ • getVehicleByNumber()  │  │  │
│  │  │ • initializeSlots │ • getParkedVehicles()   │  │  │
│  │  └───────────────────┴──────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Database Connection Pool                   │  │
│  │         (config/database.js)                       │  │
│  │         • Connection pooling                       │  │
│  │         • Query execution                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQL Queries
                            │
┌─────────────────────────────────────────────────────────────┐
│                  MySQL Database                             │
│               (localhost:3306)                              │
│                 ─────────────────                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    Database: parking_system                         │  │
│  │    ┌──────────────────────────────────────────────┐ │  │
│  │    │ Table: slots                                │ │  │
│  │    │ • id (PK)                                   │ │  │
│  │    │ • slotNumber (UNIQUE)                       │ │  │
│  │    │ • isOccupied (BOOLEAN)                      │ │  │
│  │    │ • currentVehicles (VARCHAR)                 │ │  │
│  │    │ • createdAt, updatedAt (TIMESTAMPS)         │ │  │
│  │    └──────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │    ┌──────────────────────────────────────────────┐ │  │
│  │    │ Table: vehicles                             │ │  │
│  │    │ • id (PK)                                   │ │  │
│  │    │ • vehicleNumber (VARCHAR)                   │ │  │
│  │    │ • slotNumber (FK → slots)                   │ │  │
│  │    │ • entryTime (DATETIME)                      │ │  │
│  │    │ • exitTime (DATETIME)                       │ │  │
│  │    │ • status (ENUM: parked/exited)              │ │  │
│  │    │ • createdAt, updatedAt (TIMESTAMPS)         │ │  │
│  │    └──────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Park Vehicle Flow

```
User enters vehicle number → Frontend Form
    ↓
    └→ API Service (parkVehicle)
        ↓
        └→ Backend: POST /api/park
            ↓
            ├→ Slot Model: getAvailableSlot()
            │   └→ Query: SELECT WHERE isOccupied = FALSE
            │       ↓
            │       └→ Get first available slot
            │
            ├→ Vehicle Model: parkVehicle()
            │   └→ Query: INSERT INTO vehicles
            │       ↓
            │       └→ Create vehicle record
            │
            ├→ Slot Model: updateSlotOccupancy()
            │   └→ Query: UPDATE slots SET isOccupied = TRUE
            │       ↓
            │       └→ Mark slot as occupied
            │
            └→ Send response to Frontend

Frontend receives success response
    ↓
    └→ Show alert notification
        ↓
        └→ Refresh slots and parked vehicles
            ↓
            └→ Update Dashboard
```

### 2. Exit Vehicle Flow

```
User enters exiting vehicle number → Frontend Form
    ↓
    └→ API Service (exitVehicle)
        ↓
        └→ Backend: POST /api/exit
            ↓
            ├→ Vehicle Model: getVehicleByNumber()
            │   └→ Query: SELECT WHERE vehicleNumber = ?
            │       ↓
            │       └→ Get vehicle details (find slot)
            │
            ├→ Vehicle Model: exitVehicle()
            │   └→ Query: UPDATE vehicles SET exitTime = NOW()
            │       ↓
            │       └→ Record exit time
            │
            ├→ Slot Model: updateSlotOccupancy()
            │   └→ Query: UPDATE slots SET isOccupied = FALSE
            │       ↓
            │       └→ Free the slot
            │
            └→ Send response to Frontend

Frontend receives success response
    ↓
    └→ Show alert notification
        ↓
        └→ Refresh slots and parked vehicles
            ↓
            └→ Update Dashboard
```

### 3. Display Slots Flow

```
Dashboard component mounts
    ↓
    └→ useEffect hook triggers
        ↓
        ├→ Call: fetchSlots()
        │   └→ API Service: getSlots()
        │       ↓
        │       └→ Backend: GET /api/slots
        │           └→ Slot Model: getAllSlots()
        │               └→ Query: SELECT * FROM slots
        │                   ↓
        │                   └→ Return all slots
        │
        └→ Set interval (5 seconds)
            └→ Repeat fetchSlots every 5 seconds

Update state with slots data
    ↓
    └→ Re-render components
        ↓
        └→ Display 10 ParkingSlotCard components
            ├→ Green cards for available slots
            └→ Red cards for occupied slots
```

## Component Hierarchy

```
App
├── Navbar
│   └── Navigation & Slot Counter
└── Main Page (CurrentPage)
    ├── Dashboard (if currentPage === 'dashboard')
    │   ├── Statistics Cards
    │   ├── ParkingForm
    │   │   └── Vehicle Input & Action Selection
    │   ├── ParkedVehicles
    │   │   └── ParkedVehicles Grid
    │   └── Parking Slots Grid
    │       ├── ParkingSlotCard (x10)
    │       └── Status Indicators
    │
    └── HistoryPage (if currentPage === 'history')
        ├── Statistics Cards
        ├── Refresh Button
        └── VehicleHistory
            └── History Table
```

## State Management

### Frontend State (React Hooks)

**Dashboard Component:**
```javascript
const [slots, setSlots] = useState([])           // All parking slots
const [parkedVehicles, setParkedVehicles] = useState([])  // Currently parked
const [loading, setLoading] = useState(false)    // Form submission loading
const [slotsLoading, setSlotsLoading] = useState(true)    // Slots fetch loading
const [vehiclesLoading, setVehiclesLoading] = useState(false) // Vehicles fetch
const [alert, setAlert] = useState({ type: '', message: '' })  // Alerts
```

**Auto-Refresh:**
- useEffect runs on mount
- Sets up interval for every 5 seconds
- Fetches both slots and parked vehicles
- Cleanup on unmount

## Error Handling

### Frontend
```javascript
try {
  const response = await parkVehicle(vehicleNumber)
  // Success handling
} catch (error) {
  const message = error.response?.data?.message || 'Failed'
  setAlert({ type: 'error', message })
}
```

### Backend
```javascript
// Middleware error handler catches all errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message
  })
})
```

## Performance Considerations

1. **Connection Pooling**: MySQL connection pool (max 10 connections)
2. **Auto-Refresh**: Every 5 seconds for real-time updates
3. **Lazy Loading**: Components only load needed data
4. **Error Recovery**: Failed requests don't block UI
5. **CORS**: Handled efficiently with middleware

---

*Diagram generated for clarity - Actual architecture may include additional features*
