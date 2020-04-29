import React, { useEffect } from 'react';
import DataGrid from "../../../../Components/DataGrid";
import { callApi } from '../../../../Utils/api';
import $ from 'jquery';
import gridCommon from '../../../../Utils/grid';
import utils from '../../../../Utils/utils';

const EamedIncomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {

    useEffect(()=>{

    },[]); //init

    return (
    <div className="div_bottom tab_01">
        <form id="test">
            <div className="left_div">
                {/* 왼쪽기본 내용 */}
                <div id="userInfoLeft">
                    <div className="left_div_inner">
                    <div className="imgload">
                        <img id="userImgView" className="userImgView" src='/images/user02.png' alt="유저사진"/>
                        <span id="userImgText" className="userImgText" style={{display:"block"}}>사원 사진을 등록해주세요.</span>
                        <div style={{marginTop:"5px"}}>
                            <label htmlFor="userImage" className="userImg">수정</label><input type="file" name="userImageInput" className="userImage" id="userImage" accept="image/*"/>
                            <label htmlFor="imgDelete">삭제</label><button type="button" id="imgDelete" name="imgDelete"/>
                        </div>
                    </div>
                    <ul className="userinfo_left_box">
                        <li><span>성명 :</span><input type="text" name="userName" id="userName" placeholder="성명을 입력해주세요." /></li>
                        <li>
                            <span>주민번호 :</span>
                            <input type="text" className="personal_input" name="personalNumber" id="personalNumber" maxLength="14" placeholder="123456-1234567" />
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
                        <li><span>입사일 :</span><input type="text" className="date_input join_date" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요." /></li>
                        {/* <li>아이디 :<input type="text" name="id" id="joinId" placeholder="아이디를 입력해주세요."/></li> */}
                        <li><span>직무 :</span> 
                            {/* <input type="text" name="position" id="position" placeholder="사회복지사" /> */}
                            <select name="position" id="position" style={{width:"182px"}}>
                                <option value="사회복지사">사회복지사</option>
                                <option value="요양보호사">요양보호사</option>
                                <option value="사무원">사무원</option>
                                <option value="시설장">시설장</option>
                                <option value="조리원">조리원</option>
                                <option value="운전사">운전사</option>
                                <option value="물리치료사">물리치료사</option>
                                <option value="촉탁의">촉탁의</option>
                                <option value="대표">대표</option>
                            </select>
                        </li>
                        <li><span>직위 : </span>
                            <input type="text" name="workLevel" id="workLevel" placeholder="부장" />
                        </li>
                        </ul>
                    </div>
                    <div className="right_div_inner">
                        <ul className="userinfo_right_box">
                            <li style={{display:"inline-block" , width:"155px", marginLeft:"5px" }}>
                                <span>고용형태 : </span>
                                <select name="regularEmployee" id="regularEmployee">
                                    <option value="정규직">정규직</option>
                                    <option value="계약직">계약직</option>
                                    <option value="파견직">파견직</option>
                                    <option value="위촉직">위촉직</option>                   
                                </select>
                            </li>
                            <li>  
                                <span>수습적용 :</span>
                                <select name="isProbation" id="isProbation" style={{width:"38px",marginLeft:"15px",marginRight:"15px"}}>
                                    <option value="1" selected>부</option>
                                    <option value="0">여</option>                                                
                                </select>
                                <span  style={{display:"none"}}>
                                    수습만료일 :<input type="text" className="date_input" name="probation" id="probation" placeholder="2020-01-01"   style={{ width:"89px"}}/>
                                </span>
                            </li>
                            <li>
                                <span>계약기간 :</span>
                                <input type="text" className="dateto_input" name="contractPeriod" id="contractPeriod" placeholder="2020-01-01 ~ 2021-01-01" />
                            </li>
                            <li>전화번호 :<input type="text" maxLength="13" className="tell_input" name="tellNo" id="tellNo" placeholder="02-000-0000" /></li>
                            <li>휴대폰 :<input type="text" maxLength="13" className="phone_input" name="mobile" id="mobile" placeholder="010-0000-0000" /></li>
                            <li>
                                <span>이메일 :</span>
                                <input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." />
                            </li>
                            <li style={{position:"relative"}}>
                                우편번호 :<input type="text" name="postNo" id="postNo" className="address" placeholder="우편번호" style={{width:"152px"}} readOnly/>
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
        
            <div className="right_div tab_01">

                {/* <div className="div_top wid843"> */}
                    <input type="radio" id="tab_001" name="tab02" defaultChecked/>
                    <label htmlFor="tab_001">급여상세</label>
                    <input type="radio" id="tab_002" name="tab02" />
                    <label htmlFor="tab_002">4대보험/부양가족</label>
                    <input type="radio" id="tab_003" name="tab02" />
                    <label htmlFor="tab_003">학력/교육</label>
                    
                    {/* <input type="file" id="upload"/>
                    <label htmlFor="upload" className="upload">인사서류 업로드</label> */}
                    <button type="button" className="upload" name="btnInsaUpload">인사서류 업로드</button>
                {/* </div> */}

                <div className="div_bottom right"> 
                    {/* 오른쪽전체 div  */}
                    <div className="sal_inner">
                        {/* 급여상세 */}
                        <div id="userInfoRight" className="input_content tab_001">
                            <ul>
                                <li style={{listStyle:"disc", height:"21px", lineHeight:"21px"}}>
                                    <strong>급여항목</strong>
                                    <button type="button" className="btn_gray wi64he19" id="addSalary">추가</button>
                                </li>
                                <li id="monthSalary" className="salary" style={{overflowY: "auto", marginTop:"10px"}}>
                                    <ul style={{ borderBottom:"1px dotted #e7e7e7", height:"40px"}}>
                                        <li>
                                            <span>월급 :</span>
                                            <input type="text" className="money_input" id="salaryOfMonth" name="salaryOfMonth" readOnly/>
                                            <span>원</span>
                                            {/* <input type="text" className="money_input" name="salaryOfMonth" id="salaryOfMonth" placeholder="1,700,000" /> */}
                                        </li>
                                    </ul>    
                                    <ul>
                                        <li className="li_left">
                                            <span>기본급 :</span>
                                            <input type="text" name="baseSalary" id="baseSalary" className="address money_input big" placeholder="1,700,000" />
                                        </li>
                                        <li className="li_left small">
                                            <span>식대 :</span>
                                           <input type="text" name="foodSalary" id="foodSalary" className="address money_input" placeholder="1,700,000" />
                                        </li>
                                        <li className="li_left big">
                                            <span>차량유지비 :</span>
                                            <input type="text" name="carSalary" id="carSalary" className="address money_input" placeholder="1,700,000" />
                                        </li>
                                        <li className="li_left">
                                            <span>복리후생 :</span>
                                            <input type="text" name="welfareSalary" id="welfareSalary" className="address money_input" placeholder="1,700,000" />
                                        </li>
                                        <li className="li_left">
                                            <span>직책수당 :</span>
                                            <input type="text" name="positionSalary" id="positionSalary" className="address money_input" placeholder="1,700,000" />
                                        </li>     
                                    </ul>
                                </li>
                                <li className="clear">
                                    <strong style={{display:"block", marginTop:"20px"}}>성과금, 상여금</strong>
                                    <ul id="yearsSalryBox">
                                        <li className="in_block">
                                            성과금 :<input type="text" className="money_input" name="insentive" id="insentive" placeholder="1,700,000" />
                                            <select id="insentiveType" style={{width: "74px", textAling: "center"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="3">년간</option>
                                            </select>
                                        </li>
                                        <li className="in_block" style={{marginLeft: "15px"}}>
                                            상여금 :<input type="text" className="money_input" name="bonus" id="bonus" placeholder="1,700,000" />
                                            <select id="bonusType" style={{width: "74px"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="3">년간</option>
                                            </select>
                                        </li>
                                        <li className="salary_years" style={{marginRight:"30px"}}>
                                            <span>연봉 :</span>
                                            <input type="text" className="money_input" name="salaryOfYears" id="salaryOfYears"
                                            tabindex="-1" style={{fontSize: "20px", border:"none", width: "130px", height:"30px"}} readOnly/>
                                            <span>원</span>
                                        </li>
                                    </ul>
                                </li>
                                <li className="ul_li_left" style={{height:"132px"}}>
                                    <strong style={{display:"block", margknTop:"8px"}}>관리사항</strong>
                                    <ul>
                                        <li style={{marginLeft:"0px"}}>
                                            예금주 :<input type="text" id="accountHolder" name="accountHolder" placeholder="박이삭" />
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
                                        <li>계좌번호 :<input type="text" id="accountNo" placeholder="1000-100-1000000" style={{width:"178px"}} /></li>
                                        <br />
                                        <li style={{marginLeft:"0px"}}>
                                            중소기업취업감면 여부 :
                                            <select id="jobReductActive" className="small_bs" style={{width: "43px", marginLeft: "10px"}}>
                                                <option value="1" defaultChecked>부</option>
                                                <option value="0">여</option>
                                            </select>
                                        </li>
                                        <li className="job_reduct_li">기간 :<input type="text" className="dateto_input" id="reductDate" placeholder="2020.01-01~2025.01.01" style={{width: "213px"}}  /></li>
                                        <li className="job_reduct_li">감면율 :
                                            {/* <input type="text" id="reductPer" placeholder="90"  style={{width: "43px"}} />% */}
                                            &nbsp;
                                            <select id="reductPer" style={{width: "58px",textIndent:"5px"}}>
                                                <option value="0">0</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                                <option value="60">60</option>
                                                <option value="70">70</option>
                                                <option value="80" defaultChecked>80</option>
                                                <option value="90">90</option>
                                                <option value="100">100</option>
                                            </select>
                                            &nbsp;%
                                        </li>
                                        <li className="job_reduct_li">감면대상 :<input type="text" id="reductTarget" placeholder="급여" style={{width: "53px"}} /></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* --급여상세 */}

                        {/* 4대보험 / 부양가족 */}
                        <div className="input_content tab_002" style={{height: "455px"}}>
                            <div className="tab_01_inner">
                                <ul>
                                    <li style={{listStyle:"disc", fontSize:"16px"}}>
                                    <strong>4대보험</strong>
                                    <button type="button" className="btn_gray" style={{marginLeft: "5px", marginTop: "-5px", marginLeft:"7px"}}>신청하기</button>
                                        <div className="tab_01_grid">
                                            <ul id="insurnaceTable">
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
                                        </div>
                                    </li>
                                    {/* <li style={{marginLeft: "25px"}}>
                                    </li> */}
                                    <li style={{listStyle:"disc", fontSize:"17px", marginLeft:"7px", marginTop:"45px"}}>
                                        <strong>부양가족</strong>
                                        <button type="button" className="btn_gray" style={{marginLeft: "5px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div id="dependGrid" className="tab_02_grid grid_scrollX_none dependGrid">
                                            <DataGrid rowData={rowData} gridDefs={dependDefs}/>
                                        </div>
                                        {/* 부양가족 */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* --4대보험 / 부양가족 */}

                        {/* 학력교육 */}
                        <div className="input_content tab_003">
                            <ul>
                                <li>
                                    <strong>학력</strong>
                                    <div className="tab_01_inner">
                                        <button type="button" className="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div id="eduGrid" className="tab_01_grid grid_scrollX_none eduGrid">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>
                                    <strong>경력</strong>
                                    <div className="tab_02_inner">
                                        <button type="button" className="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div id="carrerGrid" className="tab_02_grid grid_scrollX_none carrerGrid">
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>
                                    <strong>병역</strong>
                                    <div className="tab_02_inner">
                                        <button type="button" className="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div id="militaryGrid" className="tab_02_grid grid_scrollX_none militaryGrid">
                                            <DataGrid rowData={rowData4} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>
                                    <strong>교육</strong>
                                    <div className="tab_02_inner">
                                        <button type="button" className="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} name="btnAddRow">추가</button>
                                        <button type="button" className="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} name="btnRemoveRow">삭제</button>
                                        <div id="curriculumGrid" className="tab_02_grid grid_scrollX_none curriculumGrid">
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
            {/* <button type="button" className="btn_backnext next_position">이전으로</button> */}
            <button type="button" className="btn_backnext save_position" name="btnSave">저장하기</button>
        </form>
    </div>
    
    )
}

export default EamedIncomePresenter;