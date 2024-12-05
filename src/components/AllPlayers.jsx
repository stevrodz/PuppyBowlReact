import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllPlayers } from '../Api';
import debounce from '../utils/debounce';


export default function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const playersData = await fetchAllPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error(error);
      }
    };
    getPlayers();
  }, []);

  

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = debounce((e) => setSearch(e.target.value), 300);

  return (
    <div>
      <h1>Puppy Bowl Players</h1>
      <input
        type="text"
        placeholder="Search for a player"
        onChange={handleSearch}
      />
      
      <div className="players-list">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="player-card">
            <h4>{player.name}</h4>
            <img src={player.imageUrl} alt={player.name} />
            <button onClick={() => navigate(`/players/${player.id}`)}>
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
