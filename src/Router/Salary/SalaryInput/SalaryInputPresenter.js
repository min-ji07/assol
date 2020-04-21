import React, { useEffect } from 'react';
import '../../../Assets/css/pages/Salary/salary_main.css';
import useHook from'../../../GlobalState/Hooks/useHook';
import DataGrid from '../../../Components/DataGrid';
import $ from 'jquery';
import gridCommon from '../../../Utils/grid';

const SalaryInputPresenter=({rowData,  gridDefs, rowData2,  gridDefs2}) => {
    const { addBranch }=useHook();
    useEffect(()=>{
        //add branchInfo in redux store , but login page not found currently 
        addBranch('1');
    },[]);

    // const fnAddColumn = (colDefs) =>{
    //     const gridApi = $("#grid1").find(".ag-root")[0]["__agComponent"].gridApi;
    //     gridCommon.setGridApi(gridApi);
    //     gridCommon.onAddColumn(colDefs);
    // }

    return(
        <div class="wrapper">
        <div class="salary_main">
            <div class="title">
                <h1>근로자 급여입력</h1>
            </div>
            <div class="salary_main_inner">
                <div class="sal_date_left">
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
                            <select id="salary">
                                <option value='1'>1차</option>
                                <option value='2'>2차</option>
                                <option value='3'>3차</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div class="button_set">
                    <button type="button" class="btn_gray salary_button folder">지난급여통계</button>
                    <button type="button" class="btn_gray salary_button card">급여대장미리보기</button>
                    <button type="button" class="btn_gray salary_button excel">Excel 내보내기</button>
                    <button type="button" class="btn_gray salary_button send">급여대장으로이동</button>
                    <button type="button" class="btn_gray salary_button save">저장</button>
                </div>
                <div class="white_board">
                    <div class="left_div">
                        <div class="left_div_inner">
                            <div class="left_div_inner_inner">
                                <div class="div_top01">사원 전체명부</div>
                                <div class="div_bottom">
                                    <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                                </div>
                            </div>
                        </div>
                        <div class="right_div_inner">
                            <div class="right_div_inner_inner">
                                <div class="div_top02">지급 항목상세
                                    <button class="plus" onClick={gridCommon.onAddRow} >추가</button>
                                    <button class="delete" onClick={gridCommon.onRemoveRow}>삭제</button>
                                </div>
                                <div class="div_bottom">
                                    <DataGrid rowData={rowData2} gridDefs={gridDefs2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right_div">
                        <div class="right_inner_left">
                            <div class="div_top">인건비 총액</div>
                            <div class="div_bottom" id="totalPay1">122,200,000</div>
                        </div>
                        <div class="right_inner_left">
                            <div class="div_top bg_pink02">4대보험 총액</div>
                            <div class="div_bottom txt_pink01" id="totalPay2">2,400,000</div>
                        </div>
                        <div class="right_inner_left">
                            <div class="div_top bg_pink02">소득세 총액</div>
                            <div class="div_bottom txt_pink01" id="totalPay3">845,000</div>
                        </div>
                        <div class="right_inner_left">
                            <div class="div_top bg_blue02">실지급 총액</div>
                            <div class="div_bottom txt_blue01" id="totalPay4">111,845,000</div>
                        </div>
                        <div class="right_inner_left">
                            <div class="div_top">인건비 비율</div>
                            <div class="div_bottom02" id="totalPay5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SalaryInputPresenter;