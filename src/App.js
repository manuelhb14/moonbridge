import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [from, setFrom] = useState("1");
  const [to, setTo] = useState("1284");
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [tokens, setTokens] = useState([]);
  const [networks, setNetworks] = useState({
    /* TODO: Get automatically from requests */
    1: 'Ethereum',
    56: 'Binance Smart Chain',
    10: 'Optimism',
    25: 'Cronos',
    137: 'Polygon',
    250: 'Fantom',
    288: 'Boba Network',
    1088: 'Metis',
    1284: 'Moonbeam',
    1285: 'Moonriver',
    42161: 'Arbitrum',
    43114: 'Avalanche',
    53935: 'DFK Chain',
    1313161554: 'Aurora',
    1666600000: 'Harmony'
  });

  useEffect(() => {
    getTokens(from, to);
  }
  , [from, to]);


  const getTokens = async (from, to) => {
    fetch(`https://syn-api-x.herokuapp.com/v1/get_network_swappable_tokens?fromChain=${from}&toChain=${to}`)
      .then(res => res.json())
      .then((json) => {
        setTokens(json);
      }
      )
      .catch(error => console.log(error));
  }
    
  const swapNetwork = async (from, to) => {
    setFrom(to);
    setTo(from);
  }


  return (
    <div className="App">
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

      <select name="token" id="token" onChange={(e) => setToken(e.target.value)}>
        <option value="">Token</option>
        {tokens.map(token => <option value={token.symbol}>{token.name}</option>)}
      </select>

      <input type="text" id="amount" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button id="convert">Convert</button>

    </div>
  );
}

export default App;
