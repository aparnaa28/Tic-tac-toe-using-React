import React from 'react';
import Board from './board';
//import { ReactComponent } from '*.svg';

export default class Game extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
         xIsNext: true,
         stepNumber:0,
        history: [
            {squares: Array(9).fill(null)}
        ]
        }
    }

    handleClick=(i)=>{
        const history=this.state.history
        const current=history[history.length-1]
        const squares=current.squares;

        const winner=calculateWinner(squares);
        if(winner || squares[i])
        {
            return;
        }

        squares[i]=this.state.xIsNext? 'X':'O'
        this.setState({
            history: history.concat({
               squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }
    
    render()
    {
        let status;
        const history=this.state.history;
        const current=history[this.state.stepNumber]
        const winner=calculateWinner(current.squares);

        if(winner)
        {
            status='Winner is ' + winner;
        }
        else
        {
            status= 'Next turn is of '+ (this.state.xIsNext? 'X': 'O');
        }
        return(

            <div className="game">
                <div className="game-board">
                <Board clickAction={(i)=> this.handleClick(i)} squares={current.squares} />
                </div>
            
             <div className="game-info">
                 <div className="status">{status}</div>
             </div>
             </div>
        )
    }

    
}

function calculateWinner (squares){
       
    const possibilitis=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ]

    for( let i=0;i<possibilitis.length;i++)
    {
       const [a,b,c]=possibilitis[i];
       if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c])
       {
           return squares[a];
       }
    }

    return null
}