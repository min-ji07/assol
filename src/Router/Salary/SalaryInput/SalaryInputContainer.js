import React, { useEffect, useState } from 'react';
import SalaryInputPresenter from './SalaryInputPresenter'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import picker from '../../../Utils/datepicker';
import utils from '../../../Utils/utils';

function SalaryInputContainer() {
    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의

    const [rowData2, setRowData2] = useState([]); //그리드 데이터 
    const [gridDefs2, setGridDefs2] = useState({}); //그리드 정의

    const regEmployeeMappings = {
        "0" : "사회복지사"
        ,"1" : "요양보호사" 
        ,"2" : "시간제" 
        ,"3" : "사무원" 
        ,"4" : "시설장" 
        ,"5" : "조리원" 
        ,"6" : "운전사" 
        ,"7" : "물리치료사" 
        ,"8" : "촉탁의" 
        ,"9" : "대표" 
    }

    let params = {
        "branchNo" : 30,
        "userType" : 0
    }
    
    useEffect(()=>{
        setGridDefs(gridSetting());
        setGridDefs2(gridSetting2());
        picker.setMonthPicker(('#month-picker'),function(value){
            // initGrid(value);
        });
       async function init() {
            try {
                await callApi.setInitSalary(params).then(res=> {   
                    /* 사원 리스트 */
                    setRowData(res.data.Data);

                    picker.setMonthPicker(('#month-picker'),function(value){
                        // initGrid(value);
                    });
                });
            }catch{

            }
       };
       init();
    },[]); //init


    const gridSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "rowId", field: "rowId", hide:true }
               ,{headerName: "성명 ",field:"userName", width:75}
               ,{headerName: "직책", field: "position", width:110,
                    cellEditor: "select",
                    cellEditorParams: { values: gridCommon.extractValues(regEmployeeMappings) },
                    refData: regEmployeeMappings
                }
            //    ,{headerName: "직책", field: "position", width:80}
               ,{ headerName: "사원번호", field: "employeeNumber", width:75}
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
           const onRowDoubleClicked = (e)=> {
                let employeeNumber = e.data.employeeNumber;
                let userType = e.data.userType;
                
                userSelect(employeeNumber,userType);
            }

           return {columnDefs, defaultColDef, components, gridId};
    }

    const userSelect = (params) => {
        async function init() {
            try {
                await callApi.setInitSalary(params).then(res=> {   
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        setOtherColumn();
                        /* 사원 리스트 */
                        setRowData(res.data.Data);
                    }
                });
            }catch{

            }
       }
       init();
    }

    const gridSetting2 =()=>{
        //컬럼 정의
            const columnDefs= [  
                { headerName: "rowId", field: "rowId", hide:true }
                ,{headerName: "성명 ",field:"userName", width:75, editable:false}
                ,{headerName: "직책", field: "position", width:110, editable:false,
                        cellEditor: "select",
                        cellEditorParams: { values: gridCommon.extractValues(regEmployeeMappings) },
                        refData: regEmployeeMappings
                    }
                ,{ headerName: "사원번호", field: "employeeNumber", width:120, editable:false}
                ,{ headerName: "기본급", field: "baseSalary", width:120,
                        valueFormatter: function(params) {
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


    // 컬럼추가부분
    let testOthercontent = [
        {title:"t1",value:"v1"},
        {title:"t2",value:"v2"},
        {title:"t3",value:"v3"},
        {title:"t4",value:"v4"},
        {title:"t5",value:"v5"}
    ];


    const setOtherColumn = () => {
        
    }

    const defaultColumnJson = () => {
        const arr = [
            { headerName: "rowId", field: "rowId", hide:true }
            ,{headerName: "성명 ",field:"userName", width:75, editable:false}
            ,{headerName: "직책", field: "position", width:110, editable:false,
                cellEditor: "select",
                cellEditorParams: { values: gridCommon.extractValues(regEmployeeMappings) },
                refData: regEmployeeMappings
            }
            ,{ headerName: "사원번호", field: "employeeNumber", width:120, editable:false}
            ,{ headerName: "기본급", field: "baseSalary", width:120,
                valueFormatter: function(params) {
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

    const addColumnJson = () => {
        var json = { 
            headerName: "",
            field: "",
            width:120,
             valueFormatter: function(params) {
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
