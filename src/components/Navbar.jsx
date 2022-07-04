import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { NavLink, Router, Routes, Route } from "react-router-dom";

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
        <nav className="navbar">
            <NavLink to="/"><img src="assets/imgs/logos/moonbeam-full.png" alt="Moonbeam logo" /></NavLink>
            <ul>
                <li className="active">
                    <NavLink to="/bridge" className={({ isActive }) => ( isActive ? 'active' : 'inactive') } > Bridge </NavLink>
                </li>
                <li>
                    <NavLink to="/explorer" className={({ isActive }) => ( isActive ? 'active' : 'inactive') } > Explorer </NavLink>
                </li>
                <li>
                    <NavLink to="/" id="product-nav" className={({ isActive }) => ( isActive ? 'active' : 'inactive') } > Product </NavLink>
                </li>
                <li>
                    <a href="/"> Docs </a>
                </li>
                <li>
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
                </li>
            </ul>   
        </nav>
    );
}