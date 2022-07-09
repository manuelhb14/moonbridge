import React, { useContext } from 'react';
import { ethers } from "ethers";

import { DataContext } from '../context/DataContext';

export default function AvailableNetworks({value}) {

    const { isConnected, networks, to, setTo, from, setFrom, setToken, setAmount, setFees, setProtocol, setTokenInfo, setIsApproved } = useContext(DataContext);

    const moonbeamChainID = process.env.REACT_APP_MOONBEAM_CHAIN_ID;

    const onFromChange = async (e) => {
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
        setToken('');
        setAmount('');
        setFees(0);
        setProtocol('');
        setTokenInfo(null);
        setIsApproved(false);
    }

    const onToChange = async (e) => {
        if (isConnected) {
            setTo(e.target.value);
        }
        setToken('');
        setAmount('');
        setFees(0);
        setProtocol('');
        setTokenInfo(null);
        setIsApproved(false);
    }

    return (
        <>
        { ( value === "from") ?
            <select name="from" id="from" onChange={onFromChange} value={from}>
                {Object.keys(networks).map((key) => {
                    if (from !== moonbeamChainID && key !== moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    } else if (from === moonbeamChainID && key === moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    }
                }
                )}
            </select>
            :
            <select name="to" id="to" onChange={onToChange} value={to}>
                {Object.keys(networks).map((key) => {
                    if (to !== moonbeamChainID && key !== moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    } else if (to === moonbeamChainID && key === moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    }
                }
                )}
            </select>
        }
        </>
    )
}