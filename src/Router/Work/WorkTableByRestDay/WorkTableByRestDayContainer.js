import React, { useState, useEffect } from 'react';
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import picker from '../../../Utils/datepicker';
import WorkTableByRestDayPresenter from './WorkTableByRestDayPresenter';

const WorkTableByRestDayContainer = () => {

    const workersMap={}, workersPosition={}, workersNumber={}; //사원맵핑
    const annualMap={"1":"연차","2":"경조사","3":"반차","4":"추가휴무일"}; //휴가구분 맵핑

    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    
    useEffect(()=>{
        console.log("hi00");
       async function init() {
        try {
            var params = {
                "branchNo" : 30        
            }
            await callApi.getSearchList(params).then(res=> {
                //사원데이터 선호출
                console.log(res.data, ".>: ->", params)
                    for(var i=0;i<res.data.Data.length;i++){
                        let user = res.data.Data[i];
                        workersMap[user.userNo] =user.userName;
                        workersNumber[user.userNo] = user.employeeNumber;
                        workersPosition[user.userNo] = user.workPosition;
                    }
                  
                
                
                params = {
                    "branchNo" : 30,
                    "yearsMonthDate" :"202004"
                }
                params.yearsMonthDate = "202010";
                //연차설정 데이터
                callApi.getWorkerListByRestDay(params).then((res)=>{
                    //console.log(res);
                    setGridDefs(gridSetting());
                    setRowData(res.data.Data)
                });
            });
        }catch{

        }
       };
       init();
    },[]); //init


    const gridSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "rowId", field: "rowI2d", hide:true }
               ,{ headerName: "", field: "branchNo", width:30 ,resizable:false,editable : false
                   ,checkboxSelection:true,headerCheckboxSelection: true,
                    valueFormatter:function(params){ 
                    params.data.branchNo = state.branchNo
                    return state.branchNo
                }
               }
               ,{ headerName: "성명 ",field:"userNo", width:100,
               cellEditor: "select",
               cellEditorParams: { values: gridCommon.extractValues(workersMap) },
               refData: workersMap
                }
                ,{ headerName: "사원", field: "userNo", width:130,
                    cellEditor: "select",
                    cellEditorParams: { values: gridCommon.extractValues(workersNumber) },
                    refData: workersNumber
                }
                ,{ headerName: "직책", field: "userNo", width:130,
                    cellEditor: "select",
                    cellEditorParams: { values: gridCommon.extractValues(workersPosition) },
                    refData: workersPosition
                }
               ,{ headerName: "근무연월", field: "yearsMonthDate",editable:false } //상단에서 가져와 픽스 
               ,{ headerName: "휴가시작일", field: "startDate", cellEditor: picker.setBreakTimePicker()}
               ,{ headerName: "휴가종료일", field: "endDate", cellEditor: picker.setBreakTimePicker()}
               ,{ headerName: "휴가구분", field: "annualType", width:100  ,
                    cellEditor: "select",
                    cellEditorParams: { values: gridCommon.extractValues(annualMap) },
                    refData: annualMap
                }
               ,{ headerName: "사용일수", field: "useAnnual", width:90 }
               ,{ headerName: "휴가사유", field: "reason", width:200   }
           ]
   
          
   
           //기본컬럼 정의
           const defaultColDef ={
               width: 100
               ,editable : true
               ,cellStyle: {textAlign: 'center'}
               ,resizable : true
           } 
   
           //컴포넌트 세팅 
           const components = {  };
       
           return {columnDefs, defaultColDef, components};
       }


    return (
        <WorkTableByRestDayPresenter rowData={rowData} gridDefs={gridDefs}/>
    )
}

export default WorkTableByRestDayContainer;