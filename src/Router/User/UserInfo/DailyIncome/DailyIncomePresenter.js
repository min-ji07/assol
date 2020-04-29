import React from 'react';
import DataGrid from "../../../../Components/DataGrid"
import { callApi } from '../../../../Utils/api';
import gridCommon from '../../../../Utils/grid';
import utils from '../../../../Utils/utils';

const DailyIncomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {

    return (
    <div className="div_bottom tab_03">
        <form> 
            <div className="left_div">
                <div id="userInfoLeft3">
                    <div className="left_div_inner">
                    <div className="imgload">
                        <img id="userImgView3" className="userImgView" src='/images/user02.png' alt="유저사진"/>
                        <span id="userImgText3" className="userImgText" style={{display:"block"}}>사원 사진을 등록해주세요.</span>
                        <div style={{marginTop:"5px"}}>
                            <label for="userImage3" className="userImg">수정</label>
                            <input type="file" className="userImage" id="userImage3" accept="image/*" name="userImageInput"/>
                            <label for="imgDelete3">삭제</label>
                            <button type="button" id="imgDelete3" name="imgDelete"/>
                        </div>
                    </div>
                    <ul className="userinfo_left_box">
                        <li>
                            <span>성명 :</span>
                            <input type="text" name="userName" id="userName" placeholder="성명을 입력해주세요." />
                        </li>
                            <li>
                                <span>주민번호 :</span>
                                <input type="text" className="personal_input" name="personalNumber" id="personalNumber" placeholder="123456-1234567"  />
                                <select name="national" id="national">
                                    <option value="내국인" selected>내국인</option>
                                    <option value="외국인">외국인</option>                                                
                                </select>
                            </li>
                            <li className="visa_li">
                                <span>
                                    비자타입 :
                                </span>
                                <input type="text" id="visaType" name="visaType" placeholder="K-9011"/>
                            </li>
                            <li>
                                <span>등록일 :</span>
                                <input type="text" className="date_input join_date" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요." />
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
                    <div className="right_div_inner">
                        <ul>
                            <li>전화번호 :<input type="text" className="tell_input" name="tellNo" id="tellNo" placeholder="02-000-0000" /></li>
                            <li>휴대폰 :<input type="text" maxLenght="13" className="phone_input" name="mobile" id="mobile" placeholder="010-0000-0000" /></li>
                            <li>
                                <span>이메일 :</span>
                                <input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." />
                            </li>
                            <li style={{position:"relative"}}>
                                우편번호 :<input type="text" name="postNo" id="postNo" className="address" placeholder="우편번호"  style={{width:"152px"}} readOnly/>
                                <button type="button" className="btn_gray postal_code" name="btnPost">우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소"   style={{width:"300px"}} readOnly/>
                            </li>
                            <li style={{height:"70px"}}>
                                <textarea name="addressDetail" id="addressDetail" placeholder="상세주소"></textarea>
                            </li>
                            <li className="leave_li">  
                                <span>퇴사여부 :</span>
                                <select name="isActive" id="isActive" style={{width:"50px"}}>
                                    <option value="1">여</option>
                                    <option value="0" selected>부</option>                                      
                                </select>
                                <span>
                                    <span style={{marginLeft:"5px"}}>퇴사일자 :</span>
                                    <input type="text" name="leaveDate" id="leaveDate" className="date_input" placeholder="2020-04-04" style={{width:"100px"}}/>
                                </span>
                            </li>
                            <li className="leave_li">
                                <span>퇴사사유 :</span>
                                <input type="text" name="leaveReason" id="leaveReason" placeholder="개인사유"/>
                            </li>
                        </ul>
                    </div>
                </div>    
            </div>

            <div className="right_div tab_03">
                {/* <div className="div_top wid843"> */}
                <input type="radio" id="tab_006" name="tab02" defaultChecked/>
                <label for="tab_006">급여상세</label>
                <input type="radio" id="tab_007" name="tab02" />
                <label for="tab_007">4대보험/부양가족</label>
                <input type="radio" id="tab_008" name="tab02" />
                <label for="tab_008">학력/교육</label>
                <button type="button" className="upload" name="btnInsaUpload">인사서류 업로드</button>
                {/* <input type="file" id="upload"/>
                <label for="upload" className="upload">인사서류 업로드</label> */}
                {/* </div> */}
                <div className="div_bottom right">
                    <div className="sal_inner">

                        {/* 급여상세 */}
                        <div id="userInfoRight3" className="input_content tab_006">
                            <ul>
                                <li style={{listStyle:"disc", height:"21px", lineHeight:"21px"}}>
                                    <strong>급여항목</strong>
                                </li>
                                <li className="salary" style={{marginTop:"10px", listStyle:"none", height:"70px"}}>
                                    <ul>
                                        <li className="li_left" style={{width:"200px"}}>
                                            소정근로시간 :<input type="text" className="num_input" name="workTime" id="workTime" placeholder="1,700,000" maxLength="3" />
                                        </li>
                                        <li style={{display:"inline-block"}}>
                                            시급 : <input type="text" className="money_input" name="payOfHour" id="payOfHour" maxLength="10"/>원
                                        </li>
                                        <li className="li_right">
                                            총예상월수령금액 :<input type="text" className="money_input" name="predictionMonth" id="predictionMonth" placeholder="2,100,500"  
                                            tabindex="-1" style={{fontSize: "20px", border:"none", width: "130px", height:"30px", marginBottom:"4px"}} readOnly/>원
                                        </li>
                                    </ul>
                                </li>
                                <li className="clear">
                                    <strong style={{display:"block", marginTop:"20px"}}>관리사항</strong>
                                    <ul>
                                        <li style={{marginLeft:"0px"}}>
                                            예금주 : <input type="text" id="accountHolder" name="accountHolder" placeholder="박이삭" />
                                        </li>
                                        <li>
                                        급여이체은행 :
                                            <select style={{textIndent :"0px", width:"136px"}} id="bankName">
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
                                        <li>
                                            계좌번호: <input type="text" placeholder="1002-122-113541" id="accountNo" name="accountNo"  style={{width:"178px"}}/>
                                        </li>
                                    </ul>
                                 </li>
                            </ul>
                        </div>
                        {/* 급여상세 */}

                        {/* 4대보험 / 부양가족 */}
                        <div className="input_content tab_007" style={{height: "455px"}}>
                            <div className="tab_01_inner">
                                <ul>
                                    <li style={{listStyle:"disc", fontSize:"16px"}}>
                                    <strong>4대보험</strong>
                                    <button type="button" className="btn_gray" style={{marginLeft: "5px", marginTop: "-5px", marginLeft:"7px"}}>신청하기</button>
                                        <div className="tab_01_grid">
                                            <ul id="insurnaceTable2">
                                                <li>
                                                    <div>구분</div>
                                                    <div>기호번호</div>
                                                    <div>취득일</div>
                                                    <div className="right_border">상실일</div>
                                                </li>
                                                <li>
                                                    <div>국민연금</div>
                                                    <div><input type="text" id="fourIns0"  maxLength="10"/></div>
                                                    <div><input type="text" className="date_input " id="getOfIns0"   /></div>
                                                    <div className="right_border"><input type="text" className="date_input " id="lostOfIns0" /></div>
                                                </li>
                                                <li>
                                                    <div>건강보험</div>
                                                    <div><input type="text" id="fourIns1"   maxLength="10"/></div>
                                                    <div><input type="text" className="date_input " id="getOfIns1"  /></div>
                                                    <div className="right_border"><input type="text" className="date_input " id="lostOfIns1"  /></div>
                                                </li>
                                                <li>
                                                    <div>고용보험</div>
                                                    <div><input type="text" id="fourIns2"  maxLength="10"/></div>
                                                    <div><input type="text" className="date_input " id="getOfIns2" /></div>
                                                    <div className="right_border"><input type="text" className="date_input " id="lostOfIns2" /></div>
                                                </li>
                                                <li>
                                                    <div className="bottom_border">산재보험</div>
                                                    <div className="bottom_border"><input type="text" id="fourIns3"  maxLength="10"/></div>
                                                    <div className="bottom_border"><input type="text" className="date_input " id="getOfIns3"  /></div>
                                                    <div className="bottom_border right_border"><input type="text" className="date_input " id="lostOfIns3"  /></div>
                                                </li>
                                            </ul>
                                            {/* <DataGrid rowData={rowData} gridDefs={insDefs} gridCommon={gridCommon}/> */}
                                            {/* <table id="insurnaceTable">
                                                <thead>
                                                    <tr>
                                                        <th>구분</th>
                                                        <th>기호번호</th>
                                                        <th>취득일</th>
                                                        <th>상실일</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>국민연금</th>
                                                        <td>
                                                            <input type="text" id="fourIns0" />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="getOfIns0"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="lostOfIns0" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>건강보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns1"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="getOfIns1"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="lostOfIns1"  />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>고용보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns2"   />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="getOfIns2" />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="lostOfIns2" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>산재보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns3" />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="getOfIns3"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" className="date_input " id="lostOfIns3"  />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table> */}
                                        </div>
                                    </li>
                                    {/* <li style={{marginLeft: "25px"}}>
                                    </li> */}
                                    <li style={{listStyle:"disc", fontSize:"17px", marginLeft:"7px", marginTop:"45px"}}>
                                        <strong>부양가족</strong>
                                        <button type="button" className="btn_gray" style={{marginLeft: "5px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div className="tab_02_grid grid_scrollX_none dependGrid">
                                            <DataGrid rowData={rowData} gridDefs={dependDefs}/>
                                        </div>
                                        {/* 부양가족 */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* --4대보험 / 부양가족 */}

                        {/* 학력교육 */}
                        <div className="input_content tab_008">
                            <ul>
                                <li>
                                    <strong>학력</strong>
                                    <div className="tab_01_inner">
                                        <button type="button" className="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}} name="btnRemoveRow">삭제</button>

                                        <div className="tab_01_grid grid_scrollX_none eduGrid">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTop:"20px"}}>
                                    <strong>경력</strong>
                                    <div className="tab_02_inner">
                                        <button type="button" className="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div className="tab_02_grid grid_scrollX_none carrerGrid" style={{marginTop:"-42px"}}>
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTop:"20px"}}>
                                    <strong>병역</strong>
                                    <div className="tab_02_inner">
                                        <button type="button" className="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div className="tab_02_grid grid_scrollX_none militaryGrid">
                                            <DataGrid rowData={rowData4} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTop:"20px"}}>
                                    <strong>교육</strong>
                                    <div className="tab_02_inner">
                                        <button type="button" className="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div className="tab_02_grid grid_scrollX_none curriculumGrid">
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
            {/* 상세 */}

            {/* <button type="button" className="btn_backnext next_position">이전으로</button> */}
            <button type="button" className="btn_backnext save_position" name="btnSave">저장하기</button>
        </form>
    </div>
    )
}

export default DailyIncomePresenter;