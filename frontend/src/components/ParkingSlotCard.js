import React from 'react';
import { motion } from 'framer-motion';
import { Car, CheckCircle2, ShieldCheck } from 'lucide-react';

const ParkingSlotCard = ({ slot, onSlotClick, isLoading }) => {
  const isOccupied = slot.isOccupied;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => !isLoading && onSlotClick && onSlotClick(slot)}
      className={`glass-card rounded-2xl p-5 border relative overflow-hidden cursor-pointer ${
        isOccupied ? 'parking-slot-occupied' : 'parking-slot-free'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-xl ${isOccupied ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}>
          {isOccupied ? (
            <Car className="w-5 h-5 text-rose-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <span className="text-2xl font-black opacity-20">#{slot.slotNumber}</span>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium opacity-60">Status</p>
        <p className={`text-lg font-bold tracking-tight ${isOccupied ? 'text-rose-400' : 'text-emerald-400'}`}>
          {isOccupied ? 'Occupied' : 'Free to Park'}
        </p>
      </div>

      {isOccupied && (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold opacity-40">
            <ShieldCheck className="w-3 h-3" />
            <span>Vehicle Info</span>
          </div>
          <p className="text-sm font-mono font-bold text-white/90 truncate">
            {slot.currentVehicles || '---'}
          </p>
        </div>
      )}

      {/* Decorative background circle */}
      <div className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-3xl opacity-20 ${
        isOccupied ? 'bg-rose-500' : 'bg-emerald-500'
      }`} />
    </motion.div>
  );
};

export default ParkingSlotCard;

