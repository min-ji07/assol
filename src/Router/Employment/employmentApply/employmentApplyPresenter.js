import React, { useEffect } from 'react';
import '../../../Assets/css/pages/employment/employment_apply.css';
// import useHook from'../../../GlobalState/Hooks/useHook';
// import DataGrid from "../../../Components/DataGrid"
// import gridCommon from '../../../Utils/grid';

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
                            <li><button type="button" class="btn_gray employment_button page">신청서류확인</button></li>
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
                                <div class="content_bottom">

                                </div>


                            </div>
                            {/* <!-- content 흰색 바탕 --> */}
                        </div>
                        {/* <!-- 기본바탕 전체 div --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmploymentApplyPresenter;