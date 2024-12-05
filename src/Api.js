const API_URL = 'https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players';

export const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data.players;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const fetchPlayerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data.data.player;
  } catch (error) {
    console.error('Error fetching player:', error);
    throw error;
  }
};

export const createPlayer = async (playerData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerData),
    });
    const newPlayer = await response.json();
    return newPlayer.data.player;
  } catch (error) {
    console.error('Error creating player:', error);
    throw error;
  }
};

export const deletePlayer = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
};

