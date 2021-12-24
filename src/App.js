import React, {Component} from 'react';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      xIsNext: true,
      stepNumber: 0
    }
  }

  calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber].slice();

    if (this.calculateWinner(current) || current[i]) {
      return;
    }

    current[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([current]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    let status;
    const history = this.state.history;
    const current = history[this.state.stepNumber].slice();
    const winner = this.calculateWinner(current);
    const moves = history.map((data, step) => {
        const desc = step 
          ? 'Go to move #' + step 
          : 'Go to start';

          return (
            <li key={step}>
              <button onClick={() => this.jumpTo(step)}>{desc}</button>
            </li>
          );
    });
    
    if (winner) {
        status = 'Player ' + winner + ' win!';
    } else if (!current.includes(null)) {
        status = 'It is a draw!';
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    console.log(current);
    return (
      <div className="game">
          <div className='game-board'>
              <Board squares={current} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className='game-info'>
              <div>{status}</div>
              <ol>{moves}</ol>
          </div>
      </div>
    );
  }
}

export default App;