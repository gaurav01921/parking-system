const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');
const Vehicle = require('../models/Vehicle');

// GET all slots
router.get('/slots', async (req, res, next) => {
    try {
        const slots = await Slot.getAllSlots();
        res.json({
            success: true,
            data: slots,
            total: slots.length,
        });
    } catch (error) {
        next(error);
    }
});

// GET available slots count
router.get('/slots/available/count', async (req, res, next) => {
    try {
        const slots = await Slot.getAllSlots();
        const availableCount = slots.filter((slot) => !slot.isOccupied).length;
        res.json({
            success: true,
            available: availableCount,
            total: slots.length,
        });
    } catch (error) {
        next(error);
    }
});

// PARK a vehicle
router.post('/park', async (req, res, next) => {
    try {
        const { vehicleNumber } = req.body;

        if (!vehicleNumber || vehicleNumber.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Vehicle number is required',
            });
        }

        // Check if vehicle is already parked
        const existingVehicle = await Vehicle.getVehicleByNumber(vehicleNumber);
        if (existingVehicle) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle is already parked',
            });
        }

        // Get available slot
        const availableSlot = await Slot.getAvailableSlot();
        if (!availableSlot) {
            return res.status(400).json({
                success: false,
                message: 'No available parking slots',
            });
        }

        // Park the vehicle
        await Vehicle.parkVehicle(vehicleNumber, availableSlot.slotNumber);
        await Slot.updateSlotOccupancy(availableSlot.slotNumber, true, vehicleNumber);

        res.status(201).json({
            success: true,
            message: 'Vehicle parked successfully',
            data: {
                vehicleNumber,
                slotNumber: availableSlot.slotNumber,
                entryTime: new Date(),
            },
        });
    } catch (error) {
        next(error);
    }
});

// EXIT a vehicle
router.post('/exit', async (req, res, next) => {
    try {
        const { vehicleNumber } = req.body;

        if (!vehicleNumber || vehicleNumber.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Vehicle number is required',
            });
        }

        // Get parked vehicle info
        const vehicle = await Vehicle.getVehicleByNumber(vehicleNumber);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found or already exited',
            });
        }

        // Update vehicle status
        await Vehicle.exitVehicle(vehicleNumber);

        // Free the slot
        await Slot.updateSlotOccupancy(vehicle.slotNumber, false, null);

        res.json({
            success: true,
            message: 'Vehicle exited successfully',
            data: {
                vehicleNumber,
                slotNumber: vehicle.slotNumber,
                entryTime: vehicle.entryTime,
                exitTime: new Date(),
            },
        });
    } catch (error) {
        next(error);
    }
});

// GET all parked vehicles
router.get('/vehicles/parked', async (req, res, next) => {
    try {
        const vehicles = await Vehicle.getParkedVehicles();
        res.json({
            success: true,
            data: vehicles,
            total: vehicles.length,
        });
    } catch (error) {
        next(error);
    }
});

// GET all vehicles (history)
router.get('/vehicles', async (req, res, next) => {
    try {
        const vehicles = await Vehicle.getAllVehicles();
        res.json({
            success: true,
            data: vehicles,
            total: vehicles.length,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
