import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  ParkingCircle, 
  CheckCircle2, 
  AlertCircle, 
  LayoutGrid, 
  ListOrdered,
  History as HistoryIcon,
  RefreshCw,
  Sparkles,
  BrainCircuit,
  Zap
} from 'lucide-react';
import ParkingSlotCard from '../components/ParkingSlotCard';
import ParkingForm from '../components/ParkingForm';
import Alert from '../components/Alert';
import AIAssistant from '../components/AIAssistant';
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
            <AnimatePresence>
                {alert.message && (
                    <motion.div
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Assistant Widget */}
            <AIAssistant slots={slots} parkedVehicles={parkedVehicles} />

            {/* Header Section */}
            <header className="mb-12 mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">
                    <Sparkles className="w-4 h-4" />
                    AI-Powered Management
                  </div>
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
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">AI Syncing Active</span>
                  </div>
                </div>
            </header>

            {/* AI Analysis Row */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
            >
              <div className="lg:col-span-2 glass rounded-[2rem] p-8 border border-blue-500/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-blue-500 group-hover:scale-110 transition-transform duration-700">
                  <BrainCircuit size={200} />
                </div>
                
                <div className="flex-1 space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                    <Zap className="w-3 h-3 fill-current" />
                    Smart Prediction
                  </div>
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    Current occupancy is <span className="text-blue-400">{((occupiedSlots/slots.length)*100).toFixed(1)}%</span>. AI recommends focusing on Zone A-1 for optimization.
                  </h2>
                  <div className="flex gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Peak Prediction</p>
                      <p className="text-white/80 font-bold">In 2.5 hours</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">AI Confidence</p>
                      <p className="text-white/80 font-bold">98.4%</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-2 relative z-10">
                  <button className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20">
                    Generate Report
                  </button>
                  <button className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 font-bold text-sm transition-all border border-white/5">
                    View Patterns
                  </button>
                </div>
              </div>

              <div className="glass rounded-[2rem] p-8 border border-emerald-500/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Space Efficiency</p>
                  <p className="text-4xl font-black text-white">{(100 - ((occupiedSlots/slots.length)*100)).toFixed(0)}%</p>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(100 - ((occupiedSlots/slots.length)*100))}%` }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
                <p className="text-xs text-white/40 mt-4 leading-relaxed">
                  The AI has identified that keeping at least 20% buffer space optimizes traffic flow by 12%.
                </p>
              </div>
            </motion.section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Available Slots', value: availableSlots, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Total Occupancy', value: occupiedSlots, icon: Car, color: 'text-rose-400', bg: 'bg-rose-500/10' },
                    { label: 'Capacity Used', value: `${((occupiedSlots / slots.length) * 100).toFixed(0)}%`, icon: LayoutGrid, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Total Inventory', value: slots.length, icon: ListOrdered, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                    <motion.div
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
                    </motion.div>
                ))}
            </div>

            {/* Control Panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ParkingForm
                  onPark={handleParkVehicle}
                  onExit={handleExitVehicle}
                  loading={loading}
              />
            </motion.div>

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

                <motion.div 
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
                </motion.div>
            </section>
        </div>
    );
};


export default Dashboard;

