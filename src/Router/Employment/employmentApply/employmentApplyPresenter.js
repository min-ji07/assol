import React, { useEffect } from 'react';
import '../../../Assets/css/pages/employment/employment_apply.css';
// import useHook from'../../../GlobalState/Hooks/useHook';
// import DataGrid from "../../../Components/DataGrid"
// import gridCommon from '../../../Utils/grid';

// 팝업 띄우기, 닫기
const openJoinPop = () => {
    $(".modal_box").show();
};
const closePopup = () => {
    $(".modal_box").hide();
    return false;
}

const EmploymentApplyPresenter = () => { 
    return(
        <div class="wrapper">
            <div class="employment_apply">
                <div class="title">
                    <h1>고용지원금 신청</h1>
                    <p>기관에 해당하는 고용지원금을 접수할 수 있습니다.</p>
                </div>
                <div class="employment_apply_content">
                    <div class="button_set">
                        <ul>
                            <li>
                                <div class="apply_support f5">
                                    월 신청가능 지원금<button type="button" class="f5">새로고침 </button>
                                </div>
                                <div class="apply_support_money">
                                    <span>15,000,000</span>원
                                </div>
                            </li>
                            <li><button type="button" class="btn_gray employment_button card">사원정보불러오기</button></li>
                            <li><button type="button" class="btn_gray employment_button folder">지원금 상세보기</button></li>
                            <li><button type="button" class="btn_gray employment_button page" onClick={()=>openJoinPop()}>신청서류확인</button></li>
                            <li><button type="button" class="btn_gray employment_button send">신청내역확인</button></li>
                        </ul>
                    </div>

                    <div class="employment_apply_inner">
                        <div class="apply_top">
                            <div class="apply_top_left">
                                <input type="text" class="employment_input" maxlength="6" placeholder="사원명을 검색해주세요." />
                            </div>
                            <div class="apply_top_right">
                                <ul>
                                    <li>
                                        <button type="button" class="">일괄 계산</button>
                                    </li>
                                    <li>
                                        <button type="button" class="white_button">일괄 신청</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- 기본바탕 전체 div --> */}
                        <div class="apply_bottom">
                            {/* 표 */}
                            <div class="apply_content">
                                <div class="content_top">
                                    <div class="header">
                                        <ul>
                                            <li>성명</li>
                                            <li>직책</li>
                                            <li>입사일</li>
                                            <li>나이</li>
                                            <li>지원가능지원금</li>
                                            <li>지원가능총액</li>
                                            <li>확인</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content_bottom">
                                    <div class="body">
                                        {/* 추가시 javascript로 ul을 추가 */}
                                        <ul>
                                            <li>박이삭</li>
                                            <li>사회복지사</li>
                                            <li>2020.01.06</li>
                                            <li>만 <span>28세</span></li>
                                            <li>
                                                <div>
                                                    <div>청년고용장려금</div>
                                                    <div>일자리안정자금</div>
                                                </div>
                                                <div>
                                                    <div>2020.04.13부로가능</div>
                                                    {/* 지원가능 after달기 */}
                                                    <div>월 40만원</div>
                                                </div>
                                            </li>
                                            <li>월 70만원</li>
                                            <li><a href="#">신청</a></li>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                            {/* <!-- content 흰색 바탕 --> */}
                        </div>
                        {/* <!-- 기본바탕 전체 div --> */}
                    </div>
                </div>

                {/* 팝업 */}
                <div className="modal_box imgupload" style={{display:"none"}}>
                    <div class="document_popup">
                        <img class="btn_close" src="/images/esc.png" alt="닫기" onClick={()=>closePopup()} />

                        <div class="document_popup_inner">
                            <div class="title">
                                <h1>신청서류양식</h1>
                                <p>고용지원금을 신청하기 위한 서류 양식입니다</p>
                            </div>
                            {/* 팝업내용헤더 */}
                            <div class="em_popup_header">
                                <ul>
                                    <li>구분</li>
                                    <li>내용</li>
                                </ul>
                            </div>

                            <div class="em_popup_body">
                                <ul>
                                    <li>
                                        <div>
                                            <div class="popup_button left_content">
                                                <button type="button">취업규칙</button>
                                            </div>
                                            <div class="right_content">
                                                <p>취업규칙조건</p>
                                                <p>내용</p>
                                                <p>내용</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <div class="popup_button">
                                                <button type="button">근로자명부</button>
                                            </div>
                                            <div>
                                                <p>취업규칙조건</p>
                                                <p>내용</p>
                                                <p>내용</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <div class="popup_button">
                                                <button type="button">3개월급여대장</button>
                                            </div>
                                            <div>
                                                <p>취업규칙조건</p>
                                                <p>내용</p>
                                                <p>내용</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                    {/* 팝업배경 */}
                    <div className="modal_bg">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmploymentApplyPresenter;