import React from "react";
import CalendarGrid from "../Componets/Calender/CalendarGrid";

const CalendarPage = () => {
  return (
    <div className="ml-5 mt-3 p-4 h-[calc(109vh-5rem)] w-full overflow-y-auto bg-gray-100">
      <div className="max-w-7xl mx-auto"> {/* Added container for width control */}
        <CalendarGrid />
      </div>
    </div>
  );
};

export default CalendarPage;