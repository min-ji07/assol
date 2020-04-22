import React, { useState, useEffect } from 'react';
import UserManagementPresenter from './UserManagementPresenter'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';


function UserManagementContainer() {
    //컬럼 정의
    const regEmployeeMappings = {
        "0" : "정규직"
        ,"1" : "계약직" 
        ,"2" : "파견직" 
        ,"3" : "위촉직"
    }
    const userTypeMappings = {
        "0" : "일반근로자"
        ,"1" : "사업소득자" 
        ,"2" : "일용근로자"
    }
    const regStatusMappings = {
        "0" : "재직"
        ,"1" : "퇴사" 
    }

    const regPositionMappings = {
        "0" : "사회복지사"
        ,"1" : "요양보호사" 
        ,"2" : "사무원" 
        ,"3" : "시설자" 
        ,"4" : "조리원" 
        ,"5" : "운전사" 
        ,"6" : "물리치료사" 
        ,"7" : "촉탁의" 
        ,"8" : "대표"         
    }

    const gridSetting =()=>{
        const columnDefs= [  
            { headerName: "재직자", field: "activeEmp", hide :true}
            ,{ headerName: "정규직", field: "fullTimeEmp", hide :true}
            ,{ headerName: "계약직", field: "comtractEmp", hide :true}
            ,{ headerName: "임시직", field: "temporaryEmp", hide :true}
            ,{ headerName: "파견직", field: "disPatchEmp", hide :true}
            ,{ headerName: "위촉직", field: "commisionEmp", hide :true}
            ,{ headerName: "일용직", field: "dailyEmp", hide :true}        
            ,{ headerName: "퇴사자", field: "leaveEmp", hide :true}        
            ,{ headerName: "전체현황", field: "allEmpList", hide :true}        
            ,{ headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: "성명", field: "userName", editable: false, width:100 }
            ,{ headerName: '입사일', field: "joinDate", cellEditor : "richSelect", width:150}
            ,{ headerName: '주민번호', field: "personalNumber", cellEditor : "richSelect", width:170}
            ,{ headerName: '직책', field: "position", width:100 }
            ,{ headerName: "직위", field: "workLevel", width:100 }
            ,{ headerName: "사원번호", field: "employeeNumber", cellEditor : "richSelect" , width:100}
            ,{ headerName: "고용형태", field: "regularEmployee",  width:130,
                cellEditor : "richSelect", 
                cellEditorParams: { values : gridCommon.extractValues(regEmployeeMappings)},refData: regEmployeeMappings}
            ,{ headerName: '전화번호', field: "mobile", cellEditor : "richSelect", width:150}
            ,{ headerName: '이메일', field: "email", cellEditor : "richSelect", width:180}
            ,{ headerName: '주소', field: "address", cellEditor : "richSelect", width:180}
                // ,{ headerName: "고용형태", field: "regularEmployee",  width:150,
                //     cellEditor : "richSelect", 
                //     cellEditorParams: { values : gridCommon.extractValues(regEmployeeMappings)},refData: regEmployeeMappings}
            ,{ headerName: '상태', field: "isActive", width:100,
                cellEditor : "richSelect",
                cellEditorParams: { values : gridCommon.extractValues(regStatusMappings)},refData: regStatusMappings}
            ,{ headerName: '퇴사일', field: "leaveDate", cellEditor : "richSelect", width:150}
            
    
        
        ]
        //기본컬럼 정의
        const defaultColDef ={
            width: 100
            ,editable : false
            ,cellStyle: {textAlign: 'center'}
            ,resizable : true
        }
    
        //컴포넌트 세팅
        const components =  { }
        return {columnDefs, defaultColDef, components, onRowDoubleClicked};
    }
    
    //그리드 정의
    const [gridDefs, setGridDefs] = useState({}); 
    const [rowData, setRowData] = useState([]);
    const [countData, setCountData] = useState([]);

    const onRowDoubleClicked = (e)=> {
        let employeeNumber = e.data.employeeNumber;
        let userType = e.data.userType;
        let branchNo = "29"; // 나중에 바꿔
        window.location.href = "/user/userInfo?employeeNumber="+employeeNumber+"&userType="+userType+"&branchNo="+branchNo;
    }

    useEffect(()=>{
       async function initGrid(params) {
           console.log(params);
        try {
            setGridDefs(gridSetting());
            if(!params){
                const d = new Date();
                params = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);
            } 
            // //근속연도 세팅 
            // const target = document.querySelector('#month-picker')
            params = {
                "branchNo" : 29
            }
            
            await callApi.getUserInfo(params).then(res=>{
                console.log(res);
                if(res.data && res.data.ListData && res.data.CountData){
                    //공통 그리드 데이터 셋팅
                    setCountData(res.data.CountData[0]);
                    setRowData(res.data.ListData);
                }
                else{
                    console.log("데이터 안왔어");
                }
            })
        }catch(error){
            console.log("CATCH !! : " + error);
        }        
       };
       initGrid(); 
    //    //날짜 피커 변경시 콜백으로 리로드 
    //    picker.setMonthPicker(('#month-picker'),function(value){
    //         initGrid(value); 
    //     });
    },[]); //init

    return(
        <>
            {
                <UserManagementPresenter 
                rowData={rowData}
                gridDefs={gridDefs}
                countData={countData}
                />
             }
        </>
    )
}
export default UserManagementContainer;