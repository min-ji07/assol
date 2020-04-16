import React from 'react';
import  '../../../Assets/css/pages/user/user_info.css';
import DataGrid from "../../../Components/DataGrid"
import gridCommon from '../../../Utils/grid';

// http://ktsmemo.cafe24.com/s/dev/314 우편번호 api

function UserInfoPresenter({rowData, minCount,subWorker,gridDefs}) {

    const inpuNumber=(obj)=> {
        //obj.value = comma(uncomma(obj.value));
        }
   
    return(
    <div class="wrapper">
        <div class="user_input">
            <div class="title">
                <h1>사원등록</h1>
                <p>사원정보를 등록하는 메뉴입니다. 해당 항목을 입력해주세요.<span>*표시는 필수 입력사항입니다.</span></p>
            </div>
            <div class="user_input_inner">
                <div class="white_board">
                    <div class="left_div">
                        <div class="div_top" name="branchNo">
                            <input type="radio" id="tab_01" name="tab" checked/>
                            <label for="tab_01">일반근로자</label>
                            <input type="radio" id="tab_02" name="tab" />
                            <label for="tab_02">사업소득자</label>
                            <input type="radio" id="tab_03" name="tab" />
                            <label for="tab_03">일용직근로자</label>
                        </div>
                        <div class="div_bottom">
                            <form method="POST" action="http://9ff02a8c.ngrok.io/User/UserRegistration"> 
                            {/* 9ff02a8c.ngrok.io 172.30.1.10:5302 */}
                                <div class="left_div">
                                    <div class="test">
                                        <div class="left_div_inner">
                                            <div class="imgload"><img src='/images/user02.png' alt=""/></div>
                                            <span>사원 사진을 등록해주세요.</span><br />
                                            <div>
                                                <label for="userImg" class="userImg">등록</label><input type="file" id="userImg"/>
                                                <label for="imgDelete">삭제</label><button type="button" id="imgDelete" />
                                            </div>
                                            <ul>
                                                <li>성명 :<input type="text" name="userName" id="joinName" placeholder="성명을 입력해주세요."/></li>
                                                <li>아이디 :<input type="text" name="id" id="joinId" placeholder="아이디를 입력해주세요."/></li>
                                                <li>직책 : <input type="text" name="workPosition" id="joinPosition" placeholder="사회복지사"/></li>
                                                <li>직위 : 
                                                    <select name="workLevel" id="joinLevel">
                                                        <option value="0">부장</option>
                                                        <option value="1">과장</option>
                                                        <option value="2">대리</option>
                                                        <option value="3">사원</option>
                                                    </select>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="right_div_inner">
                                            <ul>
                                                <li>이메일 :<input type="email" name="email" id="joinEmail" placeholder="이메일을 입력해주세요."/></li>
                                                <li>주민번호 :<input type="text" name="personalNumber" id="joinNumber" placeholder="123456-1234567"/></li>
                                                <li>
                                                    내외국인 :
                                                    <select name="regularEmployee" id="joinRegular">
                                                        <option value="0">내국인</option>
                                                        <option value="1">외국인</option>                                                
                                                    </select>
                                                </li>
                                                <li>입사일 :<input type="text" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요."/></li>
                                                <li>고용형태 : 
                                                    <select name="regularEmployee" id="joinRegular">
                                                        <option value="1">정규직</option>
                                                        <option value="2">계약직</option>
                                                        <option value="3">임시직</option>
                                                        <option value="4">파견직</option>
                                                        <option value="5">위촉직</option>
                                                        <option value="6">일용직</option>                                                
                                                    </select>
                                                </li>
                                                <li>재직여부 : 
                                                <select name="isActive" id="joinActive">
                                                    <option value="0">여</option>
                                                    <option value="2">부</option>
                                                </select>
                                                </li>
                                                {/* 숫자제한 , 3자리 4자리 4자리 -추가*/}
                                                <li>전화번호 :<input type="tel" name="tellno" id="joinTell" placeholder="02-000-0000" onClick={inpuNumber}/></li>
                                                {/* 숫자제한 , 3자리 4자리 4자리 -추가*/}
                                                <li>휴대폰 :<input type="tel" name="mobile" id="joinTell" placeholder="010-0000-0000"/></li>
                                                <li>
                                                    주소 :<input type="text" name="postNo" id="joinTell" class="address" placeholder="우편번호"/>
                                                    <button type="button" class="btn_gray postal_code">우편번호</button>
                                                </li>
                                                <li>
                                                    <input type="text" name="address01" id="joinAddress01" placeholder="주소"/>
                                                    <input type="text" name="address02" id="joinAddress02" placdholder="상세주소"/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>    
                                </div>

                                <div class="right_div">
                                    <div class="div_top wid843">
                                        사원등록 상세 설정 
                                    </div>
                                    <div class="div_bottom right">
                                        <div class="input_content">
                                            <strong class="grayfont">급여내용</strong>
                                            <ul>
                                                <li>예금주<input type="text" name="accountHolder" id="accountHolder"/></li>
                                                <li>급여이체은행
                                                <select name="bankName" id="bankName">
                                                    <option value="0">우리은행</option>
                                                    <option value="1">신한은행</option>
                                                    <option value="2">기타등등은행</option>
                                                </select>
                                                </li>
                                                <li>계좌번호<input type="text" name="accountNumber" id="accountNumber"/></li>
                                                <li>급여정보<button type="button" class="sal_plus">추가</button>
                                                    <select>
                                                        <option value="0">연봉</option>
                                                        <option value="1">월급</option>
                                                    </select>
                                                    <input type="text" name="payOfYear" id="payOfYear"/>원
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="input_content">
                                            <strong class="grayfont">4대보험</strong>
                                            <ul>
                                                <li>
                                                국민연금<input type="text" name="nationalInsurance" id="nationalInsurance"/>원
                                                건강보험<input type="text" name="healthInsurance" id="healthInsurance"/>원
                                                장기요양보험<input type="text" name="careInsurance" id="careInsurance"/>원
                                                고용보험<input type="text" name="employeeInsurance" id="employeeInsurance"/>원
                                                </li>
                                                <li>
                                                두루누리 사회보험
                                                <select name="socialInsurance" id="socialInsurance">
                                                    <option value="0">미신청</option>
                                                    <option value="1">신청</option>
                                                </select>
                                                노조가입여부
                                                <select name="unionJoinValue" id="unionJoinValue">
                                                    <option value="true">부</option>
                                                    <option value="false">여</option>
                                                </select>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="input_content">
                                            <strong class="grayfont">부양가족</strong><br />
                                            <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
                                            
                                        </div>
                                    </div>
                                </div>
                                {/* right_div */}
                                <button type="submit" class="btn_backnext position">저장하기</button>
                            </form>
                        </div>
                    </div>
                    {/* left_div */}
                </div>
                {/* white_board */}
            </div>
            {/* user_input_inner */}
        </div>

    </div>
    )
}
export default UserInfoPresenter;