import React, { useEffect, useState } from 'react';  // Add these imports
import axios from 'axios';  // Add Axios for API calls
import useTicTacToe from '../hooks/use-tic-tac-toe';  // Ensure to import your custom hook

const backendURL = 'http://192.168.10.6:5000';  // Replace with your actual backend IP

const TicTacToe = () => {
  const { board, handleClick, resetGame, getStatusMessage } = useTicTacToe();
  const [players, setPlayers] = useState([]);  // Add state to store player data

  // Use useEffect to fetch player data when the component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/players`);  // Fetch player data from backend
        setPlayers(data);  // Set fetched data to players state
        console.log(data);
      } catch (error) {
        console.error('Error fetching players:', error);  // Handle errors
      }
    };

    fetchPlayers();  // Call the fetch function
  }, []);  // Empty dependency array means this runs once on mount

  return (
    <div className="game">
      <h2 className="status">{getStatusMessage()}</h2>
      <div className="board">
        {board.map((cell, index) => (
          <button
            className={`cell ${cell ? cell.toLowerCase() : ''}`}
            key={index}
            onClick={() => handleClick(index)}
            disabled={cell !== null}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
      <div className="players-list">
        <h3>Players List:</h3>
        <ul>
          {players.map(player => (
            <li key={player._id}>{player.username}: Wins {player.wins} | Losses {player.losses} | Draws {player.draws}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicTacToe;
