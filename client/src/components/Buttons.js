import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Buttons = ({ onAddPlayer }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerScore, setNewPlayerScore] = useState('');

  const handleNameChange = (event) => {
    setNewPlayerName(event.target.value);
  };

  const handleScoreChange = (event) => {
    setNewPlayerScore(event.target.value);
  };

  const handleAddClick = () => {
    onAddPlayer(newPlayerName, parseInt(newPlayerScore));
    setNewPlayerName('');
    setNewPlayerScore('');
  };

  return (
    <div>
      <TextField label="Name" value={newPlayerName} onChange={handleNameChange} />
      <TextField label="Score" type="number" value={newPlayerScore} onChange={handleScoreChange} />
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add New Player
      </Button>
    </div>
  );
};

export default Buttons;
