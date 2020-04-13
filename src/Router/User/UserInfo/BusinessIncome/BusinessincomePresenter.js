import React from 'react';
import DataGrid from "../../../../Components/DataGrid";
import gridCommon from '../../../../Utils/grid';

const BusinessincomePresenter = ({rowData, euduDefs, carrerDefs}) => {
    return (
    <div class="div_bottom tab_02">
        <form method="POST" action="http://172.30.1.24:5302/User/UserRegistration"> 
            <div class="left_div">
                <div class="test">
                    <div class="left_div_inner">
                        <div class="imgload"><img id="userImgView" src='/images/user02.png' alt="유저사진" style={{width:"140px",height:"140px",borderRadius:"50%"}}/></div>
                        {/* <div class="imgload"><img src='/images/user02.png' alt=""/></div> */}
                        {/* <span>사원 사진을 등록해주세요.</span><br /> */}
                        <div style={{marginTop:"10px"}}>
                        <label for="userImage" class="userImg">등록</label><input type="file" id="userImage"/>
                            <label for="imgDelete">삭제</label><button type="button" id="imgDelete" />
                        </div>
                        <ul>
                            <li>성명 :<input type="text" name="userName" id="joinName" placeholder="사업소득자"/></li>
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
                            <li>입사일 :<input type="text" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요."/></li>
                            <li>그룹입사일 :<input type="text" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요."/></li>
                            <li>  
                            수습적용 :
                                <select name="regularEmployee" id="joinRegular">
                                    <option value="0" selected>부</option>
                                    <option value="1">여</option>                                                
                                </select>
                            </li>
                            <li>수습만료일 :<input type="text" name="joinDate" id="joinDate" placeholder="2020-01-01"/></li>
                            <li>전화번호 :<input type="tel" name="tellno" id="joinTell" placeholder="02-000-0000"/></li>
                            <li>휴대폰 :<input type="tel" name="mobile" id="joinTell" placeholder="010-0000-0000"/></li>
                            {/* <li>
                                소득구분 : 
                                <select name="socialInsurance" id="socialInsurance">
                                    <option value="0">940100 | 저술가</option>
                                    <option value="1">940200 | 화가관련</option>
                                    <option value="2">940301 | 작곡가</option>
                                    <option value="3">940302 | 배우</option>
                                    <option value="4">940303 | 모델</option>
                                    <option value="5">940304 | 가수</option>
                                    <option value="6">940305 | 성악가</option>
                                    <option value="7">940500 | 연예보조</option>
                                    <option value="8">940600 | 자문,고문</option>
                                    <option value="9">940901 | 바둑기사</option>
                                    <option value="10">940902 | 꽃꽃이교사</option>
                                    <option value="11">940903 | 학원강사</option>
                                    <option value="12">940904 | 직업운동가</option>
                                    <option value="13">940905 | 봉사료수취자</option>
                                    <option value="14">940906 | 보험설계</option>
                                    <option value="15">940907 | 음료배달</option>
                                    <option value="16">940908 | 방판,외판</option>
                                    <option value="17">940909 | 기타자영업</option>
                                    <option value="18">940910 | 다단계판매</option>
                                    <option value="19">940911 | 기타모집수당</option>
                                    <option value="20">940912 | 간병인</option>
                                    <option value="21">940913 | 대리운전</option>
                                    <option value="22">940914 | 캐디</option>
                                    <option value="23">940915 | 목욕관리사</option>
                                    <option value="24">940916 | 행사도우미</option>
                                    <option value="25">940917 | 심부름용역</option>
                                    <option value="26">940918 | 퀵서비스</option>
                                    <option value="27">940919 | 물품배달</option>
                                    <option value="28">851101 | 병의원</option>
                                </select>
                            </li> */}
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

            <div class="right_div tab_02">
                {/* <div class="div_top wid843"> */}
                <input type="radio" id="tab_004" name="tab02" defaultChecked/>
                <label for="tab_004">상세설정</label>
                <input type="radio" id="tab_005" name="tab02" />
                <label for="tab_005">학력/교육</label>

                <input type="file" id="upload"/>
                <label for="upload" class="upload">통장사본 및 신분증사본 업로드</label>
                {/* </div> */}
                <div class="div_bottom right">
                    <div class="sal_inner">
                        {/* 급여상세 */}
                        <div class="input_content tab_004">
                            <ul>
                                <li>총 연간 소득 금액 :
                                    <select name="bankName" id="bankName">
                                        <option value="0">60시간</option>
                                        <option value="1">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                        <option value="2">내용부족</option>
                                    </select>
                                </li>
                                <li>
                                    <select name="bankName" id="bankName">
                                        <option value="0">월간</option>
                                        <option value="1">분기</option>
                                        <option value="2">반기</option>
                                        <option value="2">년간</option>
                                    </select>
                                    <input type="text" name="accountNumber" id="1,000,000"/> 원
                                </li>
                                <li>기타부대수당 : 
                                    <select name="bankName" id="bankName">
                                        <option value="0">월간</option>
                                        <option value="1">분기</option>
                                        <option value="2">반기</option>
                                        <option value="2">년간</option>
                                    </select>
                                    <input type="text" name="payOfYear" id="payOfYear"/>원
                                </li>
                                <li>관리사항</li>
                                <li>예금주<input type="text" name="accountHolder" id="accountHolder" placeholder="박이삭"/></li>
                                <li>
                                    급여이체 은행 :
                                    <select>
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
                                <li>계좌번호 :<input type="text" placeholder="1000000000000000"/></li>
                                <li>사업자등록번호<span>*소유자일 경우</span></li>
                                <li>사업자등록번호 : <input type="text" />-<input type="text" />-<input type="text" /></li>
                            </ul>
                        </div>
                        {/* 급여상세 */}

                        {/* 학력교육 */}
                        <div class="input_content tab_005">
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
            <button type="submit" class="btn_backnext next_position">이전으로</button>
            <button type="submit" class="btn_backnext save_position">저장하기</button>
        </form>
    </div>
    )
}

export default BusinessincomePresenter;