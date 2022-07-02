import React, { useState, useEffect } from 'react';
import './App.css';
import response from './response';

function App() {

    const [from, setFrom] = useState("1");
    const [to, setTo] = useState("1284");
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState(0);
    const [expectedAmount, setExpectedAmount] = useState(0);
    const [data, setData] = useState([]);
    const [fees, setFees] = useState(0.99);
    const [protocol, setProtocol] = useState('');
    const [contractInfo, setContractInfo] = useState(null);
    const [networks, setNetworks] = useState({
        "288": "Boba",
        "1": "Ethereum",
        "1088": "Metis",
        "1284": "Moonbeam",
        "1285": "Moonriver",
        "137": "Polygon",
        "10": "Optimism",
        "43114": "Avalanche",
        "42161": "Arbitrum",
        "56": "Binance Smart Chain",
        "25": "Cronos",
        "250": "Fantom"
    });

    useEffect(() => {
        getTokens();
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
        


    const getTokens = async () => {
        const data = response;
        setData(data);
    }

    const swapNetwork = async (from, to) => {
        setFrom(to);
        setTo(from);
    }

    return (
        <div className="App">
            <div className="navbar">
                <img src="" alt="Moonbeam logo" />
                <a href=""> Bridge </a> 
                <a href=""> Explorer </a>
                <a href=""> Products </a>
                <a href=""> Docs </a>
                <button >Connect</button>
            </div>

            <div className="title">
                Moonbeam Bridge Aggregator
            </div>

            <div className="bridge-container">

                {/* create component */}
                <select name="from" id="from" onChange={(e) => setFrom(e.target.value)} value={from}>
                    {Object.keys(networks).map((key) => {
                        if (from !== "1284" && key !== "1284") {
                            return <option key={key} value={key}>{networks[key]}</option>
                        } else if (from === "1284" && key === "1284") {
                            return <option key={key} value={key}>{networks[key]}</option>
                        }
                    }
                    )}
                </select>

                <button onClick={() => swapNetwork(from, to)}>Swap</button>

                <select name="to" id="to" onChange={(e) => setTo(e.target.value)} value={to}>
                    {Object.keys(networks).map((key) => {
                        if (to !== "1284" && key !== "1284") {
                            return <option key={key} value={key}>{networks[key]}</option>
                        } else if (to === "1284" && key === "1284") {
                            return <option key={key} value={key}>{networks[key]}</option>
                        }
                    }
                    )}
                </select>

                <input type="text" id="amount" placeholder="0" onChange={(e) => setAmount(e.target.value)} value={amount} />

                <select name="token" id="token" onChange={(e) => setToken(e.target.value)}>
                    <option value="">Token</option>
                    {data.filter((item) => item.srcChainID === from || item.srcChainID === to)
                    .filter((item, index, self) => self.findIndex(item2 => (item2.symbol === item.symbol)) === index)
                    .map((item) => {
                            return <option key={item.symbol} value={item.symbol}>{item.name} ({item.symbol})</option>
                    }
                    )}
                </select>

                <input type="text" id="expectedAmount" value={expectedAmount} disabled />

                <select name="protocol" id="protocol" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
                    <option value="">Protocol</option>
                    {data.filter((item) => (item.srcChainID === from || item.srcChainID === to) && item.symbol === token)
                    // .filter((item, index, self) => self.findIndex(item2 => (item2.protocol === item.protocol)) === index)
                    .map((item) => {
                        return <option key={item.bridge} value={item.bridge}>{item.bridge} <span>{fees}</span></option>
                    }
                    )}
                </select>
                
                <button id="convert">Transfer</button>
            </div>

        </div>
    );
}

export default App;
