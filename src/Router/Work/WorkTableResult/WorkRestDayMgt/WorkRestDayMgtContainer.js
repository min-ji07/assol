import React, { useEffect, useState } from 'react';
import WorkRestDayMgtPresenter from './WorkRestDayMgtPresenter';
import { callApi } from '../../../../Utils/api';
import picker from '../../../../Utils/datepicker';
import $ from 'jquery';

const WorkRestDayMgtContainer = () => {

    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    const workRestDayPopup = (date) =>{
        date = date.replace(/\//g,"");
        const month = date.substring(0,2);
        const day = date.substring(2,4);
        const year = date.substring(4,8);
        const yearsMonthDate = year + month;
        const searchDate = year + "-" + month + "-" + day;
        const params = {
            "branchNo" : "1",
            "yearsMonthDate" :yearsMonthDate,
            "searchDate" :searchDate
        }
        $("#dayContent").text(day);
        $("#calendarPop").show();
    }
    
    useEffect(()=>{
        async function init() {
         try {
            let testParam = {
                "branchNo" : 1,
                "yearsMonthDate" :"202004"
            }
             await callApi.getPersonalRestDayMontly(testParam).then(res=> {
                setRowData(res.data.Data);
                setGridDefs(gridSetting());


                callApi.getPersonalRestDayMontlyCalendar(testParam).then(res=>{
                    const errorCode = res.data.ErrorCode;
                    const eventDates = res.data.Data;
                    if(errorCode === 1){
                        alert(res.data.Msg);
                        return;
                    }

                    $("#calendarPop").hide(); 
                    picker.setPersonalRestInfo(('#custom-cells'),eventDates,workRestDayPopup);
                });
             });
         }catch{
 
         }
        };
        init();

        
     },[]); //init

     const calendarPop = (value) => {
        const params = {
            "branchNo" : "1",
            "yearsMonthDate" :"202004",
            "searchDate" :"2020-04-01"
        }
       // WorkRestDayCalendar(params);
     }


     const gridSetting =()=>{
           const columnDefs= [    //컬럼 정의
               { headerName: "rowId", field: "rowId", hide:true }
               ,{ headerName: "processType", field: "processType", hide:true}
               ,{ headerName: "branchNo", field: "branchNo", hide:true }
               ,{ headerName: "사원번호", field: "userNo",hide:true}
               ,{ headerName: "이름", field: "userName"}
               ,{ headerName: "직책", field: "position"}
               ,{ headerName: "입사일", field: "joinDate"}
               ,{ headerName: "연간연차수", field: "yearsAnnual"}
               ,{ headerName: "사용일수", field: "useAnnual"
                    ,cellRenderer:function(params){
                        //validation 
                        if(!params || !params.value) return '';
                        return `<span class='txt_red'>${params.value}</span>`
                    } 
                } 
               ,{ headerName: "잔여일수", field: "remainAnnual"
                    ,cellRenderer:function(params){
                        if(!params || !params.value) return '';
                        return `<span class='txt_blue'>${params.value}</span>`
                    }
                }
           ]

           //기본컬럼 정의
           const defaultColDef ={
               width: 100
               ,editable : false 
               ,cellStyle: {textAlign: 'center'}
               ,resizable : true
           } 
   
           //컴포넌트 세팅 왜안먹지 ㅠ
           const components = {  };
           return {columnDefs, defaultColDef, components};
       }



    return (
        <>
        {
            rowData && rowData!==[] &&    
            gridDefs && gridDefs!=={} && 
            <WorkRestDayMgtPresenter
                rowData={rowData}
                gridDefs={gridDefs}
            /> 
        } 
        </>      
    )
}

export default WorkRestDayMgtContainer;
