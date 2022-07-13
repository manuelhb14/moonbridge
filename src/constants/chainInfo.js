const chainInfo = {
    '0xa': {
        chainId: "0xa",
        chainName: "Optimism",
        rpcUrls: [
            "https://mainnet.optimism.io/",
            "https://optimism-mainnet.public.blastapi.io",
            "https://rpc.ankr.com/optimism"
        ],
        blockExplorerUrls: ["https://optimistic.etherscan.io"]
    },
    '0x19': {
        chainId: "0x19",
        chainName: "Cronos Mainnet",
        rpcUrls: [
            "https://cronos-rpc.heavenswail.one/",
            "https://evm.cronos.org",
            "https://cronosrpc-1.xstaking.sg/",
            "https://cronos-rpc.elk.finance/"
        ],
        blockExplorerUrls: ["https://cronoscan.com/"]
    },
    "0x38": {
        chainId: "0x38",
        chainName: "BSC Mainnet",
        rpcUrls: [
            "https://bsc-dataseed.binance.org/",
            "https://bsc-dataseed1.defibit.io/",
            "https://bsc-dataseed1.ninicoin.io/",
            "https://bsc-dataseed2.defibit.io/",
            "https://bsc-dataseed3.defibit.io/",
            "https://bsc-dataseed4.defibit.io/",
            "https://bsc-dataseed2.ninicoin.io/",
            "https://bsc-dataseed3.ninicoin.io/",
            "https://bsc-dataseed4.ninicoin.io/",
            "https://bsc-dataseed1.binance.org/",
            "https://bsc-dataseed2.binance.org/",
            "https://bsc-dataseed3.binance.org/",
            "https://bsc-dataseed4.binance.org/",
            "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
            "wss://bsc-mainnet.nodereal.io/ws/v1/64a9df0874fb4a93b9d0a3849de012d3",
            "https://rpc.ankr.com/bsc",
            "https://bscrpc.com",
            "https://bsc.mytokenpocket.vip",
            "https://binance.nodereal.io",
            "https://rpc-bsc.bnb48.club",
            "https://bscapi.terminet.io/rpc"
        ],
        blockExplorerUrls: ["https://bscscan.io/"]
    },
    "0x89": {
        chainId: "0x89",
        chainName: "Polygon Mainnet",
        rpcUrls: [
            "https://polygon-rpc.com",
            "https://rpc-mainnet.matic.network",
            "https://rpc-mainnet.maticvigil.com",
            "https://rpc-mainnet.matic.quiknode.pro",
            "https://matic-mainnet.chainstacklabs.com",
            "https://matic-mainnet-full-rpc.bwarelabs.com",
            "https://matic-mainnet-archive-rpc.bwarelabs.com",
            "https://poly-rpc.gateway.pokt.network/",
            "https://rpc.ankr.com/polygon",
            "https://rpc-mainnet.maticvigil.com/",
            "https://polygon-mainnet.public.blastapi.io",
            "https://polygonapi.terminet.io/rpc"
        ],
        blockExplorerUrls: ["https://polygonscan.com/"],
    },
    "0xfa": {
        chainId: "0xfa",
        chainName: "Fantom",
        rpcUrls: [
            "https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac",
            "https://rpc.ftm.tools/",
            "https://rpc.ankr.com/fantom",
            "https://rpc.fantom.network",
            "https://rpc2.fantom.network",
            "https://rpc3.fantom.network",
            "https://rpcapi.fantom.network",
            "https://fantom-mainnet.public.blastapi.io"
        ],
        blockExplorerUrls: ["https://ftmscan.com/"]
    },
    "0x120": {
        chainId: "0x120",
        chainName: "Boba Network",
        rpcUrls: [
            "https://mainnet.boba.network/",
            "https://boba-mainnet.gateway.pokt.network/v1/lb/623ad21b20354900396fed7f",
            "https://lightning-replica.boba.network/"
        ],
        blockExplorerUrls: ["https://blockexplorer.boba.network"]
    },
    "0x440": {
        chainId: "0x440",
        chainName: "Metis",
        rpcUrls: ["https://andromeda.metis.io/?owner=1088"],
        blockExplorerUrls: ["https://andromeda-explorer.metis.io/"]
    },
    "0x504": {
        chainId: "0x504",
        chainName: "Moonbeam",
        rpcUrls: [
            "https://rpc.api.moonbeam.network",
            "https://moonbeam.public.blastapi.io",
            "https://rpc.ankr.com/moonbeam"
        ],
        blockExplorerUrls: ["https://moonscan.io/"]
    },
    "0x505": {
        chainId: "0x505",
        chainName: "Moonriver",
        rpcUrls: [
            "https://moonriver.api.onfinality.io/rpc?apikey=673e1fae-c9c9-4c7f-a3d5-2121e8274366",
            "https://moonriver.api.onfinality.io/public",
            "https://moonriver.public.blastapi.io"
        ],
        blockExplorerUrls: ["https://moonriver.moonscan.io/"]
    },
    "0xa4b1": {
        chainId: "0xa4b1",
        chainName: "Arbitrum",
        rpcUrls: [
            "https://arb1.arbitrum.io/rpc",
            "https://rpc.ankr.com/arbitrum",
            "https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}",
            "https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}"
        ],
        blockExplorerUrls: ["https://arbiscan.io/"]
    },
    "0xa86a": {
        chainId: "0xa86a",
        chainName: "Avalanche",
        rpcUrls: [
            "https://api.avax.network/ext/bc/C/rpc",
            "https://rpc.ankr.com/avalanche",
            "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc",
            "https://avalancheapi.terminet.io/ext/bc/C/rpc"
        ],
        blockExplorerUrls: ["https://snowtrace.io/"]
    }

}

export default chainInfo;
