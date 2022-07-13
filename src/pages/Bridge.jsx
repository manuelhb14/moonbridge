import React, { useContext, useEffect } from "react";
import { ethers } from "ethers";

import '../styles/Bridge.css';

import erc20abi from "../constants/abis/erc20";
import multichainabi from "../constants/abis/multichainabi";

import BridgeContainer from "../components/BridgeContainer";
import Title from "../components/Title";

import { DataContext } from "../context/DataContext";

import response from "../constants/response";

export default function Bridge() {

    const { from, to, token, amount, setExpectedAmount, data, setData, protocol, setTokenInfo } = useContext(DataContext);
   
    useEffect(() => {
        const data = response;
        setData(data);
    }
    , []);

    useEffect(() => {
        if (amount === '') {
            setExpectedAmount(0);
        }
    }
    , [amount]);

    useEffect(() => {
        if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
            setTokenInfo(data.filter((item) => item.srcChainID === from && item.SrcToken.Symbol === token && item.bridge === protocol)[0]);
        } else {
            setTokenInfo(data.filter((item) => item.srcChainID === to && item.DestToken.Symbol === token && item.bridge === protocol)[0]);
        }
    }
    , [from, to, token, protocol]);



    return (
        <main className="bridge-main">
            <section className="bridge container">
                <Title title="Moonbeam Token Bridge"/>
                <BridgeContainer />
            </section>
        </main>
        
    )
}