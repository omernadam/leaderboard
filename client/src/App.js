import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Buttons from './components/Buttons';

const App = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('http://localhost:3010/server/leaderboard');
      const data = await response.json();
      console.log(data);
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  const handleAddPlayer = async (name, score) => {
    const newPlayer = { name, score };

    try {
      const response = await fetch('http://localhost:3010/server/add-player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });

      if (response.ok) {
        await fetchLeaderboardData(); // Use await here to ensure data is fetched before proceeding
      } else {
        console.error('Failed to add player.');
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };


  const handleDeletePlayer = async (playerName) => {
    try {
      const response = await fetch(`http://localhost:3010/server/delete-player/${encodeURIComponent(playerName)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchLeaderboardData();
      } else {
        console.error('Failed to delete player.');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };


  return (
    <div>
      <Header />
      <Buttons onAddPlayer={handleAddPlayer} />
      <Leaderboard data={leaderboardData} onDeletePlayer={handleDeletePlayer} />
    </div>
  );
};

export default App;
