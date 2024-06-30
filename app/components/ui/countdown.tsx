'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: string; // The target date in ISO format
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex justify-center items-center space-x-2 sm:space-x-1 md:space-x-4 p-4 bg-white shadow-lg rounded-lg">
            {Object.keys(timeLeft).map((unit) => (
                <div key={unit} className="text-center">
                    <div className="text-slate-900 text-2xl font-bold">
                        {timeLeft[unit as keyof typeof timeLeft]}
                    </div>
                    <div className="uppercase text-sm sm:text-xs md:text-sm text-gray-300">
                        {unit}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Countdown;
