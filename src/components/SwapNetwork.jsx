import React, { useContext } from "react";
import { ethers } from "ethers";
import { DataContext } from "../context/DataContext";

export default function SwapNetwork() {

    const { isConnected, from, setFrom, to, setTo } = useContext(DataContext);

    const onChainChange = async (e) => {
        if (isConnected) {
            const oldFrom = from;
            setFrom(e.target.value);
            console.log(e.target.value);
            const hexId = ethers.utils.hexValue(ethers.utils.hexlify(parseInt(e.target.value)));
            console.log(hexId);
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: hexId }]
            }).catch(error => {
                console.log(error);
                setFrom(oldFrom);
            }
            );
        } else {
            setFrom(e.target.value);
        }
    }

    const swapNetwork = async (from, to) => {
        if (isConnected) {
            const oldFrom = from;
            const oldTo = to;
            setFrom(to);
            setTo(from);
            const hexId = ethers.utils.hexValue(ethers.utils.hexlify(parseInt(to)));
            console.log(hexId);
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: hexId }]
            }).catch(error => {
                console.log(error);
                setFrom(oldFrom);
                setTo(oldTo);
            }
            );
        } else {
            setFrom(to);
            setTo(from);
        }
    }

    return (
        <button id="swap-network" onClick={() => swapNetwork(from, to)}>Swap</button>
    )

}