import * as types from '../Actions/ActionTypes';

//액션생성함수 선언
export const addBranchNo=(res)=>({type:types.ADD_BRANCH_NO, payload:res});

//상태값 초기화
const initialState = {
    branchNo:0
}

//리듀서 정의
function reducerGroupInfo(state=initialState,action){
    switch(action.type){
        case types.ADD_BRANCH_NO:
            return {
                ...state,
                branchNo: action.payload
            }
        default: // need this for default case
            return state ;
        }
}

export default reducerGroupInfo;