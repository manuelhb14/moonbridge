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
            if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
                setContractInfo(data.filter(item => item.bridge === protocol && item.symbol === token && item.srcChainID === from)[0].SrcToken.ContractInfo);
            } else {
                setContractInfo(data.filter(item => item.bridge === protocol && item.symbol === token && item.srcChainID === to)[0].DestToken.ContractInfo);
            }
        }
    }
    , [from, to, token, amount, protocol]);

    return (
        <div className="bridge">
            <Title />
            <BridgeContainer />
        </div>
    )
}