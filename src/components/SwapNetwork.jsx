import React, { useContext } from "react";

import { DataContext } from "../context/DataContext";

export default function SwapNetwork() {

    const { from, setFrom, to, setTo } = useContext(DataContext);

    const swapNetwork = (from, to) => {
        setFrom(to);
        setTo(from);
    }

    return (
        <button onClick={() => swapNetwork(from, to)}>Swap</button>
    )

}