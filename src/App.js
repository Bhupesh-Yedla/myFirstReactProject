import React, { useState, useEffect } from 'react';
import Login from './pages/login.js';
import { BrowserRouter as Router, Switch, Route, Redirect, Routes } from 'react-router-dom';
import LoginSuccess from './pages/login-success.js';
import SignUp from './pages/signup.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Enterscore from './pages/Enterscore.js';

function App() {
  const LOCAL_STORAGE_KEY = "details";
  const [details, setDetails] = useState([]);

  const detailsHandler = (user) => {
    console.log(user);
    setDetails([...details, details]);
  };

  useEffect(() => {
    const retrieveDetails = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (retrieveDetails) setDetails([retrieveDetails]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(details));
  }, [details]);

  return (
    <div>
      <ToastContainer />
      <Router>
        {/* <UserList details={details} /> */}
        <Routes>
          <Route path="/" element={<Login detailsHandler={detailsHandler}/>} />
          <Route path="/welcome" element={<LoginSuccess />} />
          <Route path="/signup" element={<SignUp detailsHandler={detailsHandler}/>} />
          <Route path="/enterscore" element={<Enterscore/>}/>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
 