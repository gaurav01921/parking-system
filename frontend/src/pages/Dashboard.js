import React, { useState, useEffect } from 'react';
import { motion as fm, AnimatePresence as ap } from 'framer-motion';
import { 
  Car, 
  ParkingCircle, 
  CheckCircle2, 
  AlertCircle, 
  LayoutGrid, 
  ListOrdered,
  History as HistoryIcon,
  RefreshCw
} from 'lucide-react';
import ParkingSlotCard from '../components/ParkingSlotCard';
import ParkingForm from '../components/ParkingForm';
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
    const [alert, setAlert] = useState({ type: '', message: '' });

    const fetchData = async () => {
        try {
            const [slotsData, parkedData] = await Promise.all([
                getSlots(),
                getParkedVehicles()
            ]);
            setSlots(slotsData);
            setParkedVehicles(parkedData);
        } catch (error) {
            setAlert({
                type: 'error',
                message: 'Connection lost. Please check if the server is running.',
            });
        } finally {
            setSlotsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleParkVehicle = async (vehicleNumber) => {
        try {
            setLoading(true);
            const response = await parkVehicle(vehicleNumber);
            setAlert({
                type: 'success',
                message: `Vehicle ${vehicleNumber} successfully assigned to Slot ${response.data.slotNumber}!`,
            });
            fetchData();
        } catch (error) {
            setAlert({ 
                type: 'error', 
                message: error.response?.data?.message || 'Transaction failed. Please try again.' 
            });
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
                message: `Exit processed for ${vehicleNumber}. Slot ${response.data.slotNumber} is now vacant.`,
            });
            fetchData();
        } catch (error) {
            setAlert({ 
                type: 'error', 
                message: error.response?.data?.message || 'Exit failed. Verify vehicle number.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const availableSlots = slots.filter((slot) => !slot.isOccupied).length;
    const occupiedSlots = slots.filter((slot) => slot.isOccupied).length;

    return (
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <ap>
                {alert.message && (
                    <fm.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed top-24 right-6 z-[60]"
                    >
                        <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert({ type: '', message: '' })}
                        />
                    </fm.div>
                )}
            </ap>

            {/* Header Section */}
            <header className="mb-12 mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3 leading-tight">
                    <ParkingCircle className="w-10 h-10 text-blue-400" />
                    Live Dashboard
                  </h1>
                  <p className="text-white/40 font-medium">Monitoring {slots.length} high-frequency parking zones</p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={fetchData}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                  >
                    <RefreshCw className={`w-5 h-5 ${slotsLoading ? 'animate-spin' : ''}`} />
                  </button>
                  <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 border-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Live Syncing</span>
                  </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Available Slots', value: availableSlots, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Total Occupancy', value: occupiedSlots, icon: Car, color: 'text-rose-400', bg: 'bg-rose-500/10' },
                    { label: 'Capacity Used', value: `${((occupiedSlots / slots.length) * 100).toFixed(0)}%`, icon: LayoutGrid, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Total Inventory', value: slots.length, icon: ListOrdered, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                    <fm.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-3xl p-6 border border-white/5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-white">{stat.value}</p>
                        <p className="text-sm font-semibold text-white/30 uppercase tracking-wider mt-1">{stat.label}</p>
                    </fm.div>
                ))}
            </div>

            {/* Control Panel */}
            <fm.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ParkingForm
                  onPark={handleParkVehicle}
                  onExit={handleExitVehicle}
                  loading={loading}
              />
            </fm.div>

            {/* Parking Grid */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white/90 flex items-center gap-2 leading-none">
                    <LayoutGrid className="w-5 h-5 text-blue-400" />
                    Zone A-1 (Smart Slots)
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-white/40 uppercase">First-Fit Algorithm Active</span>
                  </div>
                </div>

                <fm.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  layout
                >
                    {slotsLoading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="glass rounded-2xl h-48 animate-pulse border border-white/5" />
                        ))
                    ) : (
                        slots.map((slot) => (
                            <ParkingSlotCard
                                key={slot.id}
                                slot={slot}
                                isLoading={loading}
                            />
                        ))
                    )}
                </fm.div>
            </section>
        </div>
    );
};

export default Dashboard;

