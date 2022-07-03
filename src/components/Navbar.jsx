import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
// import React from "../../public/assets/imgs/logos"

export default function Navbar() {

    const { isConnected, setIsConnected, account, setAccount } = useContext(DataContext);

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

    const disconnect = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log('Disconnected from Ethereum');
                setIsConnected(false);
                setAccount('');
            } catch (error) {
                console.log('Error disconnecting from Ethereum');
            }
        } else {
            console.log('No Metamask detected');
        }
    }

    const formatAddress = (address) => {
        if (address.length === 42) {
            return address.substring(0, 4) + "..." + address.substring(38);
        } else {
            return address;
        }
    }

    return (
        <div className="navbar">
            <img src="assets/imgs/logos/moonbeam-full.png" alt="Moonbeam logo" />
            <a href=""> Bridge </a>
            <a href=""> Explorer </a>
            <a href=""> Products </a>
            <a href=""> Docs </a>
            {isConnected ? (
                <div className="account">
                    <button>Account: {formatAddress(account)}</button>
                    <button onClick={disconnect}>Disconnect</button>
                </div>
            ) : (
                <div className="account">
                    <button onClick={connect}>Connect</button>
                </div>
            )
            }
        </div>
    );
}