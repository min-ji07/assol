import React, { useEffect, useState } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import utils from '../../../Utils/utils';
import WorkTableByGroupPresenter from './WorkTableByGroupPresenter'
import { SelectCellEditor } from 'ag-grid-community';
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
    let groupNameInfos = {};
    let check = true;
    let isEdit = true;
    //컬럼 정의

    // 시간설정
    const dateValidation = (date) =>{
        var date = utils.regExr.numOnly(date);
        // var month = date.substring(4,6);
        var time = date.substring(0,2);
        var minute = date.substring(2,4);
        
        if(time > 24 || time < 0){
            return false;
        }

        if(minute > 60 || minute < 0){
            return false;
        }
        return true;
    }

    const columnDefs= [  
        { headerName: "rowId", field: "rowId", hide:true }
        ,{ headerName: "processType", field: "processType", hide:true}
        ,{ headerName: "branchNo", field: "branchNo", hide:true }
        ,{ headerName: "", field: "", width:35 ,  align:'center', resizable:false,editable : false
            ,checkboxSelection:true,headerCheckboxSelection: true,
         }
        ,{ headerName: "근무팀명", field: "groupName" , width:150, editable : true
           , valueGetter:function(params){
               return params.data.groupName;
          }
        }
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

        ,{ headerName: "정규근무시간",field:"workTime", editable:true, width: 200
            ,cellEditor: picker.getTimePickerInput() 

            // ,valueFormatter: function(params){
            //     var num2 = "" + params.data.workTime;
            //     console.log(num2);
            //     var strhour = num2.substr(0,2);
            //     var strminu = num2.substring(3,5);
            //     var endhour = num2.substring(6,8);
            //     var endninu = num2.substring(9,11);
            //     console.log(strhour, strminu, endhour, endninu);
            // }
        }
        ,{ headerName: "휴게시간1", field: "restTime", editable:true, width:200,
        cellEditor: picker.getTimePickerInput()}
            // valueFormatter: function(params){
            //     var num = utils.regExr.numOnly(params.data.restTime);
            //     var checkVal = utils.regExr.date(num.substring(0,4));
            //     var checkVal2 = utils.regExr.date(num.substring(4,8));
            //     if(!dateValidation(checkVal) || !dateValidation(checkVal2) || checkVal > checkVal2){
            //         return "";
            //     }
            //     return utils.regExr.dateTime(num);
            // }
        // }
        ,{ headerName: "휴게시간2", field: "subRestTime", editable:true, width:200
            ,cellEditor: picker.getTimePickerInput()}
        //     ,valueFormatter: function(params){
        //         var num = utils.regExr.numOnly(params.data.subRestTime);
        //         var checkVal = utils.regExr.date(num.substring(0,4));
        //         var checkVal2 = utils.regExr.date(num.substring(4,8));
        //         if(!dateValidation(checkVal) || !dateValidation(checkVal2) || checkVal > checkVal2){
        //             return "";
        //         }
        //         return utils.regExr.dateTime(num);
        //     }
        // }
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
         ,{ headerName: "야간근무시간", field: "nightTime", width: 120, cellStyle: {color: '#D96D6D'}, editable : false
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
        ,{ headerName: "연장근무시간", field: "overTime", width: 120, cellStyle: {color: '#D96D6D'}, editable : false
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
        ,{ headerName: "검토", field: "passYn", width:90, editable:false,
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
    let preGroupName = '';
    //컴포넌트 세팅
    const components =  { }
    const onCellEditingStarted = function(e){
        if(e.data){
            if(e.data.groupName)
            console.log('그룹명 :',e.data.groupName)
            preGroupName = e.data.groupName;
            return true;
        }
    }


    //현 페이지에서 정의된 함수 호출
    const onRowEditingStopped = function(e) {
        if(e.data){
           for (var key in groupNameInfos){
                if(key == e.data.rowId){
                    continue;
                }
                else{
                    if(groupNameInfos[key] == e.data.groupName){
                        alert("동일한 그룹 이름이 있습니다 다시 확인해주세요");
                        isEdit = false;
                        e.node.setDataValue('groupName',preGroupName)
                        var params = {
                            rowIndex : e.rowIndex,
                            colKey : 'groupName'
                        }
                        gridCommon.startEditingCell(params);
                        return false;
                    }
                }
           } 
        }
        if(e.data && e.data.workTime ) {//&& e.data.workTime!=='~'
            console.log(e.data);
            let workTimeArr  = e.data.workTime.split("~");
            //console.log('ㅇㅇ',workTimeArr[1].value); // 안나옴
           if(!workTimeArr == null || !workTimeArr == ""){
                console.log(workTimeArr,': workTimeArr');
                var strhour = workTimeArr[0].substring(0,2);
                var strminu = workTimeArr[0].substring(3,5);
                var endhour = workTimeArr[1].substring(0,2);
                var endminu = workTimeArr[1].substring(3,5);
                console.log(strhour,endhour,"시간",strminu,endminu,"분" )
                if(strhour >= 25 || endhour >= 25){
                    alert('근무시간을 다시 설정해주세요.');
                    return false;
                }else if(strminu > 60 || endminu > 60){
                    alert('시간이 올바르지 않습니다.')
                    return false;
                }else if(strhour == 24 || endhour == 24){
                    if(strminu >= 1 || endminu >= 1){
                        alert('시간을 확인해주세요.');
                    }
                }else{

                }
           }else if(!workTimeArr[0] || !workTimeArr[1]){
                alert("근무시간을 입력해주세요.");

                if(workTimeArr[0].value < 60){
                    console.log(workTimeArr[0]);
                }

                console.log(!workTimeArr[0]);
                console.log(!workTimeArr[1]);

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

           if(e.data && e.data.restTime){
            let restTimeArr  = e.data.restTime.split("~");
            // if(!restTimeArr[0] || !restTimeArr[1]){
            if(!restTimeArr == null || !restTimeArr == ""){
                // 근무시간
                var workstrhour = workTimeArr[0].substring(0,2);
                var workstrminu = workTimeArr[0].substring(2,4);
                var workendhour = workTimeArr[1].substring(0,2);
                var endninuW = workTimeArr[1].substring(2,4);
                // 휴게시간
                var reststrhour = restTimeArr[0].substring(0,2);
                var strminu = restTimeArr[0].substring(2,4);
                var restendhour = restTimeArr[1].substring(0,2);
                var endninu = restTimeArr[1].substring(2,4);

                if(workstrhour < reststrhour && workendhour < restendhour){ 
                    alert('rest.');
                }
            }
             console.log(restTimeArr,'restTimeArr');
             const strRestTime = new Date(0,0,0,restTimeArr[0].split(":")[0],restTimeArr[0].split(":")[1],0); // 시간
             const endRestTime = new Date(0,0,0,restTimeArr[1].split(":")[0],restTimeArr[1].split(":")[1],0);
             var allStrRestMin = (strRestTime.getHours() * 60) + strRestTime.getMinutes();  // 20시 20
             var allEndRestMin = (endRestTime.getHours() * 60) + endRestTime.getMinutes();
             var restMin = 0;
             console.log('restMin',restMin);

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
           //if(e.data.subRestTime){
           if(e.data && e.data.subRestTime){
                if(!e.data.restTime){
                    alert ("휴게시간1을 먼저 입력해주세요");
                    return false;
                }else{
                    let subRestTimeArr  = e.data.subRestTime.split("~");
                    console.log(subRestTimeArr, 'subRestTimeArr');
                    // if(!restTimeArr[0] || !restTimeArr[1]){
                    if(!subRestTimeArr == null || !subRestTimeArr == "" ){
                        // 휴게시간2
                        var strhour = subRestTimeArr[0].substring(0,2);
                        var strminu = subRestTimeArr[0].substring(2,4);
                        var endhour = subRestTimeArr[1].substring(0,2);
                        var endninu = subRestTimeArr[1].substring(2,4);
                        // 근무시간
                        var strhourW = workTimeArr[0].substring(0,2);
                        var strminuW = workTimeArr[0].substring(2,4);
                        var endhourW = workTimeArr[1].substring(0,2);
                        var endninuW = workTimeArr[1].substring(2,4);

                        if(strhourW < strhour || endhourW < endhour){
                            alert('근무시간 이후의 시간은 입력할 수 없습니다.');
                        }else if(strminuW < strminu || endninuW < endninu){
                            alert('근무시간 이후의 시간은 입력할 수 없습니다.');
                        }else{

                        }
                    
                    // alert("근무시간을 입력해주세요.");
                    //     check = false;
                    //     return false;    
                    }

                   const strsubRestTime = new Date(0,0,0,subRestTimeArr[0].split(":")[0],subRestTimeArr[0].split(":")[1],0);
                   const endsubRestTime = new Date(0,0,0,subRestTimeArr[1].split(":")[0],subRestTimeArr[1].split(":")[1],0);
                   var allStrsubMin = (strsubRestTime.getHours() * 60) + strsubRestTime.getMinutes();
                   var allEndsubMin = (endsubRestTime.getHours() * 60) + endsubRestTime.getMinutes();
                   var restMin = 0;
                   
                   if(allStrsubMin > allEndsubMin)
                   {
                      restMin = (24 * 60) - (allStrsubMin - allEndsubMin);
                   }
                   else {
                      if(allStrsubMin == allEndsubMin){
                          alert("쉬는시간 범위를 다시 지정해 주세요");
                          return false;
                      }
                      restMin = allEndsubMin - allStrsubMin;
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



           
            // 검토
           overTime = (allWorkTime + nightTime) - (8 * 60);
        //    console.log(overTime,'overTime');
        //    console.log(allWorkTime,'allWorkTime');
        //    console.log(nightTime,'nightTime');

           let pass = overTime != 0 ? "N" : "Y";
           if(overTime < 0 ){
               overTime = 0;
           }
           e.node.setDataValue('nightTime',nightTime)
           e.node.setDataValue('currentTime',allWorkTime)
           e.node.setDataValue('overTime',overTime);
           
           e.node.setDataValue('passYn',pass)
           isEdit  = true;
       }
     
    }
    


    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    const [rowData, setRowData] = useState([]);
    
    useEffect(()=>{
       async function initGrid(params) {
        try {
            //근속연도 세팅 
            const target = $('#month-picker');
            params = {
                "branchNo" : 29,
                "yearsMonthDate" : target.val()
                // .replace("-","")
            }
            try{
                console.log(params);
                await callApi.getGridData(params).then(res=>{
                    console.log('사원조회',res.data.Data); // workTime 왜 자꾸 사라지는겨
                    if(res.data && res.data.Data){
                        for(var i = 0 ; i <res.data.Data.length; ++ i){
                            let groupNameInfo = res.data.Data[i];
                            groupNameInfos[groupNameInfo.rowId] = groupNameInfo.groupName;
                        }
                        //공통 그리드 데이터 셋팅
                        setRowData(res.data.Data);
                        setGridDefs({columnDefs, defaultColDef, components, onRowEditingStopped,onCellEditingStarted});
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
       //날짜 피커 변경시 콜백으로 리로드 
       
    },[]); //init


    const nextPage = (callback) => {
        let value = document.getElementById('month-picker').value;
        if(!value||value=="") return alert("선택된 연월이 없습니다.");
        //저장후 페이지 이동 
        var result = gridCommon.onSaveRow((callback));
        if(result == false){
            
            return false;
        }
        value = value.replace(/-/gi,'');
        window.location.href="/work/workTableByPersonal/"+value;            
    };

    const backPage = () => {
        window.location.href="/work/workTableMain"
    }

return (
    <WorkTableByGroupPresenter 
        rowData={rowData}
        gridDefs={gridDefs}
        backPage={backPage}
        nextPage={nextPage}/>
  );
}

export default WorkTableByGroupContainer;
