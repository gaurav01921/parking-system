import React, { useState } from 'react';
import { Car, LogOut, Loader2, Search } from 'lucide-react';

const ParkingForm = ({ onPark, onExit, loading }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [mode, setMode] = useState('park'); // 'park' or 'exit'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleNumber.trim()) return;

    if (mode === 'park') {
      onPark(vehicleNumber);
    } else {
      onExit(vehicleNumber);
    }
    setVehicleNumber('');
  };

  return (
    <div className="glass rounded-3xl p-8 mb-12 shadow-2xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
        <Car size={160} />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">Vehicle Actions</h2>
          <p className="text-white/50 font-medium">Quickly park or exit vehicles from the system</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 self-start">
          <button
            onClick={() => setMode('park')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              mode === 'park' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Car className="w-4 h-4" />
            Entry
          </button>
          <button
            onClick={() => setMode('exit')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              mode === 'exit' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <LogOut className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-blue-400 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            placeholder="ENTER VEHICLE NUMBER (E.G. MH12AB1234)"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono tracking-widest outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !vehicleNumber}
          className={`px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 min-w-[200px] shadow-xl ${
            mode === 'park' 
              ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20' 
              : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {mode === 'park' ? <Car className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
              <span>{mode === 'park' ? 'Confirm Entry' : 'Process Exit'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ParkingForm;

