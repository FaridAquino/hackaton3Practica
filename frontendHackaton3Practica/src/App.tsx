import { useState } from 'react'
import Login from './Pages/Login'
import Info from './Pages/Info'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  )
}

export default App
