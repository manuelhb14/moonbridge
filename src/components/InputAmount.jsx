import React, { useContext } from "react";

import { DataContext } from "../context/DataContext";

export default function InputAmount() {
    const { amount, setAmount } = useContext(DataContext);

    return (
        <input type="number" id="amount" placeholder="0" onChange={(e) => setAmount(e.target.value)} value={amount} />
    )
}