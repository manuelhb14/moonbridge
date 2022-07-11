import React, { useContext, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { ethers } from "ethers";

import { DataContext } from "../context/DataContext";

import erc20abi from "../constants/abis/erc20";

export default function AvailableTokens() {
    const { from, to, token, setToken, data, setProtocol, setIsApproved, setAmount, setContractAddress, setDecimals } = useContext(DataContext);

    const [tokens, setTokens] = useState([]);

    const onTokenChange = (e) => {
        setToken(e.value);
        setProtocol('');
        setIsApproved(false);
        setAmount('');
        setContractAddress('');
    }

    const getTokenBalance = async (tokenInfo) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        if (tokenInfo.SrcToken.ContractAddress) {
            const contract = new ethers.Contract(tokenInfo.SrcToken.ContractAddress, erc20abi, signer);
            await contract.balanceOf(signer.getAddress()).then((balance) => {
                return ethers.utils.formatUnits(balance, tokenInfo.SrcToken.Decimals);
            }
            ).catch(error => {
                console.log(error);
            }
            );
        } else {
            await signer.getBalance().then((balance) => {
                return ethers.utils.formatUnits(balance, 18);
            }
            ).catch(error => {
                console.log(error);
            }
            );
        }
    }

    useEffect(() => {
        if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
            setTokens(data.filter((item) => item.srcChainID === from)
                .filter((item, index, self) => self.findIndex(item2 => (item2.SrcToken.Symbol === item.SrcToken.Symbol)) === index)
                .map((item) => {
                    return {
                        value: item.SrcToken.Symbol,
                        label: `${item.SrcToken.Symbol} (${item.SrcToken.Name})`,
                        image: item.logoUrl,
                        // balance: getTokenBalance(item)
                    }
                }
                )
            );
            //console.log(tokens);
        } else {
            setTokens(data.filter((item) => item.srcChainID === to)
                .filter((item, index, self) => self.findIndex(item2 => (item2.DestToken.Symbol === item.DestToken.Symbol)) === index)
                .map((item) => {
                    return {
                        value: item.DestToken.Symbol,
                        label: `${item.DestToken.Symbol} (${item.DestToken.Name})`,
                        image: item.logoUrl,
                        // balance: getTokenBalance(item)
                    }
                }
                )
            );
            //console.log(tokens);
        }
    }
    , [from, token, data]);
    

    useEffect(() => {
        if (data) {
            let tokenDetails = '';
            if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
                tokenDetails = data.filter((item) => item.srcChainID === from && item.SrcToken.Symbol === token)[0];
            } else {
                tokenDetails = data.filter((item) => item.srcChainID === to && item.DestToken.Symbol === token)[0];
            }
            console.log(tokenDetails);
            if (token !== '' && tokenDetails) {
                if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
                    if (tokenDetails.SrcToken.ContractAddress) {
                        setContractAddress(tokenDetails.SrcToken.ContractAddress);
                        setDecimals(tokenDetails.SrcToken.Decimals);
                    } else {
                        setContractAddress("None");
                        setDecimals(18);
                    }
                } else {
                    if (tokenDetails.DestToken.ContractAddress) {
                        setContractAddress(tokenDetails.DestToken.ContractAddress);
                        setDecimals(tokenDetails.DestToken.Decimals);
                    } else {
                        setContractAddress("None");
                        setDecimals(18);
                    }
                }
            }
        }
    }
    , [from, to, token]);

    const customStyles = {
        container: () => ({
            flex: '0 0 50%',
            textAlign: 'right',
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid var(--lightblue)',
            color: state.isSelected ? 'white' : 'white',
            backgroundColor: state.isSelected ? 'var(--greyblue)' : 'var(--greyblue)',
            padding: '.5rem 1.25rem',
        }),
        menu: (provided, state) => ({
            ...provided,
            position: 'absolute',
            zIndex: '1',
            top: 'unset',
            width: 'inherit',
            backgroundColor: 'var(--greyblue)',
            border: '1px solid var(--lightblue)',
            color: 'var(--lightblue)',
            fontSize: '1rem',
            paddingTop: '0',
            marginTop: '.5rem',
        }),
        control: () => ({
            border: '0',
            padding: '0.1rem .15rem',
            display: 'flex',
            backgroundColor: 'var(--greyblue)',
            borderRadius: '0 5px 5px 0',
            color: 'red',

        }),
        singleValue: (provided, state) => {
            const color = 'white';
            const fontSize = '1rem';
        
            return { ...provided, color, fontSize };
        }
    }

    return (
        <Select
            options={tokens}
            onChange={onTokenChange}
            placeholder="Token"
            value={ tokens. find(item => item.value === token) ? tokens.find(item => item.value === token) : null }
            formatOptionLabel={(option) => (
                <div className="select-option">
                    <img src={option.image} alt="logo" />
                    <span>{option.label}</span>
                </div>
            )}
            styles={customStyles}
        />
    )
}
