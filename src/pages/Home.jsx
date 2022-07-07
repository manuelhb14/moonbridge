import React, { useContext, useEffect } from "react";

export default function Home() {

    return (
        <main>
            <div className="container">
                <div className="home">
                    <p className="ts-big-title">The ultimate Moonbeam bridge and explorer</p>
                    <p className="tertiary-text">Bridge multichain assets in the Moonbeam aggregator. Enter the explorer of transactions within the ecosystem.</p>
                    <div className="text-center home-button-container">
                        <a href="" className="button-b tertiary-text">Launch bridge</a>
                        <a href="" className="button-a tertiary-text">Explorer</a>
                    </div>
                </div>
            </div>
        </main>
    )
}