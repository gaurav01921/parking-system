import React, { useState, useEffect } from 'react';
import { FaParking, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ParkingSlotCard = ({ slot, onSlotClick, isLoading }) => {
    const isOccupied = slot.isOccupied;

    return (
        <div
            onClick={() => !isLoading && onSlotClick && onSlotClick(slot)}
            className={`p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${isOccupied
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-green-100 border-2 border-green-500 hover:shadow-xl'
                }`}
        >
            <div className="flex flex-col items-center justify-center h-32">
                {isOccupied ? (
                    <FaTimesCircle className="text-red-600 text-4xl mb-3" />
                ) : (
                    <FaParking className="text-green-600 text-4xl mb-3" />
                )}

                <h3 className="text-2xl font-bold text-gray-800">
                    Slot {slot.slotNumber}
                </h3>

                <p
                    className={`text-sm font-semibold mt-3 ${isOccupied ? 'text-red-600' : 'text-green-600'
                        }`}
                >
                    {isOccupied ? '● OCCUPIED' : '● AVAILABLE'}
                </p>

                {isOccupied && slot.currentVehicles && (
                    <p className="text-xs text-gray-700 mt-2 font-mono bg-white px-2 py-1 rounded">
                        {slot.currentVehicles}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ParkingSlotCard;
