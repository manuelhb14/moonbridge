import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function Navbar() {

    const { setIsConnected } = useContext(DataContext);

    const connect = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log('Connected to Ethereum');
                setIsConnected(true);
            } catch (error) {
                console.log('Error connecting to Ethereum');
            }
        } else {
            console.log('No Metamask detected');
        }
    }


    return (
        <div className="navbar">
            <img src="" alt="Moonbeam logo" />
            <a href=""> Bridge </a>
            <a href=""> Explorer </a>
            <a href=""> Products </a>
            <a href=""> Docs </a>
            <button onClick={connect}>Connect</button>
        </div>
    );
}