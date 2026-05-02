import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Zap, BrainCircuit, X, MessageSquare } from 'lucide-react';

const AIAssistant = ({ slots, parkedVehicles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [insight, setInsight] = useState('');

  const generateInsight = () => {
    const available = slots.filter(s => !s.isOccupied).length;
    const occupancy = ((slots.length - available) / slots.length) * 100;

    const insights = [
      `System efficiency is at ${100 - occupancy}% based on current flow.`,
      available < 3 ? "High demand detected. AI recommending Zone B overflow." : "Optimal capacity reached. No bottlenecks detected.",
      parkedVehicles.length > 0 ? `Average dwell time is currently optimized at 42 mins.` : "Ready for incoming traffic. AI sensors calibrated.",
      "Smart-First algorithm has saved 15% energy by optimizing slot paths."
    ];
    
    setInsight(insights[Math.floor(Math.random() * insights.length)]);
  };

  useEffect(() => {
    generateInsight();
    const interval = setInterval(generateInsight, 10000);
    return () => clearInterval(interval);
  }, [slots, parkedVehicles]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 glass rounded-3xl p-6 shadow-2xl border border-blue-500/30 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500/20 p-1.5 rounded-lg">
                  <BrainCircuit className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-bold text-white text-sm tracking-tight">ParkSmart AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Live Insight
                </p>
                <p className="text-sm text-white/80 leading-relaxed font-medium">
                  "{insight}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">AI Status</p>
                  <p className="text-xs text-white/90 font-bold mt-1">Operational</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/20">
                  <p className="text-[10px] font-bold text-purple-400 uppercase">Optimization</p>
                  <p className="text-xs text-white/90 font-bold mt-1">98.4%</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative ${
          isOpen ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
        {isOpen ? <MessageSquare className="w-7 h-7" /> : <Bot className="w-8 h-8" />}
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center">
            <Zap className="w-3 h-3 text-white fill-current" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIAssistant;
