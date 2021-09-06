import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Board extends React.Component{
    renderSquare(i){
        return (
            <Square value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
            />
        );
    }

    render(){
        return(
            <div>
                <div className="board-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                </div>
                <div className="board-row">
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                </div>
            </div>
        )
    }
}

class Square extends React.Component{
    render(){
        return(
            <button 
                className="square" 
                onClick={this.props.onClick}
            >
              {this.props.value}
            </button>
        )
    }
}

class Game extends React.Component {
    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber +1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history : history.concat([{
                squares : squares,
            }]),
            stepNumber: history.length,
            xIsNext : !this.state.xIsNext,
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext : (step & 2)===0,
        });
    }

    constructor(props){
        super(props);
        this.state = {
            history : [{
                squares : Array(16).fill(null),
            }],
            stepNumber:0,
            xIsNext:true,
        }
    }
    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;

        const moves = history.map((step,move)=>  {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>)
        })

        if(winner){
            status = 'Winner:' + winner;
        }
        else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return(
            <div className="game">
                <div className="game-board">
                    <Board squares = {current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <Game/>,
    document.getElementById('root')
)

function calculateWinner(squares){
    const lines = [
        [1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,16],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [4,8,12,16],
        [1,6,11,16],
        [4,7,10,13],
    ];    

    for(let i = 0; i < lines.length; i++){
        const [a,b,c,d] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d])
        {
            return squares[a];
        }
    }
    return null;
}