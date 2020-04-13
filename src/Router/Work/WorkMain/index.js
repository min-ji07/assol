import React from 'react';
import '../../../Assets/css/pages/work/work_setting_00.css';
import $ from 'jquery'

const WorkMain = () => {

    const scheduleView = () => {
        //call api > O : 근무표현황 X: 설정팝업
        togglePopup();
    }
    , togglePopup = () =>{
        if( $('.modal').is(':visible') ) {
            //true visible
            $('.modal').hide();
        }else{
            $('.modal').show();
        }
    }
    
    , settingSchedule = () =>{
        window.open('/work/workTableByGroup');
    }

    return(
        <div class="wrapper">
        <div class="work_setting_00">
            <div class="title">
                <h1>근무설정</h1>
                <p>설정하신 데이터기반으로 근무 현황을 확인 할 수 있습니다.</p>
            </div>
            <div class="schedule_img">
                <button class="scheduleView" onClick={scheduleView}>
                    <img src="/images/scheduleView.png" alt="근무표보기" /></button>
                <button class="schedule_option" onClick={settingSchedule}>
                    <img src="/images/scheduleOption.png" alt="근무표설정" /></button>
            </div>
            
            <div class="modal">
                <div class="modal_top">
                    <div class="left">안내</div>
                    <div class="close_modal">
                        <button type="button">
                            <img src="/images/esc.png" alt="닫기" onClick={togglePopup}/></button>
                    </div>
                </div>
                <div class="modal_bottom">
                    <img src="/images/modal_img.jpg" alt="근무표 설정 후 근무표 보기를 선택해 주세요." />
                    <p>근무표 설정 후 근무표 보기를 선택해 주세요.</p>
                    <button type="button" onClick={settingSchedule}>근무표 설정하기</button>
                </div>
                <div class="modal_layer"></div>
            </div>
        </div>
    </div>
    )
}

export default WorkMain;