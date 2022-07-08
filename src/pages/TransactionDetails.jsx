import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";

import txDetailsResponse from "../constants/txDetailsResponse";

export default function TransactionDetails() {
    const { networks, txDetails, setTxDetails } = useContext(DataContext);

    const { txHash } = useParams();
    
    useEffect(() => {
        const data = txDetailsResponse;
        setTxDetails(data);
    }
    , []);
    
    const formatDate = (date) => {
        const d = new Date(date * 1000);
        return d.toLocaleString();
    }

    const getExplorerUrl = (networkId, txHash) => {
        switch (networkId) {
            case "1":
                return `https://etherscan.io/${txHash}`;
            case "10":
                return `https://optimistic.etherscan.io/${txHash}`;
            case "25":
                return `https://cronoscan.com/${txHash}`;
            case "56":
                return `https://bscscan.com/${txHash}`;
            case "137":
                return `https://polygonscan.com/${txHash}`;
            case "288":
                return `https://blockexplorer.boba.network/${txHash}`;
            case "250":
                return `https://https://ftm.com/${txHash}`;
            case "1088":
                return `https://andromeda-explorer.metis.io/${txHash}`;
            case "1284":
                return `https://moonscan.io/${txHash}`;
            case "1285":
                return `https://moonriver.moonscan.io/${txHash}`;
            case "42161":
                return `https://arbiscan.io/${txHash}`;
            case "43114":
                return `https://snowtrace.io/${txHash}`;
            default:
                return "";
        }
    }


    return (
        <div key="tx-details" >
            <h3>Transaction Details</h3>
            {txDetails ?
                (
                    <div className="tx-info">
                        <div className="srcHash">
                            <p>Source Hash: </p>
                            <a href={getExplorerUrl(txDetails.srcChainId, "tx/" + txDetails.txid)} target="_blank">{txDetails.txid}</a>
                        </div>
                        <div className="destHash">
                            <p>Destination Hash: </p>
                            <a href={getExplorerUrl(txDetails.destChainId, "tx/" + txDetails.swaptx)} target="_blank">{txDetails.swaptx}</a>
                        </div>
                        <div className="srcChain">
                            <p>Source Chain: </p>
                            <p>{networks[txDetails.srcChainId]}</p>
                        </div>
                        <div className="destChain">
                            <p>Destination Chain: </p>
                            <p>{networks[txDetails.destChainId]}</p>
                        </div>
                        <div className="address">
                            <p>Address: </p>
                            <a href={getExplorerUrl(txDetails.srcChainId, "address/" + txDetails.from)} target="_blank">{txDetails.from}</a>
                        </div>
                        <div className="date">
                            <p>Date: </p>
                            <p>{formatDate(txDetails.timestamp)}</p>
                        </div>
                        <div className="coinType">
                            <p>Coin Type: </p>
                            <p>{txDetails.token}</p>
                        </div>
                        <div className="sendValue">
                            <p>Send Value: </p>
                            <p>{txDetails.formatvalue}</p>
                        </div>
                        <div className="receiveValue">
                            <p>Receive Value: </p>
                            <p>{txDetails.formatswapvalue}</p>
                        </div>
                        <div className="status">
                            <p>Status: </p>
                            <p>{txDetails.status}</p>
                        </div>
                        <div className="protocol">
                            <p>Protocol: </p>
                            <p>{txDetails.bridge}</p>
                        </div>
                    </div>
                ) : null}
        </div>
    )
}