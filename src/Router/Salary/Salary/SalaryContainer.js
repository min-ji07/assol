import React, { useEffect, useState } from 'react';
import SalaryPresenter from './SalaryPresenter'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';

function SalaryContainer() {

    // 그리드 데이터
    // 그리드 정의

    const SalNumMappings = {
        "0" : "01차"
        ,"1" : "02차"
        ,"2" : "03차"
        ,"3" : "04차"
        ,"4" : "05차"
    }

     //기본컬럼 정의
    const defaultColDef ={
        width: 100
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

            ,{headerName: "급여차수", field: "eGrade" ,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(SalNumMappings)},refData: SalNumMappings}
            ,{headerName: "급여선정기간",field:"eEnterDate", width:150}
            ,{headerName: "급여총원", field: "eGraduaterDate", width:150}
            ,{headerName: "인건비총액", field: "eSchoolName", width:100}
            ,{ headerName: "4대보험총액", field: "major", width:150}
            ,{ headerName: "소득공제총액", field: "complete", width:198}
            ,{ headerName: "실지급 총액", field: "complete", width:198}
        ]
           //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }

    useEffect(()=>{
        async function init() {
         try {
            setSalDefs(gridSalarySetting());

            let rowData = [
                {
                    "sfName": "김경주",
                    "sfRelation": 0,
                    "sfHouseHolder": "김종열",
                    "sfPersnoalNumber": "95995-38383838",
                    "sfSeventy": 0,
                    "sfdisable": 0,
                    "sfWomenDeduction": 0,
                    "sfParentDeduction": 0,
                    "sfTrustRelation": 0
                },{
                    "sfName": "김경주2",
                    "sfRelation": 0,
                    "sfHouseHolder": "김종열2",
                    "sfPersnoalNumber": "95995-38383838",
                    "sfSeventy": 0,
                    "sfdisable": 0,
                    "sfWomenDeduction": 0,
                    "sfParentDeduction": 0,
                    "sfTrustRelation": 0
                },{
                    "sfName": "김경주3",
                    "sfRelation": 0,
                    "sfHouseHolder": "김종열3",
                    "sfPersnoalNumber": "95995-38383838",
                    "sfSeventy": 0,
                    "sfdisable": 0,
                    "sfWomenDeduction": 0,
                    "sfParentDeduction": 0,
                    "sfTrustRelation": 0
                }
            ];
            setRowData(rowData);

            let rowData2 = [
                {
                    "eGrade":0,
                    "eEnterDate":"2020-05-05",
                    "eGraduaterDate":"2020-05-05",
                    "eSchoolName":"에솔초",
                    "major":"종이접기",
                    "complete":"종이접기4급"
                },
                {
                    "eGrade":1,
                    "eEnterDate":"2020-05-05",
                    "eGraduaterDate":"2020-05-05",
                    "eSchoolName":"에솔중",
                    "major":"일찐",
                    "complete":"담배1급"
                },
            ];
            setRowData2(rowData2);

            let rowData3 = [
                {
                    "exCompanyName":"에쏠컴퍼니",
                    "exEnterDate":"2020-05-05",
                    "exLeaveDate":"2020-10-05",
                    "exWorkPeriod":"4개월",
                    "exLastWorkLevel":"부장",
                    "exPosition":"퍼블리싱",
                    "exLeaveReason":"힘들옹 ㅠ"
                },{
                    "exCompanyName":"에이치엘솔루션",
                    "exEnterDate":"2020-02-05",
                    "exLeaveDate":"2020-03-05",
                    "exWorkPeriod":"4개월",
                    "exLastWorkLevel":"선임",
                    "exPosition":"백엔드",
                    "exLeaveReason":"오류가 너무 많이나서..."
                },
            ];
            setRowData3(rowData3);

        }catch{
 
        }
        };
        init();
    },[]); //init
    

    return(
        <SalaryPresenter rowData={rowData} dependDefs={dependDefs} rowData2={rowData2} rowData3={rowData3}/>
    )
}

export default SalaryContainer;
