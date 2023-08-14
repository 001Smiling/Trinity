// import './App.css';
import React, { useState, useEffect } from 'react';
import './Components/Style/Base.scss'
import {Routes, Route, Navigate} from "react-router-dom";
import StartPages from "./Components/StartPages/StartPages";
import LogIn from './Components/Elements/Log/Log';
import Table from './Components/Elements/Table/Table';
import RegistrationForm from './Components/Elements/RegistrationForm/RegistrationForm';

function App() {
  const [isLoggedIn, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user_login');
    setIsAuthenticated(isLoggedIn);
  }, []);
  const handleLogin = () => {
    localStorage.setItem('user_login', true);
    setIsAuthenticated(true);
  };
  
  return (
    <>
      <Routes>
      <Route extra path='/' element={isLoggedIn ? <Navigate to="/profile" /> : <StartPages />} />
      <Route
          path="/profile"
          element={isLoggedIn ? <StartPages replace={true}/> : <Navigate to="/login" replace={true}/>}
        />
      <Route
          path="/list"
          element={isLoggedIn ? <Table  replace={true} state={{ from: '/list' }}/> : <Navigate to="/login" replace={true}/>}
      />
<Route
        path="/login"
        element={isLoggedIn ? (<Navigate to="/list" replace={true} state={{ from: '/profile' }} />) : (<LogIn onLogin={handleLogin} />)}
      />
      <Route extra path='/register' element={<RegistrationForm />} />
      </Routes>
    </>
  );
}

export default App;






