// src/App.jsx

import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom'
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (

    <div className="flex flex-col min-h-screen w-full bg-gray-950 text-white antialiased">
      <Navbar />


      <main className="flex-grow">
        {/* The Routes component wraps all your page routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
