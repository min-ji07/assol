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
                                
                                    <div class="table_left_wrap scroll_box">
                                        <div class="table_left_header">
                                            <div class="table_left_header_group">
                                                <div class="table_left_header_rowspan">
                                                    <span>구분</span>
                                                </div>
                                                <ul class="table_left_header_title">
                                                    <li>
                                                        <span>직책</span>
                                                    </li>
                                                    <li>
                                                        <span>성명</span>
                                                    </li>
                                                    <li>
                                                        <span>사원번호</span>
                                                    </li>
                                                    <li>
                                                        <span>입사일자</span>
                                                    </li>
                                                    <li>
                                                        <span>퇴사일자</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="table_left_header_group">
                                                <div class="table_left_header_rowspan">
                                                    <span>지급</span>
                                                </div>
                                                <ul class="table_left_header_title">
                                                    <li>
                                                        <span>기본급</span>
                                                    </li>
                                                    <li>
                                                        <span>식비</span>
                                                    </li>
                                                    <li>
                                                        <span>차량유지비</span>
                                                    </li>
                                                    <li>
                                                        <span>성과금</span>
                                                    </li>
                                                    <li>
                                                        <span>직책수당</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <ul class="table_left_content">
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li>
                                                        <span>사회복지사</span>
                                                    </li>
                                                    <li>
                                                        <span>박이삭</span>
                                                    </li>
                                                    <li>
                                                        <span>A00001</span>
                                                    </li>
                                                    <li>
                                                        <span>2020-04-05</span>
                                                    </li>
                                                    <li>
                                                        <span>-</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                    <li>
                                                        <span>100,000,000</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
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