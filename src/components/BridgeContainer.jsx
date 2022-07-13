import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataContext";
import { NavLink } from "react-router-dom";

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

    const { isConnected, setIsConnected, setAccount, from, to, token, amount, protocol, tokenInfo, setFrom, setTo, setToken, setAmount, setFees, setProtocol, setTokenInfo, isApproved, setIsApproved, contractAddress, decimals, setContractAddress, fees } = useContext(DataContext);

    const [buttonText, setButtonText] = useState("Connect");
    const [balance, setBalance] = useState(0);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            window.ethereum.autoRefreshOnNetworkChange = false;
            window.ethereum.on('chainChanged', onChainChange);
        }
    }, []);
    
    useEffect(() => {
        if (tokenInfo) {
            checkAllowance();
        }
    }
    , [tokenInfo]);

    useEffect(() => {
        checkStatus();
    }, [isConnected, from, to, token, amount, protocol, tokenInfo, isApproved]);

    useEffect(() => {
        if (token !== '' && contractAddress, decimals) {
            getTokenBalance();
        } else {
            setBalance(0);
        }
    }
    , [token, from, tokenInfo, contractAddress, decimals, isPending]);

    const checkAllowance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        if (protocol === 'Synapse') {
            let url = "";
            if (from === tokenInfo.srcChainID) {
                const contractInfo = tokenInfo.SrcToken.ContractInfo;
                if (contractInfo.BridgeApproval) {
                    console.log(contractInfo);
                    url = `${contractInfo.BridgeApproval.baseUrl}?fromChain=${contractInfo.BridgeApproval.params.fromChain}&fromToken=${contractInfo.BridgeApproval.params.fromToken.toUpperCase()}`;
                    console.log(url);
                } else {
                    setIsApproved(true);
                    return;
                }
            } else {
                const contractInfo = tokenInfo.DestToken.ContractInfo;
                console.log(contractInfo);
                url = `${contractInfo.BridgeApproval.baseUrl}?fromChain=${contractInfo.BridgeApproval.params.fromChain}&fromToken=${contractInfo.BridgeApproval.params.fromToken.toUpperCase()}`;
                console.log(url);
            }
            const response = await fetch(url).then((response) => {
                return response.json();
            }
            ).catch(error => {
                console.log(error);
            }
            );
            console.log(response);
            let contractAddress = "";
            console.log(tokenInfo);
            console.log(tokenInfo.srcChainID);
            if (await tokenInfo.srcChainID === from) {
                contractAddress = tokenInfo.SrcToken.ContractAddress;
                console.log('SrcToken contractAddress: ' + contractAddress);
            } else {
                contractAddress = tokenInfo.DestToken.ContractAddress;
                console.log('DestToken contractAddress: ' + contractAddress);
            }
            const bridgeContract = "0x" + response.unsigned_data.substring(34, 74);
            console.log('bridgeContract: ' + bridgeContract);
            const contract = new ethers.Contract(contractAddress, erc20abi, signer);
            const allowance = await contract.allowance(signer.getAddress(), bridgeContract);
            console.log(allowance);
            if (allowance > 0) {
                setIsApproved(true);
            } else {
                setIsApproved(false);
            }
        } else if (protocol === 'Multichain') {
            setIsApproved(true);
        }
    }
     
    const checkStatus = async () => {
        if (isConnected) {
            if (from !== '' && to !== '' && token !== '' && amount !== '' && protocol !== '') {
                if (isApproved && amount > 0) {
                    setButtonText("Swap");
                } else if (!isApproved) {
                    setButtonText("Approve " + token);
                }
            } else {
                setButtonText("Swap");
            }
        } else {
            setButtonText("Connect");
        }
    }

    const transfer = () => {
        setIsPending(true);
        if (from !== '' && to !== '' && token !== '' && amount !== '' && protocol !== '') {
            if (protocol === 'Multichain') {
                console.log('Multichain');
                transferMultichain();
            } else if (protocol === 'Synapse') {
                console.log('Synapse');
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
                const transferMultichain = toast.loading('Transfering...');
                await contract.transfer(ethers.utils.getAddress(tokenInfo.SrcToken.ContractInfo.DepositAddress), ethers.utils.parseUnits(amount, tokenInfo.SrcToken.Decimals)).then((tx) => {
                    setIsPending(false);
                    console.log(tx);
                    setIsPending(false);
                    console.log(tx);
                    listenForTxMined(tx.hash, provider).then((tx) => {
                        console.log(tx);
                        setIsPending(false);
                        toast.update(transferMultichain, {
                            render: <div>
                                <div>
                                    Transfer succesful.
                                </div>
                                <NavLink to={`/tx/${tx.transactionHash}`} className="t-lightblue"> View on explorer </NavLink> 
                                </div>,
                            type: "success",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    ).catch(error => {
                        setIsPending(false);
                        console.log(error);
                        toast.update(transferMultichain, {
                            render: <div> Error {error.message} </div>,
                            type: "error",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    );
                }
                ).catch(error => {
                    setIsPending(false);
                    console.log(error);
                    toast.update(transferMultichain, {
                        render: <div> Error {error.message} </div>,
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                    });
                }
                );
            } else {
                const tx = {
                    to: tokenInfo.SrcToken.ContractInfo.DepositAddress,
                    value: ethers.utils.parseUnits(amount, tokenInfo.SrcToken.Decimals)
                }
                const transferMultichain = toast.loading('Transfering...');
                await signer.sendTransaction(tx).then((tx) => {
                    setIsPending(true);
                    console.log(tx);
                    listenForTxMined(tx.hash, provider).then((tx) => {
                        console.log(tx);
                        setIsPending(false);
                        toast.update(transferMultichain, {
                            render: <div>
                                <div>
                                    Transfer succesful.
                                </div>
                                <NavLink to={`/tx/${tx.transactionHash}`} className="t-lightblue"> View on explorer </NavLink> 
                                </div>,
                            type: "success",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    ).catch(error => {
                        setIsPending(false);
                        console.log(error);
                        toast.update(transferMultichain, {
                            render: <div> Error {error.message} </div>,
                            type: "error",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    );
                }
                ).catch(error => {
                    setIsPending(false);
                    console.log(error);
                    toast.update(transferMultichain, {
                        render: <div> Error {error.message} </div>,
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                    });
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
            const transferMultichain = toast.loading('Transfering...');
            contract.Swapout(totalAmount, toAdress).then((tx) => {
                setIsPending(false);
                listenForTxMined(tx.hash, provider).then((tx) => {
                    console.log(tx);
                    setIsPending(false);
                    toast.update(transferMultichain, {
                        render: <div>
                            <div>
                                Transfer succesful.
                            </div>
                            <NavLink to={`/tx/${tx.transactionHash}`} className="t-lightblue"> View on explorer </NavLink> 
                            </div>,
                        type: "success",
                        isLoading: false,
                        autoClose: 5000
                    });
                }
                ).catch(error => {
                    setIsPending(false);
                    console.log(error);
                    toast.update(transferMultichain, {
                        render: <div> Error {error.message} </div>,
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                    });
                }
                );
                
            }
            ).catch(error => {
                setIsPending(false);
                console.log(error);
                toast.update(transferMultichain, {
                    render: <div> Error {error.message} </div>,
                    type: "error",
                    isLoading: false,
                    autoClose: 5000
                });
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
                    data: response.unsigned_data,
                    gasLimit: response.gasLimit
                }
                console.log(tx);
                const transferSynapse = toast.loading('Transfering...');
                await signer.sendTransaction(tx).then((tx) => {
                    setIsPending(true);
                    console.log(tx);
                    listenForTxMined(tx.hash, provider).then((tx) => {
                        console.log(tx);
                        setIsPending(false);
                        toast.update(transferSynapse, {
                            render: <div>
                                <div>
                                    Transfer succesful.
                                </div>
                                <NavLink to={`/tx/${tx.transactionHash}`} className="t-lightblue"> View on explorer </NavLink> 
                                </div>,
                            type: "success",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    ).catch(error => {
                        setIsPending(false);
                        console.log(error);
                        toast.update(transferSynapse, {
                            render: <div> Error {error.message} </div>,
                            type: "error",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    );                    
                }
                ).catch(error => {
                    setIsPending(false);
                    console.log(error);
                    toast.update(transferSynapse, {
                        render: <div> Error {error.message} </div>,
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                    });
                }
                ); 
            } else {
                const tx = {
                    to: response.to,
                    data: response.unsigned_data,
                    gasLimit: response.gasLimit
                }
                console.log(tx);
                const transferSynapse = toast.loading('Transfering...');
                await signer.sendTransaction(tx).then((tx) => {
                    setIsPending(true);
                    console.log(tx);
                    listenForTxMined(tx.hash, provider).then((tx) => {
                        console.log(tx);
                        setIsPending(false);
                        toast.update(transferSynapse, {
                            render: <div>
                                <div>
                                    Transfer succesful.
                                </div>
                                <NavLink to={`/tx/${tx.transactionHash}`} className="t-lightblue"> View on explorer </NavLink> 
                                </div>,
                            type: "success",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    ).catch(error => {
                        setIsPending(false);
                        console.log(error);
                        toast.update(transferSynapse, {
                            render: <div> Error {error.message} </div>,
                            type: "error",
                            isLoading: false,
                            autoClose: 5000
                        });
                    }
                    );
                }
                ).catch(error => {
                    setIsPending(false);
                    console.log(error);
                    toast.update(transferSynapse, {
                        render: <div> Error {error.message} </div>,
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                    });
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
                data: response.unsigned_data,
            }
            console.log(tx);
            const transferSynapse = toast.loading('Transfering...');
            // eslint-disable-next-line no-undef
            await signer.sendTransaction(tx).then((tx) => {
                setIsPending(true);
                console.log(tx);
                listenForTxMined(tx.hash, provider).then((tx) => {
                    console.log(tx);
                    setIsPending(false);
                    toast.update(transferSynapse, {
                        render: <div>
                            <div>
                                Transfer succesful.
                            </div>
                            <NavLink to={`/tx/${tx.transactionHash}`} className="t-lightblue"> View on explorer </NavLink> 
                            </div>,
                        type: "success",
                        isLoading: false,
                        autoClose: 5000
                    });
                }
                ).catch(error => {
                    setIsPending(false);
                    console.log(error);
                    toast.update(transferSynapse, {
                        render: <div> Error {error.message} </div>,
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                    });
                }
                );
            }
            ).catch(error => {
                setIsPending(false);
                console.log(error);
                toast.update(transferSynapse, {
                    render: <div> Error {error.message} </div>,
                    type: "error",
                    isLoading: false,
                    autoClose: 5000
                });
            }
            ); 
        }
    }

    const onChainChange = (chainId) => {
        // returns hex value of the chain
        const chain = parseInt(chainId, 16).toString();
        console.log(chain);
        if (chain !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
            setFrom(chain);
            setTo(process.env.REACT_APP_MOONBEAM_CHAIN_ID);

        } else {
            setFrom(chain);
        }
        setToken('');
        setAmount('');
        setFees(0);
        setProtocol('');
        setTokenInfo(null);
        setIsApproved(false);
        setContractAddress('');
    }

    const connect = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log('Connected to Ethereum');
                setIsConnected(true);
                let account = await window.ethereum.request({ method: "eth_accounts" });
                setAccount(account[0]);
                const currentChain = await window.ethereum.request({ method: "eth_chainId" });
                onChainChange(currentChain);
            } catch (error) {
                console.log('Error connecting to Ethereum');
            }
        } else {
            console.log('No Metamask detected');
        }
    }

    const approve = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let url = "";
        if (from === tokenInfo.srcChainID) {
            const contractInfo = tokenInfo.SrcToken.ContractInfo;
            console.log(contractInfo);
            url = `${contractInfo.BridgeApproval.baseUrl}?fromChain=${contractInfo.BridgeApproval.params.fromChain}&fromToken=${contractInfo.BridgeApproval.params.fromToken.toUpperCase()}`;
            console.log(url);
        } else {
            const contractInfo = tokenInfo.DestToken.ContractInfo;
            console.log(contractInfo);
            url = `${contractInfo.BridgeApproval.baseUrl}?fromChain=${contractInfo.BridgeApproval.params.fromChain}&fromToken=${contractInfo.BridgeApproval.params.fromToken.toUpperCase()}`;
            console.log(url);
        }
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
            data: response.unsigned_data,
        }
        console.log(tx);
        setIsPending(true);
        const id = toast.loading('Approving...');
        await signer.sendTransaction(tx).then((tx) => {
            listenForTxMined(tx.hash, provider).then((tx) => {
                console.log(tx);
                setIsApproved(true);
                setIsPending(false);
                toast.update(id, {
                    render: "Approved",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000
                });
            }
            ).catch(error => {
                console.log(error);
                setIsPending(false);
                toast.update(id, {
                    render: <div>Error {error.message}</div>,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                    
                });
            }
            );
        }
        ).catch(error => {
            console.log(error);
            setIsPending(false);
            toast.update(id, {
                render: <div>Error {error.message}</div>,
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        }
        );
    }

    const getTokenBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        if (contractAddress !== "None" && contractAddress) {
                const contract = new ethers.Contract(contractAddress, erc20abi, signer);
                await contract.balanceOf(signer.getAddress()).then((balance) => {
                    setBalance(ethers.utils.formatUnits(balance, decimals));
                    console.log(balance);
                }
                ).catch(error => {
                    console.log(error);
                }
                );
        } else if (contractAddress === "None") {
            console.log("No contract address");
            await signer.getBalance().then((balance) => {
                setBalance(ethers.utils.formatUnits(balance, 18));
                console.log(balance);
            }
            ).catch(error => {
                console.log(error);
            }
            );
        } else {
            setBalance("0");
        }
    }

    const setAmountOnClick = async () => {
        setAmount(balance);
    }

    const listenForTxMined = async (txHash, provider) => {
        return new Promise((resolve, reject) => {
            provider.once(txHash, (txReceipt) => {
                resolve(txReceipt);
            }
            );
        }
        );
    }

    return (
        <div className="bridge-container container">
            <div className="bridge-item with-dropdown">
                <span className="text">From</span><AvailableNetworks value="from" />
            </div>
            <div className="bridge-item with-dropdown-2">
                <small className="text" onClick={setAmountOnClick}><u>Max: {balance}</u></small>
                <br />
                <div className="input-textEselect">
                    <InputAmount /><AvailableTokens />
                </div>
            </div>
            <div className="bridge-item">
                <SwapNetwork />
            </div>
            <div className="bridge-item with-dropdown">
                <span className="text">To</span><AvailableNetworks value="to" />
            </div>
            <div className="bridge-item">
                <small className="text">(Estimated)</small>
                <br />
                <ExpectedAmount />
            </div>
            <div className="bridge-item with-dropdown">
                <span className="text">via Protocol</span><AvailableProtocols />
            </div>
            <div className="bridge-item">
            {isConnected ? (
                <div className="button">
                    {from !== '' && to !== '' && token !== '' && amount !== '' && protocol !== '' && amount > 0 && amount <= balance && amount > fees ? (
                        <div className="convert">
                            { isApproved ? (
                                <button id={ !isPending ? "transfer-btn" : "transfer-btn-disabled" } onClick={transfer}>{buttonText}</button>
                            ) : (
                                <button id={ !isPending ? "transfer-btn" : "transfer-btn-disabled" } onClick={approve}>{buttonText}</button>
                            ) 
                            }
                        </div>
                    ) : (      
                        <button id="transfer-btn" disabled>{buttonText}</button>
                    )}
                </div>
            ) : (
                <div className="button">
                    <button id="transfer-btn" onClick={connect}>{buttonText}</button>
                </div>
            )}
            </div>
            <div className="bridge-item fees">
                <Fees />
            </div>
        </div>
    )
}