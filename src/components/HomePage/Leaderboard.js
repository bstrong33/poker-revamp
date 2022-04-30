import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState({
        leaders: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    })

    useEffect(() => {
        axios.get('/api/leaderboard').then( res => {
            let currentLeaderboard = res.data
            currentLeaderboard.forEach((leader, i, arr) => {
                let newMoneyWon = parseInt(res.data[i].money_won.replace('$', '').replace(',', '').replace(',', ''))
                let gamesPlayed = parseInt(res.data[i].games_played)
                let moneyPerGame = newMoneyWon/gamesPlayed
                arr[i].money_per_game = moneyPerGame
            })
            setLeaderboard({
                leaders: currentLeaderboard
            })
        })
    }, [])

    return (
        // {mappedLeaderboard}
        <div className='grid'>
            {/* <h2>Leaderboard</h2> */}
            <span>Username:</span>
            <span>Games Played:</span>
            <span>Total Money Won:</span>
            <span>Money Won Per Game:</span>
            <span>{leaderboard.leaders[0].username}</span>
            <span>{leaderboard.leaders[0].games_played}</span>
            <span>{leaderboard.leaders[0].money_won}</span>
            <span>${leaderboard.leaders[0].money_per_game}</span>
            <span>{leaderboard.leaders[1].username}</span>
            <span>{leaderboard.leaders[1].games_played}</span>
            <span>{leaderboard.leaders[1].money_won}</span>
            <span>${leaderboard.leaders[1].money_per_game}</span>
            <span>{leaderboard.leaders[2].username}</span>
            <span>{leaderboard.leaders[2].games_played}</span>
            <span>{leaderboard.leaders[2].money_won}</span>
            <span>${leaderboard.leaders[2].money_per_game}</span>
            <span>{leaderboard.leaders[3].username}</span>
            <span>{leaderboard.leaders[3].games_played}</span>
            <span>{leaderboard.leaders[3].money_won}</span>
            <span>${leaderboard.leaders[3].money_per_game}</span>
            <span>{leaderboard.leaders[4].username}</span>
            <span>{leaderboard.leaders[4].games_played}</span>
            <span>{leaderboard.leaders[4].money_won}</span>
            <span>${leaderboard.leaders[4].money_per_game}</span>
            <span>{leaderboard.leaders[5].username}</span>
            <span>{leaderboard.leaders[5].games_played}</span>
            <span>{leaderboard.leaders[5].money_won}</span>
            <span>${leaderboard.leaders[5].money_per_game}</span>
            <span>{leaderboard.leaders[6].username}</span>
            <span>{leaderboard.leaders[6].games_played}</span>
            <span>{leaderboard.leaders[6].money_won}</span>
            <span>${leaderboard.leaders[6].money_per_game}</span>
            <span>{leaderboard.leaders[7].username}</span>
            <span>{leaderboard.leaders[7].games_played}</span>
            <span>{leaderboard.leaders[7].money_won}</span>
            <span>${leaderboard.leaders[7].money_per_game}</span>
            <span>{leaderboard.leaders[8].username}</span>
            <span>{leaderboard.leaders[8].games_played}</span>
            <span>{leaderboard.leaders[8].money_won}</span>
            <span>${leaderboard.leaders[8].money_per_game}</span>
            <span>{leaderboard.leaders[9].username}</span>
            <span>{leaderboard.leaders[9].games_played}</span>
            <span>{leaderboard.leaders[9].money_won}</span>
            <span>${leaderboard.leaders[9].money_per_game}</span>
        </div>
    );
}

export default Leaderboard;