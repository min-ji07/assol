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

    const openJoinForm = () =>{
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

    // 우편 검색후 선택시 event
    const daumPostComplete = (e) => {
        const addrType = e.userSelectedType;
        let postNo = e.zonecode;
        let address = e.address;

        if(addrType == "J"){    // 지번
            address = e.jibunAddress;
        }

        $(".modal_bottom").find("#postNo").val(postNo).attr("readonly",true);
        $(".modal_bottom").find("#address").val(address).attr("readonly",true);

        $("#daumPostPop").hide();
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
                console.log(res.data);
                alert("아이디 또는 비밀번호가 틀렸습니다."); 
                alert(res.data.Msg);

                $("#idInput").val('');
                $("#pwInput").val('');
                return false;
            }
            window.location.pathname = "/user/userInfo";
            }).catch(err => alert(err));
        }
    }

    const saveJoin = () =>{
        var branchName = $("#companyName").val();

        if(branchName == ""){
            alert("기관명을 입력해주세요");
            $('#companyName').focus();
            return false;
        }
        var branchCode = $("#companyCode").val();

        if(branchCode == ""){
            alert("기관 기호를 입력해 주세요");
            $('#companyCode').focus();
            return false;
        }
        // 사업자번호 
        var businessNum = $('#businessNum').val();
        var businessNum2 = $('#businessNum2').val();
        var businessNum3 = $('#businessNum3').val();
        var businessNo = businessNum + businessNum2 + businessNum3;
        if($('#businessNum').val().length < 3){
            alert('사업자번호를 확인해주세요.');
            $('#businessNum').focus();
            return false;
        }else if($('#businessNum2').val().length < 2){
            alert('사업자번호를 확인해주세요.');
            $('#businessNum2').focus();
            return false;
        }else if($('#businessNum3').val().length < 5) {
            alert('사업자번호를 확인해주세요.');
            $('#businessNum3').focus();
            return false;
        }

        // 대표전화번호
        var tellNo = $("#mainNumber").val();
        if(tellNo ==""){
            alert('전화번호를 입력해주세요.');
            return false;
        }

        // 핸드폰 번호
        var firstMobile = $("#firstNumber").val();
        var middleMobile = $("#middleNumber").val();
        var lastMobile = $("#lastNumber").val();
        if(firstMobile =="" || middleMobile =="" || lastMobile ==""){
            alert("휴대폰번호 형식이 맞지않습니다");
            return false;
        }
        var mobile = firstMobile + middleMobile + lastMobile;

        var leeterNo = $("#postNo").val();
        if(leeterNo == ""){
            alert("기관 주소를 입력해주세요");
            return false;
        }
        // 기관 급여일
        var payDayMonth = $('#payDayMonth').val(); // select
        var payDay = $('#payDay').val(); // input

        if(payDay == ""){
            alert('급여일을 입력해주세요.');
            $('#payDay').focus();
            return false;
        }

        var address = $("#address").val();
        var addressDetail = $("#addressDetail").val();
        if(address == "" || addressDetail == ""){
            alert("상세 주소를 입력해주세요");
            return false;
        }
        var id = $("#id").val();
        var password = $("#password").val();
        if(id == "" || password == ""){
            alert("아이디 또는 비밀번호를 입력해주세요");
            return false;
        }
        var passwordCheck = $("#passwordCheck").val();
        if(passwordCheck != password){
            alert("비밀 번호를 다시 확인해주세요");
            return false;
        }
        var idEmail = $("#idEmail").val();
        var domain = $("#domain").val();
        if(idEmail == "" || domain== ""){
            alert("이메일을 입력해주세요.");
            return false;
        }
        var email = idEmail + "@" + domain;
        var invaildEmailType = CheckEmail(email);

        if(invaildEmailType == false){
            alert("이메일 형식이 정확하지 않습니다.");
            return false;
        }
        // 이메일체크
        var EmailCheck = $('#email_Check').val();
        if(EmailCheck == "" ){
            alert('이메일 인증번호를 입력하세요.');
            return false;
        }

        var acceptEmail = $('input[name="email"]:checked').val();
        var acceptSMS = $('input[name="sms"]:checked').val();

        var checkBoxArr = [];
        $('input[name=check_type]:checked').each(function(i){
            checkBoxArr.push($(this).val());
        });
        // type 가져오기
        console.log('branchType' + checkBoxArr);

        var params = {
            "branchName" : branchName,          // 요양기관
            "id" : id,                          // 아이디
            "password" : password,              // 비밀번호
            "businessNo" : businessNo ,          // 사업자번호
            "tellNo" : tellNo,                  // 전화번호
            "postNo" : leeterNo,                // 우편번호
            "address" : address,                // 기관주소
            "addressDetail" : addressDetail,    // 상세주소
            "payDayMonth" : payDayMonth,        // 해당월 
            "payDay" : payDay,                  // 기관 급여일 
            "email" : idEmail,                  // 이메일
            "acceptEmail" : acceptEmail,        // 이메일 동의
            "acceptSMS" : acceptSMS,            // 문자동의
            "branchCode" : branchCode,          // 기관기호
            "branchType" : checkBoxArr,         // 회원가입 전 기관선택 
            "mobile" : mobile                   // 핸드폰번호
        };
        console.log(JSON.stringify(params));

        async function init(params){
            try {
                await callApi.JoinUser(params).then(res => {
                    console.log(res);
                    if(res.data.ErrorCode == 0){ 
                        alert("회원가입이 완료 되었습니다.");
                    }
                    else{
                        alert(res.data.Msg);
                    }
                })
            }catch(error){
                console.log("CATCH !! : " + error);
            }
        };
        init(params);
    }

    $(document).on("keyup", ".phoneNumber", function() { 
        $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/([0-9]+)?([0-9]{4})/,"$1-$2").replace("--", "-") ); 
        console.log($(this).val());
        console.log($(this).val($(this).val()),"this.val");

    });


    function CheckEmail(str) {      
        var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if(!reg_email.test(str)) {             
            return false;         
        }      
        else {   
            return true;     
        }                            
    };      

    // 모두 동의
    $(document).ready(function(){
        $('#check_all').on("click",function(){
            $('#confirm_y').prop('checked', true);
            $('#confirm2_y').prop('checked', true);
            $('#confirm3_y').prop('checked', true);
        })
        // $('#check_all').off();
    });

    // 모두 동의시 다음으로
    $(document).ready(function(){
        $('#btn_next').click(function(){
            if($('#confirm_y').is(':checked') == false){
                alert('모든 약관에 동의하셔야 다음 단계로 진행 가능합니다.');
                return false;
            } else if($('#confirm2_y').is(':checked') == false){
                alert('모든 약관에 동의하셔야 다음 단계로 진행 가능합니다.');
                return false;
            } else if($('#confirm3_y').is(':checked') == false){
                alert('모든 약관에 동의하셔야 다음 단계로 진행 가능합니다.');
                return false;
            } else { 
                // alert('됨!')
            }
        });
    });
    // 대표전화번호
    // $(document).ready(function(tell) {
    //     $(".tell_input").keyup(function(
    //         ){
    //             $(this).val($(this).val().replace(/[^0-9]/g,""));
    //         var tellNum = $(this).val();

    //         if(tellNum.length < 3){
    //             console.log(tellNum);
    //         }else if(tellNum.length < 4){
    //             var tell = tellNum.substr(0,3) + "-" + tellNum.substr(3,6);
    //             console.log(tell);
    //         }else if(tellNum.length < 8){
    //             var tell = tellNum.substr(0,3) + "-" + tellNum.substr(3,8);
    //             console.log(tell);
    //         }
    //         return tell;
    //     } 
    // );
    // });


    // 아이디 중복체크
    const duplicateCheckId = () => {
        var idVal = $('#id').val();
        async function init(params) {
            try {
                params = {
                    "id" : idVal       
                }
                console.log(params);
                await callApi.checkDuplicateAdmin(params).then(res=>{
                    console.log(res);
                    if(idVal == ""){
                        alert('아이디를 입력해주세요.');
                    }
                    else if(res.data.ErrorCode == 0){ 
                        alert("가입 가능한 아이디입니다.");
                    }
                    else{
                        console.log("중복된 아이디입니다.");
                    }
                });
            }catch(error){
                console.log("CATCH !! : " + error);
            }        
           };
           init();
    }

    // 이메일 인증번호 보내기
    const CheckCertification = () => {
        var idEmail = $('#idEmail').val();
        var idDomain = $('#domain option:selected').val();
        var EmailAddress = idEmail + '@' + idDomain;
        async function init(params) {
            try {
                params = {                    
                        "from" : "chrislee@assol.io",
                        "to" : EmailAddress,
                        "subject" : "assol 인증번호가 도착했습니다~!",
                        "body" : ""
                }
                console.log(params);
                await callApi.SendCertificationValue(params).then(res=>{
                    if(res.data.ErrorCode == 0){ 
                        alert("이메일로 인증번호가 전송되었습니다.");
                    }
                    else{
                        console.log("인증번호 전송 실패~!");
                    }
                })
            }catch(error){
                console.log("CATCH !! : " + error);
            }        
           };
           init();
    }

    // 이메일 인증번호체크
    const SendCertification = () => {
        async function init(params) {
            var EmailCheck = $('#email_Check').val();
            var idEmail = $('#idEmail').val();
            var idDomain = $('#domain option:selected').val();
            var EmailAddress = idEmail + '@' + idDomain;
            try {
                params = {
                    "certifyValue" : EmailCheck,
                    "email" : EmailAddress
                }
                await callApi.CheckCertification(params).then(res => {
                    console.log(res);
                    if(res.data.ErrorCode == 0){ 
                        alert("인증이 확인되었습니다.");
                    }
                    else{
                        alert("인증에 실패하셨습니다.");
                    }
                })
            }catch(error){
                console.log("CATCH !! : " + error);
            }        
        };
        init();
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
                            수집하는 개인정보항목
                            에이쏠 (이하 ‘회사’라고 함)은 서비스 이용 시 이용자로부터 아래와 같은 개인정보를 수집하고 있습니다.
                            이용자는 본 개인정보 수집활용 동의서에 따른 동의 시, ‘필요한 최소한의 정보 외의 개인정보’ 수집 – 이용에 동의하지 아니할 권리가 있습니다.

                            2. 개인정보의 수집 및 이용목적
                            - 귀하 업체의 직원 인력풀 관리 및 급여 및 수당 지급
                            - 세무 신고 및 정책자금 신청

                            3. 개인정보의 보유 및 이용 기간
                            - 당사와의 거래 종료 시까지
                            - 개인정보 주체자의 삭제 요청 시 즉시 삭제
                            다만, 회사는 관련 법령의 규정에 의하여 개인정보를 보유할 필요가 있는 경우, 해당 법령에서 정한 바에 의하여 아래와 같이 개인정보를 보유할 수 있습니다.
                            계약 또는 청약철회 등에 관련 기록(5년)
                            대금결제 및 재화 등의 공급에 관한 기록(5년)
                            소비자의 불만 또는 분쟁처리에 관한 기록(3년)
                            신용정보의 수집/처리 및 이용 등에 관한 기록(3년)
                            표시/광고에 관한 기록(6개월)
                            - 법적근거 : 전자상거래 등에서의 소비자보호에 관한 법률, 신용정보의 이용 및 보호에 관한 법률

                            4. 기본 개인정보 수집 • 활용
                            ① 수집하는 기본 개인정보 항목 : 성명, 주소, 직업, 전화번호(유선,핸드폰), 자격사항, 이메일 주소, 주민번호, 학력, 경력, 계좌번호
                            ② 개인정보 제공 동의 거부 권리 및 동의 거부 따른 불이익 내용 또는 제한사항 : 귀하는 개인정보 제공 동의를 거부할 권리가 있으며, 동의 거부에 따른 불이익은 없음, 다만, 주민번호, 계좌번호가 없을 시 급여 및 수당 지급 등이 불편할 수 있음.

                            5. 고유식별정보 수집 • 활용
                            ① 수집하는 고유식별정보 항목 : 주민등록번호
                            ② 개인정보 제공 동의 거부 권리 및 동의 거부 따른 불이익 내용 또는 제한사항 : 귀하는 개인정보 제공 동의를 거부할 권리가 있으며, 동의 거부에 따른 불이익은 없음, 다만, 주민번호, 계좌번호가 없을 시 급여 및 수당 지급 등이 불편할 수 있음.

                            6. 개인정보 제 3자 제공
                            ① 개인정보를 제공받는 자 : 에이쏠, 넥스트세무법인, 노무사무소 인우
                            ② 개인정보를 제공받는 자의 개인정보 이용목적 : 근로 직원의 급여 및 수당 지급,
                            세무신고 및 정책지원금 활용
                            ③ 제공되는 개인정보 항목 : 성명, 주민등록번호, 계좌번호, 직업, 전화번호, 경력
                            ④ 개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 5년
                            개인정보 제공 동의 거부 권리 및 동의 거부 따른 불이익 내용 또는 제한사항 : 귀하는 개인정보 제공 동의를 거부할 권리가 있으며 동의 거부에 따른 불이익은 없음, 다만, 성명, 주민번호, 계좌번호가 없을 시 급여 및 수당 지급 등이 불편할 수 있음.
                            7. [선택] 정보 수신 동의
                            ①에이쏠이 제공하는 다양한 정책 및 행사에 대한 정보를 전화, SMS, E-mail, 서면을 통해 받아볼 수 있음
                            단, 업무 수행에 관련한 정보 및 결과, 에이쏠 정책 변경에 관련된 내용은 수신동의 여부와 관계없이 발송됨.
                            선택 약관에 동의하지 않아도 계약은 가능하며, 수신여부는 언제든 변경가능 함.

                            ※ 개인정보 제공자가 동의한 내용 외의 다른 목적으로 활용하지 않으며, 제공된 개인정보의 이용을 거부 하고자 할 때에는 개인정보보호책임자를 통해 열람, 정정, 삭제를 요구할 수 있음

                            「개인정보보호법」등 관련 법규에 의거하여 상기 본인은 위와 같이 개인정보 수집 및 활용에 동의함.
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
                            <input type="radio" id="check_all"/>
                            <label htmlFor="check_all">
                                회원 약관, 개인정보 수집 및 이용, 서비스 이용약관에 <span className="txt_point">모두 동의</span> 합니다.
                            </label>
                        </p>
                        <p className="btn_box">
                            <button type="button" className="btn_next" id="btn_next" onClick={()=>openJoinForm()}>다음으로</button>
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
                    <div class="checkbox">
                        {/* 이미지넣기 */}
                        <ul>
                            <li>
                                <input type="checkbox" id="num00" name="check_type" value="1"/>
                                <label htmlFor="num00" className="choose num00 mg_le_0"></label>
                            </li>
                            <li>
                                <input type="checkbox" id="num01" name="check_type" value="2"/>
                                <label htmlFor="num01" className="choose num01"></label>
                            </li>
                            <li>
                                <input type="checkbox" id="num02" name="check_type" value="3"/>
                                <label htmlFor="num02" className="choose num02"></label>
                            </li>
                            <li>
                                <input type="checkbox" id="num03" name="check_type" value="4"/>
                                <label htmlFor="num03" className="choose num03"></label>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="btn_box_mb3">
                    <button className="btn_next" onClick={()=>openJoinForm2()}>다음으로</button>
                </p>
            </div>

            </div>
            {/* 뒷배경 */}
            <div className="modal_bg_mb3">
            </div>
        </div>
        {/* --기관종류선택 */}

        {/* 회원가입 */}
        <div className="modal_box mb2" style={{display:"block"}}> 
            <div className="modal_top">
                <div className="modal_title">회원가입</div>
                <div className="modal_close"><a href="#" onClick={()=>closePopup()}></a></div>
            </div>

            <div className="modal_bottom">
                <form action="/Admin/AdminRegistration">
                    <fieldset>
                    <p className="title_label">기관정보 입력</p>
                            <p>
                                <label className="required">요양 기관명</label>
                                <input type="text" id ="companyName" maxLength="13" placeholder="기관명을 입력해주세요." />
                            </p>
                            <p style={{display:"inline-block", float:"left"}}>
                                <label>기관기호</label>
                                <input type="text" id ="companyCode" maxLength="10" placeholder="기관기호를 입력해주세요."/>
                            </p>
                            <p style={{display:"inline-block", marginLeft:"-335px"}}>
                                <label htmlFor="businessNum" className="required">사업자번호</label>
                                <input id="businessNum" type="text" placeholder="000" maxLength="3" style={{width:"30px"}} /> - 
                                <input id="businessNum2" type="text" placeholder="00" maxLength="2" style={{width:"20px"}} /> - 
                                <input id="businessNum3" type="text" placeholder="00000" maxLength="5" style={{width:"40px"}}/>
                            </p>
                            <p>
                                <label for="mainNumber">대표전화번호</label>
                                <select id="mainNumber">
                                    <option>02</option>
                                    <option>031</option>
                                    <option>032</option>
                                </select>
                                <input type="text" id="mainNumber" maxLength="9" class="phoneNumber" placeholder="000-0000" style={{marginLeft:"5px", width:"119px"}}/>
                            </p>
                            <p>
                                <label for="">휴대전화</label>
                                <select id ="firstNumber" style={{borderRadius:"0px", width:"47px", border:"1px solid #c8c8c8"}}>
                                    <option defaultValue="010">010</option>
                                    <option defaultValue="011">011</option>
                                    <option defaultValue="016">016</option>
                                </select>-
                                <input type="text" id ="middleNumber" maxLength="4" style={{borderRadius:"0px", width:"47px", border:"1px solid #c8c8c8", marginLeft:"5px"}}/>-
                                <input type="text" id ="lastNumber" maxLength="4" style={{borderRadius:"0px", width:"47px", border:"1px solid #c8c8c8", marginLeft:"5px"}} />
                            </p>
                            <p style={{marginBottom:"13px"}}>
                                <label className="required">기관주소</label>
                                <input type="text" id="postNo" placeholder="우편번호"/>
                                <button type="button" className="btn_addr post_close" onClick={post_wrapper}>
                                    우편번호
                                </button>
                                <input type="text" id="address" style={{ width:"221px", display:"block", height:"33px", marginLeft:"105px"}} placeholder="주소를 입력해 주세요." />
                                <input type="text" id="addressDetail" style={{ width:"221px",height:"38px", marginLeft:"105px"}} placeholder="상세주소를 입력해 주세요." />
                            </p>
                            {/* 기관급여일 id 머임 */}
                            <p>
                                <label className="required">기관 급여일</label>
                                <select id="payDayMonth">
                                    <option defaultValue="1">익월</option>
                                    <option defaultValue="2">당월</option>
                                </select>
                                <select id="payDay">
                                    <option defaultValue="5일">5일</option>
                                    <option defaultValue="10일">10일</option>
                                    <option defaultValue="15일">15일</option>
                                    <option defaultValue="25일">25일</option>
                                    <option defaultValue="말일">말일</option>
                                </select>
                                {/* <input type="text" id="payDay" maxLength="2" placeholder="01"/> */}
                            </p>

                            <p>
                                <label className="required">아이디</label>
                                <input type="text" id="id" maxLength="10" placeholder="아이디를 입력해주세요" />
                                <button type="button" class="btn_addr" onClick={duplicateCheckId}>중복확인</button>
                            </p>
                            <p class="pw_con">
                                <label className="required">비밀번호</label>
                                <input type="password" id = "password" maxLength="16" style={{width:"185px"}} placeholder="비밀번호를 입력해주세요." />
                            </p>
                            <p>
                                <label className="required">비밀번호확인</label>
                                <input type="password" id = "passwordCheck" maxLength="16" style={{width:"185px"}} placeholder="비밀번호를 입력해주세요." />
                            </p>
                            <p>
                                <label className="">이메일주소</label>
                                <input type="text" id="idEmail" maxLength="20" placeholder="이메일을 입력해주세요."/>@
                                <select id ="domain" style={{borderRadius:"0px", width:"100px", border:"1px solid #c8c8c8", marginLeft:"5px"}}>
                                    <option defaultValue="naver.com">naver.com</option>
                                    <option defaultValue="etc">직접입력</option>
                                    <option defaultValue="nate.com">nate.com</option>
                                    <option defaultValue="hanmail.net">hanmail.net</option>
                                    <option defaultValue="gmail.com">gmail.com</option>
                                </select>
                                <button type="button" className="btn_addr" onClick={CheckCertification}>인증</button>
                            </p>
                            <p>
                                <label className="">이메일인증</label>
                                <input type="text" maxLength="10" style={{width:"100px"}} id="email_Check"/>
                                <button type="button" className="btn_addr" onClick={SendCertification}>인증확인</button>
                            </p>
                            <p style={{display:"inline-block", float:"left"}}>
                                <span>이메일수신</span>
                                <input type="radio" id="email_y" name="email" defaultValue ="1" defaultChecked/>
                                <label htmlFor="email_y">동의</label>
                                <input type="radio" id="email_n" defaultValue ="0" name="email"/>
                                <label htmlFor="email_n">동의하지않음</label>
                            </p>
                            <p style={{display:"inline-block", marginLeft:"-335px"}}>
                                <span>SMS문자수신</span>
                                <input type="radio" id="sms_y" defaultValue ="1" name="sms" defaultChecked/>
                                <label htmlFor="sms_y">동의</label>
                                <input type="radio" id="sms_n" defaultValue ="0" name="sms"/>
                                <label htmlFor="sms_n">동의하지않음</label>
                            </p>
                            <p>
                                <span style={{display:"block", marginBottom:"10px"}}>공인인증서등록</span>
                                <button type="button" className="certificate" style={{textIndent:"-999px"}}>공인인증서등록</button>
                            </p>
                            <p className="btn_box_join">
                                <button type="button" className="btn_next" onClick ={() =>saveJoin()}>회원가입</button>
                            </p>
                        </fieldset>
                </form>
            </div>
            <div className="modal_bg">
            </div>
        </div>



        {/* 우편번호 api */}
        <div id="daumPostPop" class="post_wrapper" onClick={post_wrapper}>
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