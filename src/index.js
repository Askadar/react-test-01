import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { reducers, defaultedState } from './reducers'
import mySagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

let composer = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

let middleware = composer(applyMiddleware(sagaMiddleware));

const store = createStore(reducers, defaultedState, middleware)

sagaMiddleware.run(mySagas)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
