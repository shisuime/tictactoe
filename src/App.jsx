import React, { useState } from 'react';
import Board from './components/board';
import History from './components/History';
import { calculateWinner } from './helpers';
import './styles/root.scss';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [currentmove, setCurrentmove] = useState(0);
  const current = history[currentmove];
  const winner = calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'X' : 'O'}`;

  const handlesquareclick = position => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory(prev => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentmove(prev => prev + 1);
  };
  const moveTo = move => {
    setCurrentmove(move);
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board board={current.board} handlesquareclick={handlesquareclick} />
      <History history={history} moveTo={moveTo} currentmove={currentmove} />
    </div>
  );
};

export default App;
