import React from 'react';
import { FaCar, FaSpinner } from 'react-icons/fa';

const ParkedVehicles = ({ vehicles, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <FaSpinner className="text-4xl text-blue-600 animate-spin" />
                <span className="ml-3 text-lg text-gray-600">Loading parked vehicles...</span>
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FaCar className="text-4xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">No vehicles currently parked</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
                <div
                    key={vehicle.id}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FaCar className="text-3xl text-blue-600" />
                        <div>
                            <p className="text-xs text-gray-600">Vehicle Number</p>
                            <p className="text-xl font-bold text-gray-800 font-mono">
                                {vehicle.vehicleNumber}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Slot</p>
                            <p className="text-2xl font-bold text-blue-600">
                                #{vehicle.slotNumber}
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Parked Since</p>
                            <p className="text-xs font-semibold text-gray-700">
                                {new Date(vehicle.entryTime).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-600">
                        <p className="mb-1">
                            Entry: {new Date(vehicle.entryTime).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParkedVehicles;
