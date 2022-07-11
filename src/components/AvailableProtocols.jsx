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
        container: () => ({
            width: '100%',
            position: 'relative',

        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid var(--lightblue)',
            color: state.isSelected ? 'var(--lightblue)' : 'var(--lightblue)',
            backgroundColor: state.isSelected ? 'var(--greyblue)' : 'var(--greyblue)',
            padding: '.5rem 1.25rem',
        }),
        menu: (provided, state) => ({
            ...provided,
            position: 'absolute',
            zIndex: '1',
            top: 'unset',
            backgroundColor: 'var(--greyblue)',
            border: '1px solid var(--lightblue)',
            color: 'var(--lightblue)',
            fontSize: '1rem',
            paddingTop: '0',
            marginTop: '.5rem',
            width: 'inherit',
            maxWidth: 'inherit',
        }),
        control: () => ({
            border: '1px solid var(--lightblue)',
            padding: '.2rem .15rem',
            display: 'flex',
            backgroundColor: 'var(--greyblue)',
            borderRadius: '5px',
            color: 'red',
            width: '100%',

        }),
        singleValue: (provided, state) => {
            const color = 'var(--lightblue)';
            const fontSize = '1.2rem';
        
            return { ...provided, color, fontSize };
        }
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
