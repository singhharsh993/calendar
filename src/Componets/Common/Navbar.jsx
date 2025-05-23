import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
    return (
        <header className="bg-white border-b px-6 py-3 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Left: Logo + Search */}
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
                </div>

                {/* Right: Menu Items */}
                <nav className="flex gap-8 items-center text-lg text-gray-700">
                    <Link to="/" className="hover:text-blue-600">Calendar</Link>
                    <Link to="/events" className="hover:text-blue-600">Events</Link>
                    <Link to="/tasks" className="hover:text-blue-600">Tasks</Link>
                    <Link to="/login" className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Login</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
