import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

const Navbar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    // Set today's date on initial load
    setSelectedDate(dayjs());
  }, []);

  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    const newDate = dayjs(rawDate);
    setSelectedDate(newDate);
  };

  const goToPreviousDay = () => {
    setSelectedDate((prev) => prev.subtract(1, "day"));
  };

  const goToNextDay = () => {
    setSelectedDate((prev) => prev.add(1, "day"));
  };

return (
    <header className="bg-white border-b px-6 py-3 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left: Logo + Search + Date */}
            <div className="flex flex-1 items-center gap-40 flex-wrap">
                <Link to="/" className="text-4xl font-semibold text-blue-600">
                    MyCalendar
                </Link>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search events, tasks..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Date Picker + Prev/Next */}
                <div className="flex items-center gap-2 max-w-lg">
                    <button
                        onClick={goToPreviousDay}
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="Previous Day"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>

                    <input
                        type="date"
                        value={selectedDate.format("YYYY-MM-DD")}
                        onChange={handleDateChange}
                        className="border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <button
                        onClick={goToNextDay}
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="Next Day"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Right: Menu Items */}
            <nav className="flex gap-8 items-center text-lg text-gray-700">
                <Link to="/" className="hover:text-blue-600">Calendar</Link>
                <Link to="/events" className="hover:text-blue-600">Events</Link>
                <Link to="/tasks" className="hover:text-blue-600">Tasks</Link>
                <Link to="/login" className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Login</Link>
            </nav>
        </div>

        {/* Display Selected Date */}
        <div className="mt-2 text-right text-sm text-gray-500 pr-6">
            Selected:{" "}
            <span className="text-blue-600 font-medium">
                {selectedDate.format("dddd, MMMM D, YYYY")}
            </span>
        </div>
    </header>
);
};

export default Navbar;
