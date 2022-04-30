import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Twoc from './CardImages/2c.png';
import Twod from './CardImages/2d.png';
import Twoh from './CardImages/2h.png';
import Twos from './CardImages/2s.png';
import Threec from './CardImages/3c.png';
import Threed from './CardImages/3d.png';
import Threeh from './CardImages/3h.png';
import Threes from './CardImages/3s.png';
import Fourc from './CardImages/4c.png';
import Fourd from './CardImages/4d.png';
import Fourh from './CardImages/4h.png';
import Fours from './CardImages/4s.png';
import Fivec from './CardImages/5c.png';
import Fived from './CardImages/5d.png';
import Fiveh from './CardImages/5h.png';
import Fives from './CardImages/5s.png';
import Sixc from './CardImages/6c.png';
import Sixd from './CardImages/6d.png';
import Sixh from './CardImages/6h.png';
import Sixs from './CardImages/6s.png';
import Sevenc from './CardImages/7c.png';
import Sevend from './CardImages/7d.png';
import Sevenh from './CardImages/7h.png';
import Sevens from './CardImages/7s.png';
import Eightc from './CardImages/8c.png';
import Eightd from './CardImages/8d.png';
import Eighth from './CardImages/8h.png';
import Eights from './CardImages/8s.png';
import Ninec from './CardImages/9c.png';
import Nined from './CardImages/9d.png';
import Nineh from './CardImages/9h.png';
import Nines from './CardImages/9s.png';
import Tenc from './CardImages/10c.png';
import Tend from './CardImages/10d.png';
import Tenh from './CardImages/10h.png';
import Tens from './CardImages/10s.png';
import Jackc from './CardImages/Jc.png';
import Jackd from './CardImages/Jd.png';
import Jackh from './CardImages/Jh.png';
import Jacks from './CardImages/Js.png';
import Queenc from './CardImages/Qc.png';
import Queend from './CardImages/Qd.png';
import Queenh from './CardImages/Qh.png';
import Queens from './CardImages/Qs.png';
import Kingc from './CardImages/Kc.png';
import Kingd from './CardImages/Kd.png';
import Kingh from './CardImages/Kh.png';
import Kings from './CardImages/Ks.png';
import Acec from './CardImages/Ac.png';
import Aced from './CardImages/Ad.png';
import Aceh from './CardImages/Ah.png';
import Aces from './CardImages/As.png';

function GamePlay(props) {

    const [state, setState] = useState({
        ready: false,
            player: [],
            otherPlayers: [],
            allPlayers: [],
            room: '',
            joined: false,
            joinPressed: false,
            numberOfPlayersReady: 0,
            allPlayersJoined: false,
            betAmount: 0,
            betAllowed: true,
            enoughMoney: true,
            betTurn: false,
            canCall: true,
            canCheck: false,
            flop: null,
            turn: null,
            river: null,
            winnerNames: null,
            potTotal: 75,
            cards: [{ image: Twoc, name: 'Twoc' }, { image: Twod, name: 'Twod' }, { image: Twoh, name: 'Twoh' }, { image: Twos, name: 'Twos' }, { image: Threec, name: 'Threec' }, { image: Threed, name: 'Threed' }, { image: Threeh, name: 'Threeh' }, { image: Threes, name: 'Threes' }, { image: Fourc, name: 'Fourc' }, { image: Fourd, name: 'Fourd' }, { image: Fourh, name: 'Fourh' }, { image: Fours, name: 'Fours' }, { image: Fivec, name: 'Fivec' }, { image: Fived, name: 'Fived' }, { image: Fiveh, name: 'Fiveh' }, { image: Fives, name: 'Fives' }, { image: Sixc, name: 'Sixc' }, { image: Sixd, name: 'Sixd' }, { image: Sixh, name: 'Sixh' }, { image: Sixs, name: 'Sixs' }, { image: Sevenc, name: 'Sevenc' }, { image: Sevend, name: 'Sevend' }, { image: Sevenh, name: 'Sevenh' }, { image: Sevens, name: 'Sevens' }, { image: Eightc, name: 'Eightc' }, { image: Eightd, name: 'Eightd' }, { image: Eighth, name: 'Eighth' }, { image: Eights, name: 'Eights' }, { image: Ninec, name: 'Ninec' }, { image: Nined, name: 'Nined' }, { image: Nineh, name: 'Nineh' }, { image: Nines, name: 'Nines' }, { image: Tenc, name: 'Tenc' }, { image: Tend, name: 'Tend' }, { image: Tenh, name: 'Tenh' }, { image: Tens, name: 'Tens' }, { image: Jackc, name: 'Jackc' }, { image: Jackd, name: 'Jackd' }, { image: Jackh, name: 'Jackh' }, { image: Jacks, name: 'Jacks' }, { image: Queenc, name: 'Queenc' }, { image: Queend, name: 'Queend' }, { image: Queenh, name: 'Queenh' }, { image: Queens, name: 'Queens' }, { image: Kingc, name: 'Kingc' }, { image: Kingd, name: 'Kingd' }, { image: Kingh, name: 'Kingh' }, { image: Kings, name: 'Kings' }, { image: Acec, name: 'Acec' }, { image: Aced, name: 'Aced' }, { image: Aceh, name: 'Aceh' }, { image: Aces, name: 'Aces' }]
    })

    useEffect(() => {
        let { username, id, initialMoney } = props;
        let startMoney = parseInt(initialMoney);
        let socket = io();
        socket.on('room joined', data => {
            joinSuccess(data)
        })
        socket.emit('join game', { username, id, startMoney })
        socket.on('dealt out', viewCards)
        socket.on('preflop betting', allowPreflopBetting)
        socket.on('no money left', noMoneyLeft)
        socket.on('flop', setFlop)
        socket.on('turn', setTurn)
        socket.on('river', setRiver)
        socket.on('winners', displayWinners)
    }, [])

    // Creating room
    function joinRoom () {
        setState(prevState => ({
            ...prevState,
            joinPressed: true
        }))
        if (state.room) {
            this.socket.emit('join room', {
                room: state.room
            })
        }
    }

    function joinSuccess (data) {
        setState(prevState => ({
            ...prevState,
            joined: true,
            numberOfPlayersReady: data
        }))
    }

    // Becoming ready to play so dealing can begin
    function readyToPlay() {
        setState(prevState => ({
            ...prevState,
            ready: true
        }))
        this.socket.emit('ready', { room: state.room })
    }

    // recieiving cards from server and setting state to be able to display these cards
    function viewCards(players) {
        let otherPlayers = []
        let { id } = props
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === id) {
                const updatedPlayerHand = []
                updatedPlayerHand.push(players[i])
                setState(prevState => ({
                    ...prevState,
                    player: updatedPlayerHand
                }))
            }
            else {
                otherPlayers.push(players[i])
            }
        }

        let reRun = 0

        let allPlayers = [...players]
        reArrangeOrder(allPlayers)

        function reArrangeOrder(allPlayers) {
            if (allPlayers[0].id !== id && reRun < 9) {
                let first = allPlayers.shift()
                allPlayers.push(first)
                reRun++;
                reArrangeOrder(allPlayers)
            }
        }

        setState(prevState => ({
            ...prevState,
            otherPlayers: otherPlayers,
            allPlayersJoined: true,
            joined: false,
            allPlayers: allPlayers
        }))
    }

    // Preflop Betting
    function allowPreflopBetting(data) {
        let { playersInHand, potTotal } = data
        let { id } = props
        let otherPlayers = []
        for (let i = 0; i < playersInHand.length; i++) {
            // if it is the players turn to bet (sent from server), then betTurn will be true which triggers a ternary in the render
            if (playersInHand[i].id === props.id && playersInHand[i].betTurn === true) {

                let playersToSort = [...playersInHand];
                let highestBet = playersToSort.sort((a, b) => {
                    return b.bet - a.bet
                })[0]

                // If players bet is already equal to the highest bet then they will have the option to check instead of call
                if (playersInHand[i].bet === highestBet.bet) {
                    setState(prevState => ({
                        ...prevState,
                        betTurn: true,
                        canCheck: true
                    }))
                } else {
                    setState(prevState => ({
                        ...prevState,
                        betTurn: true,
                        canCheck: false
                    }))
                }
            }

            // updates players and otherPlayers in state to reference for betting purposes
            if (playersInHand[i].id === props.id) {
                const updatedPlayerHand = []
                updatedPlayerHand.push(playersInHand[i])
                setState(prevState => ({
                    ...prevState,
                    player: updatedPlayerHand
                }))
            }
            else {
                otherPlayers.push(playersInHand[i])
            }
        }

        let reRun = 0

        let allPlayers = [...playersInHand]
        reArrangeOrder(allPlayers)

        function reArrangeOrder(allPlayers) {
            if (allPlayers[0].id !== id && reRun < 9) {
                let first = allPlayers.shift()
                allPlayers.push(first)
                reRun++
                reArrangeOrder(allPlayers)
            }
        }
        setState(prevState => ({
            ...prevState,
            otherPlayers: otherPlayers,
            potTotal: potTotal,
            allPlayers: allPlayers
        }))
    }

    // This function will fire if the player has no money in order to update the screen but bypass needing to have the player take a turn
    function noMoneyLeft(data) {
        let { playersInHand, potTotal } = data
        let { id } = props
        let otherPlayers = []

        for (let i = 0; i < playersInHand.length; i++) {
            // updates players and otherPlayers in state to reference for betting purposes
            if (playersInHand[i].id === props.id) {
                const updatedPlayerHand = []
                updatedPlayerHand.push(playersInHand[i])
                setState(prevState => ({
                    ...prevState,
                    player: updatedPlayerHand
                }))
            }
            else {
                otherPlayers.push(playersInHand[i])
            }
        }
        let allPlayers = [...playersInHand]
        reArrangeOrder(allPlayers)
        function reArrangeOrder(allPlayers) {
            if (allPlayers[0].id !== id) {
                let first = allPlayers.shift()
                allPlayers.push(first)
                reArrangeOrder(allPlayers)
            }
        }
        setState(prevState => ({
            ...prevState,
            otherPlayers: otherPlayers,
            potTotal: potTotal,
            allPlayers: allPlayers
        }))
        displayPreflopBetting();
    }

    function setPreflopBetting() {

        let playersToSort = [...state.otherPlayers];
        let highestBet = playersToSort.sort((a, b) => {
            return b.bet - a.bet
        })[0]

        let { betAmount } = state;

        // Spreading player from state so it can be edited
        let player = [...state.player];

        // checking if player has enough money to make a bet and setting logic for the edge cases when they can't follow the typical betting rules because of having too little money
        if (player[0].startMoney < 2 * highestBet.bet) {
            if (parseInt(betAmount) === player[0].startMoney) {
                let bettedAmount = parseInt(betAmount)
                player[0].bet += bettedAmount;
                player[0].startMoney -= bettedAmount
                player[0].betTurn = false

                setState(prevState => ({
                    ...prevState,
                    betTurn: false,
                    player,
                    betAllowed: true,
                    enoughMoney: true,
                    canCall: true
                }))
                displayPreflopBetting()
            } else {
                setState(prevState => ({
                    ...prevState,
                    enoughMoney: false, 
                    betAllowed: true, 
                    canCall: true
                }))
            }
        } else if (player[0].startMoney < 50) {
            if (betAmount !== 25) {
                setState(prevState => ({
                    ...prevState,
                    enoughMoney: false, 
                    betAllowed: true, 
                    canCall: true
                }))
            } else {
                let bettedAmount = parseInt(betAmount)
                player[0].bet += bettedAmount;
                player[0].startMoney -= bettedAmount
                player[0].betTurn = false

                setState(prevState => ({
                    ...prevState,
                    betTurn: false,
                    player,
                    betAllowed: true,
                    enoughMoney: true
                }))
                displayPreflopBetting()
            }
        }
        else {
            // check value of bet to ensure it is at least 50, is divisible by 25, and is double the highest bet on the board
            if (betAmount >= 50 && betAmount % 25 === 0 && betAmount / highestBet.bet >= 2) {
                // Check if player has enough money to make the delcared bet
                if (player[0].startMoney >= parseInt(betAmount)) {
                    // Adding the amount betted to the total bet
                    player[0].bet += parseInt(betAmount);

                    // Decreasing money by amount betted
                    let bettedAmount = parseInt(betAmount);
                    player[0].startMoney -= bettedAmount

                    // Changing status so it is no longer set to allow betting in the player object
                    player[0].betTurn = false

                    setState(prevState => ({
                        ...prevState,
                        betTurn: false,
                        player,
                        betAllowed: true,
                        enoughMoney: true
                    }))
                    displayPreflopBetting()
                } else {
                    setState(prevState => ({
                        ...prevState,
                        enoughMoney: false, 
                        betAllowed: true
                    }))
                }
            } else {
                setState(prevState => ({
                    ...prevState,
                    betAllowed: false,
                    enoughMoney: true
                }))
            }
        }
    }

    // Sending updated bet to server so it can be displayed to all players
    function displayPreflopBetting() {
        this.socket.emit('turn of preflop betting', {
            room: state.room, player: state.player
        })
    }

    function displayflopBetting() {
        this.socket.emit('flop betting', {
            room: state.room
        })
    }

    function displayTurnBetting() {
        this.socket.emit('turn betting', {
            room: state.room
        })
    }

    function displayRiverBetting() {
        this.socket.emit('river betting', {
            room: state.room
        })
    }

     // Call bet
    function callBet() {
        // Finds the highest current bet on the table
        let sortedOtherPlayers = [...this.state.otherPlayers]
        let highestBet = sortedOtherPlayers.sort((a, b) => {
            return b.bet - a.bet
        })[0]

        let player = [...this.state.player];
        let { bet } = player[0];

        if (player[0].startMoney + player[0].bet >= highestBet.bet) {
            // startMoney only changes by the amount being called while still displaying the total amount of money bet
            let callAmount = highestBet.bet - bet
            player[0].bet = highestBet.bet
            player[0].startMoney -= callAmount
            player[0].betTurn = false;

            setState(prevState => ({
                ...prevState,
                betTurn: false,
                player,
                betAllowed: true,
                enoughMoney: true
            }))
            displayPreflopBetting()
        } else {
            setState(prevState => ({
                ...prevState,
                canCall: false,
                betAllowed: true,
                enoughMoney: true
            }))
        }
    }

    // check
    function check() {
        let player = [...state.player]
        player[0].betTurn = false

        setState(prevState => ({
            ...prevState,
            betTurn: false,
            player,
            betAllowed: true,
            enoughMoney: true
        }))
        displayPreflopBetting()
    }

    // fold cards
    function fold() {
        let player = [...state.player];

        player[0].cards = [];
        player[0].betTurn = false;
        player[0].bet = 0;

        setState(prevState => ({
            ...prevState,
            betTurn: false,
            player,
            betAllowed: true,
            enoughMoney: true,
            canCall: true
        }))
        displayPreflopBetting()
    }

     // recieve flop (or turn or river) from server and set state to display the flop
    function setFlop(flop) {
        setState(prevState => ({
            ...prevState,
            flop: flop
        }))
        displayflopBetting()
    }

    function setTurn(turn) {
        setState(prevState => ({
            ...prevState,
            turn: turn
        }))
        displayTurnBetting()
    }

    function setRiver(river) {
        setState(prevState => ({
            ...prevState,
            river: river
        }))
        displayRiverBetting()
    }

    function displayWinners(data) {
        let { winnerNames, potTotal } = data
        console.log(winnerNames)
        setState(prevState => ({
            ...prevState,
            winnerNames: winnerNames,
            potTotal: potTotal
        }))
        viewingWinners();
    }

    function viewingWinners() {
        setTimeout(() => {
            setState(prevState => ({
                ...prevState,
                winnerNames: null,
                potTotal: 75,
                flop: null,
                turn: null,
                river: null,
                joined: false
            }))
            startNextHand();
        }, 30000)
    }

    function startNextHand() {
        console.log(state.player)
        if (state.player[0].pokerId === 2) {
            console.log('ran');
            this.socket.emit('start next hand', {
                room: state.room
            })
        }
    }

    function leaveGame() {
        let { initialMoney } = props
        let { player } = state

        let moneyMade = player[0].startMoney - initialMoney

        axios.put('/api/updateStats', {
            moneyMade,
            id: this.props.id
        })

        this.socket.emit('leave game', {
            room: state.room,
            id: props.id
        })
    }

    // Each player will be looped over and run through this function in order to display their cards
    function showCards(player) {
        let { cards } = state
        let cardOne = null
        let cardTwo = null
        for (let i = 0; i < cards.length; i++) {
            if (player.cards[1] === cards[i].name) {
                cardOne = <img src={cards[i].image} alt='player card 1' />
            }
            if (player.cards[3] === cards[i].name) {
                cardTwo = <img src={cards[i].image} alt='player card 2' />
            }
        }
        if (cardOne !== null && cardTwo !== null) {
            return (
                <div className='cards'>
                    {cardOne}
                    {cardTwo}
                </div>
            )
        }
    }

    let mappedPlayers = state.allPlayers.map((player, i) => {
        let cards = showCards(player)
        return (
            <div key='player.id'>
                {i === 0 ?
                    <div className={`seat${i}`}>
                        {cards}
                        <p>{player.username}: ${player.startMoney}</p>
                        {player.betTurn ? <div className='action'></div> : null}
                        <p>Bet: ${player.bet}</p>
                        {player.pokerId === 1 ? 
                        <div className='SB'>SB</div> :
                        player.pokerId === 2 ?
                        <div className='BB'>BB</div> :
                        player.pokerId === state.allPlayers.length ?
                        <div className='D'>D</div>: null}
                    </div> :
                    <div className={`seat${i}`}>
                        {state.winnerNames ?
                            <div>
                                {cards}
                            </div> :
                            player.cards.length !== 0 ?
                                <div className='cards'>
                                    <img src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-superior-classic-back-1_1024x1024.png?v=1530155531' alt='card back' />
                                    <img src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-superior-classic-back-1_1024x1024.png?v=1530155531' alt='card back' />
                                </div> : null}
                        <p>{player.username}: ${player.startMoney}</p>
                        {player.betTurn ? <div className='action'></div> : null}
                        <p>Bet: ${player.bet}</p>
                        {player.pokerId === 1 ? 
                        <div className='SB'>SB</div> :
                        player.pokerId === 2 ?
                        <div className='BB'>BB</div> :
                        player.pokerId === state.allPlayers.length ?
                        <div className='D'>D</div>: null}
                    </div>}
            </div>
        )
    })

    // When the flop is sent from the backend, this function will be fired to display the flop images
    function displayFlopImages(flop) {
        let { cards } = state
        let cardOne = null
        let cardTwo = null
        let cardThree = null
        for (let i = 0; i < cards.length; i++) {
            if (flop[0][1] === cards[i].name) {
                cardOne = <img src={cards[i].image} alt='player card 1' />
            }
            if (flop[0][3] === cards[i].name) {
                cardTwo = <img src={cards[i].image} alt='player card 2' />
            }
            if (flop[0][5] === cards[i].name) {
                cardThree = <img src={cards[i].image} alt='player card 3' />
            }
        }
        if (cardOne !== null && cardTwo !== null && cardThree !== null)
            return (
                <div className='flop'>
                    {cardOne}
                    {cardTwo}
                    {cardThree}
                </div>
            )
    }

    function displayTurnAndRiver(card) {
        let { cards } = state
        let cardOne = null
        for (let i = 0; i < cards.length; i++) {
            if (card[0][1] === cards[i].name) {
                cardOne = <img src={cards[i].image} alt='player card 1' />
            }
        }
        if (cardOne !== null) {
            return (
                <div className='turn'>
                    {cardOne}
                </div>
            )
        }
    }

    function handleInputs(event) {
        const {name, value}  = event.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <div className='whole-game-view'>
        <div className='poker-table'>
            {/* When a room has been joined the room name will display  */}
            {/* {this.state.joined ?
                <div className='players-joined'>
                    <h1> My Room: {this.state.room}</h1>
                    <h1> Number of Players Ready: {this.state.numberOfPlayersReady}</h1>
                </div> : null} */}

            {/* When a room has been joined then the player can ready up. After all players are ready, cards can be displayed */}
            {state.joinPressed === false ?
                <div className='join-room'>
                    <h3>Type the table name you would like to join</h3>
                    <input value={state.room} name="room" onChange={handleInputs} />
                    <button onClick={joinRoom}>Join</button>
                </div> :
                // Checks if all players including self has indicated they are ready to play
                state.ready === false ?
                    <div className='players-joined'>
                        <h1> My Room: {state.room}</h1>
                        <h1> Number of Players Ready: {state.numberOfPlayersReady}</h1>
                        <button onClick={() => readyToPlay()}>Ready</button>
                        <h1>Click Ready, only when all players are ready</h1>
                    </div> :
                    state.allPlayersJoined ?
                        // This is where gameplay is displayed
                        <div className='gameplay'>
                            {/* Displays pot total as it changes */}
                            <p className='pot'>Pot Total: ${state.potTotal}</p>
                            {/* Display the winner for everyone to see */}
                            {state.winnerNames ? <h1>Winner: {state.winnerNames}</h1> : null}
                            {mappedPlayers}
                            {/* PreFlop betting ternary, checks if it is players turn to bet and if they can check*/}
                            {state.betTurn && state.canCheck ?
                                <div className='bet-turn'>
                                    <button onClick={() => fold()}>Fold</button>
                                    <button onClick={() => check()}>Check</button>
                                    <input
                                        type='number'
                                        name='betAmount'
                                        value={state.betAmount}
                                        onChange={handleInputs} />
                                    <button onClick={() => setPreflopBetting()}>Bet</button>
                                    {/* Display messages for edge cases of not having enough money for certain actions */}
                                    {state.canCall ? null : <p>You do not have enough money to call. You will need to either fold or bet all of your money</p>}
                                    {state.enoughMoney ? null : <p>Sorry, this bet is not allowed</p>}
                                    {state.betAllowed ? null : <p>All bets must be at least 50, in increments of 25, and be at least double the last bet.</p>}
                                </div> :
                                // Checks if it is players turn to bet and if they cannot check
                                state.betTurn ?
                                    <div className='bet-turn'>
                                        <button onClick={() => fold()}>Fold</button>
                                        <button onClick={() => callBet()}>Call</button>
                                        <input
                                            type='number'
                                            name='betAmount'
                                            value={state.betAmount}
                                            onChange={handleInputs} />
                                        <button onClick={() => setPreflopBetting()}>Raise</button>
                                        {state.canCall ? null : <p className='rule-reminder'>You do not have enough money to call. You will need to either fold or bet all of your money</p>}
                                        {state.enoughMoney ? null : <p className='rule-reminder'>Sorry, this bet is not allowed</p>}
                                        {state.betAllowed ? null : <p className='rule-reminder'>All bets must be at least 50, in increments of 25, and be at least double the last bet.</p>}
                                    </div> : null}
                            {state.winnerNames && state.player[0].pokerId !== 2 ?
                                <div className='leave'>
                                    <h2>You may leave the game:</h2>
                                    <Link to='/homepage'>
                                        <button
                                            onClick={() => leaveGame()}
                                        >Leave</button>
                                    </Link>
                                </div>
                                : null}
                        </div> :
                        <p className='waiting'>Waiting on other players...</p>
            }
            <div className='board'>
                {state.allPlayersJoined ?
                <div className='deck'>
                    <img src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-superior-classic-back-1_1024x1024.png?v=1530155531' alt='card back' />
                </div> : null}
                {/* Display flop once it has been sent to the frontend */}
                {state.flop ?
                    <div className='flop-board'> {displayFlopImages(state.flop)} </div> : 
                    state.allPlayersJoined ?
                    <div className='flop-placeholder'></div> : null}
                {/* Display turn once it has been sent to the frontend */}
                {state.turn ?
                    <div className='turn-board'>{displayTurnAndRiver(state.turn)} </div> : 
                    state.allPlayersJoined ?
                    <div className='turn-placeholder'></div> : null}
                {/* Display river once it has been sent to the frontend */}
                {state.river ?
                    <div className='river'> {displayTurnAndRiver(state.river)} </div> : null}
            </div>
        </div>
        </div>
    );
}

function mapStateToProps(state) {
    return { ...state }
}

export default connect(mapStateToProps, {})(GamePlay);