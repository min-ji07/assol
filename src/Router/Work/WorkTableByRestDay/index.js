import React from 'react';
import '../../../Assets/css/pages/work/work_setting_03.css';
import WorkRestDay from '../../../Components/Work/WorkRestDay';
import gridCommon from '../../../Utils/grid';
import { callApi } from '../../../Utils/api';
const WorkTableByRestDay=({ rowData, gridDefs })=>{

    
    function saveRow (result) {
        var list = [];
        console.log(result);
        
        result.forEach(element => {
            if(element.processType == 2 ||  element.processType == 3 || element.processType == 1){
                element.branchNo = 1;
                list.push(element);
            }
        });
        if(list == null || list.length < 1){
            return true;
        }
        let params = {}
        params.workerScheduleInfos = list;
        
        

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
        init(params);
    }

    return (
        <div class="wrapper">
        <div class="work_setting_03">
            <div class="title">
                <h1>개인연차설정으로 바뀔 예정</h1>
                <p>전체 사원 불러와서 한명씩 연차 설정해줌</p>
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
                        <button type="button" className="save"    onClick={() => gridCommon.onSaveRow(saveRow)}>저장</button>

                        
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