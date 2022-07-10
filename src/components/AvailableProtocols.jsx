import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

import { DataContext } from "../context/DataContext";

import multichainLogo from "../logos/multichain.svg";
import synapseLogo from "../logos/synapse.svg";
import noneLogo from "../logos/none.svg";

export default function AvailableProtocols() {
    const { protocol, setProtocol, data, from, to, token } = useContext(DataContext);

    const [protocols, setProtocols] = useState([]);

    useEffect(() => {
        if (from !== process.env.REACT_APP_MOONBEAM_CHAIN_ID) {
            setProtocols(data.filter((item) => item.srcChainID === from && item.SrcToken.Symbol === token)
                .map((item) => {
                    return {
                        value: item.bridge,
                        label: item.bridge,
                        image: item.bridge === "Multichain" ? multichainLogo : synapseLogo
                    }
                }
                ));
        } else {
            setProtocols(data.filter((item) => item.srcChainID === to && item.DestToken.Symbol === token)
                .map((item) => {
                    return {
                        value: item.bridge,
                        label: item.bridge,
                        image: item.bridge === "Multichain" ? multichainLogo : synapseLogo
                    }
                }
                ));
        }
    }
    , [data, from, token]);

    const onChange = (e) => {
        setProtocol(e.value);
    }

    const customStyles = {
    }
    
    return (
        <Select
            options={protocols}
            onChange={onChange}
            value={ protocols.find(item => item.value === protocol) ? protocols.find(item => item.value === protocol) : null }
            placeholder="Protocol"
            formatOptionLabel={(option) => (
                <div className="select-option">
                    <img src={option.image} height="25px" width="25px" alt="logo" />
                    <span>{option.label}</span>
                </div>
            )}
            styles={customStyles}
        />
    )
}
