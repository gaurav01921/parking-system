import React, { useState } from 'react';
import { FaParking, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const ParkingForm = ({ onPark, onExit, loading }) => {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [action, setAction] = useState('park');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!vehicleNumber.trim()) {
            alert('Please enter a vehicle number');
            return;
        }

        if (action === 'park') {
            onPark(vehicleNumber);
        } else {
            onExit(vehicleNumber);
        }

        setVehicleNumber('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaParking className="text-blue-600" />
                Parking Control
            </h2>

            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                    Vehicle Number
                </label>
                <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    placeholder="e.g., ABC123"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                    disabled={loading}
                />
            </div>

            <div className="mb-6 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="park"
                        checked={action === 'park'}
                        onChange={(e) => setAction(e.target.value)}
                        disabled={loading}
                        className="w-4 h-4"
                    />
                    <span className="text-gray-700 flex items-center gap-1">
                        <FaSignInAlt /> Park
                    </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="exit"
                        checked={action === 'exit'}
                        onChange={(e) => setAction(e.target.value)}
                        disabled={loading}
                        className="w-4 h-4"
                    />
                    <span className="text-gray-700 flex items-center gap-1">
                        <FaSignOutAlt /> Exit
                    </span>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 ${action === 'park'
                        ? 'bg-green-500 hover:bg-green-600 disabled:bg-gray-400'
                        : 'bg-red-500 hover:bg-red-600 disabled:bg-gray-400'
                    }`}
            >
                {loading ? 'Processing...' : action === 'park' ? 'Park Vehicle' : 'Exit Vehicle'}
            </button>
        </form>
    );
};

export default ParkingForm;
