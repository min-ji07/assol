import React from 'react';
import DataGrid from "../../../../Components/DataGrid";
import $ from 'jquery';
import gridCommon from '../../../../Utils/grid';
import { callApi } from '../../../../Utils/api';
import utils from '../../../../Utils/utils';

const BusinessincomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {
    let params = {};
    let frm = new FormData();
    let checkUserImage = true;
    
    const fnValidation = () => {
        var tabDiv = ".div_bottom.tab_02";
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

    const imgUpload2 = (e) => {
        console.log(e);
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#userImgView2').attr('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
        $("#userImgText2").addClass("txt_hide");
    }

    const fnSave2 = () => {

        if(!fnValidation()){
            return;
        }
        
        let i=0;
        const inputListLeft = $("#userInfoLeft2 input:not([name=tab]), #userInfoLeft2 select, #userInfoLeft2 textarea");
        const inputListTab1 = $("#userInfoRight2 input:not([name=tab]), #userInfoRight2 select");

        // const inputListTab2 = $("#insurnaceTable input");
        
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
        params["userInfo"] = tempParams;
        params.userInfo.userType = 1; // 사업소득자
        params.userInfo.branchNo = 29; // 임시 나중에 수정해야함

        i=0;
        tempParams = {};
        for(i; i<inputListTab1.length; i++){
            var checkId = inputListTab1[i].id;
            var checkVal = inputListTab1[i].value;
            var checkClass = inputListTab1[i].className;
            
            if(checkId.indexOf("businessNo") != -1){
                if(checkId == "businessNo1"){
                    tempParams["businessNo"] = checkVal;
                } else {
                    tempParams["businessNo"] += "-" + checkVal;
                }
                continue;
            }

            if(checkClass.indexOf("money_input") != -1){
                checkVal = utils.regExr.numOnly(checkVal);
            }
            tempParams[checkId] = checkVal; 
        }

        params["detailData"] = tempParams;

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
                console.log(JSON.stringify(params));
                console.log(params);
                await callApi.businessUserRegistration(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        alert("저장이 완료되었습니다.");
                        saveImgFile(res.data.Data, res.data.Id);
                        // window.location.href = "/user/userManagement";
                        // location.reload();
                    }
                });

            }catch(e){
                // alert("관리자에게 문의하세요.",e);
            }
        };
        saveInit();
    }

    const saveImgFile = (userNo,employeeNumber) => {
        frm = new FormData();
        frm.append("userNo",userNo);
        frm.append("employeeNumber",employeeNumber);
        checkUserImage = $("#userImage2")[0].value == "" ? true : false;
        if(checkUserImage){
            frm.append("imageIsNull","Y");
        } else {
            frm.append("userImage",$("#userImage2")[0].files[0]);
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
                    window.location.href = "/user/userManagement";
                });
            } catch (e) {
                alert("관리자에게 문의하세요.",e);
            }
        }
        saveImg();
    }

    const openPostPop = (e) => {
        $("#daumPostPop").show();
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

    const getEduRow = () => {
        var gridApi = $("#eduGrid2").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCarrerRow = () => {
        var gridApi = $("#carrerGrid2").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getMilitaryRow = () => {
        var gridApi = $("#militaryGrid2").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCurriculumRow = () => {
        var gridApi = $("#curriculumGrid2").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }

    // 팝업 띄우기, 닫기
    const openJoinPop = () => {
        $(".modal_box").show();
    };
    
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
                            <label for="userImage2" class="userImg">수정</label><input type="file" id="userImage2" class="userImage" accept="image/*" onChange={imgUpload2}/>
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
                                <input type="tel" class="tell_input" name="tellNo" id="tellNo" placeholder="02-000-0000"  />
                            </li>
                            <li>
                                <span>휴대폰 :</span>
                                <input type="tel" maxLenght="13" class="phone_input" name="mobile" id="mobile" placeholder="010-0000-0000"  />
                            </li>
                            <li>
                                <span>이메일 :</span>
                                <input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." />
                            </li>
                            <li style={{position:"relative"}}>
                                우편번호 :<input type="text" name="postNo" id="postNo" class="address" placeholder="우편번호"  style={{width:"152px"}}/>
                                <button type="button" class="btn_gray postal_code" onClick={openPostPop}>우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소"   style={{width:"300px"}}/>
                            </li>
                            <li style={{height:"70px"}}>
                                <textarea name="addressDetail" id="addressDetail" placeholder="상세주소"  ></textarea>
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
            <div class="right_div tab_02">
                {/* <div class="div_top wid843"> */}
                <input type="radio" id="tab_004" name="tab02" defaultChecked/>
                <label for="tab_004">상세설정</label>
                <input type="radio" id="tab_005" name="tab02" />
                <label for="tab_005">학력/교육</label>
                <button type="button" class="upload" onClick={openJoinPop}>인사서류 업로드</button>
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
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="eduGrid2" class="tab_01_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>경력
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="carrerGrid2" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>병역
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="militaryGrid2" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData4} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginTop:"20px"}}>교육
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="curriculumGrid2" class="tab_02_grid grid_scrollX_none">
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
            <button type="button" class="btn_backnext save_position" onClick={fnSave2}>저장하기</button>
        </form>
    </div>
    )
}

export default BusinessincomePresenter;