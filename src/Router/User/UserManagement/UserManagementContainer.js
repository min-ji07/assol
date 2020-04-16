import React, { useState, useEffect } from 'react';
import UserManagementPresenter from './UserManagementPresenter'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';


function UserManagementContainer({yearMonth}) {
    //컬럼 정의

    // 직위
    const workTypeMappings = {
        "0" : "부장"
        ,"1" : "과장"
        ,"2" : "대리"
        ,"3" : "사원"
    }
    const regEmployeeMappings = {
        "0" : "근로소득자"
        ,"1" : "사업소득자" 
        ,"2" : "일용근로자" 
        ,"3" : "시간직"
    }
    const regStatusMappings = {
        "0" : "재직"
        ,"1" : "퇴사" 
    }

    const columnDefs= [  
        ,{ headerName: "재직자", field: "id", hide :true}
        ,{ headerName: "정규직", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "userId", field: "id", hide :true}
        ,{ headerName: "processType", field: "processType", hide:true}
        ,{ headerName: "branchNo", field: "branchNo", hide:true }
        ,{ headerName: "성명", field: "userName", editable: false}
        ,{ headerName: "고용형태", field: "regularEmployee", 
            cellEditor : "richSelect", 
            cellEditorParams: { values : gridCommon.extractValues(regEmployeeMappings)},refData: regEmployeeMappings}
        ,{ headerName: '직책', field: "position", cellEditor : "richSelect"}
        ,{ headerName: "직위", field: "workLevel",
            cellEditor : "richSelect", 
            cellEditorParams: { values : gridCommon.extractValues(workTypeMappings)},refData: workTypeMappings}
        ,{ headerName: "사원번호", field: "employeeNumber", cellEditor : "richSelect" }
        ,{ headerName: '입사일', field: "joinDate", cellEditor : "richSelect"}
        ,{ headerName: '주민번호', field: "personalNumber", cellEditor : "richSelect"}
        ,{ headerName: '전화번호', field: "mobile", cellEditor : "richSelect"}
        ,{ headerName: '이메일', field: "email", cellEditor : "richSelect"}
        ,{ headerName: '퇴사일', field: "leaveDate", cellEditor : "richSelect"}
        ,{ headerName: '상태', field: "isActive",
            cellEditor : "richSelect", 
            cellEditorParams: { values : gridCommon.extractValues(regStatusMappings)},refData: regStatusMappings}

    
    ]
    //기본컬럼 정의
    const defaultColDef ={
        width: 100
        ,editable : true
        ,cellStyle: {textAlign: 'center'}
        ,resizable : true
    } 

    //컴포넌트 세팅
    const components =  { }

    //그리드 정의
    const [gridDefs, setGridDefs] = useState({}); 
    const [rowData, setRowData] = useState([]);

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
                "branchNo" : 30,
                "pageIdx" : 1 * 10,
            }
            console.log("베인1");
            await callApi.getUserInfo(params).then(res=>{
                console.log("베인2 : =>", res , "  //", res.data.ListData , "  "  +  res.data.CountData);
                if(res.data && res.data.ListData){ 
                    console.log(res, 'Data');                   
                      //공통 그리드 데이터 셋팅
                    setRowData(res.data.ListData);
                    setGridDefs({columnDefs, defaultColDef});                    
                }
                else{
                    console.log("데이터 안왔어 시밸");
                }
            })
        }catch{
            console.log("CATCH !! : " + error);
        }        
       };
       initGrid(); 
    //    //날짜 피커 변경시 콜백으로 리로드 
    //    picker.setMonthPicker(('#month-picker'),function(value){
    //         initGrid(value); 
    //     });
    },[]); //init

    // 사원등록 페이지로 이동
    const nextPage = () => {
        window.location.href="/user/userInfo/"
    };

    return(
        <>
            {
                <UserManagementPresenter 
                rowData={rowData}
                gridDefs={gridDefs}
                nextPage={nextPage}
                />
             }
        </>
    )
}
export default UserManagementContainer;