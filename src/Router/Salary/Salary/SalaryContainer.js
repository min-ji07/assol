import React, { useEffect, useState } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import SalaryPresenter from './SalaryPresenter'

function SalaryContainer() {
    // 급여대장조회내역
    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의

    // const [rowData2, setRowData2] = useState([]); 
    //그리드 데이터 
    // const [gridDefs2, setGridDefs2] = useState({}); 
    //그리드 정의

    const SalNumMappings = {
        "0" : "01차"
        ,"1" : "02차"
        ,"2" : "03차"
        ,"3" : "04차"
        ,"4" : "05차"
    }

     //기본컬럼 정의
    const defaultColDef ={
        width: 50
        ,editable : true
        ,cellStyle: {textAlign: 'center'}
        ,resizable : false
    } 
    const gridSalarySetting =()=>{
        //컬럼 정의
        const columnDefs= [  
            {headerName: "userId", field: "id", hide :true}
            ,{headerName: "processType", field: "processType", hide:true}
            ,{headerName: "branchNo", field: "branchNo", hide:true }

            ,{headerName: "급여차수", field: "rmqducktn" ,
                cellEditor : "select",  width:75,
                cellEditorParams: { values : gridCommon.extractValues(SalNumMappings)},refData: SalNumMappings}
            ,{headerName: "급여선정기간",field:"rmqdutjswjdrlrks", width:100}
            ,{headerName: "급여총원", field: "rmqduchddnjs", width:75}
            ,{headerName: "인건비총액", field: "dlsrjsqlchddor", width:105}
            ,{ headerName: "4대보험총액", field: "4eoqhgjachddor", width:95}
            ,{ headerName: "소득공제총액", field: "themrrhdwpchddor", width:105}
            ,{ headerName: "실지급 총액", field: "tlfwlrmqchddor", width:105}
        ]
           //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }
    // 급여대장 조회시 기본 데이터
    useEffect(()=>{
        async function init() {
         try {
            setGridDefs(gridSalarySetting());
            let rowData = [
                {
                    "rmqducktn" : 0,
                    "rmqdutjswjdrlrks":"2020.01.10",
                    "rmqduchddnjs":"34",
                    "dlsrjsqlchddor":"112,200,340",
                    "4eoqhgjachddor":"2.400.000",
                    "themrrhdwpchddor":"845,000",
                    "tlfwlrmqchddor":"111,845,000"
                },{
                    "rmqducktn" : 1,
                    "rmqdutjswjdrlrks":"2020.01.20",
                    "rmqduchddnjs":"24",
                    "dlsrjsqlchddor":"2,200,340",
                    "4eoqhgjachddor":"400.000",
                    "themrrhdwpchddor":"5,000",
                    "tlfwlrmqchddor":"1,845,000"
                }
            ];
            setRowData(rowData);
         }catch{
         }
        };
        init();
     },[]); //init


     // 이거 수정해야됨 안나옴
    //  useEffect(()=>{
    //     async function initGrid(params) {
    //      try {
 
    //          if(!params){
    //              const d = new Date();
    //              params = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);
    //          } 
    //          //근속연도 세팅 
    //          const target = document.querySelector('#month-picker')
    //          params = {
    //              "branchNo" : 1,
    //              "yearsMonthDate" : target.value.replace("-","")
    //          }
    //          await callApi.getGridData(params).then(res=>{
    //              if(res.data && res.data.Data){
    //                    //공통 그리드 데이터 셋팅
    //                  setRowData(res.data.Data);
    //                  setGridDefs({columnDefs, defaultColDef, components, onRowEditingStopped});
    //              }
    //          })
    //      }catch{
 
    //      }
    //     };
    //     initGrid(); 
    //     //날짜 피커 변경시 콜백으로 리로드 
    //     picker.setMonthPicker(('#month-picker'),function(value){
    //          initGrid(value); 
    //      });
    //  },[]); //init

    return(
        <SalaryPresenter rowData={rowData} gridDefs={gridDefs} 
        // rowData2={rowData2} gridDefs2={gridDefs2}
        />
    )
}

export default SalaryContainer;
