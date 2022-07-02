import React, { useContext } from "react";

import { DataContext } from "../context/DataContext";

export default function AvailableTokens() {
    const { from, to, token, setToken, data } = useContext(DataContext);

    return (
        <select name="token" id="token" onChange={(e) => setToken(e.target.value)} value={token}>
                    <option value="">Token</option>
                    {data.filter((item) => item.srcChainID === from || item.srcChainID === to)
                    .filter((item, index, self) => self.findIndex(item2 => (item2.symbol === item.symbol)) === index)
                    .map((item) => {
                            return <option key={item.symbol} value={item.symbol}>{item.name} ({item.symbol})</option>
                    }
                    )}
                </select>
    )
}