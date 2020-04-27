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
        ,{ headerName: "사원번호", field: "employeeNumber",editable: false}
        ,{ headerName: '직책', field: "position", cellEditor : "richSelect"}
        ,{ headerName: "근무조", field: "groupName", cellEditor : "richSelect"}
        ,{ headerName: "휴무일(1)", field: "firstRestday", cellEditor : "richSelect" }
        ,{ headerName: '휴무일(2)', field: "twoRestday", cellEditor : "richSelect"}
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
             params = {
                "branchNo" : 29,
                "yearsMonthDate" : "202004",
             }
            let groupName = null; 
            await callApi.getAllWorkTableByResultColor(params).then(res =>{
                console.log(res.data);
                if(res.data && res.data.Data){
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                        return false;
                    }
                    var groupOptionList = [];
                    var getOption = document.getElementById("groupNameId");
                    for (var i = 0 ; i < res.data.Data.length; ++i ){
                        var opt = document.createElement('option');
                        opt.text = res.data.Data[i].groupName;
                        opt.value = res.data.Data[i].groupName;
                        getOption.appendChild(opt);
                    }
                    groupName = res.data.Data[0].groupName;
                }
            });
            
             params = {
                 "branchNo" : 29,
                 "yearsMonthDate" : "202004",
                 "groupName" : groupName
             }
             
             await callApi.getSetSceduleInfo(params).then(res=>{
                console.log(res.data); 
                if(res.data && res.data.Data){ 
                     setRowData(res.data.Data);
                     setGridDefs({columnDefs, defaultColDef});
                 }
             })
         }catch (ex){
             console.log(ex);
         }
        };
        initGrid(); 
     },[]); //init

     const backPage = () => {
        window.location.href="/work/workTableByPersonal/202001"
    }
        // 대체근무자 페이지로 이동
    const nextPage = () => {
        window.location.href="/work/workTableResult"
    };

    return(
        <>
            {
                <WorkTableByReplaceUserPresenter 
                rowData={rowData}
                gridDefs={gridDefs}
                backPage={backPage}
                nextPage={nextPage}
                />
             }
        </>
    )
}
export default WorkTableByReplaceUserContainer;