import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import useTicTacToe from '../hooks/use-tic-tac-toe';

const backendURL = 'http://192.168.10.6:5000'; 

const TicTacToe = () => {
  const { board, handleClick, resetGame, getStatusMessage } = useTicTacToe();
  const [players, setPlayers] = useState([]);  

  
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/players`);
        setPlayers(data);  
        console.log(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers(); 
  }, []); 

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
