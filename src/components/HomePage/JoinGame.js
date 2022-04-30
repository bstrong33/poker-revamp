import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function JoinGame(props) {

    const [message, setMessage] = useState({
        message: ''
    })

    function buyInMessage() {
        setMessage({message: 'You must buy-in to join a game'})
    }

    return (
        <div>
            {props.initialMoney !== '' ?
                <Link to='/gameplay'>
                    <button>Join</button>
                </Link> :
                <div>
                    <button onClick={() => buyInMessage()}>Join</button>
                    <p>{message.message}</p>
                </div>
            }    
        </div>
    );
}

function mapStateToProps(state) {
    return {...state}
}

export default connect(mapStateToProps, {})(JoinGame);