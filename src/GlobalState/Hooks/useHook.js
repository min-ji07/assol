import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBranchNo } from "../../GlobalState/Reducers/reducerGroupInfo";
import { showPopup,setType } from "../../GlobalState/Reducers/reducerWorkPopup";

export default function useHook(){
    const state = useSelector((state)=>state.reducerGroupInfo);
    const statePopup = useSelector((state)=>state.reducerWorkPopup);

    const dispatch = useDispatch();
    const addBranch = useCallback((res)=>dispatch(addBranchNo(res),[dispatch]));
    const setPopupData = useCallback((res)=>dispatch(showPopup(res),[dispatch]));
    const setTypeForPopup = useCallback((res)=>dispatch(setType(res),[dispatch]));

    return {
        state
        ,statePopup
        ,addBranch
        ,setPopupData
        ,setTypeForPopup
    }
}
