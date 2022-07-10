import React, { useContext } from 'react';
import Select from 'react-select';
import { ethers } from "ethers";
import { DataContext } from '../context/DataContext';

import ethLogo from '../logos/eth.svg';
import avalancheLogo from '../logos/avalanche.svg';
import moonbeamLogo from '../logos/moonbeam.png';
import optimismLogo from '../logos/optimism.svg';
import polygonLogo from '../logos/polygon.svg';
import bscLogo from '../logos/bsc.svg';

export default function AvailableNetworks({value}) {

    const { isConnected, to, setTo, from, setFrom, setToken, setAmount, setFees, setProtocol, setTokenInfo, setIsApproved } = useContext(DataContext);

    const moonbeamChainID = process.env.REACT_APP_MOONBEAM_CHAIN_ID;

    const onFromChange = async (e) => {
        if (isConnected) {
            const oldFrom = from;
            setFrom(e.value);
            console.log(e.value);
            const hexId = ethers.utils.hexValue(ethers.utils.hexlify(parseInt(e.value)));
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
            setFrom(e.value);
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
            setTo(e.value);
        }
        setToken('');
        setAmount('');
        setFees(0);
        setProtocol('');
        setTokenInfo(null);
        setIsApproved(false);
    }

    const options = [
        { value: '1', label: "Ethereum", image: ethLogo },
        { value: '10', label: "Optimism", image: optimismLogo },
        { value: '25', label: "Cronos", image: ethLogo },
        { value: '56', label: "Binance Smart Chain", image: bscLogo },
        { value: '137', label: "Polygon", image: polygonLogo },
        { value: '250', label: "Fantom", image: ethLogo },
        { value: '288', label: "Boba", image: ethLogo },
        { value: '1088', label: "Metis", image: ethLogo },
        { value: '1285', label: "Moonriver", image: ethLogo },
        { value: '42161', label: "Arbitrum", image: ethLogo },
        { value: '43114', label: "Avalanche", image: avalancheLogo }
    ];

    const option = [
        { value: '1284', label: "Moonbeam", image: moonbeamLogo }
    ]

    const customStyles = {
    }

    return (
        <>
        { ( value === "from") ?
            <Select
                options={ from === moonbeamChainID ? option : options }
                onChange={onFromChange}
                value={ from === moonbeamChainID ? option.find(option => option.value === from) : options.find(option => option.value === from) }
                formatOptionLabel={(option) => (
                    <div className="select-option">
                        <img src={option.image} height="25px" width="25px" alt="logo" />
                        <span>{option.label}</span>
                    </div>
                )}
                styles={customStyles}
            />
            :
            <Select
                options={ to === moonbeamChainID ? option : options }
                onChange={onToChange}
                value={ to === moonbeamChainID ? option.find(option => option.value === to) : options.find(option => option.value === to) }
                formatOptionLabel={(option) => (
                    <div className="select-option">
                        <img src={option.image} height="25px" width="25px" alt="logo" />
                        <span>{option.label}</span>
                    </div>
                )}
                styles={customStyles}
            />
        }
        </>
    )
}