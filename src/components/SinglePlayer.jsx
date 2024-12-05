import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPlayerById, deletePlayer } from '../Api';

export default function SinglePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const data = await fetchPlayerById(id);
        setPlayer(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPlayer();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePlayer(id);
      alert('Player deleted!');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!player) return <p>Loading...</p>;

  return (
    <div>
      <h1>{player.name}</h1>
      <p>Breed: {player.breed}</p>
      <p>Team: {player.team?.name ?? 'Unassigned'}</p>
      <img src={player.imageUrl} alt={player.name} />
      <button onClick={handleDelete}>Delete Player</button>
    </div>
  );
}

