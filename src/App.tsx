import './App.css'
import AddGame from './pages/AddGame'
import AddPlayers from './pages/AddPlayers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddGame />} />
        <Route path="/add-players" element={<AddPlayers/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
