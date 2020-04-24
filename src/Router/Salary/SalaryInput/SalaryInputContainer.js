import React, { useEffect, useState } from 'react';
import SalaryInputPresenter from './SalaryInputPresenter'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import picker from '../../../Utils/datepicker';
import utils from '../../../Utils/utils';
import useHook from '../../../GlobalState/Hooks/useHook';

function SalaryInputContainer() {
    const { state } = useHook();

    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의

    const [rowData2, setRowData2] = useState([]); //그리드 데이터 
    const [gridDefs2, setGridDefs2] = useState({}); //그리드 정의

    const branchNo = 29;

    const selectInit = () => {
        
    }

    

    let addRowJson = {};

    // const regEmployeeMappings = {
    //     "0" : "사회복지사"
    //     ,"1" : "요양보호사" 
    //     ,"2" : "시간제" 
    //     ,"3" : "사무원" 
    //     ,"4" : "시설장" 
    //     ,"5" : "조리원" 
    //     ,"6" : "운전사" 
    //     ,"7" : "물리치료사" 
    //     ,"8" : "촉탁의" 
    //     ,"9" : "대표" 
    // }

    
    
    useEffect(()=>{
        setGridDefs(gridSetting());
        setGridDefs2(gridSetting2());
        picker.setMonthPicker(('#month-picker'),function(value){
            // selectInit();
        });
        const payDegree = $("#payDegree").val();
        const yearMonthDate = $("#month-picker").val();
        
        console.log(yearMonthDate);

        let params = {
            branchNo : branchNo,
            payDegree : payDegree,
            yearMonthDate : utils.regExr.numOnly(yearMonthDate),
            userType : 0
        }
        console.log(params);
        async function init(params) {
            try {
                await callApi.initPayRollPage(params).then(res=> {
                    // res.data.PayData[0].position = "사회복지사";

                    console.log(res);

                    /* 사원 리스트 */
                    setRowData(res.data.UserData);
                    setOtherColumn(res.data.OtherData);
                    // setRowData2(res.data.PayData);
                });
            }catch(error){

            }
       }
       init(params);

        // selectInit();

       bindEvent();
    },[]); //init

    const bindEvent = () => {
        // $("#btnAddRow").on("click",function(){
            
        // });
    }

    const gridSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "rowId", field: "rowId", hide:true }
               ,{headerName: "유저타입", field: "userType", hide:true }
               ,{headerName: "성명 ",field:"userName", width:95}
               ,{headerName: "직책", field: "position", width:117}
               ,{ headerName: "사원번호", field: "employeeNumber", width:101}
           ]
   
           //기본컬럼 정의
           const defaultColDef ={
               width: 100
               ,editable : false
               ,cellStyle: {textAlign: 'center'}
               ,resizable : true
           }
   
           //컴포넌트 세팅 
           const components = {  };

           //그리드 id 세팅
           const gridId = "userListGrid";

           //클릭 이벤트
           const onRowDoubleClicked = (e) => {
                let employeeNumber = e.data.employeeNumber;
                let userNo = e.data.userNo;
                let userType = e.data.userType;
                let payDegree = $("#payDegree").val();
                let yearMonthDate = $("#month-picker").val();
                let params = {
                    "yearMonthDate" : utils.regExr.numOnly(yearMonthDate),
                    "payDegree" : payDegree,
                    "branchNo": branchNo,
                    "userType": userType,
                    "userNo" : userNo
                 }
                console.log(params);
                userSelect(params);
            }
            
           return {columnDefs, defaultColDef, components, gridId, onRowDoubleClicked};
    }

    const userSelect = (params) => {
        async function init(params) {
            try {
                await callApi.selectTargetUser(params).then(res=> {   
                    console.log(res,"타겟유저");

                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        if(res.data.Data.length <= 1){
                            // alert("급여입력 정보가 없습니다.");
                        } else{
                            // setRowData(res.data.Data);
                        }
                        // setOtherColumn(res.data.Data[0],res.data.OtherData);
                        setAddRow(res.data.Data[0],res.data.OtherData);
                    }
                });
            }catch{

            }
       }
       init(params);
    }

    const gridSetting2 =()=>{
        //컬럼 정의
            const columnDefs = defaultColumnJson();
          
   
           //기본컬럼 정의
           const defaultColDef ={
               width: 100
               ,editable : true
               ,cellStyle: {textAlign: 'center'}
               ,resizable : true
           } 
   
           //컴포넌트 세팅 
           const components = {  };

           const gridId = "salaryInputGrid";
       
           return {columnDefs, defaultColDef, components, gridId};
    }

    const setAddRow = (baseData,otherData) => {
        addRowJson = baseData;
        var i = 0;
        for(i in otherData){
            addRowJson["addColumnSalary"+otherData[i].title] = utils.regExr.numOnly(otherData[i].value);
        }
        gridCommon.onAddRow("",addRowJson);
    }

    const setOtherColumn = (otherData) => {
        let columnDefs = defaultColumnJson();
        var i = 0;
        
        for(i in otherData){
            const title = otherData[i].title;
            const filedVal = "addColumnSalary"+title;
            console.log(title);
            let addColumn = addColumnJson(title,filedVal);
            columnDefs.push(addColumn);
        }

        gridCommon.setColumnDefs(columnDefs);
    }

    const defaultColumnJson = () => {
        const arr = [
            { headerName: "rowId", field: "rowId", hide:true }
            ,{headerName: "성명 ",field:"userNo", width:120, hide:true}
            ,{headerName: "성명 ",field:"userName", width:120}
            ,{headerName: "직책", field: "position", width:140}
            ,{ headerName: "사원번호", field: "employeeNumber", width:120}
            ,{ headerName: "기본급", field: "baseSalary", width:120
                ,valueFormatter: function(params) {
                    return utils.regExr.comma(params.value);
                }
            }
            ,{ headerName: "식비", field: "foodSalary", width:120,
                valueFormatter: function(params) {
                    return utils.regExr.comma(params.value);
                }    
            }
            ,{ headerName: "차량유지비", field: "carSalary", width:120,
                valueFormatter: function(params) {
                    return utils.regExr.comma(params.value);
                }    
            }
            ,{ headerName: "성과금", field: "welfareSalary", width:120,
                valueFormatter: function(params) {
                    return utils.regExr.comma(params.value);
                }    
            }
            ,{ headerName: "직책수당", field: "positionSalary", width:120,
                valueFormatter: function(params) {
                    return utils.regExr.comma(params.value);
                }    
            }
        ]
        return arr;
    }

    const addColumnJson = (title,fieldVal) => {
        var json = { 
            headerName: title,
            field: fieldVal,
            width:120
            ,valueFormatter: function(params) {
                 return utils.regExr.comma(params.value);
             }    
         }
        return json;
    }

return (
   <SalaryInputPresenter rowData={rowData} gridDefs={gridDefs} rowData2={rowData2} gridDefs2={gridDefs2}/>
 );
}

export default SalaryInputContainer;
