import React from 'react';
import DataGrid from '../../../../Components/DataGrid';
import gridCommon from '../../../../Utils/grid';
import utils from '../../../../Utils/utils';

const WorkGraphPresenter = ({gridDefs, rowData}) => {
    
    return (
        <div id="workGraph" class="work_chart">
            <div class="select_month">
                <button class="btn_left"></button>
                <p class="month_txt">2020년 01월</p>
                <p class="month_txt en">january</p>
                <button class="btn_right"></button>
            </div>
            <div class="top_box">
                <ul id="workGraphColor" class="team_color">
                    <li><span class="color_box bg_c1"></span>A팀</li>
                    <li><span class="color_box bg_c1"></span>B팀</li>
                    <li><span class="color_box bg_c1"></span>C팀</li>
                    <li><span class="color_box bg_c1"></span>D팀</li>
                </ul>
            </div>
            <div class="table_box work_table_result"> 
            <DataGrid rowData={rowData} gridDefs={gridDefs}/>
            </div>
            <div class="btn_box">
               
                <button class="btn_pdf" onClick={()=>{utils.pdfDownload('workGraph')}}>PDF다운로드</button>
            </div>
        </div>     
    )
}

export default WorkGraphPresenter;