import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "../actions/" //Import the actions types constant we defined in our actions
import { DATA_AVAILABLE_LOGIN } from "../actions/"

let dataState = { data: [], loading: true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading: false });
            return state;

        default:
            return state;
    }
};

const dataReducers = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE_LOGIN:
            state = Object.assign({}, state, { data: action.data, loading: false });
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer, dataReducers
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;