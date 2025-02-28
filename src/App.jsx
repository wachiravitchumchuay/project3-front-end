import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import About from './pages/About';
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AppProvider>
  )
}

export default App
