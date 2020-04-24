import React from 'react';
import DataGrid from "../../../../Components/DataGrid"
import { callApi } from '../../../../Utils/api';
import gridCommon from '../../../../Utils/grid';
import utils from '../../../../Utils/utils';

const DailyIncomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {
    let params = {};
    let frm = new FormData();
    let checkUserImage = true;

    const fnValidation = () => {
        var tabDiv = ".div_bottom.tab_03";
        var regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        
        
        var personalNumber = $(tabDiv).find("#personalNumber").val();
        if(!personalValidaition(personalNumber)){
            alert("주민번호가 올바르지 않습니다.");
            return false;
        }

        if(!regEmail.test($(tabDiv+" input[type='email']").val())){
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

    const fnSave3 = () => {

        if(!fnValidation()){
            return;
        }

        let i=0;
        const inputListLeft = $("#userInfoLeft3 input:not([name=tab]), #userInfoLeft3 select, #userInfoLeft3 textarea");
        const inputListTab1 = $("#userInfoRight3 input:not([name=tab]):not(#predictionMonth), #userInfoRight3 select");
        const inputListTab2 = $("#insurnaceTable2 input");
        
        let tempParams = {};
        var key;
        var value;
        for(i; i<inputListLeft.length; i++){
            key = inputListLeft[i].id;
            value = inputListLeft[i].value;
            if(key.indexOf("userImage") != -1){
                continue;
            }
            tempParams[key] = value; 
        }
        i=0;
        for(i; i<inputListTab1.length; i++){
            var checkId = inputListTab1[i].id;
            var checkVal = inputListTab1[i].value;
            var checkClass = inputListTab1[i].className;
            if(checkClass.indexOf("money_input") != -1){
                checkVal = utils.regExr.numOnly(checkVal);
            }
            console.log(checkId,checkVal);
            tempParams[checkId] = checkVal;
        }
        i=0;
        for(i; i<inputListTab2.length; i++){
            tempParams[inputListTab2[i].id] = inputListTab2[i].value; 
        }

        params["userInfo"] = tempParams;
        params.userInfo.userType = 2; // 일용직근로자
        params.userInfo.branchNo = 29; // 임시 나중에 수정해야함

        params.userInfo["sfData"] = getDependRow();

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
        
        async function saveInit() {
            try {
                await callApi.dayilyUserRegistration(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        alert("저장이 완료되었습니다.");
                        saveImgFile(res.data.Data, res.data.Id);
                        // window.location.href = "/user/userManagement";
                    }
                });

            }catch(e){
                alert(e);
            }
        };
        console.log(params);
        console.log(JSON.stringify(params));
        // saveInit();
    }

    const saveImgFile = (userNo,employeeNumber) => {
        frm = new FormData();
        frm.append("userNo",userNo);
        frm.append("employeeNumber",employeeNumber);
        checkUserImage = $("#userImage3")[0].value == "" ? true : false;
        if(checkUserImage){
            frm.append("imageIsNull","Y");
        } else {
            frm.append("userImage",$("#userImage3")[0].files[0]);
        }
        var imgFileArr = selectFileList();
        var i = 0;
        for(i; i<imgFileArr.length; i++){
            console.log(imgFileArr[i]);
            frm.append("insa"+i,imgFileArr[i]);
        }
        async function saveImg(){
            try {
                await callApi.uploadFileToServer(frm).then(res=> {
                    console.log(res);
                    if(res.data.ErrorCode == 1){
                        // alert(res.data.Msg);
                    } else {
                        // alert("저장이 완료되었습니다.");
                        // window.location.href = "/user/userManagement";
                        // location.reload();
                    }
                    // window.location.href = "/user/userManagement";
                });
            } catch (e) {
                // alert("관리자에게 문의하세요.",e);
            }
        }
        saveImg();
    }

    // 인사서류 파일 리스트 리턴
    const selectFileList = () => {
        let checkList = $("#fileBox li a");
        var inputList = $("input[name=imgFileInput]");
        let i = 0;
        let tempArr = [];
        for(i; i<checkList.length; i++){
            if(checkList[i].className == "check_file"){
                tempArr.push(inputList[i].files[0]);
            }
        }
        return tempArr;
    }

    /* row click event */
   const addRow = (e) => {
        var gridApi = $(e.target).siblings("div").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        gridCommon.onAddRow();
    }
    const removeRow = (e) => {
        var gridApi = $(e.target).siblings("div").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        gridCommon.onRemoveRow();
    }

    const openPostPop = (e) => {
        $("#daumPostPop").show();
    }

    const getDependRow = () => {
        var gridApi = $("#dependGrid2").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getEduRow = () => {
        var gridApi = $("#eduGrid3").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCarrerRow = () => {
        var gridApi = $("#carrerGrid3").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getMilitaryRow = () => {
        var gridApi = $("#militaryGrid3").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCurriculumRow = () => {
        var gridApi = $("#curriculumGrid3").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const imgUpload3 = (e) => {
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#userImgView3').attr('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
        $("#userImgText3").addClass("txt_hide");
    }

    const nationalChange = (e) => {
        if(e.target.value == "내국인"){
            $(e.target).next().hide();
            $(e.target).next().val("");
        } else {
            $(e.target).next().show();
            $(e.target).next().val("");
        }
    }

    // 팝업 띄우기, 닫기
    const openJoinPop = () => {
        $(".modal_box").show();
    };
    const closePopup = () => {
        $(".modal_box").hide();
        return false;
    }

    
    
    return (
    <div class="div_bottom tab_03">
        <form> 
            <div class="left_div">
                <div id="userInfoLeft3" class="test">
                    <div class="left_div_inner">
                    <div class="imgload">
                        <img id="userImgView3" class="userImgView" src='/images/user02.png' alt="유저사진"/>
                        <span id="userImgText3" class="userImgText" style={{display:"block"}}>사원 사진을 등록해주세요.</span>
                        <div style={{marginTop:"5px"}}>
                            <label for="userImage3" class="userImg">수정</label>
                            <input type="file" class="userImage" id="userImage3" accept="image/*" onChange={imgUpload3}/>
                            <label for="imgDelete3">삭제</label>
                            <button type="button" id="imgDelete3" name="imgDelete"/>
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
                                <span>등록일 :</span>
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
                        <ul>
                            <li>전화번호 :<input type="text" class="tell_input" name="tellNo" id="tellNo" placeholder="02-000-0000" /></li>
                            <li>휴대폰 :<input type="text" maxLenght="13" class="phone_input" name="mobile" id="mobile" placeholder="010-0000-0000" /></li>
                            <li>
                                <span>이메일 :</span>
                                <input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." />
                            </li>
                            <li style={{position:"relative"}}>
                                우편번호 :<input type="text" name="postNo" id="postNo" class="address" placeholder="우편번호"  style={{width:"152px"}} readOnly/>
                                <button type="button" class="btn_gray postal_code" onClick={openPostPop}>우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소"   style={{width:"300px"}} readOnly/>
                            </li>
                            <li style={{height:"70px"}}>
                                <textarea name="addressDetail" id="addressDetail" placeholder="상세주소" readOnly></textarea>
                            </li>
                            <li class="leave_li">  
                                <span>퇴사여부 :</span>
                                <select name="isActive" id="isActive" style={{width:"50px"}}>
                                    <option value="1">여</option>
                                    <option value="0" selected>부</option>                                      
                                </select>
                                <span>
                                    <span style={{marginLeft:"5px"}}>퇴사일자 :</span>
                                    <input type="text" name="leaveDate" id="leaveDate" class="date_input" placeholder="2020-04-04" style={{width:"110px"}}/>
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

            <div class="right_div tab_03">
                {/* <div class="div_top wid843"> */}
                <input type="radio" id="tab_006" name="tab02" defaultChecked/>
                <label for="tab_006">급여상세</label>
                <input type="radio" id="tab_007" name="tab02" />
                <label for="tab_007">4대보험/부양가족</label>
                <input type="radio" id="tab_008" name="tab02" />
                <label for="tab_008">학력/교육</label>
                <button type="button" class="upload" onClick={()=>openJoinPop()}>인사서류 업로드</button>
                {/* <input type="file" id="upload"/>
                <label for="upload" class="upload">인사서류 업로드</label> */}
                {/* </div> */}
                <div class="div_bottom right">
                    <div class="sal_inner">

                        {/* 급여상세 */}
                        <div id="userInfoRight3" class="input_content tab_006">
                            <ul>
                                <li style={{listStyle:"disc", height:"21px", lineHeight:"21px"}}>
                                    <strong>급여항목</strong>
                                </li>
                                <li class="salary" style={{marginTop:"10px", listStyle:"none", height:"70px"}}>
                                    <ul>
                                        <li class="li_left" style={{width:"200px"}}>
                                            소정근로시간 :<input type="text" class="num_input" name="workTime" id="workTime" placeholder="1,700,000" maxLength="3" />
                                        </li>
                                        <li style={{display:"inline-block"}}>
                                            시급 : <input type="text" class="money_input" name="payOfHour" id="payOfHour" maxLength="10"/>원
                                        </li>
                                        <li class="li_right">
                                            총예상월수령금액 :<input type="text" class="money_input" name="predictionMonth" id="predictionMonth" placeholder="2,100,500"  
                                            tabindex="-1" style={{fontSize: "20px", border:"none", width: "130px", height:"30px", marginBottom:"4px"}} readOnly/>원
                                        </li>
                                    </ul>
                                </li>
                                <li class="clear">
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
                        <div class="input_content tab_007" style={{height: "455px"}}>
                            <div class="tab_01_inner">
                                <ul>
                                    <li style={{listStyle:"disc", fontSize:"16px"}}>
                                    <strong>4대보험</strong>
                                    <button type="button" class="btn_gray" style={{marginLeft: "5px", marginTop: "-5px", marginLeft:"7px"}}>신청하기</button>
                                        <div class="tab_01_grid">
                                            <ul id="insurnaceTable2">
                                                <li>
                                                    <div>구분</div>
                                                    <div>기호번호</div>
                                                    <div>취득일</div>
                                                    <div class="right_border">상실일</div>
                                                </li>
                                                <li>
                                                    <div>국민연금</div>
                                                    <div><input type="text" id="fourIns0"  maxLength="10"/></div>
                                                    <div><input type="text" class="date_input " id="getOfIns0"   /></div>
                                                    <div class="right_border"><input type="text" class="date_input " id="lostOfIns0" /></div>
                                                </li>
                                                <li>
                                                    <div>건강보험</div>
                                                    <div><input type="text" id="fourIns1"   maxLength="10"/></div>
                                                    <div><input type="text" class="date_input " id="getOfIns1"  /></div>
                                                    <div class="right_border"><input type="text" class="date_input " id="lostOfIns1"  /></div>
                                                </li>
                                                <li>
                                                    <div>고용보험</div>
                                                    <div><input type="text" id="fourIns2"  maxLength="10"/></div>
                                                    <div><input type="text" class="date_input " id="getOfIns2" /></div>
                                                    <div class="right_border"><input type="text" class="date_input " id="lostOfIns2" /></div>
                                                </li>
                                                <li>
                                                    <div class="bottom_border">산재보험</div>
                                                    <div class="bottom_border"><input type="text" id="fourIns3"  maxLength="10"/></div>
                                                    <div class="bottom_border"><input type="text" class="date_input " id="getOfIns3"  /></div>
                                                    <div class="bottom_border right_border"><input type="text" class="date_input " id="lostOfIns3"  /></div>
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
                                                            <input type="text" class="date_input " id="getOfIns0"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns0" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>건강보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns1"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns1"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns1"  />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>고용보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns2"   />
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns2" />
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns2" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>산재보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns3" />
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns3"  />
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns3"  />
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
                                        <div id="dependGrid2" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData} gridDefs={dependDefs}/>
                                        </div>
                                        {/* 부양가족 */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* --4대보험 / 부양가족 */}

                        {/* 학력교육 */}
                        <div class="input_content tab_008">
                            <ul>
                                <li>
                                    <strong>학력</strong>
                                    <div class="tab_01_inner">
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>

                                        <div id="eduGrid3" class="tab_01_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTop:"20px"}}>
                                    <strong>경력</strong>
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="carrerGrid3" class="tab_02_grid grid_scrollX_none" style={{marginTop:"-42px"}}>
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTop:"20px"}}>
                                    <strong>병역</strong>
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="militaryGrid3" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData4} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTop:"20px"}}>
                                    <strong>교육</strong>
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="curriculumGrid3" class="tab_02_grid grid_scrollX_none">
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

            {/* <button type="button" class="btn_backnext next_position">이전으로</button> */}
            <button type="button" class="btn_backnext save_position" onClick={fnSave3}>저장하기</button>
        </form>
    </div>
    )
}

export default DailyIncomePresenter;