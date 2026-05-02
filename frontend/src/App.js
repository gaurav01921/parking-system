import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import { getSlots } from './services/api';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [availableSlots, setAvailableSlots] = useState(0);
    const [totalSlots, setTotalSlots] = useState(10);

    const updateSlotCount = async () => {
        try {
            const slots = await getSlots();
            setTotalSlots(slots.length);
            setAvailableSlots(slots.filter((slot) => !slot.isOccupied).length);
        } catch (error) {
            console.error('Error updating slot count:', error);
        }
    };

    useEffect(() => {
        updateSlotCount();
        const interval = setInterval(updateSlotCount, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen selection:bg-blue-500/30">
            <Navbar
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                availableSlots={availableSlots}
                totalSlots={totalSlots}
            />

            <main className="pt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {currentPage === 'dashboard' && <Dashboard />}
                        {currentPage === 'history' && <HistoryPage />}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
            </div>
        </div>
    );
}

export default App;

