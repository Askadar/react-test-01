import React, {Component} from 'react';

import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import Infinite from 'react-infinite';

import { actions } from './reducers/apiData';

const CurrencyButton = ({currency, from, to, onCurrencySelected}) =>
<div className="currecny-button">
	{/* <div className="volume-from">
		{from.slice(0,6)}<span className="small">{from.slice(6)}</span>
	</div> */}
	<button
		onClick={() => onCurrencySelected(currency)}
		>{currency.split('_').join('/')}</button>
	{/* <div className="volume-to">
		{to.slice(0,6)}<span className="small">{to.slice(6)}</span>
	</div> */}
</div>

const TradeItem = ({
	date,
	type,
	amount,
	rate,
}) =>
<div className="trade-item">[{date}] ({type}) {amount} at {rate}</div>

class App extends Component {
	componentDidMount(){
		console.log('fetching')
		this.props.fetchInitialData()
	}
	render() {
		const { currencies, fetchCurrency, trades, loading } = this.props;

		const tradesContainerHeight = 250;

		return (<div className="App">
			<header className="App-header" style={{
					overflow: 'hidden'
				}}>
				<img src="https://poloniex.com/images/theme_light/poloniex.png" className="App-logo" alt="POLONIEX"/>
			</header>
			{
			loading ?
				<div className="trades" style={{height: tradesContainerHeight}}>Loading...</div> :
			trades &&
				<div className="row">
					<Infinite
						className="trades"
						elementHeight={18}
						containerHeight={tradesContainerHeight}
						timeScrollStateLastsForAfterUserScrolls={300}
					>
						{trades.map((a, i) => <TradeItem key={i} {...a}></TradeItem>)}
					</Infinite>
				</div>
			}
			<div className="row">
				{
					currencies.map(currency =>
						<CurrencyButton
							key={currency.currency}
							onCurrencySelected={fetchCurrency}
							{...currency}/>
					)
				}
			</div>
		</div>);
	}
}

export default connect(
	state => ({...state.apiData}),
	actions,
)(App);
