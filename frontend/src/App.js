import './App.css';

import React from 'react';
import { BrowserRouter } from "react-router-dom";

import NavBar from './NavBar';
import Routes from './Routes';
import ContextProvider from './ContextProvider';



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
