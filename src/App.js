import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';


import '../src/assets/styles/Root.css'
import '../src/assets/styles/Navbar.css';
import '../src/assets/styles/NavbarMenu.css';
import '../src/assets/styles/Footer.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
