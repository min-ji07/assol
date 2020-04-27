import React from 'react';
import  '../../../Assets/css/pages/work/work_setting_02.css';
import SetSubWorker from './SetSubWorker';
import DataGrid from '../../../Components/DataGrid';
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import $ from 'jquery';
/* 근무자 설정 */ 



function WorkTableByPersonalPresenter({rowData, minCount,subWorker,gridDefs}) {

    function saveRow (params) {

        params.forEach(element => {
            //branchNo, employeeNumber, firstRestDay, groupName, position, processType, twoRestDay, userName, userNo,yearsMonthDate 가져옴
            if(element.processType){
                if(element.processType == 1 || element.processType == 2){ // 1. insert 2. update
                        if(element.userName == null || element.userName == ""){
                            alert('사원을 선택해주세요.')
                        }
                        if(element.groupName == null ||element.groupName == ""){
                        // if(element.Object.keys(groupInfoMap) == null || element.Object.keys(groupInfoMap) == ""){
                            alert("근무조를 선택해주세요.");
                            return false;
                            
                        }
                        if(element.firstRestDay == null || element.firstRestDay == "") {
                            alert("휴무일을 선택해주세요.");
                            return false;
                        }
                        // if(element.firstRestDay == null || element.firstRestDay =="") {
                        //     alert("휴무일을 선택해주세요.");
                        //     return false;
                        // }
                        element.yearsMonthDate = $('#month-picker').val().replace("-","");
                        element.branchNo = 29;
                        // list.push(element);
          
                    }
                }
            // }
        });

        var i = 0;
        for(i; i<params.length; i++){
            params[i].branchNo = 29;
        }


        console.log(params);

        let params2 = {
            "workerScheduleInfos":params
        };
        console.log("params2",params2);
        // ["workerScheduleInfos"]

        if(params2 == null || params2.length < 1){
            alert('저장할 근무자가 없습니다.');
            return true;
        }

        async function init(params2){
            try {
                await callApi.setWorkerList(params2).then(res => {
                    console.log(res);
                    if(res.data.ErrorCode == 0){ 
                        alert("근무자 설정이 완료되었습니다..");
                    }
                    else{
                        alert("안~~~돼~~");
                    }
                })
            }catch(error){
                console.log("CATCH !! : " + error);
            }
        };
        init(params2);
    }
    
   
   return(
    <>
        <div className="wrapper">
        <div className="work_setting_02">
            <div className="title">
                <h1>근무자 설정</h1>
                <p>설정하신 데이터기반으로 근무 현황을 확인 할 수 있습니다.</p>
            </div>
            <div className="emTable">
                    <div className="leftDiv">
                        <div className="option">
                            <p className="year_inner">근속년월
                            <input type="text"
                                readOnly
                                id="month-picker"
                                className="datepicker-here"
                                data-language='lang'
                                data-min-view="months"
                                data-view="months"
                                data-date-format="yyyy-mm"/>
                            </p>
                            <p>사원근무 설정</p>
                        </div>

                        <div className="buttonset">
                        <button type="button" className="insert"  onClick={gridCommon.onAddRow}>추가</button>
                            <button type="button" className="delete1" onClick={gridCommon.onRemoveRow}>삭제</button>
                            <button type="button" className="save" onClick={() => gridCommon.onSaveRow(saveRow)}>저장</button>
                        </div>
                        <div className="right_border">
                            <div className="table">
                                
                                <DataGrid rowData={rowData} gridDefs={gridDefs}  />
                            </div>
                        </div>
                    </div>

                    <div className="rightDiv">
                        <div className="">
                            <p>근무조별 최소 인원현황</p>
                        </div>

                        <div className="num0">
                            <div>근무조</div>
                            <div>필수 인원수</div>
                            <div>지정 인원수</div>
                        </div>
                        <div className="table2">
                            <div className="left_border">
                            {
                                minCount.map((obj, key)=>{
                                    const className = "num bg_c"+obj.groupColor;
                                    return <div key={key} className={className}>
                                        <div class="none">{obj.groupName} </div> 
                                        <div>{obj.requireCount} </div> 
                                        <div>{obj.setWorkerCount}  </div> 
                                    </div>
                                })
                             }   
                            </div>
                        </div>
                        <div className="backnext">
                            {/* <button type="button" className="back" >이전으로</button> */}
                            <button type="button" className="next" onClick={()=>{window.location.href='/work/workTableByRestDay'}}>다음으로</button>
                        </div>
                    </div>
            </div>

            {
              subWorker &&
              subWorker!={} &&
              <SetSubWorker subWorker={subWorker}/> 
            }                            
        </div>
    </div>
    </>
    )
}
export default WorkTableByPersonalPresenter;