import React, { useState } from 'react';
import Board from './components/Board'
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helpers';
import './styles/root.scss';

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentmove, setCurrentmove] = useState(0);
  const current = history[currentmove];
  const { winner, winningSquares } = calculateWinner(current.board);

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
  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentmove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handlesquareclick={handlesquareclick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        start new game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current game History</h2>
      <History history={history} moveTo={moveTo} currentmove={currentmove} />
      <div className="bg-balls" />
    </div>
  );
};

export default App;
