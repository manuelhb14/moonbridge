import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "../context/DataContext";

import ExplorerContainer from "../components/ExplorerContainer";
import txResponse from "../constants/txResponse";
import Title from "../components/Title";
import SearchBar from "../components/Searchbar";


export default function Explorer() {

    const { txInfo, setTxInfo } = useContext(DataContext);
    const [price, setPrice] = useState(0);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch("https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-41813a12-6cd0-49c0-abb9-68838a3e1f30/default/explorerTxns")
            .then(res => res.json())
            .then(data => {
                data.sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                }
                );
                console.log(data);
                setTxInfo(data);
            }
        )
        fetch("https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-41813a12-6cd0-49c0-abb9-68838a3e1f30/default/stats")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStats(data);
            }
        )
        fetch("https://api.kraken.com/0/public/Ticker?pair=GLMRUSD")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPrice(data.result.GLMRUSD.c[0]);
            }
        )
    }
    , []);

    return (
        <main className="explorer">
            <div className="top-explorer-section">
                <Title title="Moonbeam Explorer"/>
                <div className="container-searchbar"> 
                <SearchBar/>
                </div>
            </div>
            <div className="bottom-explorer-section">
            <div class="cards-div">
            <div class="row cards">
            <div class="col-6 col-sm-3 card">
            <div class="row align-items-center">
                <div class="col-2 col-sm-2 "><img className="logo" src="assets/imgs/logos/moonbeam.png" ></img></div>
                <div class="col-10 col-sm-10 card-content"><span className="ts-sec"> GLMR PRICE </span><br/> <span className="ts-subtitle">${price}</span></div>
                </div>
            </div>
            <div class="col-6 col-sm-3 card">
                <div class="card-content"><span className="ts-sec"> Bridge Transactions </span><br/> <span className="ts-subtitle"> {stats.count}</span><span className="spancard ts-main"> / 365 days</span></div>
            </div>
         
            <div class="col-6 col-sm-3 card">
            <div class="card-content"><span className="ts-sec"> Volume </span><br/> <span className="ts-subtitle">{(stats.total / 1000000).toFixed(2)} M</span><span className="spancard ts-main"> / 365 days</span></div>
            </div>
            <div class="col-6 col-sm-3 card">
            <div class="card-content"><span className="ts-sec"> Av. Bridge Time </span><br/> <span className="ts-subtitle">{ stats.waitTime }</span><span className="spancard ts-main"> min</span></div>
            </div>
            </div>
            </div>
                <div className="explorer-table-div"><ExplorerContainer /></div>
            </div>
        
        </main>
        
    )
}