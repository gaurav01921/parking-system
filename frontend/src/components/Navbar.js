import React from 'react';
import { FaParking, FaHome, FaHistory } from 'react-icons/fa';

const Navbar = ({ currentPage, onNavigate, availableSlots, totalSlots }) => {
    return (
        <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <FaParking className="text-3xl text-yellow-300" />
                        <h1 className="text-2xl font-bold hidden sm:block">
                            Parking Management System
                        </h1>
                        <h1 className="text-2xl font-bold sm:hidden">
                            PMS
                        </h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${currentPage === 'dashboard'
                                    ? 'bg-yellow-400 text-blue-900 font-bold'
                                    : 'hover:bg-blue-600'
                                }`}
                        >
                            <FaHome /> Dashboard
                        </button>

                        <button
                            onClick={() => onNavigate('history')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${currentPage === 'history'
                                    ? 'bg-yellow-400 text-blue-900 font-bold'
                                    : 'hover:bg-blue-600'
                                }`}
                        >
                            <FaHistory /> History
                        </button>

                        {/* Slot Counter */}
                        <div className="ml-4 bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 border-2 border-yellow-300">
                            <div className="text-sm font-semibold">
                                <p className="text-yellow-300">Available</p>
                                <p className="text-2xl font-bold">
                                    {availableSlots}/{totalSlots}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
