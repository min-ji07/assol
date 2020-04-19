import React, { useEffect } from 'react';
import '../../../Assets/css/pages/login/login.css';
import { callApi } from '../../../Utils/api';
import DaumPostcode from 'react-daum-postcode';

function LoginMain(){

// 회원가입 클릭시
const openJoinPop = () => {
    $(".modal_box.mb1").show();
};
const closePopup = () => {
    $(".modal_box").hide();
   
    return false;
}

const fnLogin = () => {
    const idInput = $("#idInput");
    const pwInput = $("#pwInput");

    if(idInput.val().replace(/\s/g,"").length == 0){
        alert("아이디를 입력해 주세요");
        return false;
    }
    if(pwInput.val().replace(/\s/g,"").length == 0){
        alert("비밀번호를 입력해 주세요");
        return false;
    }
    
    var params = {
        "id" : idInput.val(),
        "password" : pwInput.val()
    };
    init(params);
    async function init(params) {
        await callApi.joinLogin(params).then(res => 
            {
            console.log(res.headers);
            if(res.data.ErrorCode == 1 ){
                alert("아이디 또는 비밀번호가 틀렸습니다.");
                $("#idInput").val('');
                $("#pwInput").val('');
                return false;
            }
            window.location.pathname = "/user/userInfo";
            }).catch(err => alert(err));
    }
    
}

    const openJoinForm = () =>{
        console.log("요기");
        $(".modal_box.mb1").hide();
        $(".modal_box.mb3").show(); // 기관선택 mb3
    }
    // 동의 - 다음으로
    const openJoinForm2 = () =>{
        $(".modal_box.mb3").hide(); // 기관선택 mb3
        $(".modal_box.mb2").show(); // 내용입력 mb2
    }


    // 우편번호 검색창 띄우기 
    const post_wrapper = () => {
        $(".post_wrapper").show();
    };
    const closePostPop = (e) => {
        $("#daumPostPop").hide();
    }



    // 이거 수정 
    const daumPostComplete = (e) => {
        let checkType = $(".user_input_inner > input:checked").attr("id");
        const addrType = e.userSelectedType;
        let postNo = e.zonecode;
        let address = e.address;

        if(addrType == "J"){    // 지번
            address = e.jibunAddress;
        }

        switch(checkType){
            case "tab_01" :
                $(".modal_bottom").find("#postNo").val(postNo);
                $(".modal_bottom").find("#address").val(address);
                break;
            // case "tab_02" :
            //     $(".div_bottom.tab_02").find("#postNo").val(postNo);
            //     $(".div_bottom.tab_02").find("#address").val(address);
            //     break;
            // case "tab_03" :
            //     $(".div_bottom.tab_03").find("#postNo").val(postNo);
            //     $(".div_bottom.tab_03").find("#address").val(address);
            //     break;
        }
        $("#daumPostPop").hide();
    }




return(
    <div className="login" style={{width:"100%",height:"100%"}}>
        <div id="img01" style={{width:"100%",height:"100%"}}>
            <img src="images/loginmain.png" style={{width:"100%",height:"100%"}}/> 
        </div>

        <div id="div01" style={{float:"left"}}>
        </div>

        <div id="div02">
            <div className="AceIcon">
                <h2 id="ACE">assol</h2><img src="images/logo_login.png" style={{marginTop:"313px"}}/>
            </div>
            <div className="AceJoin">
                <form name="login" action="main2.html" method="POST">
                    <input type="text" id="idInput" className="login_input" placeholder="Admin ID" style={{marginTop:"70px"}}/><br/>
                    <input type="password" id="pwInput" className="login_input" placeholder="Password" style={{marginTop:"24px"}}/><br/>
                    <button type="button" className="btn_login" defaultValue="Admin Login" onClick={fnLogin}>Admin Login</button>
                </form>
            </div>
            <div className="userContent" style={{marginTop:"12px"}}>
                <button>아이디 찾기</button>
                <button>비밀번호 찾기</button>
                <button onClick={()=>openJoinPop()}>회원가입</button>
            </div>
        </div>

        <div id="div03">
        </div>
        {/* 회원약관 */}
        <div className="modal_box mb1">
            <div className="modal_top">
                <div className="modal_title">회원가입</div>
                <div className="modal_close"><a href="#" onClick={()=>closePopup()}></a></div>
            </div>
            <div className="modal_bottom">
                <form>
                    <fieldset>
                        <label className="title_label" htmlFor="agreement1">회원약관</label>
                        <textarea id="agreement1" readOnly></textarea>
                        <p className="radio_box">
                            <input type="radio" id="confirm_y" name="confirm1"/>
                            <label htmlFor="confirm_y">동의합니다.</label>
                            <input type="radio" id="confirm_n" name="confirm1"/>
                            <label htmlFor="confirm_n">동의하지않습니다.</label>
                        </p>

                        <label className="title_label" htmlFor="agreement2">개인정보 수집 · 이용에 대한 안내</label>
                        <textarea id="agreement2" readOnly>
                        </textarea>
                        <p className="radio_box">
                            <input type="radio" id="confirm2_y" name="confirm2"/>
                            <label htmlFor="confirm2_y">동의합니다.</label>
                            <input type="radio" id="confirm2_n" name="confirm2"/>
                            <label htmlFor="confirm2_n">동의하지않습니다.</label>
                        </p>

                        <label className="title_label" htmlFor="agreement1">서비스 이용약관</label>
                        <textarea id="agreement3" readOnly>
■ 수집하는 개인정보 항목
회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
ο 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 비밀번호 질문과 답변 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 직업 , 회사명 , 부서 , 직책 , 회사전화번호 , 취미 , 결혼여부 , 기념일 , 법정대리인정보 , 서비스 이용기록 , 접속 로그 , 접속 IP 정보 , 결제기록
ο 개인정보 수집방법 : 홈페이지(회원가입) , 서면양식
■ 개인정보의 수집 및 이용목적
회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
ο 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송
ο 회원 관리
회원제 서비스 이용에 따른 본인확인 , 개인 식별   , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 고지사항 전달 ο 마케팅 및 광고에 활용
접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
■ 개인정보의 보유 및 이용기간
회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.
                        </textarea>
                        <p className="radio_box">
                            <input type="radio" id="confirm3_y" name="confirm3"/>
                            <label htmlFor="confirm3_y">동의합니다.</label>
                            <input type="radio" id="confirm3_n" name="confirm3"/>
                            <label htmlFor="confirm3_n">동의하지않습니다.</label>
                        </p>

                        <p className="agreement_all">
                            <input type="radio"/>
                            <label>
                                회원약관, 개인정보 수집 및 이용, 서비스 이용약관에 <span className="txt_point">모두 동의</span> 합니다.
                            </label>
                        </p>
                        <p className="btn_box">
                            <button type="button" className="btn_next" onClick={()=>openJoinForm()}>다음으로</button>
                        </p>
                    </fieldset>
                </form>
            </div>
            <div className="modal_bg">
            </div>
        </div>
        {/* --회원약관 */}

        {/* 기관종류선택 */}
        <div className="modal_box mb3">
            <div className="modal_top_select">
            {/* html 추가 */}
            <div class="">
                <div class="">
                    <div class="">
                        <h1 style={{marginTop:"-57px", fontWeight:"300"}}>운영하시는 <strong>기관의 종류</strong>를 선택해 주세요.</h1>
                        <p style={{fontSize:"22px", color:"#6abcc6", marginBottom:"45px"}}>*중복선택이 가능합니다.</p>
                    </div>
                    <div>
                        {/* 이미지넣기 */}
                        <button type="button" class="choose num00 mg_le_0" style={{width:"311px", height:"460px"}}></button>
                        <button type="button" class="choose num01"></button>
                        <button type="button" class="choose num02"></button>
                        <button type="button" class="choose num03"></button>
                    </div>
                </div>
                <p className="btn_box_mb3">
                    <button className="btn_next" style={{position:"absolute", top:"120%", left:"45%"}} onClick={()=>openJoinForm2()}>다음으로</button>
                </p>
            </div>

            </div>
            {/* 뒷배경 */}
            <div className="modal_bg_mb3">
            </div>
        </div>
        {/* --기관종류선택 */}

        {/* 회원가입 */}
        <div className="modal_box mb2"> 
            <div className="modal_top">
                <div className="modal_title">회원가입</div>
                <div className="modal_close"><a href="#" onClick={()=>closePopup()}></a></div>
            </div>

            <div className="modal_bottom">
                <form>
                    <fieldset>
                        <p className="title_label">기관정보 입력</p>
                        <p>
                            <label className="required">요양 기관명</label>
                            <input type="text" maxLength="15" placeholder="기관명을 입력해주세요."/>
                        </p>
                        <p style={{display:"inline-block", float:"left"}}>
                            <label>기관기호</label>
                            <input type="text" maxLength="10" placeholder="기관명을 입력해주세요."/>
                        </p>
                        <p style={{display:"inline-block", marginLeft:"-335px"}}>
                            <label htmlFor="businessNum" className="required">사업자번호</label>
                            <input id="businessNum" type="text" placeholder="000" maxLength="3" style={{width:"33px"}}/> - 
                            <input id="businessNum2" type="text" placeholder="00" maxLength="2" style={{width:"25px"}}/> - 
                            <input id="businessNum3" type="text" placeholder="00000" maxLength="5" style={{width:"50px"}}/>
                        </p>
                        <p>
                            <label for="">대표전화번호</label>
                            <input type="text" id="" maxLength="13" placeholder="02-000-0000"/>
                        </p>
                        <p>
                            <label for="">휴대전화</label>
                            <select style={{borderRadius:"0px", width:"47px", border:"1px solid #c8c8c8", marginLeft:"5px"}}>
                                <option>010</option>
                                <option>011</option>
                                <option>016</option>
                            </select>-
                            <input type="text" maxLength="4" style={{borderRadius:"0px", width:"47px", border:"1px solid #c8c8c8", marginLeft:"5px"}} defaultValue="1234"/>-
                            <input type="text" maxLength="4" style={{borderRadius:"0px", width:"47px", border:"1px solid #c8c8c8", marginLeft:"5px"}} defaultValue="1234"/>
                        </p>
                        <p style={{marginBottom:"13px"}}>
                            <label className="required">기관주소</label>
                            <input type="text" id="postNo" placeholder="우편번호"/>
                            <button type="button" className="btn_addr post_close" onClick={post_wrapper}>
                                우편번호
                            </button>
                            <input type="text" id="address" style={{ width:"221px", display:"block", height:"33px", marginLeft:"105px"}} placeholder="주소를 입력해 주세요."/>
                            <input type="text" id="addressDetail" style={{ width:"221px",height:"38px", marginLeft:"105px"}} placeholder="상세주소를 입력해 주세요."/>
                        </p>
                        <p>
                            <label className="required">아이디</label>
                            <input type="text" maxLength="10" placeholder="아이디를 입력해주세요"/>
                        </p>
                        <p class="pw_con">
                            <label className="required">비밀번호</label>
                            <input type="password" maxLength="16" style={{width:"185px"}} placeholder="비밀번호를 입력해주세요."/>
                        </p>
                        <p>
                            <label className="required">비밀번호확인</label>
                            <input type="password" maxLength="16" style={{width:"185px"}} placeholder="비밀번호를 입력해주세요."/>
                        </p>
                        {/* <p>
                            <span className="required">급여종류</span>
                            <input id="radioPay" type="radio" name="pay" defaultChecked/>
                            <label htmlFor="radioPay">주야간보호센터</label>
                            <input id="radioPay2" type="radio" name="pay"/>
                            <label htmlFor="radioPay2">노인요양시설</label>
                            <input id="radioPay3" type="radio" name="pay"/>
                            <label htmlFor="radioPay3">노인요양공동생활가정</label>
                            <input id="radioPay4" type="radio" name="pay"/>
                            <label htmlFor="radioPay4">가정방문급여</label>
                        </p> */}
                        <p>
                            <label className="">이메일주소</label>
                            <input type="text" maxLength="20"/>@
                            <select style={{borderRadius:"0px", width:"100px", border:"1px solid #c8c8c8", marginLeft:"5px"}}>
                                <option>직접입력</option>
                                <option>naver.com</option>
                                <option>naver.com</option>
                                <option>naver.com</option>
                                <option>naver.com</option>
                            </select>
                            <button type="button" className="btn_addr">인증</button>
                        </p>
                        <p>
                            <label className="">이메일인증</label>
                            <input type="text" maxLength="10" style={{width:"100px"}}/>
                            <button type="button" className="btn_addr">인증확인</button>
                        </p>
                        <p style={{display:"inline-block", float:"left"}}>
                            <span>이메일수신</span>
                            <input type="radio" id="email_y" name="email" defaultChecked/>
                            <label htmlFor="email_y">동의</label>
                            <input type="radio" id="email_n" name="email"/>
                            <label htmlFor="email_n">동의하지않음</label>
                        </p>
                        <p style={{display:"inline-block", marginLeft:"-335px"}}>
                            <span>SMS문자수신</span>
                            <input type="radio" id="sms_y" name="sms" defaultChecked/>
                            <label htmlFor="sms_y">동의</label>
                            <input type="radio" id="sms_n" name="sms"/>
                            <label htmlFor="sms_n">동의하지않음</label>
                        </p>
                        <p>
                            <span style={{display:"block", marginBottom:"10px"}}>공인인증서등록</span>
                            <button type="button" className="certificate" style={{textIndent:"-999px"}}>공인인증서등록</button>
                        </p>
                        <p className="btn_box_join">
                            <button className="btn_next">회원가입</button>
                        </p>
                    </fieldset>
                </form>
            </div>
            <div className="modal_bg">
            </div>
        </div>
        {/* 우편번호 api */}
        <div id="daumPostPop" class="post_wrapper" onClic={post_wrapper}>
            <button class="post_close" onClick={closePostPop}></button>
            <DaumPostcode
                onComplete={daumPostComplete}
            />
        </div>

        {/* --회원가입 */}
    </div>
    );
}
 
export default LoginMain;