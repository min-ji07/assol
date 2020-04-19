import React, { useEffect } from 'react';
import DataGrid from "../../../../Components/DataGrid";
import { callApi } from '../../../../Utils/api';
import $ from 'jquery';
import gridCommon from '../../../../Utils/grid';
import utils from '../../../../Utils/utils';

const EamedIncomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {

    

    let params = {};
    let frm = new FormData();
    const fnValidation = () => {
        var tabDiv = ".div_bottom.tab_01";
        var regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        
        
        var personalNumber = $(tabDiv).find("#personalNumber").val();
        if(!personalValidaition(personalNumber)){
            alert("주민번호가 올바르지 않습니다.");
            return false;
        }

        if(!regEmail.test($(".div_bottom.tab_01 input[type='email']").val())){
            alert("이메일이 올바르지 않습니다.");
            return false;
        }

        var dateInput = $(tabDiv+" input.date_input");
        var i = 0;
        for(i; i<dateInput.length; i++){
            if(dateInput[i].value.length == 0){
                continue;
            }
            if(!dateValidation(dateInput[i].value)){
                alert("날짜가 올바르지 않습니다.");
                if(dateInput[i].id == "getOfIns0" || dateInput[i].id == "lostOfIns0"
                    || dateInput[i].id == "getOfIns1" || dateInput[i].id == "lostOfIns3"
                    || dateInput[i].id == "getOfIns2" || dateInput[i].id == "lostOfIns2"
                    || dateInput[i].id == "getOfIns3" || dateInput[i].id == "lostOfIns1"
                ){
                    $(tabDiv).find("label[for='tab_002']").click();
                }
                dateInput[i].select();
                dateInput[i].focus();
                return false;
            }
        }

        var dateToInput = $(tabDiv+" input.dateto_input");
        i=0;
        for(i; i<dateToInput.length; i++){
            var targetArr = dateToInput[i].value.split("~");
            var date1 = utils.regExr.numOnly(targetArr[0]);
            var date2 = utils.regExr.numOnly(targetArr[1]);

            if(!dateValidation(date1) || !dateValidation(date2)){
                alert("날짜가 올바르지 않습니다.");
                dateToInput[i].select();
                dateToInput[i].focus();
                return false;
            }
            if(date1 > date2){
                alert("기간이 올바르지 않습니다.");
                dateToInput[i].select();
                dateToInput[i].focus();
                return false;
            }
        }
        return true;
    }

    function personalValidaition(jumin) {
        console.log(jumin);
        jumin = utils.regExr.numOnly(jumin);
       
        //주민등록 번호 13자리를 검사한다.
         var fmt = /^\d{6}[123456]\d{6}$/;  //포멧 설정
         if (!fmt.test(jumin)) {
          return false;
         }
       
         // 생년월일 검사
         var birthYear = (jumin.charAt(6) <= "2") ? "19" : "20";
         birthYear += jumin.substr(0, 2);
         var birthMonth = jumin.substr(2, 2) - 1;
         var birthDate = jumin.substr(4, 2);
         var birth = new Date(birthYear, birthMonth, birthDate);
       
         if ( birth.getYear() % 100 != jumin.substr(0, 2) ||
              birth.getMonth() != birthMonth ||
              birth.getDate() != birthDate) {
            return false;
         }
       
        
         return true;
       }

    const dateValidation = (date) =>{
        var date = utils.regExr.numOnly(date);
        var month = date.substring(4,6);
        var day = date.substring(6,8);
        console.log(month);
        console.log(day);
        
        if(month>12 || month<1){
            return false;
        }

        if(day>31 || day<1){
            return false;
        }
        return true;
    }

    const fnSave = () => {

        if(!fnValidation()){
            return;
        }
        
        let i=0;
        const inputListLeft = $("#userInfoLeft input:not([name=tab]), #userInfoLeft select, #userInfoLeft textarea");
        const inputListTab1 = $("#userInfoRight input:not([name=tab]), #userInfoRight select");
        const inputListTab2 = $("#insurnaceTable input");
        
        let tempParams = {};
        let key;
        let value;
        for(i; i<inputListLeft.length; i++){
            key = inputListLeft[i].id;
            value = inputListLeft[i].value;
            if(key.indexOf("userImage") != -1){
                frm.append("userImage",inputListLeft[i].files[0]);
                continue;
            }
            tempParams[key] = value;
        }
        params["userInfo"] = tempParams;
        params.userInfo.userType = 0; // 일반소득자
        params.userInfo.branchNo = 30; // 임시 나중에 수정해야함

        i=0;
        tempParams = {
            "otherContent" : ''
        };
        for(i; i<inputListTab1.length; i++){
            var checkId = inputListTab1[i].id;
            // 급여항목 추가리스트
            if(checkId.indexOf("addSalary") != -1){
                if(checkId == "addSalaryTitle"){
                    tempParams.otherContent += '"'+inputListTab1[i].value+'":';
                } else if(checkId == "addSalaryPay"){
                    tempParams.otherContent += '"'+inputListTab1[i].value+'"'+",";
                }
            } else {
                tempParams[inputListTab1[i].id] = inputListTab1[i].value;
            }
        }

        console.log(tempParams.otherContent);
        tempParams.otherContent = JSON.parse("{"+tempParams.otherContent.slice(0,-1)+"}");

        params["detailData"] = tempParams;

        i=0;
        tempParams = {};
        for(i; i<inputListTab2.length; i++){
            tempParams[inputListTab2[i].id] = inputListTab2[i].value; 
        }

        params["insData"] = tempParams;
        params.insData["sfModel"] = getDependRow();

        params["eduData"] = {
            "eduModels" : getEduRow()
        };

        params["exData"] = {
            "exModels" : getCarrerRow()
        };
        
        params["miData"] = {
            "miModels" : getMilitaryRow()
        };

        params["cuData"] = {
            "cuModels" : getCurriculumRow()
        };

        let militaryRow = getMilitaryRow();
        let curriculumRow = getCurriculumRow();
        
        i=0;
        for(i; i<militaryRow.length; i++){
            params["exData"]["exModels"].push(militaryRow[i]);
        }
        i=0;
        for(i; i<curriculumRow.length; i++){
            params["exData"]["exModels"].push(curriculumRow[i]);
        }

        async function saveInit() {
            try {
                console.log(JSON.stringify(params));
                console.log(params);
                await callApi.userRegistration(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        alert("저장이 완료되었습니다.");
                        frm.append("userNo",res.data.Data);
                        frm.append("employeeNumber",res.data.Id);
                        // window.location.href = "/user/userManagement";
                        // location.reload();
                    }
                });

                console.log(frm);
                await callApi.uploadFileToServer(frm).then(res=> {
                    console.log(res);
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        alert("저장이 완료되었습니다.");
                        // window.location.href = "/user/userManagement";
                        // location.reload();
                    }
                });
            }catch(e){
                alert(e);
            }
        };
        saveInit();
    }

    // 팝업 띄우기, 닫기
    const openJoinPop = () => {
        $(".modal_box").show();
    };
    const closePopup = () => {
        $(".modal_box").hide();
        return false;
    }

    /* row click event */
    const addRow = (e) => {
        var gridApi = $(e.target).siblings("div").find(".ag-root")[0]["__agComponent"].gridApi;
        console.log(gridApi,"<----일반근로자");
        gridCommon.setGridApi(gridApi);
        gridCommon.onAddRow();
    }
    const removeRow = (e) => {
        var gridApi = $(e.target).siblings("div").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        gridCommon.onRemoveRow();
    }

    const getDependRow = () => {
        var gridApi = $("#dependGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getEduRow = () => {
        var gridApi = $("#eduGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCarrerRow = () => {
        var gridApi = $("#carrerGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getMilitaryRow = () => {
        var gridApi = $("#militaryGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCurriculumRow = () => {
        var gridApi = $("#curriculumGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    

    const imgUpload = (e) => {
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#userImgView').attr('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
        $("#userImgText").removeClass("txt_hide");
    }

    const userImgDelete = (e) => {
        $("#userImgView").attr("src","/images/user02.png");
        $("#userImage").val("");
        $("#userImgText").addClass("txt_hide");
    }

    const openPostPop = (e) => {
        $("#daumPostPop").show();
    }

    const addSalary = (e) => {
        const salaryUl = $("#userInfoRight li.salary > ul:nth-child(2)");
        const li = $("<li class='li_left add_li'>");
        const btn = $('<button type="button" tabindex="-1" style="color:#7d7d7d; background-color:transparent;">X</button>').on("click",function(e){
            $(e.target).parent().remove();  // 삭제이벤트
        });
        li.append('<input type="text" id="addSalaryTitle" class="address" placeholder="추가수당"/>');
        li.append(' : <input class="money_input" type="text" name="addSalaryPay" id="addSalaryPay" class="address" placeholder="1,700,000" style="margin-right:5px;"/>');
        
        li.append(btn);
        salaryUl.append(li);
    }
    
    useEffect(()=>{

    },[]); //init

    return (
    <div class="div_bottom tab_01">
        <form id="test">
            <div class="left_div">
                {/* 왼쪽기본 내용 */}
                <div id="userInfoLeft" class="test">
                    <div class="left_div_inner">
                    <div class="imgload">
                        <img id="userImgView" class="userImgView" src='/images/user02.png' alt="유저사진"/>
                        <span id="userImgText">사원 사진을 등록해주세요.</span>
                        <div style={{marginTop:"5px"}}>
                            <label for="userImage" class="userImg">수정</label><input type="file" id="userImage" onChange={imgUpload}/>
                            <label for="imgDelete">삭제</label><button type="button" id="imgDelete" onClick={userImgDelete}/>
                        </div>
                    </div>
                    <ul class="userinfo_left_box">
                        <li><span>성명 :</span><input type="text" name="userName" id="userName" placeholder="성명을 입력해주세요." defaultValue="테스트"/></li>
                        <li>
                            <span>주민번호 :</span>
                            <input type="text" class="personal_input" name="personalNumber" id="personalNumber" maxLength="14" placeholder="123456-1234567" defaultValue="950527-1010101"/>
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
                        <li><span>입사일 :</span><input type="text" class="date_input join_date" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요." defaultValue="2020-04-05"/></li>
                        {/* <li>아이디 :<input type="text" name="id" id="joinId" placeholder="아이디를 입력해주세요."/></li> */}
                        <li><span>직무 :</span> 
                            {/* <input type="text" name="position" id="position" placeholder="사회복지사" defaultValue="테스트"/> */}
                            <select name="position" id="position" style={{width:"182px"}}>
                                <option value="0">사회복지사</option>
                                <option value="1">요양보호사</option>
                                <option value="2">사무원</option>
                                <option value="3">시설장</option>
                                <option value="4">조리원</option>
                                <option value="5">운전사</option>
                                <option value="6">물리치료사</option>
                                <option value="7">촉탁의</option>
                                <option value="8">대표</option>
                            </select>
                        </li>
                        <li><span>직위 : </span>
                            <input type="text" name="workLevel" id="workLevel" placeholder="부장"/>
                        </li>
                        </ul>
                    </div>
                    <div class="right_div_inner">
                        <ul class="userinfo_right_box">
                            <li style={{display:"inline-block" , width:"155px", marginLeft:"5px" }}>
                                <span>고용형태 : </span>
                                <select name="regularEmployee" id="regularEmployee">
                                    <option value="0">정규직</option>
                                    <option value="1">계약직</option>
                                    <option value="2">파견직</option>
                                    <option value="3">위촉직</option>                   
                                </select>
                            </li>
                            <li>  
                                <span>수습적용 :</span>
                                <select name="isProbation" id="isProbation" style={{width:"38px",marginLeft:"15px",marginRight:"15px"}}>
                                    <option value="1" selected>부</option>
                                    <option value="0">여</option>                                                
                                </select>
                                <span  style={{display:"none"}}>
                                    수습만료일 :<input type="text" class="date_input" name="probation" id="probation" placeholder="2020-01-01"  defaultValue="2020-04-05" style={{ width:"89px"}}/>
                                </span>
                            </li>
                            <li>
                                <span>계약기간 :</span>
                                <input type="text" class="dateto_input" name="contractPeriod" id="contractPeriod" placeholder="2020-01-01 ~ 2021-01-01" defaultValue="2020-01-01~2020-01-16"/>
                            </li>
                            <li>전화번호 :<input type="tel" maxLength="13" class="tell_input" name="tellNo" id="tellNo" placeholder="02-000-0000" defaultValue="010-4412-8516"/></li>
                            <li>휴대폰 :<input type="tel" maxLength="13" class="phone_input" name="mobile" id="mobile" placeholder="010-0000-0000" defaultValue="010-4412-8516"/></li>
                            <li>
                                <span>이메일 :</span>
                                <input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." defaultValue="kkj6670@naver.com"/>
                            </li>
                            <li style={{position:"relative"}}>
                                우편번호 :<input type="text" name="postNo" id="postNo" class="address" placeholder="우편번호" defaultValue="서울시" style={{width:"152px"}}/>
                                <button type="button" class="btn_gray postal_code" onClick={openPostPop}>우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소"  defaultValue="중랑구 답십리로" style={{width:"300px"}}/>
                            </li>
                            <li style={{height:"70px"}}>
                                <textarea name="addressDetail" id="addressDetail" placeholder="상세주소"  defaultValue="77길45"></textarea>
                            </li>
                            <li>  
                                <span>퇴사여부 :</span>
                                <select name="isActive" id="isActive" style={{width:"50px"}}>
                                    <option value="0" selected>여</option>
                                    <option value="1">부</option>                                      
                                </select>
                                <input type="text" name="leaveDate" id="leaveDate" class="date_input" placeholder="2020-04-04"/>
                            </li>
                            <li>  
                                <span>퇴사사유 :</span>
                                <input type="text" name="leaveReason" id="leaveReason"/>
                            </li>
                        </ul>
                    </div>
                </div>    
            </div>
        
            <div class="right_div tab_01">

                {/* <div class="div_top wid843"> */}
                    <input type="radio" id="tab_001" name="tab02" defaultChecked/>
                    <label for="tab_001">급여상세</label>
                    <input type="radio" id="tab_002" name="tab02" />
                    <label for="tab_002">4대보험/부양가족</label>
                    <input type="radio" id="tab_003" name="tab02" />
                    <label for="tab_003">학력/교육</label>
                    
                    {/* <input type="file" id="upload"/>
                    <label for="upload" class="upload">인사서류 업로드</label> */}
                    <button type="button" class="upload" onClick={()=>openJoinPop()}>인사서류 업로드</button>
                {/* </div> */}

                <div class="div_bottom right"> 
                    {/* 오른쪽전체 div  */}
                    <div class="sal_inner">
                        {/* 급여상세 */}
                        <div id="userInfoRight" class="input_content tab_001">
                            <ul>
                                <li style={{listStyle:"disc", height:"21px", lineHeight:"21px"}}>
                                    <strong>급여항목</strong>
                                    <button type="button" class="btn_gray wi64he19" id="addSalary" onClick={addSalary}>추가</button>
                                </li>
                                <li id="monthSalary" class="salary" style={{overflowY: "auto", marginTop:"10px"}}>
                                    <ul style={{ borderBottom:"1px dotted #e7e7e7", height:"40px"}}>
                                        <li>
                                            <span>월급 :</span>
                                            <input type="text" id="salaryOfMonth" name="salaryOfMonth" defaultValue="100,000,000"/>
                                            <span>원</span>
                                            {/* <input type="text" class="money_input" name="salaryOfMonth" id="salaryOfMonth" placeholder="1,700,000" defaultValue="1000000"/> */}
                                        </li>
                                    </ul>    
                                    <ul>
                                        <li class="li_left">
                                            <span>기본급 :</span>
                                            <input type="text" name="baseSalary" id="baseSalary" class="address money_input big" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>
                                        <li class="li_left small">
                                            <span>식대 :</span>
                                           <input type="text" name="foodSalary" id="foodSalary" class="address money_input" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>
                                        <li class="li_left big">
                                            <span>차량유지비 :</span>
                                            <input type="text" name="carSalary" id="carSalary" class="address money_input" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>
                                        <li class="li_left">
                                            <span>복리후생 :</span>
                                            <input type="text" name="welfareSalary" id="welfareSalary" class="address money_input" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>
                                        <li class="li_left">
                                            <span>직책수당 :</span>
                                            <input type="text" name="positionSalary" id="positionSalary" class="address money_input" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>     
                                    </ul>
                                </li>
                                <li class="clear">
                                    <strong style={{display:"block", marginTop:"20px"}}>성과금, 상여금</strong>
                                    <ul id="yearsSalryBox">
                                        <li class="in_block">
                                            성과금 :<input type="text" class="money_input" name="insentive" id="insentive" placeholder="1,700,000" defaultValue="1000000"/>
                                            <select id="insentiveType" style={{width: "74px", textAling: "center"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="3">년간</option>
                                            </select>
                                        </li>
                                        <li class="in_block" style={{marginLeft: "15px"}}>
                                            상여금 :<input type="text" class="money_input" name="bonus" id="bonus" placeholder="1,700,000" defaultValue="1000000"/>
                                            <select id="bonusType" style={{width: "74px"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="3">년간</option>
                                            </select>
                                        </li>
                                        <li class="salary_years" style={{marginRight:"30px"}}>
                                            <span>연봉 :</span>
                                            <input type="text" class="money_input" name="salaryOfYears" id="salaryOfYears" placeholder="2,100,500" defaultValue="1,000,000" 
                                            tabindex="-1" style={{fontSize: "20px", border:"none", width: "130px", height:"30px"}} readOnly/>
                                            <span>원</span>
                                        </li>
                                    </ul>
                                </li>
                                <li class="ul_li_left" style={{height:"132px"}}>
                                    <strong style={{display:"block", margknTop:"8px"}}>관리사항</strong>
                                    <ul>
                                        <li style={{marginLeft:"0px"}}>
                                            예금주 :<input type="text" id="accountHolder" name="accountHolder" placeholder="박이삭" defaultValue="김경주"/>
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
                                        <li>계좌번호 :<input type="text" id="accountNo" placeholder="1000-100-1000000" style={{width:"178px"}} defaultValue="110-222-2222"/></li>
                                        <br />
                                        <li style={{marginLeft:"0px"}}>
                                            중소기업취업감면 여부 :
                                            <select id="jobReductActive" class="small_bs" style={{width: "43px", marginLeft: "10px"}}>
                                                <option value="1" defaultChecked>부</option>
                                                <option value="0">여</option>
                                            </select>
                                        </li>
                                        <li>기간 :<input type="text" class="dateto_input" id="reductDate" placeholder="2020.01-01~2025.01.01" style={{width: "213px"}}  defaultValue="2020-01-01~2020-05-05"/></li>
                                        <li>감면율 :
                                            {/* <input type="text" id="reductPer" placeholder="90"  style={{width: "43px"}} defaultValue="80"/>% */}
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
                                        <li>감면대상 :<input type="text" id="reductTarget" placeholder="급여" style={{width: "53px"}} defaultValue="급여"/></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* --급여상세 */}

                        {/* 4대보험 / 부양가족 */}
                        <div class="input_content tab_002" style={{height: "455px"}}>
                            <div class="tab_01_inner">
                                <ul>
                                    <li style={{listStyle:"disc", fontSize:"16px"}}>
                                    <strong>4대보험</strong>
                                    <button type="button" class="btn_gray" style={{marginLeft: "5px", marginTop: "-5px", marginLeft:"7px"}}>신청하기</button>
                                        <div class="tab_01_grid">
                                            <ul>
                                                <li>
                                                    <div>구분</div>
                                                    <div>기호번호</div>
                                                    <div>취득일</div>
                                                    <div class="right_border">상실일</div>
                                                </li>
                                                <li>
                                                    <div>국민연금</div>
                                                    <div><input type="text" id="fourIns0" defaultValue="" maxLength="10"/></div>
                                                    <div><input type="text" class="date_input " id="getOfIns0"  defaultValue="2020-08-08" /></div>
                                                    <div class="right_border"><input type="text" class="date_input " id="lostOfIns0" defaultValue="2020-08-08"/></div>
                                                </li>
                                                <li>
                                                    <div>건강보험</div>
                                                    <div><input type="text" id="fourIns1"  defaultValue="" maxLength="10"/></div>
                                                    <div><input type="text" class="date_input " id="getOfIns1"  defaultValue="2020-08-08"/></div>
                                                    <div class="right_border"><input type="text" class="date_input " id="lostOfIns1"  defaultValue="2020-08-08"/></div>
                                                </li>
                                                <li>
                                                    <div>고용보험</div>
                                                    <div><input type="text" id="fourIns2" defaultValue="" maxLength="10"/></div>
                                                    <div><input type="text" class="date_input " id="getOfIns2" defaultValue="2020-08-08"/></div>
                                                    <div class="right_border"><input type="text" class="date_input " id="lostOfIns2" defaultValue="2020-05-06"/></div>
                                                </li>
                                                <li>
                                                    <div class="bottom_border">산재보험</div>
                                                    <div class="bottom_border"><input type="text" id="fourIns3" defaultValue="" maxLength="10"/></div>
                                                    <div class="bottom_border"><input type="text" class="date_input " id="getOfIns3"  defaultValue="2020-05-06"/></div>
                                                    <div class="bottom_border right_border"><input type="text" class="date_input " id="lostOfIns3"  defaultValue="2020-06-08"/></div>
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
                                                            <input type="text" id="fourIns0" defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns0"  defaultValue="2020-08-08"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns0" defaultValue="2020-08-08"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>건강보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns1"  defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns1"  defaultValue="2020-08-08"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns1"  defaultValue="2020-08-08"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>고용보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns2" defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns2" defaultValue="2020-08-08"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns2" defaultValue="2020-05-06"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>산재보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns3" defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns3"  defaultValue="2020-05-06"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns3"  defaultValue="2020-06-08"/>
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
                                        <button type="button" class="btn_gray" style={{marginLeft: "5px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="dependGrid" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData} gridDefs={dependDefs}/>
                                        </div>
                                        {/* 부양가족 */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* --4대보험 / 부양가족 */}

                        {/* 학력교육 */}
                        <div class="input_content tab_003">
                            <ul>
                                <li>
                                    <strong>학력</strong>
                                    <div class="tab_01_inner">
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="eduGrid" class="tab_01_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>
                                    <strong>경력</strong>
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="carrerGrid" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>
                                    <strong>병역</strong>
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="militaryGrid" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData4} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>
                                    <strong>교육</strong>
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="curriculumGrid" class="tab_02_grid grid_scrollX_none">
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
            {/* <button type="button" class="btn_backnext next_position">이전으로</button> */}
            <button type="button" class="btn_backnext save_position" onClick={fnSave}>저장하기</button>
        </form>
    </div>
    
    )
}

export default EamedIncomePresenter;