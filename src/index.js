import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css'
import './index.css';
import App from './App';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import Personal from './components/Personal/Personal';
import GamePlay from './components/GamePlay/GamePlay';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/gameplay' element={<GamePlay />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
