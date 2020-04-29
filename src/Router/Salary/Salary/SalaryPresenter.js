import React, { useEffect } from 'react';
import '../../../Assets/css/pages/Salary/salary.css';
import useHook from'../../../GlobalState/Hooks/useHook';
import DataGrid from "../../../Components/DataGrid"
// import gridCommon from '../../../Utils/grid';
import $ from 'jquery';

const SalaryPresenter=({rowData,  gridDefs, leftGridInit}) => {

    useEffect(()=>{

    },[]);

    return(
        <div className="wrapper">
            <div className="salary">
                <div className="title">
                    <h1>급여대장</h1>
                </div>
                <div className="salary_inner">
                    <div className="sal_date_left">
                        <ul>
                            <li>
                            <span>귀속연월</span>
                            <input type="text" 
                                readOnly
                                id="month-picker"
                                className="datepicker-here"
                                data-language='lang'
                                data-min-view="months"
                                data-view="months"
                                data-date-format="yyyy-mm"/>
                            </li>
                            <button className="btn_gray btn01" onClick={leftGridInit}>조회</button> 
                        </ul>
                    </div>
                    <div className="white_board">
                        <div className="left_div">
                            <div className="left_div_inner">
                                <div className="div_top01">급여대장 조회내역
                                    <div className="button_set">
                                        <button className="btn_gray">급여대장 PDF / 출력</button>
                                    </div>
                                </div>
                                <div className="div_grid">
                                    <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                                </div>
                            </div>
                        </div>
                        <div className="right_div">
                            <div className="right_div_inner">
                                <div className="div_top02">급여 1차수 급여대장 상세
                                    <div className="button_set">
                                        <button className="btn_gray">급여명세서 PDF / 출력</button>
                                        <button className="btn_gray btn02">SNS 발송</button>
                                    </div>
                                </div>
                                <div className="div_grid">
                                    <span id="rightGridText" className="txt_nodata">조회가 필요합니다.</span>
                                    <div id="rightGridBox" className="table_left_box">
                                        <div className="table_left_header_overflow">
                                            <div className="table_left_header">
                                                <div className="table_left_header_group">
                                                    <div className="table_left_header_rowspan">
                                                        <span>구분</span>
                                                    </div>
                                                    <ul className="table_left_header_title">
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
                                                <div className="table_left_header_group">
                                                    <div className="table_left_header_rowspan">
                                                        <span>지급</span>
                                                    </div>
                                                    <ul id="otherTitle" className="table_left_header_title">
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
                                        </div>
                                        <div className="table_left_wrap scroll_box">
                                            <ul id="salaryDesc" className="table_left_content">
                                                <li>
                                                    <ul>
                                                        <li col-id="position">
                                                            <span>사회복지사</span>
                                                        </li>
                                                        <li col-id="userName">
                                                            <span>박이삭</span>
                                                        </li>
                                                        <li col-id="employeeNumber">
                                                            <span>A00001</span>
                                                        </li>
                                                        <li col-id="position">
                                                            <span>2020-04-05</span>
                                                        </li>
                                                        <li col-id="position">
                                                            <span>-</span>
                                                        </li>
                                                        <li col-id="baseSalary">
                                                            <span>100,000,000</span>
                                                        </li>
                                                        <li col-id="foodSalary">
                                                            <span>100,000,000</span>
                                                        </li>
                                                        <li col-id="carSalary">
                                                            <span>100,000,000</span>
                                                        </li>
                                                        <li col-id="welfareSalary">
                                                            <span>100,000,000</span>
                                                        </li>
                                                        <li col-id="positionSalary">
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
        </div>
    );
}

export default SalaryPresenter;