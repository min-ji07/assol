import React, { useEffect, useState } from 'react';
import DataGrid from "../../../Components/DataGrid"
import "../../../Assets/css/pages/work/work_setting_01.css";
import gridCommon from '../../../Utils/grid';
import $ from 'jquery';

const WithholdingTaxPresenter=({rowData,  gridDefs, nextPage }) => {

    const openPopup=() => {
        $('.modal').show();
    }, closePopup=()=>{
        $('.modal').hide();
    }
  
return (
    <div className="wrapper">
    <div className="work_setting_01">
        <div className="worktable">
            <div className="workTeam_option">
                <div className="num01">
                    <p className="year_inner">근속년도
                     <input type="text"
                        readOnly
                        id="month-picker"
                        className="datepicker-here"
                        data-language='lang'
                        data-min-view="months"
                        data-view="months"
                        data-date-format="yyyy-mm"/>
                    </p>
                </div>
                <div className="table"> 
                <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
                </div>
                <div className="backnext">
                    <button type="button" className="back" onClick="">이전으로</button>
                    <button type="button" className="next" onClick={nextPage}>다음으로</button>
                </div>
            </div>
        </div>
    
        <div className="modal">
                <div className="modal_top">
                    <div className="left">팝업창 수정하기</div>
                    <div className="close_modal"><a href="" onClick={closePopup}>X</a></div>
                </div>
                <div className="modal_bottom">
                    <img src="images/modal_img.jpg" alt="근무표 설정 후 근무표 보기를 선택해 주세요."/>
                    <p>근무표 설정 후 근무표 보기를 선택해 주세요.</p>
                    <button type="button" onClick="scheduleOption();">근무표 설정하기</button>
                </div>
                <div className="modal_layer"></div>
        </div>
    </div>
</div>
  );
}

export default WithholdingTaxPresenter;
