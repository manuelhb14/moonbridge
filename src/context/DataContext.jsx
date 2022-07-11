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
    const [txInfo, setTxInfo] = useState(null);
    const [txDetails, setTxDetails] = useState(null);
    const [isApproved, setIsApproved] = useState(false);
    const [contractAddress, setContractAddress] = useState('');
    const [decimals, setDecimals] = useState(0);
    const [networks, setNetworks] = useState({
        // TODO: get from endpoint instead of hardcoded
        "1": "Ethereum",
        "10": "Optimism",
        "25": "Cronos",
        "56": "Binance Smart Chain",
        "137": "Polygon",
        "288": "Boba",
        "250": "Fantom",
        "1088": "Metis",
        "1284": "Moonbeam",
        "1285": "Moonriver",
        "42161": "Arbitrum",
        "43114": "Avalanche"
    });

    return (
        <DataContext.Provider value={{ from, setFrom, to, setTo, token, setToken, amount, setAmount, expectedAmount, setExpectedAmount, data, setData, fees, setFees, protocol, setProtocol, networks, setNetworks, isConnected, setIsConnected, account, setAccount, tokenInfo, setTokenInfo, txInfo, setTxInfo, txDetails, setTxDetails, isApproved, setIsApproved, contractAddress, setContractAddress, decimals, setDecimals }}>
            {children}
        </DataContext.Provider>
    );
}
