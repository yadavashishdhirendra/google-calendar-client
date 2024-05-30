import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.scss"
import Calendar from './Pages/Calendar'
import Success from './Pages/Success'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Calendar />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App
