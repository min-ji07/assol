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
               refData: workersMap
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
                }
               ,{ headerName: "휴가종료일", field: "endDate", width:200, cellEditor: picker.setBreakTimePicker()
                    ,valueGetter : function(params){
                        if(params.data.annualType == 3){
                               return params.data.startDate; 
                        }
                        return params.data.endDate; 
                    }
                }
               ,{ headerName: "휴가구분", field: "annualType", width:150  ,
                    cellEditor: "select",
                    cellEditorParams: { values : gridCommon.extractValues(annalMaps)},refData: annalMaps}

                ,{ headerName: "상세구분", field: "detailType", width:150 , editable : function (params){
                    return params.data.annualType == 3 ? true : false;
                },
                    cellEditor: "select",
                    cellEditorParams: { values: gridCommon.extractValues(afterMaps)}, refData: afterMaps,
                    valueGetter : function(params){
                        return params.data.annualType != 3 ? 0 : params.data.annualType;  
                    } 
                    // ,
                    // valueGetter:function(params){
                    //     console.log(params,"밸류게터!!! 왜 값을 두개 가져오는겨");
                    // }
                }

               ,{ headerName: "사용일수", field: "employeeNumber", width:120 
                    , editable:false
                    , valueGetter:function(params){
                        // console.log('사용일수' + params);
                        var endDate = new Date(params.data.endDate);
                        var startDate = new Date(params.data.startDate);
                        //console.log(Math.ceil(cal / (1000 * 3600 * 24)));
                        var count = 0;
                        var temp_date = startDate;

                        // 반차일때 무조건 0.5로...?
                        if(params.data.annualType == "3"){
                            return 0.5;
                        }
                        while(params.data.endDate != undefined && params.data.startDate != undefined) {                              
                            
                            if(temp_date.getTime() > endDate.getTime()) {
                                // console.log("count : " + count);
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
               ,{ headerName: "휴가사유", field: "reason", width:168 }
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

    const onRowEditingStopped = function(e) { 
        if(e.data && e.data.startDate ) {//&& e.data.workTime!=='~'
           let startDate  = e.data.startDate.split("-");
           if(!startDate[0] || !startDate[1]){
                alert("휴가시작일을 입력해주세요.");
                check = false;
                return false;    
            }
           //근무시간
        //    const strTime= new Date(0,0,0,workTimeArr[0].split(":")[0],workTimeArr[0].split(":")[1],0);
        //    const endTime = new Date(0,0,0,workTimeArr[1].split(":")[0],workTimeArr[1].split(":")[1],0);
        //    if(endTime <= strTime){
        //     alert("휴가 시작일보다 ");
        //     check = false;
        //     return false; 
        //    }

            // const diffTime = endTime.getTime() - strTime.getTime();
            // const resultHour = (diffTime/1000)/3600;
            // var diffHour = Math.floor(resultHour);
            // const diffMin = ((diffTime/1000)%3600)/60;
            // let allrestTime = 0;
            // if(e.data.restTime){
            // let restTimeArr  = e.data.restTime.split("~");
            // if(!restTimeArr[0] || !restTimeArr[1]){
            //     alert("휴가종료일을 입력");
            //     check = false;
            //     return false;    
            // }
            // let reststrTime = new Date(0,0,0,restTimeArr[0].split(":")[0],restTimeArr[0].split(":")[1],0);
            // let restendTime = new Date(0,0,0,restTimeArr[1].split(":")[0],restTimeArr[1].split(":")[1],0);
            // if(restendTime < reststrTime){
            //     alert("휴가 시작일보다 종료일이 어쩌고");
            //     check = false;
            //     return false; 
            // }
            //     let diffTime = restendTime.getTime() - reststrTime.getTime();
            //     const restTimeHour = (diffTime/1000)/3600;
            //     var resultFirstRestTime = Math.floor(restTimeHour);
            //     const restTimeMin = ((diffTime/1000)%3600)/60;
            //     allrestTime = (resultFirstRestTime * 60) + restTimeMin;
            //     if(e.data.subRestTime){
            //         let subRestTimeArr  = e.data.subRestTime.split("~");
            //         if(!subRestTimeArr[0] || !subRestTimeArr[1]){
            //             alert("휴가구분");
            //             check = false;
            //             return false;    
            //         }


                // 휴가구분을 체크
                // 상세구분을 체크
                // 휴게시간 총합
                // 휴가사유를 입력 

            //     let subStrTime= new Date(0,0,0,subRestTimeArr[0].split(":")[0],subRestTimeArr[0].split(":")[1],0);
            //     let subEndTime = new Date(0,0,0,subRestTimeArr[1].split(":")[0],subRestTimeArr[1].split(":")[1],0);
            //     if(subEndTime < subStrTime){
            //         alert("쉬는 마지막 시간이 시작 시간보다 큽니다.");
            //         check = false;
            //         return false; 
            //        }
            //     let subDiffTime = subEndTime.getTime() - subStrTime.getTime();
            //     const restTimeHour = (diffTime/1000)/3600;
            //     var resultFirstRestTime = Math.floor(restTimeHour);
            //     const restTimeMin = ((subDiffTime/1000)%3600)/60;
            //     allrestTime += (resultFirstRestTime * 60) + restTimeMin; 
            //  }
                    }
                    // const allCurrentTime = ((diffHour* 60) + diffMin) - allrestTime;
                    // if(allCurrentTime < 0){
                    //     alert("휴게시간은 근무시간을 초과할수없습니다.");
                    //     return false;
                    // }
                    // var overTime = allCurrentTime - (8 *60);
                    // overTime = overTime < 0 ? 0 : overTime;
                    // e.node.setDataValue('overTime',overTime);
                    // e.node.setDataValue('currentTime',allCurrentTime)
                    // let pass = "Y"
                    // if(allrestTime < 8 * 60 || allrestTime > 8 * 60){
                    //     pass = "N";
                    // }
                    // e.node.setDataValue('passYn',pass)
                }
                
        //         }
        // }



    // useEffect(()=>{
    //     async function init() {
    //         setGridDefs(gridSetting()); // 헤더보임
    //         let rowData = [
    //             {
    //                 "userName" : "김민지",
    //                 "employeeNumber":"20200422",
    //                 "position":"사원",
    //                 "yearsMonthDate":"2020-04",
    //                 "startDate":"2020-04-08 ",
    //                 "endDate":"2020-04-10",
    //                 "annualType":"연차",
    //                 "employeeNumber":0,
    //                 "reason":"집에가고싶다!"
    //             }
    //         ];
    //         setRowData(rowData);

    //      try {
    //         await callApi.getUserInfo(params).then(res => {
    //             console.log('나오나?'+ res);
    //             if(res.data.Errorcode == 1) {
    //                 alert(res.data.Msg);
    //                 return;
    //             }

    //             if(res.data.Data != null){
    //                 for(var i=0; i<res.data.Data.length; i++){
    //                     let user = res.data.Data[i];
    //                     console.log(res);
    //                     workersMap[user.userNo] = user.userName;
    //                     workersNumber[user.userNo] = user.employeeNumber;
    //                     workersPosition[user.userNo] = regPositionMappings[user.position];
    //                 }
    //             }else if (res.data.Data == null ){
    //                 console.log('암것도 엇ㅂ음');
    //             }
    //         });
    //      }catch{
    //      }
    //     };
    //     init();
    //  },[]); //init


    return (
        <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
    )
}

export default WorkRestDay;