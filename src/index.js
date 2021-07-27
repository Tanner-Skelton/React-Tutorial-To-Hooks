import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Board } from "./components/Board.js";
import { calculateWinner } from "./utils/index.js";

export const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [status, setStatus] = useState("");

    const handleClick = (i) => {
        history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = xIsNext ? "X" : "O";
        setHistory(history.concat([
            {
            squares: squares,
            }
        ]));
        setStepNumber(history.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    };
    
    const current = history[stepNumber];
    const winner = typeof current.squares === "undefined" ? null : calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    useEffect(() => {
        if (winner) {
            setStatus('Winner: ' + winner);
        } else {
            setStatus('Next Player: ' + (xIsNext ? 'X' : 'O'));
        }
    }, [winner, xIsNext]);

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

ReactDOM.render(<Game/>, document.getElementById("root"));