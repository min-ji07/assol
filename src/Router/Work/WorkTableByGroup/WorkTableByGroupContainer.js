import React, { useEffect, useState } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import WorkTableByGroupPresenter from './WorkTableByGroupPresenter'
/* 근무조 설정 */ 


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
        ,{ headerName: "정규근무시간",field:"workTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:200}
        
        ,{ headerName: "휴게시간1", field: "restTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:200}
        ,{ headerName: "휴게시간2", field: "subRestTime", editable:true
            ,cellEditor: picker.getTimePicker(), width:200}
        ,{ headerName: "정규근무시간", field: "currentTime", width:120,  editable:false,
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
         ,{ headerName: "야간근무시간", field: "nightTime", cellEditor:'select',width: 120, cellStyle: {color: '#D96D6D'}
            ,valueGetter: function(params){ 
                if(!params.data.nightTime){
                    return "";
                }
                let current = params.data.nightTime;
                var hour = current/60;
                var resultHour = Math.floor(hour);
                var min = current - (resultHour * 60);
                return resultHour+"시간"+min+"분";
            }
        }
        ,{ headerName: "연장근무시간", field: "overTime", cellEditor:'select',width: 120, cellStyle: {color: '#D96D6D'}
                ,valueGetter: function(params){ 
                    if(!params.data.overTime){
                        return "";
                    }
                    let current = params.data.overTime;
                    var hour = current/60;
                    var resultHour = Math.floor(hour);
                    var min = current - (resultHour * 60);
                    return resultHour+"시간"+min+"분";
                }
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
           const strTime = new Date(0,0,0,workTimeArr[0].split(":")[0],workTimeArr[0].split(":")[1],0);
           const endTime = new Date(0,0,0,workTimeArr[1].split(":")[0],workTimeArr[1].split(":")[1],0);
           var allStrTimeMin = (strTime.getHours() * 60) + strTime.getMinutes();  
           var allEndTimeMin = (endTime.getHours() * 60) + endTime.getMinutes();
           let nightTime = 0;
           let nightStartLimit = 22 * 60;
           let nightLastLimit = 6 * 60;
           let allWorkTime = 0;
           let overTime = 0;
           if(allStrTimeMin > allEndTimeMin){
                if(nightStartLimit <= allStrTimeMin){
                    
                    if(allEndTimeMin >= 0 && allEndTimeMin<=nightLastLimit){
                        nightTime += ((24* 60) - allStrTimeMin);
                        nightTime +=  allEndTimeMin;
                    }
                    else {
                        nightTime += ((24* 60) - allStrTimeMin);
                        nightTime +=  nightLastLimit;
                        if(nightStartLimit < allEndTimeMin){
                            nightTime += allEndTimeMin - nightStartLimit;
                            allWorkTime = nightStartLimit - nightLastLimit;
                        }
                        else {
                            allWorkTime = allEndTimeMin - nightLastLimit;
                        }
                    }
                    
                }
                else{
                 
                    if(allEndTimeMin >=0 && allEndTimeMin <= nightLastLimit){
                        allWorkTime = nightStartLimit - allStrTimeMin;
                        nightTime = ((24* 60) - nightStartLimit)  + allEndTimeMin;
                    }
                    else if (allEndTimeMin > nightLastLimit){
                        
                        allWorkTime = (nightStartLimit - allStrTimeMin) + (allEndTimeMin - nightLastLimit);
                        nightTime = ((24* 60) - nightStartLimit)  + nightLastLimit;
                    }
                    
                }
            
           }
           else if(allStrTimeMin < allEndTimeMin){
                if(allStrTimeMin >= 0 && allStrTimeMin <= nightLastLimit){
                    if(allEndTimeMin <= nightLastLimit){
                        nightTime = allEndTimeMin - allStrTimeMin; 
                    }
                    else{
                        if(allStrTimeMin == nightLastLimit){
                            allWorkTime = allEndTimeMin - allStrTimeMin;
                            if(allEndTimeMin > nightStartLimit){
                                nightTime = nightStartLimit -allEndTimeMin;
                            } 
                        }
                        else{
                            nightTime = nightLastLimit - allStrTimeMin;
                            if(allEndTimeMin <= nightStartLimit){
                                allWorkTime = allEndTimeMin - nightLastLimit;
                            }
                            else{
                                nightTime +=  allEndTimeMin - nightStartLimit 
                                allWorkTime = nightStartLimit - nightLastLimit;
                            }
                        }
                        
                    }
                }
                else if(allStrTimeMin > nightLastLimit){
                    if(allEndTimeMin <= nightStartLimit){
                        allWorkTime = allEndTimeMin - allStrTimeMin;  
                    }
                    else {
                        allWorkTime = nightStartLimit - allStrTimeMin;
                        nightTime = allEndTimeMin - nightStartLimit;
                    }
                }
               
           }
           else {
                var allTimeMin = 24 * 60;
                nightTime = 8 * 60;
                allWorkTime = allTimeMin - nightTime;
           }
           if(e.data.restTime)
           {
            let restTimeArr  = e.data.restTime.split("~");
            if(!restTimeArr[0] || !restTimeArr[1]){
             alert("근무시간을 입력해주세요.");
             check = false;
             return false;    
             }
             const strRestTime = new Date(0,0,0,restTimeArr[0].split(":")[0],restTimeArr[0].split(":")[1],0);
             const endRestTime = new Date(0,0,0,restTimeArr[1].split(":")[0],restTimeArr[1].split(":")[1],0);
             var allStrRestMin = (strRestTime.getHours() * 60) + strRestTime.getMinutes();
             var allEndRestMin = (endRestTime.getHours() * 60) + endRestTime.getMinutes();
             var restMin = 0;

             if(allStrRestMin > allEndRestMin)
             {
                 console.log("restMin" + restMin);
                restMin = (24 * 60) - (allStrRestMin - allEndRestMin);
             }
             else {
                if(allStrRestMin == allEndRestMin){
                    alert("쉬는시간 범위를 다시 지정해 주세요");
                    return false;
                }
                restMin = allEndRestMin - allStrRestMin;
             }
             if(nightTime > 0){
                var result = nightTime - restMin;
                if(result < 0 ){
                    restMin -= nightTime;
                    nightTime = 0;
                    if(allWorkTime > 0){
                        result = allWorkTime - restMin;
                        if(result <= 0){
                            alert("휴게 시간은 총 근무시간보다 많을수 없습니다.");
                            return false;
                        }
                    }
                }
                else{
                    nightTime -= restMin;
                    restMin = 0;
                }
             }
             if(restMin > 0)
             {
                var result = allWorkTime - restMin;
                if(result <= 0){
                    if(result <= 0){
                        alert("휴게 시간은 총 근무시간보다 많을수 없습니다.");
                        return false;
                    }
                }
                allWorkTime -= restMin;
             }
             
           }
           if(e.data.subRestTime)
           {
                if(!e.data.restTime){
                    alert ("휴게시간1을 먼저 입력해주세요");
                    return false;
                }
                else{
                   let restTimeArr  = e.data.subRestTime.split("~");
                   if(!restTimeArr[0] || !restTimeArr[1]){
                   alert("근무시간을 입력해주세요.");
                      check = false;
                      return false;    
                   }
                   const strRestTime = new Date(0,0,0,restTimeArr[0].split(":")[0],restTimeArr[0].split(":")[1],0);
                   const endRestTime = new Date(0,0,0,restTimeArr[1].split(":")[0],restTimeArr[1].split(":")[1],0);
                   var allStrRestMin = (strRestTime.getHours() * 60) + strRestTime.getMinutes();
                   var allEndRestMin = (endRestTime.getHours() * 60) + endRestTime.getMinutes();
                   var restMin = 0;
                   
                   if(allStrRestMin > allEndRestMin)
                   {
                      restMin = (24 * 60) - (allStrRestMin - allEndRestMin);
                   }
                   else {
                      if(allStrRestMin == allEndRestMin){
                          alert("쉬는시간 범위를 다시 지정해 주세요");
                          return false;
                      }
                      restMin = allEndRestMin - allStrRestMin;
                   }
                   if(nightTime > 0){
                      var result = nightTime - restMin;
                      if(result < 0 ){
                          restMin -= nightTime;
                          nightTime = 0;
                          if(allWorkTime > 0){
                              result = allWorkTime - restMin;
                              if(result <= 0){
                                  alert("휴게 시간은 총 근무시간보다 많을수 없습니다.");
                                  return false;
                              }
                          }
                      }
                      else{
                          nightTime -= restMin;
                          restMin =0;
                      }
                    }
                    if(restMin > 0)
                    {
                       var result = allWorkTime - restMin;
                       if(result <= 0){
                           if(result <= 0){
                               alert("휴게 시간은 총 근무시간보다 많을수 없습니다.");
                               return false;
                           }
                       }
                       allWorkTime -= restMin;
                    }
              }
            }
           

           overTime = (allWorkTime + nightTime) - (8 * 60);
           let pass = overTime != 0 ? "N" : "Y";
           if(overTime < 0 ){
               overTime = 0;
           }
           e.node.setDataValue('nightTime',nightTime)
           e.node.setDataValue('currentTime',allWorkTime)
           e.node.setDataValue('overTime',overTime);
           
          
           e.node.setDataValue('passYn',pass)
       }
     
    }
    
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
       async function initGrid(params) {
        try {
            // console.log("HI");
            if(!params){
                const d = new Date();
                params = d.getFullYear();
            } 
            //근속연도 세팅 
            const target = $('#month-picker');
            console.log(target.val());
            params = {
                "branchNo" : 29,
                "yearsMonthDate" : target.val().replace("-","")
            }
            try{
                console.log('dddd');
                
                console.log(params);
                await callApi.getGridData(params).then(res=>{
                    console.log(res.data.Data);
                    if(res.data && res.data.Data){
                          //공통 그리드 데이터 셋팅
                        setRowData(res.data.Data);
                        setGridDefs({columnDefs, defaultColDef, components, onRowEditingStopped});
                    }
                })
            }
            catch(error){
                console.log("Catch :" + error);
            }
        }catch(error)
        {
            console.log("Catch :" + error);
        }
       };
        picker.setMonthPicker(('#month-picker'),function(value){
            initGrid(value); 
        });
       initGrid(); 
       //날짜 피커 변경시 콜백으로 리로드 
       
    },[]); //init


    const nextPage = (callback) => {
        let value = document.getElementById('month-picker').value;
        if(!value||value=="") return alert("선택된 연월이 없습니다.");
        
        //저장후 페이지 이동 
        gridCommon.onSaveRow((callback)=>{
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
