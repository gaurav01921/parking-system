import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, RefreshCw, FileText, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
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

    const stats = [
        { label: 'Exited Vehicles', value: vehicles.filter((v) => v.status === 'exited').length, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Total Records', value: vehicles.length, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 pb-20">
            {/* Header */}
            <header className="mb-12 mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3 leading-tight">
                    <HistoryIcon className="w-10 h-10 text-blue-400" />
                    Activity Logs
                  </h1>
                  <p className="text-white/40 font-medium">Historical data for all processed vehicles</p>
                </div>

                <button
                    onClick={fetchVehicles}
                    disabled={loading}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Logs
                </button>
            </header>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-3xl p-6 border border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white">{stat.value}</p>
                                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Vehicle History Table Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
            >
                <VehicleHistory vehicles={vehicles} loading={loading} />
            </motion.div>

            {/* Footer */}
            <footer className="mt-12 text-center text-white/20">
                <p className="text-xs font-bold uppercase tracking-[0.2em]">Secure Data Logging Active</p>
            </footer>
        </div>
    );
};

export default HistoryPage;

