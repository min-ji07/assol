import React, { useEffect } from 'react';
import { callApi } from '../../../Utils/api';
import '../../../Assets/css/pages/Salary/salary_main.css';
import useHook from'../../../GlobalState/Hooks/useHook';
import DataGrid from '../../../Components/DataGrid';
import $ from 'jquery';
import gridCommon from '../../../Utils/grid';
import utils from '../../../Utils/utils';

const SalaryInputPresenter=({rowData,  gridDefs, rowData2,  gridDefs2}) => {
    useEffect(()=>{
    },[]);

    const saveRow = (result) => {
        const yearMonthDate = $("#month-picker").val();
        const payDegree = $("#payDegree").val();
        const totalUser = result.length;
        const totalSalary = utils.regExr.numOnly($("#totalSalary").text());
        const fourIns = utils.regExr.numOnly($("#fourIns").text());
        const inDeduction = utils.regExr.numOnly($("#inDeduction").text());
        const actualPay = utils.regExr.numOnly($("#actualPay").text());
        const branchNo = 29;

        // {
        //     "yearMonthDate": null,
        //     "payDegree": 0,
        //     "totalSalary": 0,
        //     "branchNo": 0,
        //     "userList": {
        //         "userNo": 0,
        //         "userName": null,
        //         "position": null,
        //         "employeeNumber": null,
        //         "userType" : 0,
        //         "baseSalary": null,
        //         "foodSalary": 0,
        //         "carSalary": 0,
        //         "insentive": 0,
        //         "positionSalary": 0,
        //         "othercontent": {
        //             "title": "1212",
        //             "value": 10000
        //         }
        //     }
        // }

        // const columnList = gridCommon.getGridAllColumns();

        let i = 0;
        i = 0;
        let key;
        for(i in result){
            result[i]["othercontent"] = [];
            for(key in result[i]){
                console.log(key,"이중포문 가즈아");
                if(key.indexOf("addColumnSalary") != -1){
                    result[i].othercontent.push({
                        title : key.replace("addColumnSalary",""),
                        value : result[i][key]
                    });
                }
            }
        }

        console.log(result,"리졸트");

        let params = {
            "branchNo"  : branchNo,
            "yearMonthDate" : utils.regExr.numOnly(yearMonthDate),
            "payDegree" : payDegree,
            "totalUser" : totalUser,
            "totalSalary" : totalSalary,
            "fourIns" : fourIns,
            "inDeduction" : inDeduction,
            "actualPay" : actualPay,
            "userList" : result
        }
        

        console.log(params);
        console.log(JSON.stringify(params));

        // othercontent title
        

        
        async function init(params){
            try {
                console.log(params);
                await callApi.savePayRoll(params).then(res => {
                    console.log(res);
                    if(res.data.ErrorCode == 1){ 
                        alert(res.data.Msg);
                    }
                    else{
                        alert("저장이 완료 되었습니다.");
                    }
                })
            }catch(error){
                console.log("CATCH !! : " + error);
            }
        };
        init(params);
    }

    // gridCommon.onAddRow = (e) => {
    //     let newRow = { processType: 1 };
    //     if(rowData != undefined){
    //         console.log(rowData);
    //         rowData.processType = 1;
    //         newRow = rowData;
    //     }
    //     //추가 기입 
    //     gridApi.api.updateRowData({add: [newRow]});sss
    // }

    // const fnAddColumn = (colDefs) =>{
    //     const gridApi = $("#grid1").find(".ag-root")[0]["__agComponent"].gridApi;
    //     gridCommon.setGridApi(gridApi);
    //     gridCommon.onAddColumn(colDefs);
    // }

    return(
        <div className="wrapper">
        <div className="salary_main">
            <div className="title">
                <h1>근로자 급여입력</h1>
            </div>
            <div className="salary_main_inner">
                <div className="sal_date_left">
                    <ul>
                        <li>
                            귀속연월
                            <input type="text"
                            readOnly
                            id="month-picker"
                            className="datepicker-here"
                            data-language='lang'
                            data-min-view="months"
                            data-view="months"
                            data-date-format="yyyy-mm"/>
                        </li>
                        <li>급수차수
                            <select id="payDegree">
                                <option value='1'>1차</option>
                                <option value='2'>2차</option>
                                <option value='3'>3차</option>
                                <option value='4'>4차</option>
                                <option value='5'>5차</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className="button_set">
                    <button type="button" className="btn_gray salary_button folder">지난급여통계</button>
                    <button type="button" className="btn_gray salary_button card">급여대장미리보기</button>
                    <button type="button" className="btn_gray salary_button excel">Excel 내보내기</button>
                    <button type="button" className="btn_gray salary_button send" onClick={gridCommon.refreshCells}>급여대장으로이동</button>
                    <button type="button" className="btn_gray salary_button save" onClick={() => gridCommon.onSaveRow(saveRow)}>저장</button>
                </div>
                <div className="white_board">
                    <div className="left_div">
                        <div className="left_div_inner">
                            <div className="left_div_inner_inner">
                                <div className="div_top01">사원 전체명부</div>
                                <div className="div_bottom header_radius_none view_border_none">
                                    <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                                </div>
                            </div>
                        </div>
                        <div className="right_div_inner">
                            <div className="right_div_inner_inner">
                                <div className="div_top02">지급 항목상세
                                    <button className="plus" id="btnAddRow">추가</button>
                                    <button className="delete" onClick={gridCommon.onRemoveRow}>삭제</button>
                                </div>
                                <div className="div_bottom header_radius_none view_border_none">
                                    <DataGrid rowData={rowData2} gridDefs={gridDefs2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right_div">
                        <div className="right_inner_left">
                            <div className="div_top">인건비 총액</div>
                            <div className="div_bottom" id="totalSalary">1</div>
                        </div>
                        <div className="right_inner_left">
                            <div className="div_top bg_pink02">4대보험 총액</div>
                            <div className="div_bottom txt_pink01" id="fourIns">2</div>
                        </div>
                        <div className="right_inner_left">
                            <div className="div_top bg_pink02">소득세 총액</div>
                            <div className="div_bottom txt_pink01" id="inDeduction">3</div>
                        </div>
                        <div className="right_inner_left">
                            <div className="div_top bg_blue02">실지급 총액</div>
                            <div className="div_bottom txt_blue01" id="actualPay">4</div>
                        </div>
                        <div className="right_inner_left">
                            <div className="div_top">인건비 비율</div>
                            <div className="div_bottom02" id="chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SalaryInputPresenter;