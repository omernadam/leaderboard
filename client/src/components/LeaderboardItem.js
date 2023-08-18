import React from 'react';

const LeaderboardItem = ({ player, onDeletePlayer }) => {
  const handleDeleteClick = () => {    
    onDeletePlayer(player.Name);
  };

  return (
    <li>
      {player.Name} - Score: {player.Score}
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
};

export default LeaderboardItem;
