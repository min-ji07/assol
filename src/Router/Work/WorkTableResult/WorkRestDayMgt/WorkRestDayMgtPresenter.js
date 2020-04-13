import React from 'react';
import DataGrid from '../../../../Components/DataGrid';


const WorkRestDayMgtPresenter = ({rowData,gridDefs}) => {

    return (
        <div class="annual_box">
        <div class="annual_title">
            <h4>사원별 연차관리 현황</h4>
            <p>ANNUAL LEAVE MANAGEMENT</p>
        </div>
        <div class="left_box">
            <div class="date_box">
                <label for="select_year">년도</label>
                <select id="select_year">
                    <option>2020</option>
                    <option>2021</option>
                </select>
                <select id="select_month">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option> 
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
                <div class="search_box">
                    <input type="text" placeholder="사원검색"/>
                    <button></button>
                </div>
            </div>
            <div class="table_box">
                <DataGrid rowData={rowData} gridDefs={gridDefs}/>
            </div>
        </div>
        <div class="right_box">
            <div class="month_title_bg">
                <span>1월 연차사용현황</span>
            </div>
            <ul class="month_head">
                <li>월요일</li>
                <li>화요일</li>
                <li>수요일</li>
                <li>목요일</li>
                <li>금요일</li>
                <li class="txt_blue">토요일</li>
                <li class="txt_red">일요일</li>
            </ul>
            <div class="calendar_box work_table_result">
             <div
                id="custom-cells"
                className="datepicker-here"
                data-position="bottom left"
                data-multiple-dates-separator=" - "
                />
            </div>
        </div>
    </div>
      
    )
}

export default WorkRestDayMgtPresenter;