import React, { useState, useEffect } from 'react';
import picker from '../../../Utils/datepicker'
import WorkTableByPersonalPresenter from './WorkTableByPersonalPresenter'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import useHook from '../../../GlobalState/Hooks/useHook';
/* 근무자 설정*/


function WorkTableByPersonalContainer({yearMonth}) {    
    const {state} = useHook();

    const workersMap={}, workersPosition={}, workersNumber={};
   
    const groupInfoMap={};
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
                "yearsMonthDate": "202004"
                // "yearsMonthDate": target.value.replace("-","")
            }
            await callApi.getWorkerInfos(params).then(res => {
                // 사원데이터 선호출 
                // console.log(res);
                setRowData(res.data.Data);
                    for(var i=0;i<res.data.Data.length;i++){
                        let user = res.data.Data[i];
                        workersMap[user.userNo] =user.userName;
                        workersNumber[user.userNo] = user.employeeNumber;
                        workersPosition[user.userNo] = user.position;
                        console.log(user);
                    }

                    // 그룹 근무조별 최소 인원현황 color 
                callApi.getCurrentStatusWorkerTable(params).then(res=> { 
                    if(res.data.Data)
                        for(var i=0;i<res.data.Data.length;i++){
                            let map = res.data.Data[i];
                            // 근무조 매핑
                            groupInfoMap[map.groupName] = map.workType;
                        }
                        //그룹별 최소인원 설정
                        setMinCount(res.data.Data);
                        
                        //공통 그리드 데이터 셋팅
                       setGridDefs(gridSetting());
                    });

                // 이게 근무자 등록인가?
                callApi.getWorkTableBypersonal(params).then(res=>{
                        console.log(res);
                        if(res.data && res.data.Data){
                            setRowData(res.data.Data);
                            console.log(setRowData);
                        }
                })
            });

            
          
        }catch{

        }
       };
       initGrid();
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
            // ,{ headerName: "귀속연월", field: "yearsMonthDate", hide:true,
            //       valueSetter:function(params){ params.data.yearsMonthDate = yearMonth } }
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
            ,{ headerName: "근무조", field: "groupName", editable:true, width:170
                ,cellEditor: "select",
                cellEditorParams: { values: Object.keys(groupInfoMap) } } //api 전달받아야함
            

            // ,{ headerName: "근무타입", field: "groupName", editable:false, hide:true,
            //     cellEditor: "text",
            //     cellEditorParams: { values: gridCommon.extractValues(groupInfoMap) },
            //     refData: groupInfoMap}
            ,{ headerName: "휴무일1", field: "firstRestDay", editable:true, width:190,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(dayMap) },
                refData: dayMap
                ,cellRenderer:function(params){
                    const workType = groupInfoMap[params.data.groupName];
                    if(workType==3){
                         params.colDef.editable=false
                    }else{
                         params.colDef.editable=true
                    }
                    return params.valueFormatted;
                 }
                }
            ,{ headerName: "휴무일2", field: "twoRestDay", editable:true, width:190,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(dayMap) },
                refData: dayMap
                ,cellRenderer:function(params){
                   const workType = groupInfoMap[params.data.groupName];
                   if(workType==2 || workType==3){
                        params.colDef.editable=false
                   }else{
                        params.colDef.editable=true
                   }
                   return params.valueFormatted;
                }
            }
            
            // 대체근무자 삭제
            // ,{ headerName: "대체근무자", field: "replaceWorkerInfos", editable:false
            //   ,cellRenderer: settingSubWorker
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