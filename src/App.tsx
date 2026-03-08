import './App.css'
import AddGame from './pages/AddGame'
import AddPlayers from './pages/AddPlayers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewGame from './pages/ViewGame'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddGame />} />
        <Route path="/add-players" element={<AddPlayers/>} />
        <Route path="/view-game" element={<ViewGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
