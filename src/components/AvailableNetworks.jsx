import React, { useContext } from 'react';

import { DataContext } from '../context/DataContext';

export default function AvailableNetworks({value}) {

    const { networks, to, setTo, from, setFrom } = useContext(DataContext);

    console.log(value);
    return (
        <>
        { ( value === "from") ?
            <select name="from" id="from" onChange={(e) => setFrom(e.target.value)} value={from}>
                {Object.keys(networks).map((key) => {
                    if (from !== "1284" && key !== "1284") {
                        return <option key={key} value={key}>{networks[key]}</option>
                    } else if (from === "1284" && key === "1284") {
                        return <option key={key} value={key}>{networks[key]}</option>
                    }
                }
                )}
            </select>
            :
            <select name="to" id="to" onChange={(e) => setTo(e.target.value)} value={to}>
                {Object.keys(networks).map((key) => {
                    if (to !== "1284" && key !== "1284") {
                        return <option key={key} value={key}>{networks[key]}</option>
                    } else if (to === "1284" && key === "1284") {
                        return <option key={key} value={key}>{networks[key]}</option>
                    }
                }
                )}
            </select>
        }
        </>
    )
}