import React from 'react';
import { Car, Loader2, ArrowRightCircle, ArrowLeftCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const VehicleHistory = ({ vehicles, loading }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
                <span className="text-sm font-bold text-white/40 uppercase tracking-widest">Accessing records...</span>
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                <Car className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/30 font-bold uppercase tracking-widest text-sm">No History Found</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5">
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Vehicle ID</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Slot Zone</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Check-In</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Check-Out</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {vehicles.map((vehicle, index) => (
                        <motion.tr
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-white/[0.02] transition-colors"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Car className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="font-mono font-bold text-white/90">{vehicle.vehicleNumber}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-bold text-white/60">A-{vehicle.slotNumber}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                                    <ArrowRightCircle className="w-3 h-3 text-emerald-400" />
                                    {new Date(vehicle.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    <span className="opacity-40">{new Date(vehicle.entryTime).toLocaleDateString()}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {vehicle.exitTime ? (
                                    <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                                        <ArrowLeftCircle className="w-3 h-3 text-rose-400" />
                                        {new Date(vehicle.exitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        <span className="opacity-40">{new Date(vehicle.exitTime).toLocaleDateString()}</span>
                                    </div>
                                ) : (
                                    <span className="text-white/20 text-[10px] font-black uppercase tracking-widest italic">In Progress</span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        vehicle.status === 'parked'
                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    }`}
                                >
                                    {vehicle.status === 'parked' ? (
                                        <>
                                            <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                                            Active
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-3 h-3" />
                                            Completed
                                        </>
                                    )}
                                </span>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleHistory;

