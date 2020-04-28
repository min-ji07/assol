import React, { useEffect } from 'react';
import "../../../Assets/css/pages/work/work_setting_01.css";
import DataGrid from "../../../Components/DataGrid"
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import $ from 'jquery';
const WorkTableByGroupPresenter=({rowData,  gridDefs, backPage, nextPage }) => {

    const openPopup=() => {
        $('.modal').show();
    }, closePopup=()=>{
        $('.modal').hide();
    }

function saveRow (result) {
    var list = [];
    result.forEach(element => {
        if(element.processType){ // 조회빼고 다
            if(element.processType == 2 ||  element.processType == 1 || element.processType == 3){
                if(element.workTime == null ||element.workTime == "")
                {
                    console.log('근무시간', workTime);
                    alert("근무시간을 입력 하세요");
                    return false;
                }
                element.yearsMonthDate = $('#month-picker').val().replace("-","");
                element.branchNo =29;
                // element.workType = $("#select_01").val(); // 수정 
                element.workType = $('input[name="select"]').val(); // 수정 
    
                list.push(element);
            }
        }
      
    });
    if(list == null || list.length < 1){
        return true;
    }
    let params = {};
    params.groupInfos = list;
    console.log('저장버튼 클릭시 넘어오는 workTime:',params);
    
    async function init(params){
        try {
            await callApi.SaveGroupRow(params).then(res => {
                console.log('저장',res);
                if(res.data.ErrorCode == 0){ 
                    alert("근무조 설정이 완료되었습니다..");
                }
                else{
                    alert("일부의 근무조 빼고 설정 실패하였습니다.");
                }
            })
        }catch(error){
            console.log("CATCH !! : " + error);
        }
        return true;
    };
    init(params);
}



return (
    <div className="wrapper">
        <div className="work_setting_01">
            <div className="title">
                <h1>근무조 설정</h1>
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
                                data-min-view="months"
                                data-view="months"
                                data-date-format="yyyy-mm"/>
                            근무일 설정
                            <input type="radio" id="select_01" value = "1" name="select" defaultChecked/>
                            <label for="select_01">월 ~ 금</label>
                            <input type="radio" id="select_02" value = "2" name="select" />
                            <label for="select_02">월 ~ 토</label>
                            <input type="radio" id="select_03" value = "3" name="select" />
                            <label for="select_03">월 ~ 일</label>
                        </p>


                        <div className="left">
                            <div className="team_option">
                                <p>근무조 설정</p>
                            </div>
                            <div className="buttonset">
                            <button type="button" className="insert" onClick={gridCommon.onAddRow}>추가</button>
                                <button type="button" className="delete1" onClick={gridCommon.onRemoveRow}>삭제</button>
                                <button onClick={() => gridCommon.onSaveRow(saveRow)}> 완료 </button>
                            </div>
                        </div>
                        {/* <div className="right">
                            <button type="button" className="search1" onClick={openPopup}>수급자 현황보기 
                            <img src="/images/search1.png"/></button>
                        </div> */}
                    </div>
                    <div className="table"> 
                    
                    <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
                    </div>
                    <div className="backnext">
                        <button type="button" className="back" onClick={backPage}>이전으로</button>
                        <button type="button" className="next" onClick={() =>nextPage(saveRow)}>다음으로</button>
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
