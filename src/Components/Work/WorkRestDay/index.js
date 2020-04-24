import React, { useState, useEffect } from 'react';
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import picker from '../../../Utils/datepicker';
import DataGrid from '../../DataGrid';
import useHook from '../../../GlobalState/Hooks/useHook';

const WorkRestDay = () => {
    const { state } = useHook();

    const workersMap = {}, workersNumber={}, workersPosition={}; //사원맵핑
    const annalMaps = {
        "1":"연차",
        "2":"경조사",
        "3":"반차"
    }; //휴가구분 맵핑
    const afterMaps = {
        "1":"오전",
        "2":"오후"
    }; //상세구분 맵핑

    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
   

    // 사원정보 불러오기
    useEffect(()=>{
        
        async function init() {
            try {
                let params = {
                    "branchNo" : 29
                }
            await callApi.getWorkerInfos(params).then(res => {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                        return;
                    }
                    if(res.data.Data != null){
                        console.log(res.data.Data);
                        for(var i=0;i<res.data.Data.length;i++){
                            let user = res.data.Data[i];
                            console.log(user);
                            workersMap[user.userNo] =user.userName;
                            workersNumber[user.userNo] = user.employeeNumber;
                            workersPosition[user.userNo] = user.position;
                                                
                        }
                    }

                //연차설정 데이터 저장내용 가져오기
                try{
                    callApi.getWorkerListByRestDay(params).then(res=>{
                        setGridDefs(gridSetting());
                        if(res.data && res.data.Data){
                            setRowData(res.data.Data);
                        }
                    });
                }
                catch(error){
                    console.log(error);
                }
                
            });
        }catch(error){
            console.log(error);
        }
       };
       init();
    },[]); //init

    
    const gridSetting = () => {
        //컬럼 정의
           const columnDefs= [  
               { headerName: "rowId", field: "rowId", hide:true }
               ,{ headerName: "processType", field: "processType", hide:true}
               ,{ headerName: "", field: "branchNo", width:50 ,resizable:false,editable : false
                   ,checkboxSelection:true,headerCheckboxSelection: true,
                    valueFormatter:function(params){ 
                    params.data.branchNo = state.branchNo
                    return state.branchNo
                }
               }
               ,{ headerName: "성명 ",field:"userNo", cellEditor : "richSelect", width:110,
                cellEditor: "select",
               cellEditorParams: { values: gridCommon.extractValues(workersMap) },
               refData: workersMap,
                editable : function(params) {
                    if(params.data.processType || params.data.processType ==4){
                        return false;
                    }
                 }
                }
                ,{ headerName: "사원번호", field: "userNo", width:150, editable : false,
                    cellEditorParams: { values: gridCommon.extractValues(workersNumber) },
                    refData: workersNumber
                }
                ,{ headerName: "직책", field: "userNo", width:150, editable:false,
                    cellEditorParams: {  values: gridCommon.extractValues(workersPosition) },
                    refData: workersPosition
                }
               ,{ headerName: "근무연월", field: "yearsMonthDate",editable:false, width:150,
                    valueFormatter:function(){
                        //근무자설정에서 url을 통해서 가져오듯이 가져오셈
                        return "2020-04"
                    }
                } //상단에서 가져와 픽스 
               ,{ headerName: "휴가시작일", field: "startDate", width:200 , cellEditor: picker.setBreakTimePicker(),
                    editable : function(params) {
                        if(params.data.processType || params.data.processType ==4){
                            return false;
                        }
                    }
                }
               ,{ headerName: "휴가종료일", field: "endDate", width:200, cellEditor: picker.setBreakTimePicker()
                    ,valueGetter : function(params){
                        if(params.data.annualType == 3){
                               return params.data.startDate; 
                        }
                        return params.data.endDate; 
                    },
                    editable : function(params) {
                        if(params.data.processType || params.data.processType ==4){
                            return false;
                        }
                     }
                }
               ,{ headerName: "휴가구분", field: "annualType", width:150  ,
                    cellEditor: "select",
                    cellEditorParams: { values : gridCommon.extractValues(annalMaps)},
                    refData: annalMaps,
                    editable : function(params) {
                        if(params.data.processType || params.data.processType ==4){
                            return false;
                        }
                     }
                        
                }

                ,{ headerName: "상세구분", field: "detailType", width:150 , editable : function (params){
                    return params.data.annualType == 3 ? true : false;
                },
                    cellEditor: "select",
                    cellEditorParams: { values: gridCommon.extractValues(afterMaps)}, refData: afterMaps,
                    valueGetter : function(params){
                        return params.data.annualType != 3 ? 0 : params.data.annualType;  
                    },
                    editable : function(params) {
                        if(params.data.processType || params.data.processType ==4){
                            return false;
                        }
                     }
                }

               ,{ headerName: "사용일수", field: "employeeNumber", width:120 
                    , editable:false
                    , valueGetter:function(params){
                        var endDate = new Date(params.data.endDate);
                        var startDate = new Date(params.data.startDate);
                        var count = 0;
                        var temp_date = startDate;

                        if(params.data.annualType == "3"){
                            return 0.5;
                        }
                        while(params.data.endDate != undefined && params.data.startDate != undefined) {                              
                            
                            if(temp_date.getTime() > endDate.getTime()) {
                                break;
                            }
                             else {
                                var tmp = temp_date.getDay();
                  
                                if(tmp == 0 || tmp == 6) {
                  
                                } else {
                                    count++;         
                                }
                                temp_date.setDate(temp_date.getDate() + 1); 
                            }
                        }
                        return count;
                    }
                }
               ,{ headerName: "휴가사유", field: "reason", width:168 ,
                      editable : function(params) {
                if(params.data.processType || params.data.processType ==4){
                    return false;
                }
             }
            }
           ]
   
           
           //기본컬럼 정의
           const defaultColDef ={
               editable : true
               ,cellStyle: {textAlign: 'center'}
               ,resizable : true
           } 
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
    }

    return (
        <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
    )
}

export default WorkRestDay;