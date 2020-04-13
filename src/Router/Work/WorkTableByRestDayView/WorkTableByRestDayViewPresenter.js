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
            <div className="emTable">
                <div className="leftDiv">
                    <div className="left_inner">
                      <div className="date_box">
                        <label htmlFor="select_year">년도</label>
                        <select id="select_year">
                            <option>2020</option>
                            <option>2021</option>
                        </select>
                        <div className="search_box">
                            <input type="text" placeholder="사원검색"/>
                            <button></button>
                        </div>
                    </div>
                    </div>
                    <div className="table">
                    <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                    </div>
                    <div className="btn_box" style={{margin:"45px 45px 0 0"}}>
                        <button className="btn_pdf">PDF다운로드</button>
                    </div>
                </div>
            </div>
         </div>
    </div> 
    )
}

export default WorkTableByRestDayViewPresenter;