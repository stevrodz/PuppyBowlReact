import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPlayer } from '../Api'; // Ensure this function is correctly implemented in api.js

export default function NewPlayerForm({ onPlayerAdd }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder image
    const imageUrl = 'https://loremflickr.com/200/300/dog';

    const newPlayer = {
      name,
      breed,
      imageUrl,
    };

    try {
      setIsSubmitting(true);
      const createdPlayer = await createPlayer(newPlayer); // Make API call
      onPlayerAdd(createdPlayer); // Add player to the list
      setName(''); // Reset form fields
      setBreed('');
    } catch (error) {
      console.error('Error adding player:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Player</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Breed:
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Player...' : 'Add Player'}
        </button>
      </form>
    </div>
  );
}
NewPlayerForm.propTypes = {
    onPlayerAdd: PropTypes.func.isRequired, // Ensure the prop is validated
  };