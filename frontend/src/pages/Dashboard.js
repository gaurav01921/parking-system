import React, { useState, useEffect } from 'react';
import { FaParking, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import ParkingSlotCard from '../components/ParkingSlotCard';
import ParkingForm from '../components/ParkingForm';
import ParkedVehicles from '../components/ParkedVehicles';
import Alert from '../components/Alert';
import {
    getSlots,
    parkVehicle,
    exitVehicle,
    getParkedVehicles,
} from '../services/api';

const Dashboard = () => {
    const [slots, setSlots] = useState([]);
    const [parkedVehicles, setParkedVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [slotsLoading, setSlotsLoading] = useState(true);
    const [vehiclesLoading, setVehiclesLoading] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });

    const fetchSlots = async () => {
        try {
            setSlotsLoading(true);
            const data = await getSlots();
            setSlots(data);
        } catch (error) {
            setAlert({
                type: 'error',
                message: 'Failed to fetch slots. Please check your connection.',
            });
        } finally {
            setSlotsLoading(false);
        }
    };

    const fetchParkedVehicles = async () => {
        try {
            setVehiclesLoading(true);
            const data = await getParkedVehicles();
            setParkedVehicles(data);
        } catch (error) {
            console.error('Error fetching parked vehicles:', error);
        } finally {
            setVehiclesLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots();
        fetchParkedVehicles();

        // Refresh every 5 seconds
        const interval = setInterval(() => {
            fetchSlots();
            fetchParkedVehicles();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleParkVehicle = async (vehicleNumber) => {
        try {
            setLoading(true);
            const response = await parkVehicle(vehicleNumber);
            setAlert({
                type: 'success',
                message: `Vehicle ${vehicleNumber} parked at Slot ${response.data.slotNumber}!`,
            });
            fetchSlots();
            fetchParkedVehicles();
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to park vehicle';
            setAlert({ type: 'error', message });
        } finally {
            setLoading(false);
        }
    };

    const handleExitVehicle = async (vehicleNumber) => {
        try {
            setLoading(true);
            const response = await exitVehicle(vehicleNumber);
            setAlert({
                type: 'success',
                message: `Vehicle ${vehicleNumber} exited from Slot ${response.data.slotNumber}!`,
            });
            fetchSlots();
            fetchParkedVehicles();
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to exit vehicle';
            setAlert({ type: 'error', message });
        } finally {
            setLoading(false);
        }
    };

    const availableSlots = slots.filter((slot) => !slot.isOccupied).length;
    const occupiedSlots = slots.filter((slot) => slot.isOccupied).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ type: '', message: '' })}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold opacity-90">Available Slots</p>
                                <p className="text-3xl font-bold mt-2">{availableSlots}</p>
                            </div>
                            <FaParking className="text-5xl opacity-20" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold opacity-90">Occupied Slots</p>
                                <p className="text-3xl font-bold mt-2">{occupiedSlots}</p>
                            </div>
                            <FaCheckCircle className="text-5xl opacity-20" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold opacity-90">Total Slots</p>
                                <p className="text-3xl font-bold mt-2">{slots.length}</p>
                            </div>
                            <FaParking className="text-5xl opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Parking Form */}
                <ParkingForm
                    onPark={handleParkVehicle}
                    onExit={handleExitVehicle}
                    loading={loading}
                />

                {/* Currently Parked Vehicles */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FaCheckCircle className="text-blue-600" />
                        Currently Parked Vehicles
                    </h2>
                    <ParkedVehicles vehicles={parkedVehicles} loading={vehiclesLoading} />
                </div>

                {/* Parking Slots */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FaParking className="text-blue-600" />
                        Parking Slot Status
                    </h2>

                    {slotsLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <FaSpinner className="text-5xl text-blue-600 animate-spin" />
                            <span className="ml-4 text-xl text-gray-600">Loading slots...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {slots.map((slot) => (
                                <ParkingSlotCard
                                    key={slot.id}
                                    slot={slot}
                                    isLoading={slotsLoading}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center py-8 text-gray-600">
                    <p className="text-sm">🚗 Vehicle Parking Management System | Auto-refresh every 5 seconds</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
