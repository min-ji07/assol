// import React, { useState, useEffect } from 'react';
// import UserInfoPresenter from './UserInfoPresenter'
// // import { callApi } from '../../../Utils/api';
// import gridCommon from '../../../Utils/grid';


// function UserInfoContainer({yearMonth}) {
//     //컬럼 정의

//     // 직위
//     const regRelationMappings = {
//         "0" : "소득자본인"
//         ,"1" : "소득자의 직계존속"
//         ,"2" : "배우자의 직계존속"
//         ,"3" : "배우자"
//         ,"4" : "직계비속(자녀, 입양자)"
//         ,"5" : "직계비속(코드 4 제외)"
//         ,"6" : "형제자매"
//         ,"7" : "수급자(코드1~6제외)"
//         ,"8" : "위탁아동"
//     }
//     const regHouseholdMappings = {
//         "0" : "부"
//         ,"1" : "여" 
//     }
//     const regWomanMappings = {
//         "0" : "부"
//         ,"1" : "여" 
//     }

//     const columnDefs= [  
//         { headerName: "userId", field: "id", hide :true}
//         ,{ headerName: "processType", field: "processType", hide:true}
//         ,{ headerName: "branchNo", field: "branchNo", hide:true }
//         ,{ headerName: "연말정산관계", field: "relation", 
//             cellEditor : "select", 
//             cellEditorParams: { values : gridCommon.extractValues(regRelationMappings)},refData: regRelationMappings}
//         ,{ headerName: "기본", field: "regularEmployee"}
//         ,{ headerName: '세대주', field: "household", 
//             cellEditor : "select",
//             cellEditorParams: { values : gridCommon.extractValues(regHouseholdMappings)},refData: regHouseholdMappings
//         }
//         ,{ headerName: "부녀자", field: "woman",
//             cellEditor : "select", 
//             cellEditorParams: { values : gridCommon.extractValues(regWomanMappings)},refData: regWomanMappings}
//         ,{ headerName: "장애", field: "employeeNumber", cellEditor : "select",
//             cellEditor : "select", 
//             cellEditorParams: { values : gridCommon.extractValues(regWomanMappings)},refData: regWomanMappings}
//         ,{ headerName: '경로70세', field: "joinDate", cellEditor : "select",
//             cellEditor : "select", 
//             cellEditorParams: { values : gridCommon.extractValues(regWomanMappings)},refData: regWomanMappings}
//         ,{ headerName: '한부모', field: "personalNumber", cellEditor : "select",
//             cellEditor : "select", 
//             cellEditorParams: { values : gridCommon.extractValues(regWomanMappings)},refData: regWomanMappings}
//         ,{ headerName: '성명', field: "mobile", cellEditor : "richSelect"}
//         ,{ headerName: '주민(외국인)번호', field: "email", cellEditor : "richSelect"}
//         ,{ headerName: '위탁자관계', field: "leaveDate", cellEditor : "richSelect"}
//     ]
//     //기본컬럼 정의
//     const defaultColDef ={
//         width: 100
//         ,editable : true
//         ,cellStyle: {textAlign: 'center'}
//         ,resizable : true
//     } 

//     //컴포넌트 세팅
//     const components =  { }

//     //그리드 정의
//     const [gridDefs, setGridDefs] = useState({}); 
//     const [rowData, setRowData] = useState([]);

//     useEffect(()=>{
//        async function initGrid(params) {
//         try {
//             if(!params){
//                 const d = new Date();
//                 params = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);
//             } 
//             // //근속연도 세팅 
//             // const target = document.querySelector('#month-picker')
//             params = {
//                 "branchNo" : 1
//             }
//             await callApi.getUserInfo(params).then(res=>{
//                 if(res.data && res.data.Data){ 
//                     console.log(res, 'Data');                   
//                       //공통 그리드 데이터 셋팅
//                     setRowData(res.data.Data);
//                     setGridDefs({columnDefs, defaultColDef});
//                 }
//             })
//         }catch{
//             //console.log(error.me)
//         }
//        };
//        initGrid(); 
//     //    //날짜 피커 변경시 콜백으로 리로드 
//     //    picker.setMonthPicker(('#month-picker'),function(value){
//     //         initGrid(value); 
//     //     });
//     },[]); //init

//     // 사원등록 페이지로 이동
//     // const nextPage = () => {
//     //     window.location.href="/user/userInfo/"
//     // };

//     return(
//         <>
//             {
//                 <UserInfoPresenter
//                 rowData={rowData}
//                 gridDefs={gridDefs}
//                 // nextPage={nextPage}
//                 />
//              }
//         </>
//     )
// }
// export default UserInfoContainer