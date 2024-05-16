import React from 'react';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import LoginForm from './components/login/loginform';
import RegisterForm from './components/registerform/register';
import Add from './components/adduser/Add';
import Get from './components/getuser/User';
import Update from './components/updateuser/Edit'

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LoginForm />} /> 
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/add" element={<Add />} />
        <Route path="/get" element={<Get />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
