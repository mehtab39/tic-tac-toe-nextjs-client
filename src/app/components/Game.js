

import { useCallback, useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance'; // Import your Axios instance
// pages/_app.js
import 'tailwindcss/tailwind.css';
import React from 'react';
import RTDServices from '../utils/RealtimeGameData/services';

function TicTacToe({ game, publish, player }) {
    const [winnerAnimation, setWinnerAnimation] = useState(false);

    const handleCellClick = (row, col) => {
        // disable if not current player invalid game state
        if (game['board'][row][col] !== '') {
            return;
        }
        publish({
            type: 'tileClick',
            player,
            row,
            col
        });
    };

    // Check for winner animation when game status changes
    useEffect(() => {
        if (game.status === 'FINISHED' && game.winner !== '') {
            setWinnerAnimation(true);
            setTimeout(() => {
                setWinnerAnimation(false);
            }, 2000); // Animation duration (2 seconds)
        }
    }, [game.status, game.winner]);

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-center text-2xl font-bold mb-4">Tic Tac Toe</h2>
            <h5 className="text-center text-lg font-bold mb-4">{game.status.toLowerCase()}</h5>
            {game.winner && <h5 className="text-center text-lg font-bold mb-4 text-green-500">Winner: {game.winner}</h5>}
            {game.winner === '' && game.status === 'FINISHED' && <h5 className="text-center text-lg font-bold mb-4 text-yellow-500">Draw!</h5>}

            <div className="grid grid-cols-3 gap-2">
                {game.board.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-full h-20 border border-gray-400 rounded-md flex justify-center items-center font-semibold text-4xl focus:outline-none ${winnerAnimation && game.winner === player && game.board[rowIndex][colIndex] === '' ? 'bg-green-200' : 'bg-gray-200'
                                }`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            disabled={cell !== ''}
                        >
                            {cell}
                        </button>
                    ))
                ))}
            </div>
        </div>
    );
}


function TicTacToeWrap({ game, user }) {
    const [realtimeGame, setRealtimeGame] = useState(game);
    const rtdInstanceRef = useRef(null);
    const gameId = game.id;

    useEffect(()=>{
        RTDServices.service.getInstance({ gameId }).then((instance)=> {
            if(!instance.rtd) return;
            rtdInstanceRef.current = instance;
            instance.subscribe.call(instance, ((msg)=>{
                if (msg.type === 'gameStateUpdate') {
                    setRealtimeGame(msg.gameState)
                } 
            }))
        })  
        return () => {
            if (rtdInstanceRef.current){
                rtdInstanceRef.current.unsubscribe();
                rtdInstanceRef.current = null;
            }
        }       
    }, [gameId])

    const publish = useCallback((message)=>{
        if (rtdInstanceRef.current){
            rtdInstanceRef.current.publish(message);
        }
    }, [])
    
    return (
        <div className="p-4 border border-gray-300 rounded">
            <p className="text-lg font-semibold">Game ID: {game.id}</p>
            <TicTacToe player={user.email} game={realtimeGame} publish={publish} />
        </div>
    );
}


function Game({ userInfo }) {

    const [game, setGame] = useState(null);
    const [gameId, setGameId] = useState('');

    async function handleCreateGame() {
        try {
            const response = await axiosInstance.post('game/create', { userId: userInfo.email });
            setGame(response.data.game);
        } catch (error) {
            console.error('Error creating game:', error);
        }
    }

    async function handleStartGame() {
        try {
            const response = await axiosInstance.post(`game/start/${game.id}`, { userId: userInfo.email });

            setGame(response.data.game);
        } catch (error) {
            console.error('Error starting game:', error);
        }
    }

    async function handleJoinGame(event) {
        event.preventDefault();
        if (!gameId.trim()) {
            return; // Do nothing if game ID is empty
        }
        try {
            const response = await axiosInstance.get(`game/${gameId}`);
            setGame(response.data);
        } catch (error) {
            console.error('Error joining game:', error);
        }
    }

    if (game === null) {
        return (
            <div className="max-w-md mx-auto p-4">
                <form onSubmit={handleJoinGame} className="mb-4">
                    <input
                        type="text"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value.trim())}
                        placeholder="Enter Game ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </form>
                <button onClick={handleCreateGame} className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Create Game
                </button>
            </div>
        );
    }

    if (!game.players.includes(userInfo.email)) {
        return (<button onClick={handleStartGame} className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Start Game
        </button>)
    }

    return <TicTacToeWrap game={game} user={userInfo} />;
}

export default Game;
