import * as types from '../Actions/ActionTypes';

//액션생성함수 선언
export const loadData=(res)=>({type:types.LOAD_DATA,payload:res});
export const addRow=(res)=>({type:types.ADD_ROW,payload:res});


//상태값 초기화
const initialState = {
    columnDefs:[{}],
    rowData:[{}],
    editType:"fullRow"
}

//리듀서 정의
function tableReducer(state=initialState,action){
    switch(action.type){
        case types.LOAD_DATA:
            return {
                ...state
                ,editType: action.payload.editType
                ,columnDefs : action.payload.columnDefs
                ,rowData : action.payload.rowData 
            }
        case types.ADD_ROW:
            //여기서부터 

            state.rowData.push(action.payload.rowData);
            console.log(state)
            return state
        default: // need this for default case
            return state ;
        }
}

export default tableReducer;