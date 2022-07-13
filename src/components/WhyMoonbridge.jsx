import React from "react";

export default function SupportedBlockchains() {
	return (
		<section id="WhyMoonbridge">
			<div className="container">
				<h2 className="mb-4">Why Moonbridge?</h2>
				<p className="subtitle ts-tertiary t-white">With Moonbridge you'll have the easiest bridging experience within the Moonbeam blockchain!</p>
				<div className="row">
					<div className="squares col-12 col-md-4">
						<div className="content">
							<img src="assets/icons/all-in-one.svg" alt="" />
							<h3>All In One</h3>
							<p className="ts-tertiary ts-white">
								The Moonbeam blockchain webapp with the needed features for cross chain bridge transactions and a built in explorer
							</p>
						</div>
					</div>
					<div className="squares col-12 col-md-4">
						<div className="content">
							<img src="assets/icons/ease.svg" alt="" />
							<h3>Ease of Use</h3>
							<p className="ts-tertiary ts-white">
								Intuitive design for a pleaseant user experience while using the blockchain's Web3 tools
							</p>
						</div>
					</div>
					<div className="squares col-12 col-md-4">
						<div className="content">
							<img src="assets/icons/effective.svg" alt="" />
							<h3>Efficiency</h3>
							<p className="ts-tertiary ts-white">
								Reduction of gas fees when chosing the desired protocol (Synapse and Multichain at the moment) for the transaction
							</p>
						</div>
					</div>
				</div>
				
			</div>
		</section>
	);
}