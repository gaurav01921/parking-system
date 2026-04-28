import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import { getSlots } from './services/api';

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
        <div className="min-h-screen bg-gray-50">
            <Navbar
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                availableSlots={availableSlots}
                totalSlots={totalSlots}
            />

            <main>
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'history' && <HistoryPage />}
            </main>
        </div>
    );
}

export default App;
