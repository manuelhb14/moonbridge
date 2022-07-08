import React, { useContext } from "react";
import { ethers } from "ethers";

import { DataContext } from "../context/DataContext";

import AvailableNetworks from "./AvailableNetworks";
import SwapNetwork from "./SwapNetwork";
import InputAmount from "./InputAmount";
import AvailableTokens from "./AvailableTokens";
import ExpectedAmount from "./ExpectedAmount";
import AvailableProtocols from "./AvailableProtocols";
import Fees from "./Fees";
import erc20abi from "../constants/abis/erc20";
import multichainabi from "../constants/abis/multichainabi";

export default function BridgeContainer() {

    const { isConnected, setIsConnected, setAccount, from, to, token, amount, protocol, tokenInfo } = useContext(DataContext);

    const transfer = () => {
        if (from !== '' && to !== '' && token !== '' && amount !== '' && protocol !== '') {
            if (protocol === 'Multichain') {
                console.log('Multichain');
                transferMultichain();
            } else if (protocol === 'Synapse') {
                transferSynapse();
            }
        } else {
            alert("Please fill in all fields");
        }
    }

    const transferMultichain = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        if (from === tokenInfo.srcChainID) {
            if (tokenInfo.SrcToken.ContractAddress) {
                const contract = new ethers.Contract(tokenInfo.SrcToken.ContractAddress, erc20abi, signer);
                await contract.transfer(ethers.utils.getAddress(tokenInfo.SrcToken.ContractInfo.DepositAddress), ethers.utils.parseEther(amount)).then((tx) => {
                    console.log(tx);
                }
                ).catch(error => {
                    console.log(error);
                }
                );
            } else {
                const tx = {
                    to: tokenInfo.SrcToken.ContractInfo.DepositAddress,
                    value: ethers.utils.parseUnits(amount, tokenInfo.SrcToken.Decimals)
                }
                await signer.sendTransaction(tx).then((tx) => {
                    console.log(tx);
                }
                ).catch(error => {
                    console.log(error);
                }
                );
            }
        } else {
            console.log(tokenInfo.DestToken.ContractAddress);
            const contract = new ethers.Contract(tokenInfo.DestToken.ContractAddress, multichainabi, signer);
            console.log(contract);
            const totalAmount = ethers.utils.parseUnits(amount, tokenInfo.DestToken.Decimals);
            console.log(totalAmount);
            const toAdress = signer.getAddress();
            contract.Swapout(totalAmount, toAdress).then((tx) => {
                console.log(tx);
            }
            ).catch(error => {
                console.log(error);
            }
            );
        }
    }

    const transferSynapse = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        if (from === tokenInfo.srcChainID) {
            const contractInfo = tokenInfo.SrcToken.ContractInfo;
            console.log(contractInfo);
            const addressTo = await signer.getAddress().then((address) => {
                return address;
            }).catch(error => {
                console.log(error);
            });
            const totalAmount = ethers.utils.parseUnits(amount, tokenInfo.SrcToken.Decimals);
            console.log(totalAmount);
            const url = `${contractInfo.BridgeTransaction.baseUrl}?fromChain=${contractInfo.BridgeTransaction.params.fromChain}&toChain=${contractInfo.BridgeTransaction.params.toChain}&fromToken=${contractInfo.BridgeTransaction.params.fromToken.toUpperCase()}&toToken=${contractInfo.BridgeTransaction.params.toToken.toUpperCase()}&amountFrom=${totalAmount}&addressTo=${addressTo}`;
            console.log(url);
            const response = await fetch(url).then((response) => {
                return response.json();
            }
            ).catch(error => {
                console.log(error);
            }
            );
            console.log(response);
            if (response.value) {
                const tx = {
                    to: response.to,
                    value: response.value,
                    data: response.data,
                    gasLimit: response.gasLimit
                }
                // eslint-disable-next-line no-undef
                await signer.sendTransaction(tx).then((tx) => {
                    console.log(tx);
                }
                ).catch(error => {
                    console.log(error);
                }
                ); 
            } else {
                const tx = {
                    to: response.to,
                    data: response.data,
                    gasLimit: response.gasLimit
                }
                // eslint-disable-next-line no-undef
                await signer.sendTransaction(tx).then((tx) => {
                    console.log(tx);
                }
                ).catch(error => {
                    console.log(error);
                }
                );
            }
        } else {
            const contractInfo = tokenInfo.DestToken.ContractInfo;
            console.log(contractInfo);
            const addressTo = await signer.getAddress().then((address) => {
                return address;
            }).catch(error => {
                console.log(error);
            });
            const totalAmount = ethers.utils.parseUnits(amount, tokenInfo.DestToken.Decimals);
            console.log(totalAmount);
            const url = `${contractInfo.BridgeTransaction.baseUrl}?fromChain=${contractInfo.BridgeTransaction.params.fromChain}&toChain=${contractInfo.BridgeTransaction.params.toChain}&fromToken=${contractInfo.BridgeTransaction.params.fromToken.toUpperCase()}&toToken=${contractInfo.BridgeTransaction.params.toToken.toUpperCase()}&amountFrom=${totalAmount}&addressTo=${addressTo}`;
            console.log(url);
            const response = await fetch(url).then((response) => {
                return response.json();
            }
            ).catch(error => {
                console.log(error);
            }
            );
            console.log(response);
            const tx = {
                to: response.to,
                value: response.value,
                data: response.data,
                gasLimit: response.gasLimit
            }
            // eslint-disable-next-line no-undef
            await signer.sendTransaction(tx).then((tx) => {
                console.log(tx);
            }
            ).catch(error => {
                console.log(error);
            }
            ); 
        }
    }


    const connect = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log('Connected to Ethereum');
                setIsConnected(true);
                let account = await window.ethereum.request({ method: "eth_accounts" });
                setAccount(account[0]);
            } catch (error) {
                console.log('Error connecting to Ethereum');
            }
        } else {
            console.log('No Metamask detected');
        }
    }

    return (
        <div className="bridge-container container">
            <div className="bridge-item">
                <span className="text">From</span><AvailableNetworks value="from" />
            </div>
            <div className="bridge-item text-right">
                <small className="text"><u>Max:</u></small>
                <br />
                <div className="input-textEselect">
                    <InputAmount /><AvailableTokens />
                </div>
            </div>
            <div className="bridge-item">
                <SwapNetwork />
            </div>
            <div className="bridge-item">
                <span className="text">To</span><AvailableNetworks value="to" />
            </div>
            <div className="bridge-item">
                <small className="text">(Estimated)</small>
                <br />
                <ExpectedAmount />
            </div>
            <div className="bridge-item">
                <span className="text">via Protocol</span><AvailableProtocols />
            </div>
            <div className="bridge-item">
            {isConnected ? (
                <div className="button">
                    {from !== '' && to !== '' && token !== '' && amount !== '' && protocol !== '' ? (
                        <button id="transfer-btn" onClick={transfer}>Convert</button>
                    ) : (
                        <button id="transfer-btn-disabled" disabled>Convert</button>
                    )}
                </div>
            ) : (
                <div className="button">
                    <button id="transfer-btn" onClick={connect}>Connect</button>
                </div>
            )}
            </div>
            <div className="bridge-item fees">
                <Fees />
            </div>
        </div>
    )
}