import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

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

    return (
        <DataContext.Provider value={{ from, setFrom, to, setTo, token, setToken, amount, setAmount, expectedAmount, setExpectedAmount, data, setData, fees, setFees, protocol, setProtocol, contractInfo, setContractInfo, networks, setNetworks }}>
            {children}
        </DataContext.Provider>
    );
}
