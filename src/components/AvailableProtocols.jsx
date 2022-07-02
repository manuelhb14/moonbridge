import React, { useContext } from "react";

import { DataContext } from "../context/DataContext";

export default function AvailableProtocols() {
    const { protocol, setProtocol, data, from, to, token, fees } = useContext(DataContext);

    return (
        <select name="protocol" id="protocol" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
            <option value="">Protocol</option>
            {data.filter((item) => (item.srcChainID === from || item.srcChainID === to) && item.symbol === token)
                // .filter((item, index, self) => self.findIndex(item2 => (item2.protocol === item.protocol)) === index)
                .map((item) => {
                    return <option key={item.bridge} value={item.bridge}>{item.bridge} <span>{fees}</span></option>
                }
                )}
        </select>
    )
}
