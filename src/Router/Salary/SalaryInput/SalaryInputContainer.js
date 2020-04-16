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

    let params = {
        "branchNo" : 1,
        "yearsMonthDate" : "202010"
    }
    
    useEffect(()=>{
       async function init() {
        try {

            await callApi.getUserInfo(params).then(res=> {

                /* 사원 리스트 */
                setGridDefs(gridSetting());
                setRowData(res.data.ListData);

                /* 선택사원 */
                setGridDefs2(gridSetting2());
                setRowData2(res.data.ListData); 
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
               ,{headerName: "직책", field: "position", width:110}
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
       
           return {columnDefs, defaultColDef, components};
    }

    const gridSetting2 =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "rowId", field: "rowId", hide:true }
               ,{headerName: "성명 ",field:"userName", width:75, editable:false}
               ,{headerName: "직책", field: "position", width:110, editable:false}
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
                ,{ headerName: "성과급", field: "insentive", width:120,
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
       
           return {columnDefs, defaultColDef, components};
    }



return (
   <SalaryInputPresenter rowData={rowData} gridDefs={gridDefs} rowData2={rowData2} gridDefs2={gridDefs2}/>
 );
}

export default SalaryInputContainer;
