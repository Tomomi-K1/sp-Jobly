import './App.css';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';
import ContextProvider from './context/ContextProvider';


function App() {
  return (
    <div className='App'>
      <ContextProvider>
        <BrowserRouter>
          <NavBar />
          <div className='App-container'>
          <Routes />
          </div>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
