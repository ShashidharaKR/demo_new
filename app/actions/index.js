export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const DATA_AVAILABLE_LOGIN = 'DATA_AVAILABLE_LOGIN';


//Import the sample data
import Data from '../instructions.json';

export function getData(){
    return (dispatch) => {

        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            var data  = Data.users;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);

    };
}

export function getDataLogin(){
    return (dispatch) => {

        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            var data  = Data.login;
            dispatch({type: DATA_AVAILABLE_LOGIN, data:data});
        }, 2000);

    };
}