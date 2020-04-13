import React, { useEffect } from 'react';
import { callApi } from '../../../Utils/api';
import useHook from '../../../GlobalState/Hooks/useHook';
import DataGrid from '../../DataGrid';
import WorkRestDay from '../WorkRestDay';
import gridCommon from '../../../Utils/grid';


const ExtraRestPopup=({loadPopup})=>{
    const { state, statePopup } = useHook();
    
    useEffect(()=>{
        async function init(params) {
            try {
                params= {
                    "branchNo" : state.branchNo,
                    "yearsMonthDate" : statePopup.yearsMonthDate
                }
                await callApi.getWorkerListByRestDay(params).then(res=> {
                   console.log('pages res', params)
                   console.log('res',res)
                });
            }catch{

            }
        };
        init();
    },[]); 
    return(
        <div class="modal_box mb3" style={{display:'block'}}>
            <div class="modal_top">
                <div class="modal_title">추가휴뮤/연차 상세</div>
                <div class="modal_close"><a href="#" onClick={()=>loadPopup('0')}></a></div>
            </div>

            <div class="modal_bottom">
                <div>
                    <WorkRestDay />
                </div>
                <p style={{textAlign:"right",marginTop:"10px"}}>
                    <button class="btn_submit" 
                     onClick={()=>gridCommon.onSaveRow(callApi.setWorkerListByRestDay)}>완료</button>
                </p>
            </div>
            <div class="modal_bg">
            </div>
        </div>
    )
}

export default ExtraRestPopup