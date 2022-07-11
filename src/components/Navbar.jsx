import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { NavLink, Router, Routes, Route } from "react-router-dom";

export default function Navbar() {

    const { isConnected, setIsConnected, account, setAccount, setToken, setAmount, setFees, setProtocol, setTokenInfo, setIsApproved, setFrom, setTo } = useContext(DataContext);

    const onChainChange = (chainId) => {
        // returns hex value of the chain
        const chain = parseInt(chainId, 16).toString();
        console.log(chain);
        if (chain !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
            setFrom(chain);
            setTo(process.env.REACT_APP_MOONBEAM_CHAIN_ID);

        } else {
            setFrom(chain);
            setTo("1");
        }
        setToken('');
        setAmount('');
        setFees(0);
        setProtocol('');
        setTokenInfo(null);
        setIsApproved(false);
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

    const nav = () => {
        var nav = document.getElementsByTagName("nav")[0];
        var toggler = document.getElementById("nav-toggler");
        if (toggler.classList.contains("open")) {
          nav.classList.remove("open");
          toggler.classList.remove("open");
        } else {
          nav.classList.add("open");
          toggler.classList.add("open");
        }
    }

    const closeNav = () => {
        var nav = document.getElementsByTagName("nav")[0];
        var toggler = document.getElementById("nav-toggler");
        nav.classList.remove("open");
        toggler.classList.remove("open");
    }

    return (
        <nav className="navbar">
            <NavLink to="/" className="logo">
                <img className="moonbeam-full" src="/assets/imgs/logos/moonbridge-full.png" alt="Moonbridge logo" />
            </NavLink>
            <div className="nav-items">
                <ul>
                    <li>
                        <NavLink to="/bridge" onClick={closeNav} className={({ isActive }) => ( isActive ? 'active' : 'inactive') } > Bridge < img className="icon" src="/assets/icons/arrow.svg" alt="arrow " />  </NavLink>
                    </li>
                    <li>
                        <NavLink to="/explorer" onClick={closeNav} className={({ isActive }) => ( isActive ? 'active' : 'inactive') } > Explorer < img className="icon" src="/assets/icons/arrow.svg" alt="arrow " /> </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={closeNav} className={({ isActive }) => ( isActive ? 'active' : 'inactive') } > Product </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={closeNav}> Docs </NavLink>
                    </li>
                </ul>
                <div className="account">
                    {isConnected ? (
                        <div className="account dropdown">
                            <button className="button-a"> {formatAddress(account)} < img className="icon" src="assets/icons/arrow.svg" alt="arrow " /></button>
                            <div className="dropdown-menu">
                                <a href="javascript:;" onClick={disconnect}>Disconnect</a>
                            </div>
                            {/* <button className="disconnect-btn" onClick={disconnect}>Disconnect</button> */}
                        </div>
                    ) : (
                        <div className="account">
                            <button className="button-a" onClick={connect}>Connect</button>
                        </div>
                    )
                    }
                </div>
                <a href="javascript:;" id="nav-toggler" onClick={nav}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </a>
            </div>
        </nav>
    );
}