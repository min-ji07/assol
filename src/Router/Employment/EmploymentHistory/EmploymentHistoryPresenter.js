import React from 'react';
import  '../../../Assets/css/pages/employment/employment_history.css';


const EmploymentHistoryPresenter = () => {

    return(
        <div class="wrapper">
            <div class="employment_history">
                <div class="title">
                    <div>
                        <h1>고용지원금 신청 내역확인</h1>
                    </div>
                    {/* <div>
                        <button type="button">전체보기</button>
                        <button type="button">일괄확인</button>
                    </div> */}
                    <p>기관에서 신청한 고용지원금의 내역을 확인할 수 있습니다.</p>
                </div>

                <div class="employment_history_content">
                    <div class="button_set">
                        <ul>
                            <li>
                                <a href="#" class="button_01">
                                    <div>STEP1-신청접수</div>
                                    <div>
                                        <span style={{fontSize:"30px", color:"white"}}>45</span>건
                                    </div>
                                </a>
                                {/* <img src="/images/employment_apply_button07.png" alt=""/> */}
                            </li>
                            <li>
                                <a href="#" class="button_02">STEP2-담당자접수</a>
                            </li>
                            <li>
                                <a href="#" class="button_03">STEP3-서류요청</a>
                            </li>
                            <li>
                                <a href="#" class="button_04">STEP4-시,군,구 제출</a>
                            </li>
                            <li>
                                <a href="#" class="button_05">STEP5-승인완료</a>
                            </li>
                        </ul>
                    </div>

                    <div class="employment_history_inner">
                        <div class="history_content">
                            <div class="apply_content">
                                <div class="content_top">
                                    <div class="header">
                                        <ul>
                                            <li>신청지원금 목록</li>
                                            <li>지원자 명부</li>
                                            <li>첨부파일</li>
                                            <li>현황</li>
                                            <li>신청날짜확인</li>
                                        </ul>
                                    </div>
                                </div>




                                <div class="content_bottom">
                                    <div class="body">
                                        <ul>
                                            <li>청년고용장려금</li>
                                            <li>
                                                <div>박이삭</div>
                                                <div>사회복지사</div>
                                                <div>2020.01.06</div>
                                                <div>만 28세</div>
                                            </li>
                                            <li>2020.01.06</li>
                                            <li>만 <span>28세</span></li>
                                            <li>
                                                <div>
                                                    <div>청년고용장려금</div>
                                                    <div>일자리안정자금</div>
                                                </div>
                                                <div>
                                                    <div>2020.04.13부로가능</div>
                                                    <div>월 40만원</div>
                                                </div>
                                            </li>
                                            <li>월 70만원</li>
                                            <li><a href="#">신청</a></li>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


                {/* 팝업 */}
                {/* <div className="modal_box imgupload" style={{display:"none"}}>
                    <div class="document_popup">
                        <img class="btn_close" src="/images/esc.png" alt="닫기" onClick={()=>closePopup()} />

                        <div class="document_popup_inner">
                            <div class="title">
                                <h1>신청서류양식</h1>
                                <p>고용지원금을 신청하기 위한 서류 양식입니다</p>
                            </div>
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
                    <div className="modal_bg">
                    </div>
                </div> */}
            </div>
        </div>
    );
}
 
export default EmploymentHistoryPresenter;