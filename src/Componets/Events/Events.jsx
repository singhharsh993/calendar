import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Events = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [events, setEvents] = useState({});
    const [newEvent, setNewEvent] = useState({
        time: '',
        description: '',
    });

    useEffect(() => {
        const savedEvents = localStorage.getItem('events');
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    }, []);

    const formatDate = (date) => date.format('YYYY-MM-DD');

    const handleDateChange = (e) => {
        setSelectedDate(dayjs(e.target.value));
    };

    const handleEventSubmit = (e) => {
        e.preventDefault();
        const dateKey = formatDate(selectedDate);

        const updatedEvents = {
            ...events,
            [dateKey]: [...(events[dateKey] || []), newEvent]
        };

        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setNewEvent({ time: '', description: '' });
    };

    const getCurrentDateEvents = () => {
        return events[formatDate(selectedDate)] || [];
    };

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-4">Event Scheduler</h2>

            <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-100px)]">
                {/* Left Side: 30% */}
                <div className="lg:w-[30%] w-full bg-white p-6 rounded-l-lg shadow-md border-r border-gray-300">
                    <h3 className="text-xl font-semibold mb-4 text-blue-700">Add Event</h3>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate.format('YYYY-MM-DD')}
                            onChange={handleDateChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <form onSubmit={handleEventSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Time</label>
                            <input
                                type="time"
                                value={newEvent.time}
                                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Description</label>
                            <textarea
                                placeholder="Event Description"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add Event
                        </button>
                    </form>
                </div>

                {/* Right Side: 70% */}
                <div className="lg:w-[70%] w-full bg-white p-6 rounded-r-lg shadow-md overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-4 text-green-700">
                        Events for {selectedDate.format('MMMM D, YYYY')}
                    </h3>

                    {getCurrentDateEvents().length === 0 ? (
                        <p className="text-gray-500 text-center italic">No events scheduled for this date.</p>
                    ) : (
                        <ul className="space-y-3">
                            {getCurrentDateEvents()
                                .sort((a, b) => a.time.localeCompare(b.time))
                                .map((event, index) => (
                                    <li key={index} className="flex items-center p-3 border rounded-lg bg-gray-50">
                                        <span className="font-semibold min-w-[80px] text-blue-800">{event.time}</span>
                                        <span className="ml-4 text-gray-700">{event.description}</span>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
