# Moonbridge

[*Project for Polkadot Hackathon: North America Edition*](https://devpost.com/software/moonbridge)

The ultimate Moonbeam bridge and explorer. Bridge multichain assets and see your transactions all in one place.

## How Moonbridge works

Moonbridge is a [**bridge**](https://moonbridge.network/bridge) and [**explorer**](https://moonbridge.network/explorer) for **multichain assets**. It allows you to **send** and **monitor** your **transactions** in a simple and easy to use interface. Select your **source** and **destination chains**, then select the **asset** you want to swap and the **protocol** that best fits your needs. Sometimes protocols have **lower fees** depending on the **amount of tokens** you send. After you send your transaction, Moonbridge will monitor the swap and show you the details in the **explorer** including its **status** [Example](https://moonbridge.network/tx/0xe1656854470f9dc2120b4ed0a95fd6526abc6a1a316326f727ad3747369b6de4).

 Supported bridges:

- [Multichain (Anyswap)](https://app.multichain.org/#/router) - [API](https://github.com/anyswap/CrossChain-Bridge/wiki/CrossChain-Bridge-API#restful-api-reference)
- [Synapse Protocol](https://synapseprotocol.com/) - [API](https://syn-api-x.herokuapp.com/apidoc/#api-_header)
- [*Axelar Network (Work in progress)*](https://satellite.money/) - [SDK](https://docs.axelar.dev/dev/axelarjs-sdk/token-transfer-dep-addr) - [Explorer API](https://github.com/synapsecns/explorer-api)

## Future Supported Bridges

- [Nomad](https://app.nomad.xyz/) - [SDK](https://docs.nomad.xyz/dev/sdk.html)
- [Connext](https://bridge.connext.network/?sendingChainId=1284) - [SDK](https://docs.connext.network/developers/sdk/sdk-quickstart)
- [Meter Passport](https://passport.meter.io/#/) - [API](https://github.com/meterio/meterify#web3-method-supported)

## Future for Moonbridge

- Currently working on adding Axelar Network to the list of supported bridges.
- Bridge and swap tokens in one transaction.
- Add WalletConnect and SubWallet support.
- Add unit and integration tests.
- Add XCM transfer support between parachains and relay chain.
- Select the protocol with the lowest fees for the transaction.
- Add all your token balances to the token selector.

## Contribute to the project

Run the server in your local machine:

```bash
npm install

npm start
```

Open <http://localhost:3000> with your browser to see the result.


***Moonbridge is in Beta. Use at your own risk with funds you're comfortable using.***
