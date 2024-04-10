import React from 'react';
const formatJSON = (obj) => {
    return JSON.stringify(obj, null, 2);
};
const GameStats = ({ stats }) => {
    const data = {
        "GamesPlayed": stats.GamesPlayed,
        "Losses": stats.Losses,
        "Wins": stats.Wins
    };

    return (
        <pre className="bg-gray-100 p-4 rounded-md">
            <code>
                {formatJSON(data)}
            </code>
        </pre>
    );
};

export default GameStats;
