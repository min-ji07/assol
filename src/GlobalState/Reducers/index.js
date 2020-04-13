import { combineReducers } from 'redux';
//import reducerDataGrid from './reducerDataGrid'; //안쓰는거 
import reducerGroupInfo from './reducerGroupInfo'; 
import reducerWorkPopup from './reducerWorkPopup'; 

const rootReducer = combineReducers({
    reducerGroupInfo
    ,reducerWorkPopup
});

export default rootReducer;
