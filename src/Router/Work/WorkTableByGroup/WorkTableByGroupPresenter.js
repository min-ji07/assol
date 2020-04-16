import React, { useEffect } from 'react';
import "../../../Assets/css/pages/work/work_setting_01.css";
import DataGrid from "../../../Components/DataGrid"
import gridCommon from '../../../Utils/grid';
import $ from 'jquery';

const WorkTableByGroupPresenter=({rowData,  gridDefs, nextPage }) => {

    const openPopup=() => {
        $('.modal').show();
    }, closePopup=()=>{
        $('.modal').hide();
    }
  
return (
    <div className="wrapper">
        <div className="work_setting_01">
            <div className="title">
                <h1>근무설정</h1>
                <p>설정하신 데이터기반으로 근무 현황을 확인 할 수 있습니다.</p>
            </div>
            <div className="worktable">
                <div className="workTeam_option">
                    <div className="option_inner">
                        <h1>근무조 설정</h1>
                        <p>WORKING GROUP SETTINGS</p>
                    </div>
                    <div className="num01">
                        <p className="year_inner">근속년도
                        <input type="text"
                            readOnly
                            id="month-picker"
                            className="datepicker-here"
                            data-language='lang'
                            data-min-view="years"
                            data-view="years"
                            data-date-format="yyyy"/>
                        </p>
                        <div className="left">
                            <div className="team_option">
                                <p>근무조설정</p>
                            </div>
                            <div className="buttonset">
                            <button type="button" className="insert" onClick={gridCommon.onAddRow}>추가</button>
                                <button type="button" className="delete1" onClick={gridCommon.onRemoveRow}>삭제</button>
                                <button onClick={gridCommon.onSaveRow}> 완료 </button>
                            </div>
                        </div>
                        <div className="right">
                            <button type="button" className="search1" onClick={openPopup}>수급자 현황보기 
                            <img src="/images/search1.png"/></button>
                        </div>
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

export default WorkTableByGroupPresenter;
