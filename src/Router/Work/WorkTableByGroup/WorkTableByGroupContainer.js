import React, { useEffect, useState } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import WorkTableByGroupPresenter from './WorkTableByGroupPresenter'


function WorkTableByGroupContainer() {
     /* 그리드 설정 */ 

    //셀렉박스 맵핑영역
    // const workTypeMappings = {
    //     "1" : "월 - 금"
    //     ,"2" : "월 - 토" 
    //     ,"3" : "월 - 일" 
    // }
    const regEmployeeMappings = {
        "1" : "정규직"
        ,"2" : "계약직" 
        ,"3" : "시간제" 
    }
    let check = true;
    //컬럼 정의
    const columnDefs= [  
        { headerName: "rowId", field: "rowId", hide:true }
        ,{ headerName: "processType", field: "processType", hide:true}
        ,{ headerName: "branchNo", field: "branchNo", hide:true }
        ,{ headerName: "", field: "", width:50 ,  align:'center', resizable:false,editable : false
            ,checkboxSelection:true,headerCheckboxSelection: true,
         }
        //  ,{ headerName: "근무타입", field: "workType",
        //     cellEditor: "select",
        //     cellEditorParams: { values: gridCommon.extractValues(workTypeMappings) },
        //     refData: workTypeMappings
        //     }
        ,{ headerName: "근무팀명", field: "groupName" , width:150
           , valueFormatter:function(params){
               if(!params || !params.value || params.value=='') return;
                return params.value.slice(0,6);
           }}
         ,{ headerName: "근무형태", field: "regularEmployee",  width:120,
            cellEditor: "select",
            cellEditorParams: { values: gridCommon.extractValues(regEmployeeMappings) },
            filter: "agSetColumnFilter",  //-- 필터 사용가능 ! 
            refData: regEmployeeMappings
            }
         ,{ headerName: "최소인원수", field: "workerCount",width:120, align:'center',
             cellEditor:'select', cellEditorParams:{values: function(){
                 const list=[];
                    for(var i=1; i<=100 ;i++){
                        list.push(i);
                    }
                    return list;
                }()
             }, valueFormatter:function(params) { return (!params.value)?'':params.value+'명'}} 
        ,{ headerName: "근무시간",field:"workTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:200}
        ,{ headerName: "야간근무시간", field: "yaguenTime",width:120, editable:true
            ,cellEditor: picker.getTimePicker(), width:200}    
        ,
        ,{ headerName: "휴게시간", field: "restTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:200}
        ,{ headerName: "두번째휴게시간", field: "subRestTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:200}
        ,{ headerName: "현재근무시간", field: "currentTime", width:120,  editable:false,
         valueGetter:function(params){
            if(!params.data.currentTime){
                return "";
            }
            let current = params.data.currentTime;
            var hour = current/60;
            var resultHour = Math.floor(hour);
            var min = current - (resultHour * 60);
            return resultHour+"시간"+min+"분";
        }
         }
        ,{ headerName: "연장근무시간", field: "overTime", cellEditor:'select',width: 120, cellStyle: {color: '#D96D6D'}
           ,valueGetter: function(params){ 
                return params.data.overTime == undefined ? "" : params.data.overTime+'분'} 
         }
       
        ,{ headerName: "권장근무시간", field: "recommTime", width:120, editable:false
            , valueGetter:function(params){ 
                params.data.recommTime = '8시간' 
                return '8시간'
            } }
        ,{ headerName: "검토", field: "passYn", width:80, editable:false,
            valueGetter:function(params){
                return params.data.currentTime == 8 * 60 ? "O" : "X";
            }
        }
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
           if(!workTimeArr[0] || !workTimeArr[1]){
            alert("근무시간을 입력해주세요.");
            check = false;
            return false;    
            }
           //근무시간
           const strTime= new Date(0,0,0,workTimeArr[0].split(":")[0],workTimeArr[0].split(":")[1],0);
           const endTime = new Date(0,0,0,workTimeArr[1].split(":")[0],workTimeArr[1].split(":")[1],0);
           if(endTime <= strTime){
            alert("근무 마지막 시간이 시작 시간보다 큽니다.");
            check = false;
            return false; 
           }
           const diffTime = endTime.getTime() - strTime.getTime();
           const resultHour = (diffTime/1000)/3600;
           var diffHour = Math.floor(resultHour);
           const diffMin = ((diffTime/1000)%3600)/60;
           let allrestTime = 0;
           if(e.data.restTime)
           {
                let restTimeArr  = e.data.restTime.split("~");
                if(!restTimeArr[0] || !restTimeArr[1]){
                    alert("쉬는시간을 입력해주세요.");
                    check = false;
                    return false;    
                    }
                let reststrTime = new Date(0,0,0,restTimeArr[0].split(":")[0],restTimeArr[0].split(":")[1],0);
                let restendTime = new Date(0,0,0,restTimeArr[1].split(":")[0],restTimeArr[1].split(":")[1],0);
                if(restendTime <= reststrTime){
                    alert("쉬는 마지막 시간이 시작 시간보다 큽니다.");
                    check = false;
                    return false; 
                   }
                let diffTime = restendTime.getTime() - reststrTime.getTime();
                const restTimeHour = (diffTime/1000)/3600;
                var resultFirstRestTime = Math.floor(restTimeHour);
                const restTimeMin = ((diffTime/1000)%3600)/60;
                allrestTime = (resultFirstRestTime * 60) + restTimeMin;
             if(e.data.subRestTime){
                let subRestTimeArr  = e.data.subRestTime.split("~");
                if(!subRestTimeArr[0] || !subRestTimeArr[1]){
                    alert("서브쉬는시간을 입력해주세요.");
                    check = false;
                    return false;    
                }
                //휴게시간 총합
                let subStrTime= new Date(0,0,0,subRestTimeArr[0].split(":")[0],subRestTimeArr[0].split(":")[1],0);
                let subEndTime = new Date(0,0,0,subRestTimeArr[1].split(":")[0],subRestTimeArr[1].split(":")[1],0);
                if(subEndTime <= subStrTime){
                    alert("쉬는 마지막 시간이 시작 시간보다 큽니다.");
                    check = false;
                    return false; 
                   }
                let subDiffTime = subEndTime.getTime() - subStrTime.getTime();
                const restTimeHour = (diffTime/1000)/3600;
                var resultFirstRestTime = Math.floor(restTimeHour);
                const restTimeMin = ((subDiffTime/1000)%3600)/60;
                allrestTime += (resultFirstRestTime * 60) + restTimeMin; 
             }
           }
           const allCurrentTime = ((diffHour* 60) + diffMin) - allrestTime;
           if(allCurrentTime < 0){
               alert("휴게시간은 근무시간을 초과할수없습니다.");
               return false;
           }
           const overTime = allCurrentTime - (8 *60);
           e.node.setDataValue('overTime',overTime);
           e.node.setDataValue('currentTime',allCurrentTime)
           let pass = "Y"
           if(allrestTime < 8 * 60 || allrestTime > 8 * 60){
            pass = "N";
           }
           e.node.setDataValue('passYn',pass)
       }
     
    }
    
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
       async function initGrid(params) {
        try {

            if(!params){
                const d = new Date();
                params = d.getFullYear();
            } 
            //근속연도 세팅 
            const target = document.querySelector('#month-picker')
            console.log(target.value);
            params = {
                "branchNo" : 1,
                "yearsMonthDate" : target.value
            }
            await callApi.getGridData(params).then(res=>{
                if(res.data && res.data.Data){
                      //공통 그리드 데이터 셋팅
                    setRowData(res.data.Data);
                    setGridDefs({columnDefs, defaultColDef, components, onRowEditingStopped});
                }
            })
        }catch(error)
        {
            console.log("Catch :" + error);
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
