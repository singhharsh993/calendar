import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import AddTask from "../AddTask.jsx/AddTask";

const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);

  const startOfMonth = currentDate.startOf("month");
  const startDayOfWeek = startOfMonth.day();
  const calendarStartDate = startOfMonth.subtract(startDayOfWeek, "day");

  const calendarDays = Array.from({ length: 35 }, (_, index) =>
    calendarStartDate.add(index, "day")
  );

  const isToday = (day) => {
    return day.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
  };

  const handleDayClick = (day) => {
    setSelectedDate(day.format('YYYY-MM-DD'));
    setIsAddTaskOpen(true);
  };

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  // Load tasks from localStorage on first render
  useEffect(() => {
    const storedTasks = localStorage.getItem("calendarTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("calendarTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ←
        </button>
        <div className="text-2xl font-semibold text-gray-800">
          {currentDate.format("MMMM YYYY")}
        </div>
        <button 
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-4 mb-4 text-sm font-semibold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 grid-rows-5 gap-4 h-[75vh]">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.month() === currentDate.month();
          const isTodayDate = isToday(day);
          const dayTasks = tasks.filter(task => task.date === day.format('YYYY-MM-DD'));

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`border p-3 rounded-lg
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                ${isTodayDate ? 'border-blue-500 border-2' : 'border-gray-200'}
                text-gray-800
                hover:bg-blue-50
                hover:border-blue-300
                hover:shadow-lg
                transform hover:scale-105
                transition-all duration-200
                cursor-pointer
                relative
                flex flex-col
              `}
            >
              <div className={`text-sm font-semibold
                ${isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}
                ${isTodayDate ? 'bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center' : ''}
              `}>
                {day.date()}
              </div>

              {/* Tasks for the day */}
              <div
                className="mt-2 space-y-1 task-scroll"
                style={{
                  maxHeight: "100px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE 10+
                }}
              >
                {dayTasks.map(task => (
                  <div 
                    key={task.id}
                    className="text-xs p-1 rounded"
                    style={{ backgroundColor: task.color }}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {isAddTaskOpen && (
        <AddTask
          selectedDate={selectedDate}
          onClose={() => setIsAddTaskOpen(false)}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
