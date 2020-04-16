import React, { useState, useEffect } from 'react';
import EamedIncomePresenter from './EamedIncomePresenter'
import { callApi } from '../../../../Utils/api';
import gridCommon from '../../../../Utils/grid';
import picker from '../../../../Utils/datepicker';
import utils from '../../../../Utils/utils';


const EamedIncomeContainer = () => {

    //기본컬럼 정의
    const defaultColDef ={
        width: 100
        ,editable : true
        ,cellStyle: {textAlign: 'center'}
        ,resizable : false
    } 

    const [rowData, setRowData] = useState([]);
    const [rowData2, setRowData2] = useState([]);
    const [rowData3, setRowData3] = useState([]);
    const [rowData4, setRowData4] = useState([]);
    const [rowData5, setRowData5] = useState([]);

    //그리드 정의
    const [euduDefs, setEduDefs] = useState({});
    const [carrerDefs, setCarrerDefs] = useState({});
    const [dependDefs, setDependDefs] = useState({});
    const [militaryDefs, setMilitaryDefs] = useState({});
    const [curriculumDefs, setCurriculumDefs] = useState({});
    

    

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
    const eGradeMappings = {
        "0" : "초등학교"
        ,"1" : "중학교"
        ,"2" : "고등학교"
        ,"3" : "대학교"
    }

    const mContentMappings = {
        "0" : "만기제대",
        "1" : "의가사제대",
        "2" : "의병제대",
        "3" : "소집해제",
        "4" : "불명예제대",
        "5" : "상이제대",
        "6" : "면제",
        "7" : "기타"
    }

    const mTypeMappings = {
        "0" : "육군",
        "1" : "해군",
        "2" : "공군",
        "3" : "해병",
        "4" : "의경",
        "5" : "전경",
        "6" : "공익",
        "7" : "기타"
    }



    // 교육
    const gridCurriculumSeitting = () =>{
        const columnDefs= [  
            { headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: '교육과정', field: "curriculum",  width:230}
            ,{ headerName: "시간", field: "classTime", width:120,}
            ,{ headerName: '강사', field: "teacher",  width:120}
            ,{ headerName: '교육상태', field: "isStatus",  width:120 }
            ,{ headerName: '교육기간', field: "curriculumDate",  width:278}
        ]

        //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }

    // 병역
    const gridMilitarySeitting = () =>{
        const columnDefs= [  
            { headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: '병역구분', field: "militaryContent",  width:150,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(mContentMappings)},
                refData: mContentMappings
            }
            ,{ headerName: "군별", field: "militaryType", width:100,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(mTypeMappings)},
                refData: mTypeMappings
            }
            ,{ headerName: '복무기간', field: "militaryDate",  width:200}
            ,{ headerName: '최종계급', field: "finalLevel",  width:100 }
            ,{ headerName: '병과', field: "miltaryClass",  width:100}
            ,{ headerName: '미필사유', field: "unmiltaryReason",  width:218}
        ]

        //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }

    // 부양가족
    const gridDependSeitting = () =>{
        const columnDefs= [  
            { headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: '성명', field: "sfName",  width:90}
            ,{ headerName: '주민(외국인)번호', field: "sfPersnoalNumber", editable:true, width:120
                ,valueFormatter: function(params){
                    return utils.regExr.personalNum(params.data.sfPersnoalNumber);
            }}
            ,{ headerName: "연말정산관계", field: "sfRelation", width:120,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regtaxAdjustmentMappings)},refData: regtaxAdjustmentMappings}
            ,{ headerName: '세대주', field: "sfHouseHolder" , width:120,
            }
            ,{ headerName: "부녀자", field: "sfWomenDeduction", width:80,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regWomanMappings)},refData: regWomanMappings}
            ,{ headerName: "장애", field: "sfdisable", width:80,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regObstacleMappings)},refData: regObstacleMappings}
            ,{ headerName: '경로70세', field: "sfSeventy", width:80,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regSilverMappings)},refData: regSilverMappings}
            ,{ headerName: '한부모', field: "sfParentDeduction", width:80,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regSingleParentMappings)},refData: regSingleParentMappings}
            ,{ headerName: '위탁자관계', field: "sfTrustRelation", width:98,
                cellEditor : "select",
                cellEditorParams: { values : gridCommon.extractValues(regConsignerMappings)},refData: regConsignerMappings}
        ]
        //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }

    // 학력
    const gridEducationSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
                { headerName: "userId", field: "id", hide :true}
                ,{ headerName: "processType", field: "processType", hide:true}
                ,{ headerName: "branchNo", field: "branchNo", hide:true }
               ,{ headerName: "구분", field: "eGrade", width: 120,
                    cellEditor : "select", 
                    cellEditorParams: { values : gridCommon.extractValues(eGradeMappings)},refData: eGradeMappings
                }
               ,{headerName: "입학년월",field:"eEnterDate", width:150
                    ,valueFormatter: function(params){
                        return utils.regExr.date(params.data.eEnterDate);
                }}
               ,{headerName: "졸업년월", field: "eGraduaterDate", width:150
                    ,valueFormatter: function(params){
                        return utils.regExr.date(params.data.eGraduaterDate);
                }}
                ,{headerName: "학교명", field: "eSchoolName", width:100}
               ,{ headerName: "전공", field: "major", width:150}
               ,{ headerName: "이수", field: "complete", width:198}
           ]
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
    }


    // 경력
    const gridAllCarrerSetting =()=>{
        //컬럼 정의
           const columnDefs= [
                { headerName: "processType", field: "processType", hide:true}
                ,{ headerName: "branchNo", field: "branchNo", hide:true }
                ,{ headerName: "회사명", field: "exCompanyName", width: 130}
                ,{headerName: "입사일자",field:"exEnterDate", width:130,
                    valueFormatter: function(params){
                        return utils.regExr.date(params.data.exEnterDate);
                    }
                }
                ,{headerName: "퇴사일자", field: "exLeaveDate", width:130,
                    valueFormatter: function(params){
                        return utils.regExr.date(params.data.exLeaveDate);
                    }
                }
                ,{headerName: "근무기간", field: "exWorkPeriod", width:100,
                    valueGetter: function(params){
                        console.log(params);
                        var enterDate = utils.regExr.date(params.data.exEnterDate);
                        var leaveDate = utils.regExr.date(params.data.exLeaveDate);

                        var date1 = new Date(enterDate);
                        var date2 = new Date(leaveDate);
                        var interval = date2 - date1;
                        var day = 1000*60*60*24;
                        var month = day*30;
                        var year = month*12;

                        return parseInt(interval/month)+"개월";
                    }
                }
                ,{ headerName: "최종직위", field: "exLastWorkLevel", width:100}
                ,{ headerName: "담당직무", field: "exPosition", width:130}
                ,{ headerName: "퇴직사유", field: "exLeaveReason", width:148}
           ]
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
    }

    useEffect(()=>{
        async function init() {
         try {
            setDependDefs(gridDependSeitting());
            setEduDefs(gridEducationSetting());
            setCarrerDefs(gridAllCarrerSetting());
            setMilitaryDefs(gridMilitarySeitting());
            setCurriculumDefs(gridCurriculumSeitting());

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

            let rowData4 = [
                {
                    "militaryContent": 1,
                    "militaryType": 3,
                    "militaryDate": "2020-04-05~2020-05-05",
                    "finalLevel": "병장",
                    "miltaryClass": "포병",
                    "unmiltaryReason": ""
                }
            ]

            let rowData5 = [
                {
                    "curriculum": "리액트 개발",
                    "classTime": 100,
                    "teacher": "김민지",
                    "isStatus": "수료",
                    "curriculumDate": "2020-05-05~2020-07-06",
                }
            ]

            setRowData(rowData);
            setRowData2(rowData2);
            setRowData3(rowData3);
            setRowData4(rowData4);
            setRowData5(rowData5);

         }catch{
 
         }
        };
        init();
     },[]); //init


    return(
        <EamedIncomePresenter rowData={rowData} euduDefs ={euduDefs} carrerDefs= {carrerDefs} dependDefs={dependDefs} militaryDefs={militaryDefs} curriculumDefs={curriculumDefs} rowData2={rowData2} rowData3={rowData3} rowData4={rowData4} rowData5={rowData5}/>
    )
}
export default EamedIncomeContainer;