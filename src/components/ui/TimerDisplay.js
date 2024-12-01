import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimerDisplay = ({ remainingTime }) => {
    const [time, setTime] = useState(remainingTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 60000); // Décrémentation toutes les minutes

        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const isLowTime = time < 5;

    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isLowTime ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-700'}`}>
            <Clock className={`w-5 h-5 ${isLowTime ? 'animate-pulse' : ''}`} />
            <span className="font-mono text-lg">
                {hours.toString().padStart(2, '0')}h{minutes.toString().padStart(2, '0')}
            </span>
        </div>
    );
};

export default TimerDisplay;