import React, { useContext, useEffect } from "react";

import BridgeContainer from "../components/BridgeContainer";
import Title from "../components/Title";

import { DataContext } from "../context/DataContext";

import response from "../constants/response";

export default function Bridge() {

    const { from, setFrom, to, setTo, token, setToken, amount, setAmount, expectedAmount, setExpectedAmount, data, setData, fees, setFees, protocol, setProtocol, contractInfo, setContractInfo, networks, setNetworks } = useContext(DataContext);

    useEffect(() => {
        const data = response;
        setData(data);
    }
    , []);

    useEffect(() => {
        if (protocol === '') {
            setExpectedAmount(amount);
            setFees(0);
        } else { 
            setExpectedAmount(amount * 0.99);
            setFees(amount * 0.01);
        }
    }
    , [amount, protocol]);

    return (
        <div className="bridge">
            <Title />
            <BridgeContainer />
        </div>
    )
}