import { combineReducers } from 'redux';

import apiData, { initialState as apiDataDefaults} from './apiData';


export const reducers = combineReducers({
    apiData,
});

export const defaultedState = {
    apiData: apiDataDefaults
};
