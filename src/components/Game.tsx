import React from 'react';
import Board from './Board'
import calculateWinner from '../composable/judge'

interface GameProps {}
interface GameState {
  history: Array<Object>,
  stepNumber: number,
  xIsNext: boolean
}

class Game extends React.Component<GameProps, GameState> {
  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: any = history[history.length - 1];
    const squares = current.squares.slice();

    // 勝者が決まっている or 既に埋まっている
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  constructor(props: GameState) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  render() {
    const history = this.state.history;
    const current: any = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((_: any, move: number) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game
