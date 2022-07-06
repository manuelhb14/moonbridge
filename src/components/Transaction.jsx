import React, { useContext } from "react";

import { DataContext } from "../context/DataContext";

export default function Transaction(item) {

    const { txInfo, networks } = useContext(DataContext);

    const formatHash = (hash) => {
        if (hash.length === 66) {
            return hash.substring(0, 4) + "..." + hash.substring(62);
        } else {
            return hash;
        }
    }

    const formatDate = (date) => {
        const d = new Date(date * 1000);
        return d.toLocaleString();
    }
    

    return (
        <tr key={item.txid}>
            <td>{formatHash(item.txid)}</td>
            <td>{item.token}</td>
            <td>Sent: {item.formatvalue} <span> Received: {item.formatvalue}</span></td>
            <td>{networks[item.srcChainId]}</td>
            <td>{networks[item.destChainId]}</td>
            <td>{formatDate(item.timestamp)}</td>
            <td>{item.status}</td>
            <td>{item.bridge}</td>
        </tr>
    )
}