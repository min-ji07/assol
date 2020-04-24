import React from 'react';
import '../../../Assets/css/pages/work/work_setting_03.css';
import WorkRestDay from '../../../Components/Work/WorkRestDay';
import DataGrid from '../../../Components/DataGrid';
import gridCommon from '../../../Utils/grid';
import { callApi } from '../../../Utils/api';
// import $ from 'jquery';
// import utils from '../../../Utils/utils';

const WorkTableByRestDay=({ rowData, gridDefs})=>{
/* 개인연차설정 */
    // , rowData2,  gridDefs2
    function saveRow (result) {
        var list = [];
        
        result.forEach(element => {
            if(element.processType == 2 ||  element.processType == 3 || element.processType == 1){
                if( (!element.startDate || element.startDate =="") && (element.endDate|| element.endDate == "")){
                    alert("휴가 일정을 다시 입력하세요");
                }
                if(element.annualType == 3){
                    element.endDate = element.startDate;
                    element.useAnnual = 0.5;
                }
                element.branchNo = 1;
                list.push(element);
            }
        });
        if(list == null || list.length < 1){
            return true;
        }
        let params = {};
        params.wokerAnnualInfos = list;
        init(params);
        async function init(params){
            try {
                await callApi.setWorkerListByRestDay(params).then(res => {
                    if(res.data){
                        if(res.data.ErrorCode == 0){ 
                            alert("연차설정이 완료되었습니다.");
                        }
                        else{
                            alert("실패");
                        }
                    }
                })
            }catch(error){
                console.log("CATCH !! : " + error);
            }
        };
        
    }

    return (
        <div class="wrapper">
            <div class="work_setting_03">
                <div class="title">
                    <h1>개인연차설정</h1>
                    <p>사원의 연차를 설정할 수 있습니다.</p>
                </div>
                <div class="emTable">
                    <div class="leftDiv"> 
                    {/* 전체div */}
                        
                        <div class="left_inner">
                            {/* <div class="option">
                                <p>연차설정</p>
                            </div> */}

                            <div className="left_div_inner">
                                <div className="left_div_inner_inner">
                                    <div className="div_top01">사원 전체명부</div>
                                    <div className="div_bottom">
                                        {/* <DataGrid rowData={rowData2} gridDefs={gridDefs2} /> */}
                                    </div>
                                </div>
                            </div>

                            <div class="buttonset">
                                <button type="button" className="insert"  onClick={gridCommon.onAddRow}>추가</button>
                                <button type="button" className="delete1" onClick={gridCommon.onRemoveRow}>삭제</button>
                                <button type="button" className="save"    onClick={() => gridCommon.onSaveRow(saveRow)}>저장</button>
                            </div>
                            <div className="right_div_inner">
                                <div className="right_div_inner_inner">
                                    <div className="div_top02">개인연차 추가</div>
                                    <div class="table">
                                        <WorkRestDay />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div class="backnext">
                            <button type="button" class="back" onclick="back();">이전으로</button>
                            <button type="button" class="next" onclick="next();">다음으로</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div> 
    )
};
export default WorkTableByRestDay;