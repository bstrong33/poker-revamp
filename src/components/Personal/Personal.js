import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Personal(props) {

    const [personalInfo, setPersonalInfo] = useState({
        canDelete: false,
        stats: [0],
        moneyPerGame: 0
    })

    useEffect(() => {
        let { id } = props;
        axios.get(`/api/personal/${id}`).then(res => {
            if (res.data[0].money_won[0] === '-') {
                let newMoneyWon = 0 - parseInt(res.data[0].money_won.replace('-$', '').replace(',', '').replace(',', ''))
                let gamesPlayed = parseInt(res.data[0].games_played)
                let moneyPerGame = newMoneyWon / gamesPlayed
                setPersonalInfo(prevState => ({
                    ...prevState,
                    stats: res.data,
                    moneyPerGame: moneyPerGame
                }))
            } else {
                let newMoneyWon = parseInt(res.data[0].money_won.replace('$', '').replace(',', '').replace(',', ''))
                let gamesPlayed = parseInt(res.data[0].games_played)
                let moneyPerGame = newMoneyWon / gamesPlayed
                if (gamesPlayed === 0) {
                    moneyPerGame = 0
                }
                setPersonalInfo(prevState => ({
                    ...prevState,
                    stats: res.data,
                    moneyPerGame: moneyPerGame
                }))
            }
        })
    })

    function deleteAccount(id) {
        if (personalInfo.canDelete === true) {
            axios.delete(`/api/delete/${id}`)
        } else {
            setPersonalInfo(prevState => ({
                ...prevState,
                canDelete: true
            }))
        }
    }

    let { stats, moneyPerGame } = personalInfo;

    return (
        <div className='personal-background'>
            <div className='pstats'>
                <h2>Your Stats</h2>
                <div className='pgrid'>
                    <span>Username:</span>
                    <span>Games Played:</span>
                    <span>Total Money Won:</span>
                    <span>Money Won Per Game:</span>
                    <span>{stats[0].username}</span>
                    <span>{stats[0].games_played}</span>
                    <span>{stats[0].money_won}</span>
                    <span>${parseInt(moneyPerGame)}</span>
                </div>
            </div>
            <div className='back-and-delete'>
                <div className='back-to-homepage'>
                    <h4>Back to Homepage</h4>
                    <Link to='/homepage'>
                        <button>Homepage</button>
                    </Link>
                </div>
                <div className='delete'>
                {
                    personalInfo.canDelete ?
                        <div className='delete-inside'>
                            <h4>Delete Account</h4>
                            <Link to='/'>
                                <button onClick={() => deleteAccount(props.id)}>Delete</button>
                            </Link>
                            <p>Careful, deleting an account is permanent!</p>
                        </div> :
                        <div className='delete-inside'>
                        <h4>Delete Account</h4>
                        <button onClick={() => deleteAccount()}>Delete</button>
                        </div>
                }
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return { ...state }
}

export default connect(mapStateToProps, {})(Personal);