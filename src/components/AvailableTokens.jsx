import React, { useContext } from "react";

import { DataContext } from "../context/DataContext";

export default function AvailableTokens() {
    const { from, to, token, setToken, data } = useContext(DataContext);

    return (
        <select name="token" id="token" onChange={(e) => setToken(e.target.value)} value={token}>
            <option value="">Token</option>
            {from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID ?
            (
            data.filter((item) => item.srcChainID === from)
                .filter((item, index, self) => self.findIndex(item2 => (item2.SrcToken.Symbol === item.SrcToken.Symbol)) === index)
                .map((item) => {
                    return <option key={item.SrcToken.Symbol} value={item.SrcToken.Symbol}>{item.name} ({item.SrcToken.Symbol})</option>
                }
                )
            ) : (
            data.filter((item) => item.srcChainID === to)
                .filter((item, index, self) => self.findIndex(item2 => (item2.DestToken.Symbol === item.DestToken.Symbol)) === index)
                .map((item) => {
                    return <option key={item.DestToken.Symbol} value={item.DestToken.Symbol}>{item.DestToken.Name} ({item.DestToken.Symbol})</option>
                }
                )
            )
            }
        </select>
    )
}