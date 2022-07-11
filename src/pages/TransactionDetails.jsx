import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { DataContext } from "../context/DataContext";

export default function TransactionDetails() {
    const { networks, txDetails, setTxDetails } = useContext(DataContext);

    const { txHash } = useParams();

    useEffect(() => {
        const url = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-41813a12-6cd0-49c0-abb9-68838a3e1f30/default/explorertxndetails?hash=${txHash}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTxDetails(data);
            }
            )
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
        <main className="transaction-detail">
            <div className="top-detail-section">
                <div className="top-detail-subtitle">Transaction details </div>
                <br />
            </div>
            <div className="bottom-detail-section">
                <div key="tx-details" className="detail-table-div">
                    {txDetails ?
                        (
                            <div className="table-responsive bottom">
                                <table className="table info ts-main">
                                    <tbody>
                                        <tr>
                                            <td>Source Hash:</td>
                                            <td><a className="detail-a" href={getExplorerUrl(txDetails.srcChainId, "tx/" + txDetails.txid)} target="_blank">{txDetails.txid}</a></td>
                                        </tr>
                                        <tr>
                                            <td>Destination Hash:</td>
                                            <td> <a className="detail-a" href={getExplorerUrl(txDetails.destChainId, "tx/" + txDetails.swaptx)} target="_blank">{txDetails.swaptx}</a></td>
                                        </tr>
                                        <tr>
                                            <td>Source Chain:</td>
                                            <td> <span className="infodata">{networks[txDetails.srcChainId]}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Destination Chain:</td>
                                            <td><span className="infodata"> {networks[txDetails.destChainId]}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td> <a className="detail-a" href={getExplorerUrl(txDetails.srcChainId, "address/" + txDetails.from)} target="_blank">{txDetails.from}</a></td>
                                        </tr>
                                        <tr>
                                            <td>Date:</td>
                                            <td> <span className="infodata">{formatDate(txDetails.timestamp)}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Coin Type:</td>
                                            <td> <span className="infodata">{txDetails.token}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Send Value:</td>
                                            <td> <span className="infodata">{txDetails.formatvalue}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Receive Value:</td>
                                            <td><span className="infodata">{txDetails.formatswapvalue}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Status:</td>
                                            <td><span className="infodata">{txDetails.status}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Protocol:</td>
                                            <td><span className="infodata">{txDetails.bridge}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        ) : <Rings
                                height={100}
                                width={100}
                                color="#21BFDC"
                                ariaLabel="Loading"
                            />}
                </div>
            </div>
        </main>
    )

}