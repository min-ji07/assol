import React from 'react';
import DataGrid from "../../../../Components/DataGrid";
import $ from 'jquery';
import gridCommon from '../../../../Utils/grid';
import { callApi } from '../../../../Utils/api';
import utils from '../../../../Utils/utils';

const BusinessincomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {
    
    return (
    <div class="div_bottom tab_02">
        <form> 
            <div class="left_div">
                <div id="userInfoLeft2" class="test">
                    <div class="left_div_inner">
                    <div class="imgload">
                        <img id="userImgView2" class="userImgView" src='/images/user02.png' alt="유저사진"/>
                        <span id="userImgText2" class="userImgText" style={{display:"block"}}>사원 사진을 등록해주세요.</span>
                        <div style={{marginTop:"5px"}}>
                            <label for="userImage2" class="userImg">수정</label><input type="file" id="userImage2" class="userImageInput" name="userImageInput" accept="image/*"/>
                            <label for="imgDelete2">삭제</label><button type="button" id="imgDelete2" name="imgDelete"/>
                        </div>
                    </div>
                        <ul class="userinfo_left_box">
                        <li>
                            <span>성명 :</span>
                            <input type="text" name="userName" id="userName" placeholder="성명을 입력해주세요." />
                        </li>
                            <li>
                                <span>주민번호 :</span>
                                <input type="text" class="personal_input" name="personalNumber" id="personalNumber" placeholder="123456-1234567"  />
                                <select name="national" id="national">
                                    <option value="내국인" selected>내국인</option>
                                    <option value="외국인">외국인</option>                                                
                                </select>
                            </li>
                            <li class="visa_li">
                                <span>
                                    비자타입 :
                                </span>
                                <input type="text" id="visaType" name="visaType" placeholder="K-9011"/>
                            </li>
                            <li>
                                <span>입사일 :</span>
                                <input type="text" class="date_input join_date" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요." />
                            </li>
                            <li>
                                <span>업무 :</span>
                                <select id="position" name="position" style={{borderRadius:"0px", marginLeft:"20px", width:"172px", marginTop:"-4px"}}>
                                    <option value="저술가">저술가</option>
                                    <option value="화가관련">화가관련</option>
                                    <option value="작곡가">작곡가</option>
                                    <option value="배우">배우</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div class="right_div_inner">
                        <ul class="userinfo_right_box">
                            <li>
                                <span>전화번호 :</span>
                                <input type="text" class="tell_input" name="tellNo" id="tellNo" placeholder="02-000-0000"  />
                            </li>
                            <li>
                                <span>휴대폰 :</span>
                                <input type="text" maxLenght="13" class="phone_input" name="mobile" id="mobile" placeholder="010-0000-0000"  />
                            </li>
                            <li>
                                <span>이메일 :</span>
                                <input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." />
                            </li>
                            <li style={{position:"relative"}}>
                                우편번호 :<input type="text" name="postNo" id="postNo" class="address" placeholder="우편번호"  style={{width:"152px"}} readOnly/>
                                <button type="button" class="btn_gray postal_code" name="btnPost">우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소" readOnly style={{width:"300px"}}/>
                            </li>
                            <li style={{height:"70px"}}>
                                <textarea name="addressDetail" id="addressDetail" placeholder="상세주소"></textarea>
                            </li>
                            <li class="leave_li">  
                                <span>퇴사여부 :</span>
                                <select name="isActive" id="isActive" style={{width:"50px"}}>
                                    <option value="1">여</option>
                                    <option value="0" selected>부</option>                                      
                                </select>
                                <span>
                                    <span style={{marginLeft:"5px"}}>퇴사일자 :</span>
                                    <input type="text" name="leaveDate" id="leaveDate" class="date_input" placeholder="2020-04-04" style={{width:"100px"}}/>
                                </span>
                            </li>
                            <li class="leave_li">
                                <span>퇴사사유 :</span>
                                <input type="text" name="leaveReason" id="leaveReason" placeholder="개인사유"/>
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
                <button type="button" class="upload" name="btnInsaUpload">인사서류 업로드</button>
                {/* <input type="file" id="upload"/>
                <label for="upload" class="upload">인사서류 업로드</label> */}
                {/* </div> */}
                <div class="div_bottom right">
                    <div class="sal_inner">
                        {/* 급여상세 */}
                        <div id="userInfoRight2" class="input_content tab_004">
                            <ul>
                                <li style={{listStyle:"disc", height:"21px", lineHeight:"21px"}}>
                                    <strong>급여항목</strong>
                                </li>
                                <li class="salary" style={{marginTop:"10px", height:"100px", listStyle:"none"}}>
                                    <ul>
                                        <li>총 연간 소득금액 :
                                            <input type="text" class="money_input" name="totalPayOfYear" id="totalPayOfYear" placeholder="10,000,000" /> 원
                                        </li>
                                        <li style={{listStyle:"none", float:"left", display:"inline-block", marginLeft:"48px"}}>
                                            <select name="payQuarterType" id="payQuarterType" style={{width: "74px", textAling: "center"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="2">년간</option>
                                            </select>
                                            <input type="text" class="money_input" name="payQuarter" id="payQuarter" placeholder="10,000,000" /> 원
                                        </li>
                                        <li style={{width:"325px", marginLeft:"280px"}}>기타부대수당 : 
                                            <select name="otherExtraPayType" id="otherExtraPayType" style={{marginLeft:"10px", width: "74px", textAling: "center"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="2">년간</option>
                                            </select>
                                            <input type="text" class="money_input" name="otherExtraPay" id="otherExtraPay" placeholder="10,000,000" />원
                                        </li>
                                    </ul>
                                </li>
                                
                                <li class="clear">
                                    <strong style={{display:"block", marginTop:"20px"}}>관리사항</strong>
                                    <ul>
                                        <li style={{listStyle:"none", float:"left", display:"inline-block", marginLeft:"0px"}}>
                                            예금주 : <input type="text" name="accountHolder" id="accountHolder" placeholder="박이삭" />
                                        </li>
                                        <li style={{listStyle:"none", display:"inline-block"}}>
                                            급여이체 은행 :
                                            <select id="bankName" name="bankName" style={{textIndent :"0px", width:"136px"}} >
                                                <option value='SC제일은행'>SC제일은행</option>
                                                <option value='경남은행'>경남은행</option>
                                                <option value='광주은행'>광주은행</option>
                                                <option value='국민은행'>국민은행</option>
                                                <option value='굿모닝신한증권'>굿모닝신한증권</option>
                                                <option value='기업은행'>기업은행</option>
                                                <option value='농협중앙회'>농협중앙회</option>
                                                <option value='농협회원조합'>농협회원조합</option>
                                                <option value='대구은행'>대구은행</option>
                                                <option value='대신증권'>대신증권</option>
                                                <option value='대우증권'>대우증권</option>
                                                <option value='동부증권'>동부증권</option>
                                                <option value='동양종합금융증권'>동양종합금융증권</option>
                                                <option value='메리츠증권'>메리츠증권</option>
                                                <option value='미래에셋증권'>미래에셋증권</option>
                                                <option value='뱅크오브아메리카(BOA)'>뱅크오브아메리카(BOA)</option>
                                                <option value='부국증권'>부국증권</option>
                                                <option value='부산은행'>부산은행</option>
                                                <option value='산림조합중앙회'>산림조합중앙회</option>
                                                <option value='산업은행'>산업은행</option>
                                                <option value='삼성증권'>삼성증권</option>
                                                <option value='상호신용금고'>상호신용금고</option>
                                                <option value='새마을금고'>새마을금고</option>
                                                <option value='수출입은행'>수출입은행</option>
                                                <option value='수협중앙회'>수협중앙회</option>
                                                <option value='신영증권'>신영증권</option>
                                                <option value='신한은행'>신한은행</option>
                                                <option value='신협중앙회'>신협중앙회</option>
                                                <option value='에스케이증권'>에스케이증권</option>
                                                <option value='에이치엠씨투자증권'>에이치엠씨투자증권</option>
                                                <option value='엔에이치투자증권'>엔에이치투자증권</option>
                                                <option value='엘아이지투자증권'>엘아이지투자증권</option>
                                                <option value='외환은행'>외환은행</option>
                                                <option value='우리은행'>우리은행</option>
                                                <option value='우리투자증권'>우리투자증권</option>
                                                <option value='우체국'>우체국</option>
                                                <option value='유진투자증권'>유진투자증권</option>
                                                <option value='전북은행'>전북은행</option>
                                                <option value='제주은행'>제주은행</option>
                                                <option value='키움증권'>키움증권</option>
                                                <option value='하나대투증권'>하나대투증권</option>
                                                <option value='하나은행'>하나은행</option>
                                                <option value='하이투자증권'>하이투자증권</option>
                                                <option value='한국씨티은행'>한국씨티은행</option>
                                                <option value='한국투자증권'>한국투자증권</option>
                                                <option value='한화증권'>한화증권</option>
                                                <option value='현대증권'>현대증권</option>
                                                <option value='홍콩상하이은행'>홍콩상하이은행</option>
                                            </select>
                                        </li>
                                        <li style={{listStyle:"none", display:"inline-block"}}>
                                            계좌번호 :<input type="text" id="accountNo" name="accountNo" placeholder="110-491-546205"  style={{width:"178px"}}/>
                                        </li>
                                    </ul>
                                </li>
                                
                                <li class="ul_li_left" style={{height:"132px", borderBottom:"1px solid #dedede"}}>
                                    <strong>사업자등록번호</strong>
                                    <span style={{color:"#f38d8d", fontSize:"13px"}}> *소유자일 경우</span>
                                    <ul>
                                        <li style={{listStyle:"none", marginLeft:"0px"}}>
                                            사업자등록번호 : <input class="num_input" type="text" maxLength="3" id="businessNo1" placeholder="00"  style={{width:"40px", border:"none", borderBottom:"1px solid #8a8a8a"}}/>-
                                            <input class="num_input" type="text" maxLength="2" id="businessNo2" placeholder="00"  style={{width:"40px", border:"none", borderBottom:"1px solid #8a8a8a"}}/>-
                                            <input class="num_input" type="text" maxLength="5" id="businessNo3" placeholder="000" style={{width:"70px", border:"none", borderBottom:"1px solid #8a8a8a"}}/>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* 급여상세 */}

                        {/* 학력교육 */}
                        <div class="input_content tab_005">
                            <ul>
                                <li>학력
                                    <div class="tab_01_inner">
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} name="btnAddRow">추가</button>
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div class="tab_01_grid grid_scrollX_none eduGrid">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>경력
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div class="tab_02_grid grid_scrollX_none carrerGrid">
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>병역
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div class="tab_02_grid grid_scrollX_none militaryGrid">
                                            <DataGrid rowData={rowData4} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>교육
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div class="tab_02_grid grid_scrollX_none curriculumGrid">
                                            <DataGrid rowData={rowData5} gridDefs={curriculumDefs}/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* --학력교육 */}
                    </div>
                </div>
            </div>
            <button type="button" class="btn_backnext next_position">이전으로</button>
            <button type="button" class="btn_backnext save_position" name="btnSave">저장하기</button>
        </form>
    </div>
    )
}

export default BusinessincomePresenter;