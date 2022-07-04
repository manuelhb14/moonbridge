import React, { useContext, useEffect } from "react";

import { DataContext } from "../context/DataContext";

export default function AvailableProtocols() {
    const { protocol, setProtocol, data, from, to, token } = useContext(DataContext);


    return (
        <select name="protocol" id="protocol" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
            <option value="">Protocol</option>
            {from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID ?
            (
                data.filter((item) => item.srcChainID === from && item.SrcToken.Symbol === token)
                    .map((item) => {
                        return <option key={item.bridge} value={item.bridge}>{item.bridge} </option>
                    }
                    )
            ) : (
                data.filter((item) => item.srcChainID === to && item.DestToken.Symbol === token)
                    .map((item) => {
                        return <option key={item.bridge} value={item.bridge}>{item.bridge} </option>
                    }
                    )
            )
            }
        </select>
    )
}
