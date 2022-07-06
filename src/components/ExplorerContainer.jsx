import React, { useContext } from "react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { DataContext } from "../context/DataContext";

export default function ExplorerContainer() {
    const { txInfo, networks } = useContext(DataContext);

    const formatHash = (address) => {
        if (address.length === 66) {
            return address.substring(0, 5) + "..." + address.substring(61);
        } else {
            return address;
        }
    }

    const formatDate = (date) => {
        const d = new Date(date * 1000);
        return d.toLocaleString();
    }
    
    const getTimeAgo = (date) => {
        TimeAgo.addLocale(en)
        const timeAgo = new TimeAgo('en-US')
        const d = new Date(date * 1000);
        return timeAgo.format(d)
    }

    return (
            <div className="explorer">
                <table>
                    <tr>
                        <th>Transaction Hash</th>
                        <th>Coin Type</th>
                        <th>Value</th>
                        <th>Source Chain</th>
                        <th>Destination Chain</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Protocol</th>
                    </tr>
                    {txInfo ? txInfo.map((item) => {
                        return <tr key={item.txid}>
                            <td>{formatHash(item.txid)}</td>
                            <td>{item.token}</td>
                            <td>Sent: {item.formatvalue} <span> Received: {item.formatvalue}</span></td>
                            <td>{networks[item.srcChainId]}</td>
                            <td>{networks[item.destChainId]}</td>
                            <td>{formatDate(item.timestamp)} <span>{getTimeAgo(item.timestamp)}</span></td>
                            <td>{item.status}</td>
                            <td>{item.bridge}</td>
                        </tr>
                    }
                    ) : null}
                </table>
            </div>
    )
}
