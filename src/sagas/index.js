import { fork } from 'redux-saga/effects';
// import { delay } from 'redux-saga';

import apiDataSaga from './apiData';

export default function* () {
    yield fork(apiDataSaga);
};
