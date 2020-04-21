import React, { useState } from 'react';
import '../../../Assets/css/pages/work/work_setting_03.css';
import DataGrid from '../../../Components/DataGrid';
import gridCommon from '../../../Utils/grid';
import { callApi } from '../../../Utils/api';

const WorkTableByRestDayViewPresenter = ({rowData,gridDefs}) => {
   
    return (
    <div className="wrapper">
        <div className="work_setting_03">
            <div className="title">
                <h1>연차관리대장</h1>
                <p>사원 연차대장입니다.</p>
            </div>
            {/* 여기 css 윗부분 수정해야함 css파일 맨 밑줄 추가중이었음 */}
            <div className="emTable">
                <div className="leftDiv">
                    <div className="left_inner">
                        <div className="date_box">
                            <p className="year_inner">근속년도
                                <input type="text"
                                    readOnly
                                    id="month-picker"
                                    className="datepicker-here"
                                    data-language='lang'
                                    data-min-view="months"
                                    data-view="months"
                                    data-date-format="yyyy-mm" style={{border:"1px solid black"}}/>
                            </p>
                        </div>
                        <div className="search_box" style={{float:"left"}}>
                            <input type="text" placeholder="사원검색"/>
                        </div>
                    </div>
                    <div className="table">
                    <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                    </div>
                    <div className="btn_box">
                        <button className="btn_gray">연차관리대장 PDF/출력</button>
                    </div>
                </div>
            </div>
         </div>
    </div> 
    )
}

export default WorkTableByRestDayViewPresenter;