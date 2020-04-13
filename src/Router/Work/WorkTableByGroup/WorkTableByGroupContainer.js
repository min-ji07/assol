import React, { useEffect, useState } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import WorkTableByGroupPresenter from './WorkTableByGroupPresenter'


function WorkTableByGroupContainer() {
     /* 그리드 설정 */ 

    //셀렉박스 맵핑영역
    const workTypeMappings = {
        "1" : "월 - 금"
        ,"2" : "월 - 토" 
        ,"3" : "월 - 일" 
    }
    const regEmployeeMappings = {
        "1" : "정규직"
        ,"2" : "계약직" 
        ,"3" : "시간제" 
    }
    //컬럼 정의
    const columnDefs= [  
        { headerName: "rowId", field: "rowId", hide:true }
        ,{ headerName: "processType", field: "processType", hide:true}
        ,{ headerName: "branchNo", field: "branchNo", hide:true }
        ,{ headerName: "", field: "", width:30 ,resizable:false,editable : false
            ,checkboxSelection:true,headerCheckboxSelection: true,
         }
         ,{ headerName: "근무타입", field: "workType",
            cellEditor: "select",
            cellEditorParams: { values: gridCommon.extractValues(workTypeMappings) },
            refData: workTypeMappings
            }
         ,{ headerName: "근무형태", field: "regularEmployee",
            cellEditor: "select",
            cellEditorParams: { values: gridCommon.extractValues(regEmployeeMappings) },
            filter: "agSetColumnFilter",  //-- 필터 사용가능 ! 
            refData: regEmployeeMappings
            }
         ,{ headerName: "근무조", field: "groupName"
            , valueFormatter:function(params){
                if(!params || !params.value || params.value=='') return;
                 return params.value.slice(0,6);
            }}
         ,{ headerName: "근무인원수", field: "workerCount",width:90, align:'center',
             cellEditor:'select', cellEditorParams:{values: function(){
                 const list=[];
                    for(var i=1; i<=100 ;i++){
                        list.push(i);
                    }
                    return list;
                }()
             }, valueFormatter:function(params) { return (!params.value)?'':params.value+'명'}} 
        ,{ headerName: "근무시간 ",field:"workTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:150}
        ,{ headerName: "휴게시간", field: "restTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:130}
        ,{ headerName: "서브휴게시간", field: "subRestTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:130}
        ,{ headerName: "총합", field: "totalRestTime", editable:false}
        ,{ headerName: "현재근무시간", field: "currentTime", editable:false}
        ,{ headerName: "연장근무시간", field: "overTime", cellEditor:'select'
            ,cellEditorParams:{values:[30,60,90,120,150,180,210,220,250]}
            ,valueFormatter: function(params){ 
                return (!params.value)?'':params.value+'분'} }
        ,{ headerName: "야간근무시간", field: "yaguenTime", editable:false

        }
        ,{ headerName: "권장근무시간", field: "recommTime", editable:false
            , valueSetter:function(params){ 
                params.data.recommTime = '8시간' 
                return '8시간'
            } }
        ,{ headerName: "검토", field: "passYn", editable:false }
    ]

    //기본컬럼 정의
    const defaultColDef ={
        width: 100
        ,editable : true
        ,cellStyle: {textAlign: 'center'}
        ,resizable : true
    } 

    //컴포넌트 세팅
    const components =  { }
    
    //현 페이지에서 정의된 함수 호출
    const onRowEditingStopped = function(e) { 
       
        if(e.data && e.data.workTime ) {//&& e.data.workTime!=='~'
           let workTimeArr  = e.data.workTime.split("~");

           //근무시간
           const strTime= new Date(0,0,0,workTimeArr[0].split(":")[0],workTimeArr[0].split(":")[1],0);
           const endTime = new Date(0,0,0,workTimeArr[1].split(":")[0],workTimeArr[1].split(":")[1],0);
           const diffTime = endTime.getTime() - strTime.getTime();
           
           const diffHour = (diffTime/1000)/3600;
           const diffMin = ((diffTime/1000)%3600)/60;
           
           e.node.setDataValue('currentTime',Math.floor(diffHour)+'시간'+Math.floor(diffMin)+'분')
       }

       if(e.data && e.data.restTime ){//&& e.data.workTime!=='~'
           let restTimeArr  = e.data.restTime.split("~");
           
           let strTime= new Date(0,0,0,restTimeArr[0].split(":")[0],restTimeArr[0].split(":")[1],0);
           let endTime = new Date(0,0,0,restTimeArr[1].split(":")[0],restTimeArr[1].split(":")[1],0);
           let diffTime = endTime.getTime() - strTime.getTime();
           
           let subRestTimeArr  = e.data.subRestTime.split("~");
           
           //휴게시간 총합
           let subStrTime= new Date(0,0,0,subRestTimeArr[0].split(":")[0],subRestTimeArr[0].split(":")[1],0);
           let subEndTime = new Date(0,0,0,subRestTimeArr[1].split(":")[0],subRestTimeArr[1].split(":")[1],0);
           let subDiffTime = subEndTime.getTime() - subStrTime.getTime();
           e.node.setDataValue('totalRestTime', (diffTime/60000)+(subDiffTime/60000)+'분')
       }

       let workArr = (e.data.currentTime).split('시간');
       let workTime = ((workArr[0])*3600 + (workArr[1].replace(/분/gi,''))*60)
       let restTime = ((e.data.totalRestTime).replace(/분/gi,''))*60;
       let overTime = ((e.data.overTime).replace(/분/gi,''))*60;
       let yaguenTime = new uuuu()

       let pass = 'Y'
       if( ((workTime-restTime)+overTime)/3600 > 8 ||
               ((workTime-restTime)+overTime)/3600 < 8 ) {
                   pass = 'N'
       }

       // 야간근무시간
       function uuuu(param1, param2){

       }

       e.node.setDataValue('passYn',pass)
    }
    
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
       async function initGrid(params) {
        try {

            if(!params){
                const d = new Date();
                params = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);
            } 
            //근속연도 세팅 
            const target = document.querySelector('#month-picker')
            params = {
                "branchNo" : 1,
                "yearsMonthDate" : target.value.replace("-","")
            }
            await callApi.getGridData(params).then(res=>{
                if(res.data && res.data.Data){
                      //공통 그리드 데이터 셋팅
                    setRowData(res.data.Data);
                    setGridDefs({columnDefs, defaultColDef, components, onRowEditingStopped});
                }
            })
        }catch{

        }
       };
       initGrid(); 
       //날짜 피커 변경시 콜백으로 리로드 
       picker.setMonthPicker(('#month-picker'),function(value){
            initGrid(value); 
        });
    },[]); //init


    const nextPage = () => {
        let value = document.getElementById('month-picker').value;
        if(!value||value=="") return alert("선택된 연월이 없습니다.");
        
        //저장후 페이지 이동 
        gridCommon.onSaveRow(()=>{
            value = value.replace(/-/gi,'');
            window.location.href="/work/workTableByPersonal/"+value;            
        });
    };

return (
    <WorkTableByGroupPresenter 
        rowData={rowData}
        gridDefs={gridDefs}
        nextPage={nextPage}/>
  );
}

export default WorkTableByGroupContainer;
