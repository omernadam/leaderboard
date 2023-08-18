import React from 'react';
import LeaderboardItem from './LeaderboardItem';

const Leaderboard = ({ data, onDeletePlayer }) => {
  return (
    <ul>
      {data.map(player => (
        <LeaderboardItem key={player.Name} player={player} onDeletePlayer={onDeletePlayer} />
      ))}
    </ul>
  );
};

export default Leaderboard;
