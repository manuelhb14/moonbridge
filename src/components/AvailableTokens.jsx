import React, { useContext, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { ethers } from "ethers";

import { DataContext } from "../context/DataContext";

import erc20abi from "../constants/abis/erc20";

export default function AvailableTokens() {
    const { from, to, token, setToken, data, setProtocol, setIsApproved, setAmount } = useContext(DataContext);

    const [tokens, setTokens] = useState([]);

    const onTokenChange = (e) => {
        setToken(e.target.value);
        setProtocol('');
        setIsApproved(false);
        setAmount('');
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
            console.log(tokens);
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
            console.log(tokens);
        }
    }
    , [from, token, data]);
    

    const customStyles = {
    }

    return (
        <Select
            options={tokens}
            onChange={onTokenChange}
            value={token}
            placeholder="Token"
            formatOptionLabel={(option) => (
                <div className="select-option">
                    <img src={option.image} height="25px" width="25px" alt="logo" />
                    <span>{option.label}</span>
                    <span>{option.balance}</span>
                </div>
            )}
            styles={customStyles}
        />
    )
}