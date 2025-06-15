import Login from './Pages/login'
import Info from './Pages/info'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  )
}

export default App
