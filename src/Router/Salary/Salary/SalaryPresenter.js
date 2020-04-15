import React, { useEffect } from 'react';
import '../../../Assets/css/pages/Salary/salary.css';
import useHook from'../../../GlobalState/Hooks/useHook';
import DataGrid from "../../../Components/DataGrid"
// import gridCommon from '../../../Utils/grid';
import $ from 'jquery';

const SalaryPresenter=({rowData,  gridDefs }) => { 

    

    const { addBranch }=useHook();
    useEffect(()=>{
        //add branchInfo in redux store , but login page not found currently 
        addBranch('1');
    },[]);

    return(
        <div class="wrapper">
            <div class="salary">
                <div class="title">
                    <h1>급여대장</h1>
                </div>
                <div class="salary_inner">
                    <div class="sal_date_left">
                        <ul>
                            <li>귀속연월 <input type="text" 
                                readOnly
                                id="month-picker"
                                className="datepicker-here"
                                data-language='lang'
                                data-min-view="month"
                                data-view="month"
                                data-date-format="yyyy-mm"/>
                            </li>
                            <button class="btn_gray btn01">조회</button> 
                        </ul>
                    </div>
                    <div class="white_board">
                        <div class="left_div">
                            <div class="left_div_inner">
                                <div class="div_top01">급여대장 조회내역
                                    <div class="button_set">
                                        <button class="btn_gray">급여대장 PDF / 출력</button>
                                    </div>
                                </div>

                                <div class="div_grid">
                                    <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                                </div>
                            </div>
                        </div>
                        <div class="right_div">
                            <div class="right_div_inner">
                                <div class="div_top02">급여 1차수 급여대장 상세
                                    <div class="button_set">
                                        <button class="btn_gray">급여명세서 PDF / 출력</button>
                                        <button class="btn_gray btn02">SNS 발송</button>
                                    </div>
                                </div>

                                <div class="div_grid">
                                    그리드
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalaryPresenter;