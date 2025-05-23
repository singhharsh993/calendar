import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from './Componets/Common/Navbar'
import Sidebar from './Componets/Common/Sidebar';
import Calendarpage from './pages/Calendarpage';
import SettingPage from './pages/settingPage';
import TaskList from './pages/TaskList';
import Dashboard from './pages/dashboard';
import EventPage from './pages/eventPage';
import LoginPage from './pages/loginPage';
import { useLocation } from 'react-router-dom';
const App = () => {
  const location = useLocation();
  
  const isLoginPage = location.pathname === '/login';
console.log(location.pathname, isLoginPage);

  return (
    <div>
      {!isLoginPage && <Navbar/>}
      <div className='flex'>
      {!isLoginPage && <Sidebar/>} 
      {/* <CalendarPage/> */}

      <Routes>
            <Route path='/' element={<Calendarpage />} />
            <Route path='/tasks' element={<TaskList />} />
            <Route path='/settings' element={<SettingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/events' element={<EventPage />} />
            <Route path='/login' element={<LoginPage />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
