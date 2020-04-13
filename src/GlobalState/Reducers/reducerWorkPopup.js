import * as types from '../Actions/ActionTypes';


//액션생성함수 선언
export const showPopup=(res)=>({type:types.SHOW_POPUP, payload:res});
export const setType=(res)=>({type:types.SET_TYPE, payload:res});


//상태값 초기화
const initialState = {
    type:0, //popup rendering by type, default 0 (off)
    userNo:0,
    yearsMonthDate:0,
    day:0
}

//리듀서 정의
function reducerWorkPopup(state=initialState, action){
    switch(action.type){
        case types.SHOW_POPUP:
        return {
                ...state,
                type:action.payload.type,
                userNo: action.payload.userNo,
                yearsMonthDate:action.payload.yearsMonthDate,
                day:action.payload.day
            }
        case types.SET_TYPE:
            return {
                ...state,
                type:action.payload.type,
            }
        default: // need this for default case
            return state ;
        }
}

export default reducerWorkPopup;