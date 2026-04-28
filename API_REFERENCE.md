# API Endpoints Quick Reference

## Base URL
```
http://localhost:5000/api
```

## Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Health check |
| GET | `/slots` | Get all parking slots |
| GET | `/slots/available/count` | Get available slots count |
| POST | `/park` | Park a vehicle |
| POST | `/exit` | Exit a vehicle |
| GET | `/vehicles/parked` | Get parked vehicles |
| GET | `/vehicles` | Get vehicle history |

---

## Detailed API Documentation

### 1. Health Check
**Check if server is running**

```http
GET /health
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-04-28T10:30:45.000Z"
}
```

---

### 2. Get All Slots
**Retrieve all parking slots and their status**

```http
GET /slots
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "slotNumber": 1,
      "isOccupied": false,
      "currentVehicles": null,
      "createdAt": "2024-04-28T10:00:00.000Z",
      "updatedAt": "2024-04-28T10:00:00.000Z"
    },
    {
      "id": 2,
      "slotNumber": 2,
      "isOccupied": true,
      "currentVehicles": "ABC123",
      "createdAt": "2024-04-28T10:00:00.000Z",
      "updatedAt": "2024-04-28T10:05:30.000Z"
    }
  ],
  "total": 10
}
```

---

### 3. Get Available Slots Count
**Get count of available vs total slots**

```http
GET /slots/available/count
```

**Response (200 OK):**
```json
{
  "success": true,
  "available": 8,
  "total": 10
}
```

---

### 4. Park a Vehicle
**Automatically assign an available slot and park a vehicle**

```http
POST /park
Content-Type: application/json

{
  "vehicleNumber": "ABC123"
}
```

**Request Parameters:**
- `vehicleNumber` (string, required): Vehicle registration number

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Vehicle parked successfully",
  "data": {
    "vehicleNumber": "ABC123",
    "slotNumber": 1,
    "entryTime": "2024-04-28T10:30:45.123Z"
  }
}
```

**Error Response (400 Bad Request) - No available slots:**
```json
{
  "success": false,
  "message": "No available parking slots"
}
```

**Error Response (400 Bad Request) - Vehicle already parked:**
```json
{
  "success": false,
  "message": "Vehicle is already parked"
}
```

**Error Response (400 Bad Request) - Missing vehicle number:**
```json
{
  "success": false,
  "message": "Vehicle number is required"
}
```

---

### 5. Exit a Vehicle
**Exit a parked vehicle and free the slot**

```http
POST /exit
Content-Type: application/json

{
  "vehicleNumber": "ABC123"
}
```

**Request Parameters:**
- `vehicleNumber` (string, required): Vehicle registration number

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Vehicle exited successfully",
  "data": {
    "vehicleNumber": "ABC123",
    "slotNumber": 1,
    "entryTime": "2024-04-28T10:30:45.123Z",
    "exitTime": "2024-04-28T11:15:30.456Z"
  }
}
```

**Error Response (404 Not Found) - Vehicle not parked:**
```json
{
  "success": false,
  "message": "Vehicle not found or already exited"
}
```

**Error Response (400 Bad Request) - Missing vehicle number:**
```json
{
  "success": false,
  "message": "Vehicle number is required"
}
```

---

### 6. Get Parked Vehicles
**Get all currently parked vehicles**

```http
GET /vehicles/parked
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "vehicleNumber": "ABC123",
      "slotNumber": 1,
      "entryTime": "2024-04-28T10:30:45.000Z",
      "exitTime": null,
      "status": "parked",
      "createdAt": "2024-04-28T10:30:45.000Z",
      "updatedAt": "2024-04-28T10:30:45.000Z"
    },
    {
      "id": 2,
      "vehicleNumber": "XYZ789",
      "slotNumber": 3,
      "entryTime": "2024-04-28T09:15:30.000Z",
      "exitTime": null,
      "status": "parked",
      "createdAt": "2024-04-28T09:15:30.000Z",
      "updatedAt": "2024-04-28T09:15:30.000Z"
    }
  ],
  "total": 2
}
```

---

### 7. Get Vehicle History
**Get complete parking history (last 100 records)**

```http
GET /vehicles
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "vehicleNumber": "ABC123",
      "slotNumber": 1,
      "entryTime": "2024-04-28T08:00:00.000Z",
      "exitTime": "2024-04-28T08:45:30.000Z",
      "status": "exited",
      "createdAt": "2024-04-28T08:00:00.000Z",
      "updatedAt": "2024-04-28T08:45:30.000Z"
    },
    {
      "id": 4,
      "vehicleNumber": "DEF456",
      "slotNumber": 2,
      "entryTime": "2024-04-28T07:30:00.000Z",
      "exitTime": "2024-04-28T07:50:15.000Z",
      "status": "exited",
      "createdAt": "2024-04-28T07:30:00.000Z",
      "updatedAt": "2024-04-28T07:50:15.000Z"
    }
  ],
  "total": 50
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Request Examples

### Using curl

```bash
# Get all slots
curl http://localhost:5000/api/slots

# Park vehicle
curl -X POST http://localhost:5000/api/park \
  -H "Content-Type: application/json" \
  -d '{"vehicleNumber":"ABC123"}'

# Exit vehicle
curl -X POST http://localhost:5000/api/exit \
  -H "Content-Type: application/json" \
  -d '{"vehicleNumber":"ABC123"}'

# Get parked vehicles
curl http://localhost:5000/api/vehicles/parked

# Get available count
curl http://localhost:5000/api/slots/available/count
```

### Using JavaScript/Fetch

```javascript
// Get all slots
fetch('http://localhost:5000/api/slots')
  .then(res => res.json())
  .then(data => console.log(data))

// Park vehicle
fetch('http://localhost:5000/api/park', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ vehicleNumber: 'ABC123' })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

### Using Axios

```javascript
// Get all slots
axios.get('http://localhost:5000/api/slots')
  .then(res => console.log(res.data))

// Park vehicle
axios.post('http://localhost:5000/api/park', {
  vehicleNumber: 'ABC123'
})
  .then(res => console.log(res.data))
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request parameters |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting (Not implemented by default)

Currently, there is no rate limiting. Consider implementing for production use.

---

## CORS Policy

The backend accepts requests from all origins (`*`). For production, restrict to specific domains.

---

**Last Updated: April 28, 2024**
