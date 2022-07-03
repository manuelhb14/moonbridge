import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';

export default function AvailableNetworks({value}) {

    const { networks, to, setTo, from, setFrom } = useContext(DataContext);

    const moonbeamChainID = process.env.REACT_APP_MOONBEAM_CHAIN_ID;

    return (
        <>
        { ( value === "from") ?
            <select name="from" id="from" onChange={(e) => setFrom(e.target.value)} value={from}>
                {Object.keys(networks).map((key) => {
                    if (from !== moonbeamChainID && key !== moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    } else if (from === moonbeamChainID && key === moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    }
                }
                )}
            </select>
            :
            <select name="to" id="to" onChange={(e) => setTo(e.target.value)} value={to}>
                {Object.keys(networks).map((key) => {
                    if (to !== moonbeamChainID && key !== moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    } else if (to === moonbeamChainID && key === moonbeamChainID) {
                        return <option key={key} value={key}>{networks[key]}</option>
                    }
                }
                )}
            </select>
        }
        </>
    )
}