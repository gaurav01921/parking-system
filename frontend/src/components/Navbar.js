import React from 'react';
import { LayoutDashboard, History, Car, CircleDot } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ currentPage, onNavigate, availableSlots, totalSlots }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-xl border border-blue-500/30">
              <Car className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent leading-tight">
                ParkSmart
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                Pro Management
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {currentPage === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-blue-500/20 border border-blue-500/30 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  />
                )}
                <item.icon className="w-4 h-4" />
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-2">
                <CircleDot className={`w-3 h-3 ${availableSlots > 0 ? 'text-emerald-400 animate-pulse' : 'text-rose-400'}`} />
                <span className="text-sm font-medium text-white/90 leading-none">
                  {availableSlots} Slots Free
                </span>
              </div>
              <div className="w-24 h-1 bg-white/10 rounded-full mt-2 overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(availableSlots / totalSlots) * 100}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#0a0a0b] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

