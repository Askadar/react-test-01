export const initialState = {
    currencies: [],
	trades: null,
}

export const types = {
    'fetchCurrencies': 'FetchCurrencies@Front',
    'fetchTrades': 'FetchTrades@Front',

    'currenciesFetchSucceded': 'CurrenciesFetchSucceded@Saga',
    'tradesFetchSucceded': 'TradesFetchSucceded@Saga',
    'dataFetchFailed': 'DataFetchFailed@Saga',
}

export const actions = {
	fetchInitialData: () => ({ type: types.fetchCurrencies }),
	fetchCurrency: (currency) => ({type: types.fetchTrades, currency}),

}

export default (state = initialState, action) => {
    switch (action.type) {
		case types.fetchCurrencies:
		case types.fetchTrades:
			return {
				...state,
				loading: true,
			}
		case types.currenciesFetchSucceded:
			return {
				...state,
				currencies: action.currencies,
				loading: false,
			}
		break;
		case types.tradesFetchSucceded:
			return {
				...state,
				trades: action.data,
				loading: false,
			}
		break;
        default:
            return state
    }
}
