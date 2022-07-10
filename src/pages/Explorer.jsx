import React, { useContext, useEffect } from "react";

import { DataContext } from "../context/DataContext";

import ExplorerContainer from "../components/ExplorerContainer";
import txResponse from "../constants/txResponse";
import Title from "../components/Title";
import SearchBar from "../components/Searchbar";

export default function Explorer() {

    const { txInfo, setTxInfo } = useContext(DataContext);

    useEffect(() => {
        const data = txResponse;
        setTxInfo(data);
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
                <div className="explorer-table-div"><ExplorerContainer /></div>
            </div>
        
        </main>
        
    )
}