import React, { useState, useEffect } from 'react';
import { FaHistory, FaSpinner, FaSync } from 'react-icons/fa';
import VehicleHistory from '../components/VehicleHistory';
import { getAllVehicles } from '../services/api';

const HistoryPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const data = await getAllVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaHistory className="text-blue-600" />
                        Vehicle History
                    </h1>

                    <button
                        onClick={fetchVehicles}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:bg-gray-400"
                    >
                        <FaSync className={loading ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6">
                        <p className="text-sm font-semibold opacity-90">Total Vehicles (History)</p>
                        <p className="text-3xl font-bold mt-2">
                            {vehicles.filter((v) => v.status === 'exited').length}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
                        <p className="text-sm font-semibold opacity-90">All Records</p>
                        <p className="text-3xl font-bold mt-2">{vehicles.length}</p>
                    </div>
                </div>

                {/* Vehicle History Table */}
                <div className="mb-8">
                    <VehicleHistory vehicles={vehicles} loading={loading} />
                </div>

                {/* Footer */}
                <div className="text-center py-8 text-gray-600">
                    <p className="text-sm">📊 Complete parking history and vehicle records</p>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
