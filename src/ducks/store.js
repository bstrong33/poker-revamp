import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
// import { composeWithDevTools } from 'redux-devtools-extension'

const store = configureStore({ reducer: rootReducer })

export default store;

// export default configureStore(reducer, composeWithDevTools())