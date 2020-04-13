import React, { useState, useEffect } from 'react';
import BusinessincomePresenter from './BusinessincomePresenter'
import { callApi } from '../../../../Utils/api';
import gridCommon from '../../../../Utils/grid';


const BusinessIncomeContainer = () => {
    //컬럼 정의
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
    useEffect(()=>{
       async function initGrid(params) {
        try {
            if(!params){
                const d = new Date();
                params = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);
            } 
            // //근속연도 세팅 
            // const target = document.querySelector('#month-picker')
            params = {
                "branchNo" : 1
            }
            await callApi.getUserInfo(params).then(res=>{
                if(res.data && res.data.Data){ 
                    console.log(res, 'Data');                   
                      //공통 그리드 데이터 셋팅
                    setRowData(res.data.Data);
                    setGridDefs({columnDefs, defaultColDef});
                }
                setEduDefs(gridEducationSetting());
                setCarrerDefs(gridAllCarrerSetting());
                
            })
        }catch{
            // console.log(error.me)
        }
       };
       initGrid(); 
    //    //날짜 피커 변경시 콜백으로 리로드 
    //    picker.setMonthPicker(('#month-picker'),function(value){
    //         initGrid(value); 
    //     });
    },[]); //init

    // 사원등록 페이지로 이동
    // const nextPage = () => {
    //     window.location.href="/user/userInfo/"
    // };
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
    return(
        <BusinessincomePresenter rowData={rowData} gridDefs={gridDefs} euduDefs ={euduDefs} carrerDefs= {carrerDefs} />
    )
}
export default BusinessIncomeContainer;