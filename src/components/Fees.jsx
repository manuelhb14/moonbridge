/* global BigInt */
import React, { useContext, useEffect } from "react";

import { DataContext } from "../context/DataContext";

export default function Fees() {
    const { from, to, token, amount, setExpectedAmount, fees, setFees, protocol, tokenInfo  } = useContext(DataContext);

    useEffect(() => {
        if (protocol === '' && !isNaN(amount)) {
            console.log(1);
            setExpectedAmount(amount);
            setFees(0);
        } else if (protocol === 'Synapse' && !isNaN(amount) && tokenInfo && amount > 0) {
            if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
                console.log(2);
                let response = "";
                const SwapFee = tokenInfo.SrcToken.ContractInfo.SwapFee;
                if (SwapFee !== undefined) {
                    const url = `${SwapFee.baseUrl}/?fromChain=${SwapFee.fromChain}&toChain=${SwapFee.toChain}&fromToken=${SwapFee.fromToken.toUpperCase()}&toToken=${SwapFee.toToken.toUpperCase()}&amountFrom=${BigInt(amount * 10 ** tokenInfo.SrcToken.Decimals).toString()}`;
                    console.log(url);
                    fetch(url).then(res => res.json()).then(res => {
                        response = res;
                        setExpectedAmount(response.amountToReceive / 10 ** tokenInfo.SrcToken.Decimals);
                        setFees(response.bridgeFee / 10 ** tokenInfo.SrcToken.Decimals);
                    }
                    ).catch(err => {
                        console.log(err);
                    }
                    );
                }
            } else {
                console.log(3);
                console.log('here');
                let response = "";
                const SwapFee = tokenInfo.DestToken.ContractInfo.SwapFee;
                const url = `${SwapFee.baseUrl}/?fromChain=${SwapFee.fromChain}&toChain=${SwapFee.toChain}&fromToken=${SwapFee.fromToken.toUpperCase()}&toToken=${SwapFee.toToken.toUpperCase()}&amountFrom=${BigInt(amount * 10 ** tokenInfo.DestToken.Decimals).toString()}`;
                console.log(url);
                fetch(url).then(res => res.json()).then(res => {
                    response = res;
                    setExpectedAmount(response.amountToReceive / 10 ** tokenInfo.DestToken.Decimals);
                    setFees(response.bridgeFee / 10 ** tokenInfo.DestToken.Decimals);
                }
                ).catch(err => {
                    console.log(err);
                }
                );
            }
        } else if (protocol === 'Multichain' && !isNaN(amount) && tokenInfo && amount > 0) {
            if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
                console.log(4);
                setFees(amount * (1 * tokenInfo.SrcToken.ContractInfo.SwapFeeRate));
                setExpectedAmount(amount - fees);
            } else {
                console.log(5);
                setFees(amount * (1 * tokenInfo.DestToken.ContractInfo.SwapFeeRate));
                setExpectedAmount(amount - fees);
            }
        } else {
            console.log(6);
            setExpectedAmount(0);
            setFees(0);
        }
    }
    , [protocol, amount, token, from, to, tokenInfo]);

    return (
        <div className="fees">
            <p>Protocol fees: {fees}</p>
        </div>
    )
}
