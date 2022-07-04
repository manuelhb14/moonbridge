import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [from, setFrom] = useState("1");
    const [to, setTo] = useState(process.env.REACT_APP_MOONBEAM_CHAIN_ID);
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState('');
    const [expectedAmount, setExpectedAmount] = useState(0);
    const [data, setData] = useState([]);
    const [fees, setFees] = useState(0);
    const [protocol, setProtocol] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [tokenInfo, setTokenInfo] = useState(null);
    const [networks, setNetworks] = useState({
        // TODO: get from endpoint instead of hardcoded
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

    return (
        <DataContext.Provider value={{ from, setFrom, to, setTo, token, setToken, amount, setAmount, expectedAmount, setExpectedAmount, data, setData, fees, setFees, protocol, setProtocol, networks, setNetworks, isConnected, setIsConnected, account, setAccount, tokenInfo, setTokenInfo }}>
            {children}
        </DataContext.Provider>
    );
}
