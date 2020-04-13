import React from 'react';
import '../../../Assets/css/pages/user/user_info.css';
import EamedIncomeContainer from './EamedIncome/EamedIncomeContainer';
import BusinessIncomeContainer from './BusinessIncome/BusinessIncomeContainer';
import DailyIncomeContainer from './DailyIncome/DailyIncomeContainer';


const UserInfo = () => {
    
    return(
    <div class="wrapper">
        <div class="user_input">
            <div class="title">
                <h1>사원등록</h1>
                <p>사원정보를 등록하는 메뉴입니다. 해당 항목을 입력해주세요.<span>*표시는 필수 입력사항입니다.</span></p>
            </div>
            <div class="user_input_inner">
                <input type="radio" id="tab_01" name="tab1" defaultChecked/>
                <label for="tab_01">일반근로자</label>
                <input type="radio" id="tab_02" name="tab1" />
                <label for="tab_02">사업소득자</label>
                <input type="radio" id="tab_03" name="tab1" />
                <label for="tab_03">일용직근로자</label>
                
                <div class="white_board">
                    <EamedIncomeContainer />
                    <BusinessIncomeContainer />
                    <DailyIncomeContainer />
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserInfo;