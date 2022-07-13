import React from "react";

const toggleAccordion = () => {
    var btn = document.getElementById("toggleAccordion");
    setTimeout(function() {
        var hasCollapsed = btn.classList.contains("collapsed");
        if (hasCollapsed) {
            btn.innerHTML = "See all";
        } else {
            btn.innerHTML = "Hide";
        }
    }, 500);
}

export default function SupportedBlockchains() {
    return (
        <section id="SupportedBlockchains">
            <div className="container">
                <h2>Supported Blockchains</h2>
                <div className="sb-container">
                    <div className="row">
                        <div className="network col-6 col-md-3 col-sm-6">
                            <img src="/assets/imgs/logos/logos-h/full-moonbeam.png" alt="Moonbeam logo" />
                        </div>
                        <div className="network col-6 col-md-3 col-sm-6">
                            <img src="/assets/imgs/logos/logos-h/full-eth.png" alt="Ethereum logo" />
                        </div>
                        <div className="network col-6 col-md-3 col-sm-6">
                            <img src="/assets/imgs/logos/logos-h/full-bsc.png" alt="Binance Smarth Chain logo" />
                        </div>
                        <div className="network col-6 col-md-3 col-sm-6">
                            <img src="/assets/imgs/logos/logos-h/full-polygon.png" alt="Polygon logo" />
                        </div>
                    </div>
                    <div className="accordion">
                        <div id="sb-accordion" className="collapse">
                            <div className="row">
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-optimism.png" alt="Optimism logo" />
                                </div>
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-fantom.png" alt="Fantom logo" />
                                </div>
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-moonriver.png" alt="Moonriver logo" />
                                </div>
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-avax.png" alt="Avalanche logo" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-cronos.png" alt="Cronos logo" />
                                </div>
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-arbitrum.png" alt="Arbitrum logo" />
                                </div>
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-metis.png" alt="Metis logo" />
                                </div>
                                <div className="network col-6 col-md-3 col-sm-6">
                                    <img src="/assets/imgs/logos/logos-h/full-boba.png" alt="Boba logo" />
                                </div>
                            </div>
                        </div>
                        <button id="toggleAccordion" className="collapsed" type="button" data-toggle="collapse" data-target="#sb-accordion" aria-expanded="false" aria-controls="sb-accordion" onClick={toggleAccordion}>See all</button>
                    </div>
                </div>
            </div>
        </section>
    );

}