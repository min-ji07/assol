import React, { useState, useEffect } from 'react';
import WorkTableByReplaceUserPresenter from './WorkTableByReplaceUserPresenter'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';


function WorkTableByReplaceUserContainer({yearMonth}) {
// 직위
    // const workTypeMappings = {
    //     "0" : "부장"
    //     ,"1" : "과장"
    //     ,"2" : "대리"
    //     ,"3" : "사원"
    // }
    // const regEmployeeMappings = {
    //     "0" : "근로소득자"
    //     ,"1" : "사업소득자" 
    //     ,"2" : "일용근로자" 
    //     ,"3" : "시간직"
    // }
    // const regStatusMappings = {
    //     "0" : "재직"
    //     ,"1" : "퇴사" 
    // }

    const columnDefs= [  
        { headerName: "userId", field: "id", hide :true}
        ,{ headerName: "processType", field: "processType", hide:true}
        ,{ headerName: "branchNo", field: "branchNo", hide:true }
        ,{ headerName: "성명", field: "userName", editable: false}
        ,{ headerName: "사원번호", field: "regularEmployee"}
        ,{ headerName: '직책', field: "workPosition", cellEditor : "richSelect"}
        ,{ headerName: "근무조", field: "workLevel", cellEditor : "richSelect"}
        ,{ headerName: "휴무일(1)", field: "employeeNumber", cellEditor : "richSelect" }
        ,{ headerName: '휴무일(2)', field: "joinDate", cellEditor : "richSelect"}
        ,{ headerName: '대체근무자', field: "personalNumber", cellEditor : "richSelect"}
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
             })
         }catch{
             //console.log(error.me)
         }
        };
        initGrid(); 
     },[]); //init

    // 사원등록 페이지로 이동
    // const nextPage = () => {
    //     window.location.href="/user/userInfo/"
    // };

    return(
        <>
            {
                <WorkTableByReplaceUserPresenter 
                rowData={rowData}
                gridDefs={gridDefs}
                // nextPage={nextPage}
                />
             }
        </>
    )
}
export default WorkTableByReplaceUserContainer;