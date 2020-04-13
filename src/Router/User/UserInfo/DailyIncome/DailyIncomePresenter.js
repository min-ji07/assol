import React from 'react';
import DataGrid from "../../../../Components/DataGrid"
import gridCommon from '../../../../Utils/grid';

const DailyIncomePresenter = ({rowData, euduDefs, carrerDefs, insDefs, dependDefs}) => {
    return (
    <div class="div_bottom tab_03">
        <form method="POST" action="http://9ff02a8c.ngrok.io/User/UserRegistration"> 
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
                            <li>
                                업무 : 
                                <select>
                                    <option>식품배달</option>
                                    <option>내용부족</option>
                                    <option>내용부족</option>
                                    <option>내용부족</option>
                                    <option>내용부족</option>
                                    <option>내용부족</option>
                                    <option>내용부족</option>
                                </select>
                            </li>
                            <li>이메일 :<input type="email" name="email" id="joinEmail" placeholder="이메일을 입력해주세요."/></li>
                        </ul>
                    </div>


                    <div class="right_div_inner">
                        <ul>
                            <li>주민번호 :<input type="text" name="personalNumber" id="joinNumber" placeholder="123456-1234567"/></li>
                            <li>  
                            국적 :
                                <select name="regularEmployee" id="joinRegular">
                                    <option value="0">내국인</option>
                                    <option value="1">외국인</option>                                                
                                </select>
                            </li>
                            <li> 
                            비자타입 :
                                <select name="regularEmployee" id="joinRegular">
                                    <option value="0">내국인</option>
                                    <option value="1">외국인</option>                                                
                                </select>
                            </li>
                            <li>최초등록일 : <input type="text" /></li>
                            <li>전화번호 :<input type="tel" name="tellno" id="joinTell" placeholder="02-000-0000"/></li>
                            <li>일용직</li>
                            <li>휴대폰 :<input type="tel" name="mobile" id="joinTell" placeholder="010-0000-0000"/></li>
                            <li>
                                주소 :<input type="text" name="postNo" id="joinTell" class="address" placeholder="우편번호"/>
                                <button type="button" class="btn_gray postal_code">우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address01" id="joinAddress01" placeholder="주소"/>
                            </li>
                            <li>
                                <textarea type="text" name="address01" id="joinAddress01" placeholder="상세주소"></textarea>
                            </li>
                        </ul>
                    </div>
                </div>    
            </div>

            <div class="right_div tab_03">
                {/* <div class="div_top wid843"> */}
                <input type="radio" id="tab_006" name="tab02" defaultChecked/>
                <label for="tab_006">상세설정</label>
                <input type="radio" id="tab_007" name="tab02" />
                <label for="tab_007">4대보험/부양가족</label>
                <input type="radio" id="tab_008" name="tab02" />
                <label for="tab_008">학력/교육</label>

                <input type="file" id="upload"/>
                <label for="upload" class="upload">통장사본 및 신분증사본 업로드</label>
                {/* </div> */}
                <div class="div_bottom right">
                    <div class="sal_inner">

                        {/* 급여상세 */}
                        <div class="input_content tab_006">
                            <ul>
                                <li>급여 항목</li>
                                <li>소정근로시간 :
                                    <select name="bankName" id="bankName">
                                        <option value="0">5</option>
                                        <option value="1">10</option>
                                        <option value="2">15</option>
                                        <option value="2">20</option>
                                        <option value="2">25</option>
                                        <option value="2">30</option>
                                        <option value="2">직접입력</option>
                                    </select>
                                </li>
                                <li>시급 : <input type="text" name="accountNumber" id="accountNumber"/>원</li>
                                <li>총예상월수령금액 : (값 불러오기) </li>
                                <li>관리사항</li>
                                <li>예금주 : <input type="text" placeholder="박이삭"/></li>
                                <li>
                                    급여이체
                                    <select>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                        <option>우리은행</option>
                                    </select>
                                </li>
                                <li>계좌번호 : <input type="text" placeholder="1002-122-111111111111"/></li>
                            </ul>
                        </div>
                        {/* 급여상세 */}

                        {/* 4대보험 / 부양가족 */}
                        <div class="input_content tab_007">
                            <div class="tab_01_inner">
                                4대보험 <button type="button">신청하기</button>
                                <div class="tab_01_grid">
                                    <DataGrid rowData={rowData} gridDefs={insDefs} gridCommon={gridCommon}/>
                                </div>
                            </div>
                            <div class="tab_02_inner">
                                부양가족 
                                <button type="button" class="btn_gray">추가</button>
                                <button type="button" class="btn_gray">삭제</button>
                                <div class="tab_02_grid">
                                    <DataGrid rowData={rowData} gridDefs={dependDefs} gridCommon={gridCommon}/>
                                </div>
                            </div>
                        </div>
                        {/* --4대보험 / 부양가족 */}

                        {/* 학력교육 */}
                        <div class="input_content tab_008">
                            
                            <div class="tab_01_inner">
                                <button type="button" class="btn_gray">추가</button>
                                <button type="button" class="btn_gray">삭제</button>
                                <div class="tab_01_grid">
                                    <DataGrid rowData={rowData} gridDefs={carrerDefs} gridCommon={gridCommon}/>
                                </div>
                            </div>
                            <div class="tab_02_inner">
                                <button type="button" class="btn_gray">추가</button>
                                <button type="button" class="btn_gray">삭제</button>
                                <div class="tab_02_grid">
                                    <DataGrid rowData={rowData} gridDefs={euduDefs} gridCommon={gridCommon}/>
                                </div>
                            </div>
                        </div>
                        {/* --학력교육 */}


                    </div>
                </div>
            </div>
            {/* 상세 */}

            <button type="submit" class="btn_backnext next_position">이전으로</button>
            <button type="submit" class="btn_backnext save_position">저장하기</button>
        </form>
    </div>
    )
}

export default DailyIncomePresenter;