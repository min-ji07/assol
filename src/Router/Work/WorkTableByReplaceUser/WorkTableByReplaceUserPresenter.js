import React from 'react';
import  '../../../Assets/css/pages/work/work_setting_05.css';
import DataGrid from "../../../Components/DataGrid"
import gridCommon from '../../../Utils/grid';
import $ from 'jquery';




function WorkTableByReplaceUserPresenter({rowData ,gridDefs, nextPage}) {
   
   return(
    <>
    <div class="wrapper">
        <div class="work_setting_05">
            <div class="title">
                <h1>대체근무자 설정</h1>
                <p>설정하신 데이터기반으로 근무자현황을 확인 할 수 있습니다.</p>
            </div>
            <div class="ReplaceUserTable">
                <div class="ReplaceUser_inner">
                    <div class="User_inner">
                        <div class="option">
                            <p>사원 대체근무자 입력</p>
                            <select id ="groupNameId">
                            </select>
                        </div>
                    </div>
                    <div class="table">
                        <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
                    </div>
                    <div class="table2">
                        <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
                    </div>
                    <div class="backnext">
                        <button type="button" class="back" onclick="back();">이전으로</button>
                        <button type="button" class="next" onclick="next();">다음으로</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default WorkTableByReplaceUserPresenter;