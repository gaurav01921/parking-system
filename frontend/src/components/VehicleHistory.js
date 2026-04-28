import React from 'react';
import { FaCar, FaSpinner } from 'react-icons/fa';

const VehicleHistory = ({ vehicles, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <FaSpinner className="text-4xl text-blue-600 animate-spin" />
                <span className="ml-3 text-lg text-gray-600">Loading vehicles...</span>
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FaCar className="text-4xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold">No vehicle history yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold">Vehicle #</th>
                        <th className="px-6 py-4 text-left text-sm font-bold">Slot</th>
                        <th className="px-6 py-4 text-left text-sm font-bold">Entry Time</th>
                        <th className="px-6 py-4 text-left text-sm font-bold">Exit Time</th>
                        <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle, index) => (
                        <tr
                            key={index}
                            className={`border-b transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                }`}
                        >
                            <td className="px-6 py-4 font-mono font-bold text-gray-800">
                                {vehicle.vehicleNumber}
                            </td>
                            <td className="px-6 py-4 text-center font-semibold text-gray-700">
                                {vehicle.slotNumber}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {new Date(vehicle.entryTime).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {vehicle.exitTime
                                    ? new Date(vehicle.exitTime).toLocaleString()
                                    : '-'}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${vehicle.status === 'parked'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {vehicle.status === 'parked' ? 'PARKED' : 'EXITED'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleHistory;
