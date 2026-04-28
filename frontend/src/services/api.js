import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Slots API
export const getSlots = async () => {
    try {
        const response = await apiClient.get('/slots');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching slots:', error);
        throw error;
    }
};

export const getAvailableSlotsCount = async () => {
    try {
        const response = await apiClient.get('/slots/available/count');
        return response.data;
    } catch (error) {
        console.error('Error fetching available slots count:', error);
        throw error;
    }
};

// Parking API
export const parkVehicle = async (vehicleNumber) => {
    try {
        const response = await apiClient.post('/park', { vehicleNumber });
        return response.data;
    } catch (error) {
        console.error('Error parking vehicle:', error);
        throw error;
    }
};

export const exitVehicle = async (vehicleNumber) => {
    try {
        const response = await apiClient.post('/exit', { vehicleNumber });
        return response.data;
    } catch (error) {
        console.error('Error exiting vehicle:', error);
        throw error;
    }
};

// Vehicles API
export const getParkedVehicles = async () => {
    try {
        const response = await apiClient.get('/vehicles/parked');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching parked vehicles:', error);
        throw error;
    }
};

export const getAllVehicles = async () => {
    try {
        const response = await apiClient.get('/vehicles');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export default apiClient;
