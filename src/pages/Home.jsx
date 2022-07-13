import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SupportedBlockchains from "../components/SupportedBlockchains";
import WhyMoonbridge from "../components/WhyMoonbridge";
import SupportedTokens from "../components/SupportedTokens";
import Footer from "../components/Footer";

export default function Home() {

    return (
        <div>
            <main>
            <div className="container">
                <div className="home">
                    <p className="ts-big-title">The ultimate Moonbeam bridge and explorer</p>
                    <p className="ts-tertiary t-white">Bridge multichain assets in the Moonbeam aggregator. Enter the explorer of transactions within the ecosystem.</p>
                    <div className="parent-button-container">
                        <div className="home-button-container">
                            <NavLink to="/bridge" className="button-b ts-tertiary t-center t-white">Launch bridge</NavLink>
                            <NavLink to="/explorer" className="button-a ts-tertiary t-center t-lightblue">Explorer</NavLink>
                        </div>
                    </div>
                </div>
                
                {/* <div className="container text-center">
                    <p className="ts-big-title">Pruebas de Texto</p>
                    <p className="ts-title">Moonbeam Token Bridge</p>
                    <p className="ts-subtitle">Transaction Details</p>
                    <p className="ts-tertiary t-white">Tertiary</p>
                    <p className="ts-main t-white">Sent: 12.00</p>
                </div> */}
            </div>
        </main>
        <SupportedBlockchains />
        <WhyMoonbridge />
        <SupportedTokens />
        <Footer />

        </div>
        
    )
}