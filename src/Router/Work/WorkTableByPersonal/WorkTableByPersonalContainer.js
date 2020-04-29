import React, { useState, useEffect } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import useHook from '../../../GlobalState/Hooks/useHook';
import WorkTableByPersonalPresenter from './WorkTableByPersonalPresenter'

/* 근무자 설정*/


function WorkTableByPersonalContainer({yearMonth}) {    
    const {state} = useHook();

    const workersMap={}, workersPosition={}, workersNumber={};
   
    const groupInfoMap={}, groupWorkType={};
    //mappings
    const dayMap = {
        "0":"월"
        ,"1":"화"
        ,"2":"수"
        ,"3":"목"
        ,"4":"금"
        ,"5":"토"
        ,"6":"일"
    }
    const workType = {
        "1" : "월~금",
        "2" : "월~토",
        "3" : "월~일"
    }

    const [subWorker, setSubWorker] = useState(false); //조별 설정 
    window.popupSettingSubWorker = function(userNo,groupName,yearsMonthDate,firstRestDay,twoRestDay){
        const params = {
                "branchNo" :1, //store영역분리
                "yearsMonthDate":yearsMonthDate,
                "userNo":userNo,
                "groupName" : groupName,
                "firstRestDay" :firstRestDay,
                "twoRestDay":twoRestDay
                };
        setSubWorker(params);
    }

    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [minCount, setMinCount] = useState([]); //조별 설정 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의


    useEffect(()=>{
       async function initGrid(params) {
        try {
            const target = document.querySelector('#month-picker')
            params = {
                "branchNo" : 29,
                "yearsMonthDate": target.value.replace("-","")
            }
            await callApi.getWorkerInfos(params).then(res => {
                    for(var i=0;i<res.data.Data.length;i++){
                        let user = res.data.Data[i];
                        workersMap[user.userNo] =user.userName;
                        workersNumber[user.userNo] = user.employeeNumber;
                        workersPosition[user.userNo] = user.position;
                    }
                    // 그룹 근무조별 최소인원수 불러오기
                callApi.getCurrentStatusWorkerTable(params).then(res=> { 
                    if(res.data.Data)
                        for(var i=0;i<res.data.Data.length;i++){
                            let map = res.data.Data[i];
                            // 근무조 매핑
                            groupInfoMap[map.groupId] = map.groupName;
                            groupWorkType[map.groupId] = map.workType;
                        }
                        //그룹별 최소인원 설정
                        setMinCount(res.data.Data);
                    });

                // 근무자 저장 불러오기
                callApi.getSearchList(params).then(res=>{
                    if(res.data && res.data.Data){
                        setGridDefs(gridSetting());
                        setRowData(res.data.Data);
                    }
                })
            });

            
          
        }catch{

        }
       };
       picker.setMonthPicker(('#month-picker'),function(value){
            initGrid(value); 
        });
    },[]); //init


    //grid setting
    const gridSetting =()=>{
        
     //대체근무자 팝업 셀렌더링 
     const settingSubWorker =(params)=> {
        if(!params.data || !params.data.userNo ) return null;

       const ui = document.createElement("div");
        ui.innerHTML = 
        `<button id="setSubWorkerBtn" 
            onClick="popupSettingSubWorker('${params.data.userNo}',
                '${params.data.groupName}' ,'${params.data.yearsMonthDate}',
                '${params.data.firstRestDay}' ,'${params.data.twoRestDay}' )">+</button>`
        return ui.innerHTML;
       }

        //컬럼 정의
        const columnDefs= [  
            { headerName: "rowId", field: "rowId", hide:true }
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "", field: "branchNo", width:30 ,resizable:false,editable : false
                   ,checkboxSelection:true,headerCheckboxSelection: true,
                    valueFormatter:function(params){ 
                    params.data.branchNo = state.branchNo
                    return state.branchNo
                }
            }
           
            ,{ headerName: "성명 ",field:"userNo", editable:true, width:155,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(workersMap) },
                refData: workersMap
            }
            ,{ headerName: "성명 ",field:"userNo", editable:true, width:155,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(workersMap) },
                refData: workersMap
            }
            ,{ headerName: "사원번호", field: "userNo", editable:false, width:155,
                cellEditor: "select",  
                cellEditorParams: { values: gridCommon.extractValues(workersNumber) },
                refData: workersNumber
            }
            ,{ headerName: "직책", field: "userNo", editable:false, width:150,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(workersPosition) },
                refData: workersPosition
            }
            ,{ headerName: "근무조", field: "refGroupId", editable:true, width:170
                ,cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(groupInfoMap) }
                ,refData : groupInfoMap
            } //api 전달받아야함
            ,{ headerName: "휴무일1", field: "firstRestDay", editable:function(params){
                console.log(params.data.refGroupId);
                if(params.data.refGroupId){
                    console.log(groupWorkType[params.data.refGroupId]);
                    if(groupWorkType[params.data.refGroupId] == 1){
                        return false;
                    }
                }
                return true;
            }, width:190,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(dayMap) },
                refData: dayMap,
                valueGetter : function(params){
                    if(groupWorkType[params.data.refGroupId] == 1){
                        return "";
                    }
                    return params.data.firstRestDay;
                }
                
            }
            ,{ headerName: "휴무일2", field: "twoRestDay", editable:function(params){
                if(params.data.refGroupId){
                    console.log(groupWorkType[params.data.refGroupId]);
                    if(groupWorkType[params.data.refGroupId] != 3){
                        return false;
                    }
                }
                return true;
            }, width:190,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(dayMap) },
                refData: dayMap,
                valueGetter : function(params){
                    if(groupWorkType[params.data.refGroupId] != 3){
                        return "";
                    } 
                    return params.data.twoRestDay
                }
            }
            
            // }
            // ,{ headerName: "근무형태", field: "workType", hide = true, editable:false, width:190,
            //     cellEditor: "select",
            //     cellEditorParams: { values: gridCommon.extractValues(workType) },
            //     refData: dayMap,
            // }
            
          
        ]

        const onRowEditingStopped = function(e) {
            //console.log(e)
            //대체근무자 재설정
            e.api.redrawRows({ rowNodes: [e.node] });
        }

        //기본컬럼 정의
        const defaultColDef ={
            width: 100
            ,editable : true
            ,cellStyle: {textAlign: 'center'}
            ,resizable : true
        } 

        //컴포넌트 세팅
        const components = { };
    
        return {columnDefs, defaultColDef, components, onRowEditingStopped};
    }
    
 
    return(
        <>
            {
                rowData && rowData != [] && 
                gridDefs && gridDefs != {} && 
                <WorkTableByPersonalPresenter 
                    rowData={rowData} 
                    minCount={minCount}
                    subWorker={subWorker} // 대체 근무
                    gridDefs={gridDefs}  
                    gridCommon={gridCommon}

                />
             }
        </>
    )
}
export default WorkTableByPersonalContainer;