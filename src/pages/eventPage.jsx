import React from 'react'
import Events from '../Componets/Events/Events'  

const EventPage = () => {
  return (
    
    <div className="ml-5 mt-3 p-4 h-[calc(109vh-5rem)] w-full overflow-y-auto bg-gray-100">
      <div className="max-w-7xl mx-auto"> 
       <Events />
      </div>
    </div>
  )
}

export default EventPage
