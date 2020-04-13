import React, { useState, useEffect } from 'react';
import DailyIncomePresenter from './DailyIncomePresenter'
import { callApi } from '../../../../Utils/api';
import gridCommon from '../../../../Utils/grid';


const DailyIncomeContainer = () => {
    //기본컬럼 정의
    const defaultColDef ={
        width: 100
        ,editable : true
        ,cellStyle: {textAlign: 'center'}
        ,resizable : true
    } 
    //그리드 정의
    const [gridDefs, setGridDefs] = useState({}); 
    const [rowData, setRowData] = useState([]);
    const [euduDefs, setEduDefs] = useState([]);
    const [carrerDefs, setCarrerDefs] = useState([]);
    const [insDefs, setInsDefs] = useState([]);
    const [dependDefs, setDependDefs] = useState([]);

    //부양가족
    const regtaxAdjustmentMappings = {
        "0" : "소득자본인"
        ,"1" : "소득자의 직계존속"
        ,"2" : "배우자의 직계존속"
        ,"3" : "배우자"
        ,"4" : "직계비속(자녀, 입양자)"
        ,"5" : "직계비속(코드 4 제외)"
        ,"6" : "형제자매"
        ,"7" : "수급자(코드1~6제외)"
        ,"8" : "위탁아동"
    }
    const regHouseholdMappings = {
        "0" : "부"
        ,"1" : "여" 
    }
    const regWomanMappings = {
        "0" : "부"
        ,"1" : "여" 
    }
    const regObstacleMappings = {
        "0" : "부"
        ,"1" : "여"
    }
    const regSilverMappings = {
        "0" : "부"
        ,"1" : "여"
    }
    const regSingleParentMappings = {
        "0" : "부"
        ,"1" : "여"
    }
    const regConsignerMappings = {
        "0" : "소득자본인"
        ,"1" : "소득자의 직계존속"
        ,"2" : "배우자의 직계존속"
        ,"3" : "배우자"
        ,"4" : "직계비속(자녀, 입양자)"
        ,"5" : "직계비속(코드 4 제외)"
        ,"6" : "형제자매"
        ,"7" : "수급자(코드1~6제외)"
        ,"8" : "위탁아동"
    }

    const gridDependSeitting = () =>{
        const columnDefs= [  
            { headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: "연말정산관계", field: "relation", 
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regtaxAdjustmentMappings)},refData: regtaxAdjustmentMappings}
            ,{ headerName: "기본", field: "regularEmployee"}
            ,{ headerName: '세대주', field: "household", 
                cellEditor : "select",
                cellEditorParams: { values : gridCommon.extractValues(regHouseholdMappings)},refData: regHouseholdMappings}
            ,{ headerName: "부녀자", field: "woman",
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regWomanMappings)},refData: regWomanMappings}
            ,{ headerName: "장애", field: "employeeNumber",
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regObstacleMappings)},refData: regObstacleMappings}
            ,{ headerName: '경로70세', field: "joinDate", 
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regSilverMappings)},refData: regSilverMappings}
            ,{ headerName: '한부모', field: "personalNumber",
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regSingleParentMappings)},refData: regSingleParentMappings}
            ,{ headerName: '성명', field: "mobile",}
            ,{ headerName: '주민(외국인)번호', field: "email", cellEditor : "richSelect"}
            ,{ headerName: '위탁자관계', field: "leaveDate", 
                cellEditor : "select",
                cellEditorParams: { values : gridCommon.extractValues(regConsignerMappings)},refData: regConsignerMappings}
        ]
        //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }
        

    // 4대보험
    const gridInsuranceSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "구분", field: "eGrade", width: 50 }
               ,{headerName: "기호번호",field:"eEnterDate", width:75}
               ,{headerName: "취득일", field: "eGraduaterDate", width:110}
                ,{headerName: "상실일", field: "eSchoolName", width:80}
           ]
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
    }

    // 학력
    const gridEducationSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "구분", field: "eGrade", width: 50 }
               ,{headerName: "입학년월",field:"eEnterDate", width:75}
               ,{headerName: "졸업년월", field: "eGraduaterDate", width:110}
                ,{headerName: "학교명", field: "eSchoolName", width:80}
               ,{ headerName: "전공", field: "major", width:100}
               ,{ headerName: "이수", field: "complete", width:100}
           ]
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
    }

    // 경력
    const gridAllCarrerSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "회사명", field: "exCompanyName", width: 50 }
               ,{headerName: "입사일자",field:"exEnterDate", width:75}
               ,{headerName: "퇴사일자", field: "exLeaveDate ", width:110}
                ,{headerName: "근무기간", field: "exWorkPeriod", width:80}
               ,{ headerName: "최종직위", field: "exLastWorkLevel", width:100}
               ,{ headerName: "담당직무", field: "exPosition", width:100}
               ,{ headerName: "퇴직사유", field: "exLeaveReason", width:100}
           ]
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
    }
    return(
        <DailyIncomePresenter rowData={rowData} gridDefs={gridDefs} euduDefs ={euduDefs} carrerDefs= {carrerDefs} insDefs= {insDefs} dependDefs={dependDefs}/>
        
    )
}
export default DailyIncomeContainer;