import React, { useContext } from "react";

import { DataContext } from "../context/DataContext";

export default function ExpectedAmount() {
    const { expectedAmount } = useContext(DataContext);

    return (
        <input type="text" id="expectedAmount" value={expectedAmount} disabled />
    )
}