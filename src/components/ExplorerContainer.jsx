import React, { useContext } from "react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { NavLink } from "react-router-dom";
import { Rings } from "react-loader-spinner";
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
            <div className="table-responsive">
                <table className="table explorer">
                    <thead>
                    <tr className="ts-sec">
                        <th>Transaction Hash</th>
                        <th>Coin Type</th>
                        <th>Value</th>
                        <th>Source Chain</th>
                        <th>Destination Chain</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Protocol</th>
                    </tr>
                    </thead>
                    <tbody className="ts-main">
                    {txInfo ? txInfo.map((item) => {
                        return <tr key={item.txid}>
                            <td><NavLink to={`/tx/${item.txid}`}>{formatHash(item.txid)}</NavLink></td>
                            <td>{item.token}</td>
                            <td>Sent: {item.formatvalue} <span className="spanexplorer ts-small"> <br />Received: {item.formatswapvalue}</span></td>
                            <td>{networks[item.srcChainId]}</td>
                            <td>{networks[item.destChainId]}</td>
                            <td>{formatDate(item.timestamp)} <span className="spanexplorer ts-small"><br />{getTimeAgo(item.timestamp)}</span></td>
                            <td>{item.status}</td>
                            <td>{item.bridge}</td>
                        </tr>
                    }
                    ) : <Rings
                            height={100}
                            width={100}
                            color="#21BFDC"
                            ariaLabel="Loading"
                        />}
                    </tbody>
                </table>
            </div>
    )
}
