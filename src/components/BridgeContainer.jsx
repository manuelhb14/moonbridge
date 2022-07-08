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
        <div className="bridge-container container">
            <div className="bridge-item">
                <span className="text">From</span><AvailableNetworks value="from" />
            </div>
            <div className="bridge-item text-right">
                <small className="text"><u>Max:</u></small>
                <br />
                <div className="input-textEselect">
                    <InputAmount /><AvailableTokens />
                </div>
            </div>
            <div className="bridge-item">
                <SwapNetwork />
            </div>
            <div className="bridge-item">
                <span className="text">To</span><AvailableNetworks value="to" />
            </div>
            <div className="bridge-item">
                <small className="text">(Estimated)</small>
                <br />
                <ExpectedAmount />
            </div>
            <div className="bridge-item">
                <span className="text">via Protocol</span><AvailableProtocols />
            </div>
            <div className="bridge-item">
                <button id="transfer-btn" onClick={transfer}>Transfer</button>
            </div>
            <div className="bridge-item fees">
                <Fees />
            </div>
        </div>
    )
}