import {call, put, takeLatest} from 'redux-saga/effects'

// import axios from 'axios'
import { types } from '../reducers/apiData';
const {
	fetchCurrencies, currenciesFetchSucceded,
	fetchTrades, tradesFetchSucceded,
	dataFetchFailed,
} = types;

const urls = {
	currencies: 'https://poloniex.com/public?command=return24hVolume',
	trades: 'https://poloniex.com/public?command=returnTradeHistory',

}

// for later cache solutions, not really necessary right here right now
let today = new Date();

const fetchData = async (url, tryCache) => {
	if (tryCache) {
		// hm, maybe later, no real reason to cache day-in requests
	}
	const resp = await fetch(url);
	if (resp.status >= 400 || resp.status < 200)
		throw new Error('Non-OK status code recieved');
	const data = await resp.json();
	return data;
}

function * fetchTradesSage(action) {
	try {
		console.log(action);
		if (!action.currency || action.currency === '')
			throw new Error('Empty currency pair provided')
		if((today.getTime() + 3e5) < new Date().getTime())
			today = new Date();
			// 3e5 === 60 * 5  * 1000

		const yesterday = (today.getTime() / 1000) - (3600 * 24);
		const getParams = [
			//currencyPair=BTC_NXT&start=1410158341&end=1410499372
			['currencyPair', action.currency],
			['start', yesterday],
			['end', today.getTime() / 1000]
		]
		const data = yield call(fetchData,
			urls.trades + '&' + getParams.map(a => a.join('=')).join('&'),
			// true, //should cache?
		);
		yield put({ type: tradesFetchSucceded, data})
	}
	catch(e) {
		console.warn(e);
		yield put({ type: dataFetchFailed, message: e.message || 'Generic error happened' });
	}
}

function * fetchCurrenciesSage() {
	try {
		const data = yield call(fetchData, urls.currencies)
		const currencies = Object.entries(data)
			.filter(([key, value]) =>
				typeof value === 'object' &&
				!(value instanceof String)
			).map(([key, value]) => ({
				currency: key,
				from: value[key.split('_')[0]],
				to: value[key.split('_')[1]]
			}));
		yield put({ type: currenciesFetchSucceded, currencies });

	}
	catch(e) {
		console.warn(e);
		yield put({ type: dataFetchFailed, message: e.message || 'Generic error happened' });
	}
}

function* rootSaga() {
	yield takeLatest(fetchCurrencies, fetchCurrenciesSage)
	yield takeLatest(fetchTrades, fetchTradesSage)
}
export default rootSaga;
