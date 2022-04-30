import React, { useState } from 'react';
import { connect } from 'react-redux'
import { updateInitialMoney } from './../../ducks/reducer';

function AddMoney(props) {

    const [buyingIn, setBuyingIn] = useState({
        input: '',
        buyIn: 0
    })

    function buyIn() {
        if (buyingIn.input >= 500 && buyingIn.input <= 2000 && buyingIn.input % 50 === 0) {
            setBuyingIn(prevState => ({
                ...prevState,
                buyIn: buyingIn.input
            }))
            props.updateInitialMoney(buyingIn.input)
        }
    }

    function handleChange(event) {
        const {name, value}  = event.target
        setBuyingIn(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className='inner-money-div'>
            <h2>Buy-in Amount</h2>
            <p>Must be between $500-$2000</p>
            <p>Must be in increments of $50</p>
            <input
                type='number'
                name='input'
                value={buyingIn.input}
                onChange={handleChange}
            />
            <button onClick={buyIn}>Buy-in</button>
            <p>{`You will be buying in for $${buyingIn.buyIn}`}</p>
        </div>
    );
}

function mapStateToProps(state) {
    return {...state}
}

export default connect(mapStateToProps, {updateInitialMoney})(AddMoney)