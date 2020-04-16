import React from 'react';
import '../../../Assets/css/pages/work/work_setting_03.css';
import WorkRestDay from '../../../Components/Work/WorkRestDay';
import gridCommon from '../../../Utils/grid';
import { callApi } from '../../../Utils/api';
import WorkTableByRestDayContainer from './WorkTableByRestDayContainer';
const WorkTableByRestDay=()=>{
    return (
        <div class="wrapper">
        <div class="work_setting_03">
            <div class="title">
                <h1>연차설정</h1>
                <p>설정하신 데이터기반으로 근무 현황을 확인 할 수 있습니다.</p>
            </div>
            <div class="emTable">
                <div class="leftDiv">
                    
                    <div class="left_inner">
                        <div class="option">
                            <p>연차설정</p>
                        </div>

                        <div class="buttonset">
                        <button type="button" className="insert"  onClick={gridCommon.onAddRow}>추가</button>
                        <button type="button" className="delete1" onClick={gridCommon.onRemoveRow}>삭제</button>
                        <button type="button" className="save" 
                            onClick={()=>gridCommon.onSaveRow(callApi.setWorkerListByRestDay)}>저장</button>
                        </div>
                    </div>

                    <div class="table">
                    <WorkRestDay />
                    </div>
                    <div class="backnext">
                        <button type="button" class="back" onclick="back();">이전으로</button>
                        <button type="button" class="next" onclick="next();">다음으로</button>
                    </div>
                   </div>
            </div>
         </div>
    </div> 
    )
};
export default WorkTableByRestDay;