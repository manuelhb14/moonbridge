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
    0: "kardia",
    1: "ethereum",
    2: "expanse",
    8: "ubiq",
    10: "optimism",
    19: "songbird",
    20: "elastos",
    25: "cronos",
    30: "rsk",
    40: "telos",
    52: "csc",
    55: "zyx",
    56: "binance",
    57: "syscoin",
    60: "gochain",
    61: "ethclassic",
    66: "okexchain",
    70: "hoo",
    82: "meter",
    88: "tomochain",
    100: "xdai",
    106: "velas",
    108: "thundercore",
    122: "fuse",
    128: "heco",
    137: "polygon",
    200: "xdaiarb",
    246: "energyweb",
    250: "fantom",
    269: "hpb",
    288: "boba",
    321: "kucoin",
    336: "shiden",
    361: "theta",
    416: "sx",
    534: "candle",
    592: "astar",
    820: "callisto",
    888: "wanchain",
    1088: "metis",
    1284: "moonbeam",
    1285: "moonriver",
    2020: "ronin",
    2612: "ezchain",
    4181: "phi",
    4689: "iotex",
    5050: "xlc",
    5551: "nahmii",
    7777: "nmactest",
    8217: "klaytn",
    9001: "evmos",
    10000: "smartbch",
    103090: "crystaleum",
    32659: "fusion",
    42161: "arbitrum",
    42220: "celo",
    42262: "oasis",
    43114: "avalanche",
    71402: "godwoken",
    200625: "akroma",
    333999: "polis",
    1313161554: "aurora",
    1666600000: "harmony",
    11297108109: "palm",
    836542336838601: "curio",
  });

  useEffect(() => {
    getTokens(from, to);
  }
  , [from, to]);


  const getTokens = async (from, to) => {
    // fetch(`https://syn-api-x.herokuapp.com/v1/get_network_swappable_tokens?fromChain=${from}&toChain=${to}`)
    //   .then(res => res.json())
    //   .then((json) => {
    //     setTokens(json);
    //   }
    //   )
    //   .catch(error => console.log(error));
    // fetch(`https://bridgeapi.anyswap.exchange/v2/serverInfo/1284`)
    //   .then(res => res.json())
    //   .then((json) => {
    //     console.log(json);
    //   }
    //   )
    setTokens([['Synapse', '1', 'SYN', 'Synapse'], ['Synapse', '10', 'SYN', 'Synapse'], ['Synapse', '25', 'SYN', 'Synapse'], ['Synapse', '56', 'SYN', 'Synapse'], ['Synapse', '137', 'SYN', 'Synapse'], ['Synapse', '250', 'SYN', 'Synapse'], ['Synapse', '288', 'SYN', 'Synapse'], ['Synapse', '1088', 'SYN', 'Synapse'], ['Synapse', '1284', 'SYN', 'Synapse'], ['Synapse', '1285', 'SYN', 'Synapse'], ['Synapse', '42161', 'SYN', 'Synapse'], ['Synapse', '43114', 'SYN', 
    'Synapse'], ['Synapse', '1313161554', 'SYN', 'Synapse'], ['Synapse', '1666600000', 'SYN', 'Synapse'], ['Synapse', '1', 'UST', 'TerraUSD'], ['Synapse', '10', 'UST', 'TerraUSD'], ['Synapse', '25', 'UST', 'TerraUSD'], ['Synapse', '56', 'UST', 'TerraUSD'], ['Synapse', '137', 'UST', 'TerraUSD'], ['Synapse', '250', 'UST', 'TerraUSD'], ['Synapse', '288', 'UST', 'TerraUSD'], ['Synapse', '1088', 'UST', 'TerraUSD'], ['Synapse', '1284', 'UST', 'TerraUSD'], ['Synapse', '1285', 'UST', 'TerraUSD'], ['Synapse', '42161', 'UST', 'TerraUSD'], ['Synapse', '43114', 'UST', 'TerraUSD'], ['Synapse', '53935', 'UST', 'TerraUSD'], ['Synapse', '1313161554', 'UST', 'TerraUSD'], ['Synapse', '1666600000', 'UST', 'TerraUSD'], ['Synapse', '1', 'gOHM', 'Olympus DAO'], ['Synapse', '10', 'gOHM', 'Olympus DAO'], ['Synapse', '25', 'gOHM', 'Olympus DAO'], ['Synapse', '56', 'gOHM', 'Olympus DAO'], ['Synapse', '137', 'gOHM', 'Olympus DAO'], ['Synapse', '250', 'gOHM', 'Olympus DAO'], ['Synapse', '288', 'gOHM', 'Olympus DAO'], ['Synapse', '1088', 'gOHM', 'Olympus DAO'], ['Synapse', '1284', 'gOHM', 'Olympus DAO'], ['Synapse', '1285', 'gOHM', 'Olympus DAO'], ['Synapse', '42161', 'gOHM', 'Olympus DAO'], ['Synapse', '43114', 'gOHM', 'Olympus DAO'], ['Synapse', '1666600000', 'gOHM', 'Olympus DAO'], ['Synapse', '1284', 'veSOLAR', 'Vested SolarBeam'], ['Synapse', '1285', 'veSOLAR', 'Vested SolarBeam'], ['Synapse', '1285', 'MOVR', 'Moonriver'], ['Multichain', '1', 'AAVE', 'AaveToken'], ['Multichain', '1', 'CRV', 'CurveDAOToken'], ['Multichain', '1', 'DAI', 'DaiStablecoin'], ['Multichain', '1', 'ETH', 'Ethereum Coin'], ['Multichain', '1', 'SUSHI', 'SushiToken'], ['Multichain', '1', 'USDC', 'USDCoin'], ['Multichain', '1', 'USDT', 'TetherUSD'], ['Multichain', '1', 'WBTC', 'WrappedBTC'], ['Multichain', '56', 'BNB', 'Binance'], ['Multichain', '56', 'BUSD', 'BUSDToken'], ['Multichain', '137', 'MATIC', 'Matic'], ['Multichain', '43114', 'AVAX', 'Avalanche']]);
  }
    
  const swapNetwork = async (from, to) => {
    setFrom(to);
    setTo(from);
  }


  return (
    <div className="App">
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

      <select name="token" id="token" onChange={(e) => setToken(e.target.value)}>
        <option value="">Token</option>
        {tokens.map(token => <option value={token[2]}>{token[3]}</option>)}
      </select>

      <input type="text" id="amount" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button id="convert">Convert</button>

    </div>
  );
}

export default App;
