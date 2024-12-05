import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import SinglePlayer from './components/SinglePlayer';
import NewPlayerForm from './components/NewPlayerForm';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [players, setPlayers] = useState([]);
  const addNewPlayer = async (newPlayer) => {
    // Simulating a server response by adding an ID
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...newPlayer, id: Date.now() }); // Assign a temporary unique ID
      }, 500);
    });
  };

  // Function to handle adding a new player
  const onPlayerAdd = async (newPlayer) => {
    const addedPlayer = await addNewPlayer(newPlayer);
    setPlayers((prevPlayers) => [...prevPlayers, addedPlayer]);
  };
  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<AllPlayers />} />
            <Route path="/players/:id" element={<SinglePlayer />} />
            <Route path="/new-player" element={<NewPlayerForm onPlayerAdd={onPlayerAdd} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

