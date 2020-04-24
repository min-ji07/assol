import React, { useEffect, useState } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import SalaryPresenter from './SalaryPresenter'
import utils from '../../../Utils/utils';

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
        ,resizable : true
    } 
    const gridSalarySetting =()=>{
        //컬럼 정의
        const columnDefs= [  
            {headerName: "userId", field: "id", hide :true}
            ,{headerName: "processType", field: "processType", hide:true}
            ,{headerName: "branchNo", field: "branchNo", hide:true }
            ,{headerName: "급여차수", field: "payDegree", width:100}
            ,{headerName: "급여선정기간",field:"rmqdutjswjdrlrks", width:120}
            ,{headerName: "급여총원", field: "totalUser", width:90}
            ,{headerName: "인건비총액", field: "totalSalary", width:130
            }
            ,{headerName: "4대보험총액", field: "fourIns", width:130
            }
            ,{ headerName: "소득공제총액", field: "inDeduction", width:130
            }
            ,{ headerName: "실지급 총액", field: "actualPay", width:130
            }
        ]
        
        // "payDegree": "1",
        // "payDayMonth": "2",
        // "payDay": "10",
        // "": "10",
        // "": 0,
        // "": 0,
        // "": 0,
        // "": 0

        //컴포넌트 세팅
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }
    // 급여대장 조회시 기본 데이터
    useEffect(()=>{
        // 왜오류남
        // picker.setMonthPicker(('#month-picker'),function(value){
        //     // initGrid(value);
        // });


        let branchNo = 29;
        let month = $("#month-picker").val();
        let params = {
            branchNo : branchNo,
            month : utils.regExr.numOnly(month)
        };
        setGridDefs(gridSalarySetting());
        async function init(params) {
            try{
                await callApi.getPayRollListOfBranch(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        setRowData(res.data.Data);
                    }
                });
            } catch(error){
                alert(error);
            }
        }
        // init(params);
     },[]); //init

    return(
        <SalaryPresenter rowData={rowData} gridDefs={gridDefs} 
        // rowData2={rowData2} gridDefs2={gridDefs2}
        />
    )
}

export default SalaryContainer;
