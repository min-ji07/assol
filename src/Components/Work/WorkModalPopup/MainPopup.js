import React from 'react'


const MainPoup=({loadPopup})=>{
    
    return (
    <div class="modal_box mb1" style={{display:'block'}}>
            <div class="modal_top">
                <div class="modal_close"><a href="#" onClick={()=>loadPopup('0')}></a></div>
            </div>
            <div class="modal_bottom">
                <a href="#" title="추가근무설정 버튼" onClick={()=>loadPopup('2')}>
                    <img src="/images/work_04_pop_img.png" 
                        title="추가근무설정 - 인원의 추가 근무일을 설정합니다."/>
                </a>
                <a href="#" title="추가휴무/연차설정 버튼" onClick={()=>loadPopup('3')}>
                    <img src="/images/work_04_pop_img2.png" 
                        title="추가휴무/연차설정 - 인원의 추가 휴무/연차일을 설정합니다."/>
                </a>
            </div>
            <div class="modal_bg">
            </div>
        </div>
    );
}

export default MainPoup;