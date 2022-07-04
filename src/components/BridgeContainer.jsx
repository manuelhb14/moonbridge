import React from "react";

import AvailableNetworks from "./AvailableNetworks";
import SwapNetwork from "./SwapNetwork";
import InputAmount from "./InputAmount";
import AvailableTokens from "./AvailableTokens";
import ExpectedAmount from "./ExpectedAmount";
import AvailableProtocols from "./AvailableProtocols";
import Fees from "./Fees";

export default function BridgeContainer() {

    const transfer = () => {
        console.log("transfer");
    }
    
    return (
        <div className="bridge-container">
            <AvailableNetworks value="from" />

            <SwapNetwork />

            <AvailableNetworks value="to" />

            <InputAmount />

            <AvailableTokens />

            <ExpectedAmount />

            <AvailableProtocols />

            <button id="convert" onClick={transfer}>Convert</button>

            <Fees />
        </div>
    )
}