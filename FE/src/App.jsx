import React from 'react';
import './App.css'; 
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/DashBoard/Home';
import Expense from './pages/DashBoard/Expense';
import Income from './pages/DashBoard/Income';

const Root = () => {
  const isAuthenticated = localStorage.getItem('token')!==null;
  return <Navigate to={isAuthenticated ? "/home" : "/login"} />;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />  
          <Route path='/expense' exact element={<Expense />} />
          <Route path='/home' exact element={<Home />} />
          <Route path='/income' exact element={<Income />} />
        </Routes>
      </Router>
    </>
  )
}


export default App;
