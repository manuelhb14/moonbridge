import React, { useContext, useEffect } from 'react';
import './App.css';

import response from './response';

import { DataContext } from './context/DataContext';

import Navbar from './components/Navbar';
import BridgeContainer from './components/BridgeContainer';

function App() {

    const { from, setFrom, to, setTo, token, setToken, amount, setAmount, expectedAmount, setExpectedAmount, data, setData, fees, setFees, protocol, setProtocol, contractInfo, setContractInfo, networks, setNetworks } = useContext(DataContext);

    useEffect(() => {
        const data = response;
        setData(data);
    }
    , []);

    useEffect(() => {
        if (protocol === '') {
            setExpectedAmount(amount);
        } else { 
            setExpectedAmount(amount * 0.99);
            setFees(amount * 0.01);
        }
    }
    , [amount, protocol]);
        
    return (
        <div className="App">
            <Navbar />
            <BridgeContainer />
        </div>
    );
}

export default App;
