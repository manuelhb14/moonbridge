import React, { useContext, useEffect } from "react";

import { DataContext } from "../context/DataContext";

import ExplorerContainer from "../components/ExplorerContainer";
import txResponse from "../constants/txResponse";
import Title from "../components/Title";


export default function Explorer() {

    const { txInfo, setTxInfo } = useContext(DataContext);

    useEffect(() => {
        const data = txResponse;
        setTxInfo(data);
    }
    , []);

    return (
        <div className="explorer">
            <Title title="Moonbeam Explorer"/>
            <ExplorerContainer />
        </div>
    )
}