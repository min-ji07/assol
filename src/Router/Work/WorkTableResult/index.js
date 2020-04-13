import React from 'react';
import '../../../Assets/css/pages/work/work_setting_04.css'
import '../../../Assets/css/grid/grid.css'
import '../../../Assets/css/common/calendar/calendar.css'
import WorkGraphContainer from './WorkGraph/WorkGraphContainer';
import WorkRestDayMgtContainer from './WorkRestDayMgt/WorkRestDayMgtContainer';
import WorkModalPopup from '../../../Components/Work/WorkModalPopup';
import WorkRestDayPopup from '../../../Components/Work/WorkRestDayPopup';

const WorkTableResult = () => {
    
    return(
        <div class="wrapper">
        <div class="work_setting_04">
            <div class="title">
                <h1>근무설정</h1>
                <p>설정하신 데이터기반으로 근무 현황을 확인 할 수 있습니다.</p>
            </div>
            <div class="table_inner">
                <input type="radio" id="tab_01" name="tab" checked/>
                <label for="tab_01">근무표</label><input type="radio" id="tab_02" name="tab" /><label for="tab_02">연차관리현황</label>
                <div class="worktable">
                    <div class="workTeam_option">
                         <WorkGraphContainer />
                         <WorkRestDayMgtContainer />
                    </div>
                </div>
            </div>
            <WorkModalPopup />
            <WorkRestDayPopup />
        </div>
    </div>
    )
}

export default WorkTableResult;