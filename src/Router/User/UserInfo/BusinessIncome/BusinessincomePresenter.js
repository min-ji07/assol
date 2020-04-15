import React from 'react';
import DataGrid from "../../../../Components/DataGrid";
import $ from 'jquery';
import gridCommon from '../../../../Utils/grid';
import { callApi } from '../../../../Utils/api';

const BusinessincomePresenter = ({rowData, rowData2, rowData3, rowData4, euduDefs, carrerDefs, militaryDefs, curriculumDefs}) => {

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
    }

    const userImgDelete2 = (e) => {
        $("#userImgView2").attr("src","/images/user02.png");
        $("#userImage2").val("");
    }

    let params = {};
    const fnSave2 = () => {
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
                key = "imagePath";   
            }
            tempParams[key] = value; 
        }
        params["userInfo"] = tempParams;
        params.userInfo.userType = 1; // 사업소득자
        params.userInfo.branchNo = 30; // 임시 나중에 수정해야함

        i=0;
        tempParams = {};
        for(i; i<inputListTab1.length; i++){
            if(inputListTab1[i].id.indexOf("businessNo") != -1){
                if(inputListTab1[i].id == "businessNo1"){
                    tempParams["businessNo"] = inputListTab1[i].value;
                } else {
                    tempParams["businessNo"] += "-"+inputListTab1[i].value;
                }
                continue;
            }
            tempParams[inputListTab1[i].id] = inputListTab1[i].value; 
        }

        params["detailData"] = tempParams;

        params["eduData"] = {
            "eduModels" : getEduRow()
        };

        params["exData"] = {
            "exModels" : getCarrerRow()
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
                await callApi.BusinessUserRegistration(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        alert("저장이 완료되었습니다.");
                        location.reload();
                    }
                });

            }catch(e){
                console.log(e);
            }
        };
        saveInit();
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
    <div class="div_bottom tab_02">
        <form> 
            <div class="left_div">
                <div id="userInfoLeft2" class="test">
                    <div class="left_div_inner">
                    <div class="imgload"><img id="userImgView2" src='/images/user02.png' alt="유저사진" style={{width:"140px",height:"140px",borderRadius:"50%"}}/></div>
                    <br/><span id="userImgText2">사원 사진을 등록해주세요.</span><br/>
                        <div style={{marginTop:"10px"}}>
                            <label for="userImage2" class="userImg">수정</label><input type="file" id="userImage2" onChange={imgUpload2}/>
                            <label for="imgDelete">삭제</label><button type="button" id="imgDelete" onClick={userImgDelete2}/>
                        </div>
                        <ul>
                            <li>성명 :<input type="text" name="userName" id="userName" placeholder="성명을 입력해주세요." defaultValue="김경주"/></li>
                            <li>
                                업무 : 
                                <select id="position" name="position" style={{borderRadius:"0px", marginLeft:"20px", width:"172px", marginTop:"-4px"}}>
                                    <option value="940100">940100 | 저술가</option>
                                    <option value="940200">940200 | 화가관련</option>
                                    <option value="940301">940301 | 작곡가</option>
                                    <option value="940302">940302 | 배우</option>
                                    <option value="940303">940303 | 모델</option>
                                    <option value="940304">940304 | 가수</option>
                                    <option value="940305">940305 | 성악가</option>
                                    <option value="940500">940500 | 연예보조</option>
                                    <option value="940600">940600 | 자문,고문</option>
                                    <option value="940901">940901 | 바둑기사</option>
                                    <option value="940902">940902 | 꽃꽃이교사</option>
                                    <option value="940903">940903 | 학원강사</option>
                                    <option value="940904">940904 | 직업운동가</option>
                                    <option value="940905">940905 | 봉사료수취자</option>
                                    <option value="940906">940906 | 보험설계</option>
                                    <option value="940907">940907 | 음료배달</option>
                                    <option value="940908">940908 | 방판,외판</option>
                                    <option value="940909">940909 | 기타자영업</option>
                                    <option value="940910">940910 | 다단계판매</option>
                                    <option value="940911">940911 | 기타모집수당</option>
                                    <option value="940912">940912 | 간병인</option>
                                    <option value="940913">940913 | 대리운전</option>
                                    <option value="940914">940914 | 캐디</option>
                                    <option value="940915">940915 | 목욕관리사</option>
                                    <option value="940916">940916 | 행사도우미</option>
                                    <option value="940917">940917 | 심부름용역</option>
                                    <option value="940918">940918 | 퀵서비스</option>
                                    <option value="940919">940919 | 물품배달</option>
                                    <option value="851101">851101 | 병의원</option>
                                </select>
                            </li>
                            <li>이메일 :<input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." defaultValue="kkj6670@naver.com"/></li>
                        </ul>
                    </div>
                    <div class="right_div_inner">
                        <ul>
                            <li>주민번호 :<input type="text" name="personalNumber" id="personalNumber" placeholder="123456-1234567"  defaultValue="123456-1234567"/></li>
                            <li style={{display:"inline-block" , width:"300px", marginLeft:"5px" }}>  
                                국적 :
                                    <select name="national" id="national" onChange={nationalChange}>
                                        <option value="내국인" selected>내국인</option>
                                        <option value="외국인">외국인</option>                                                
                                    </select>
                                <span style={{display:"none"}}>
                                    비자타입 :
                                    <input type="text" id="visaType" name="visaType" placeholder="K-9011" style={{width:"97px"}}/>
                                </span>
                            </li>
                            <li>입사일 :<input type="text" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요." defaultValue="2020-05-01"/></li>
                            <li>그룹입사일 :<input type="text" name="groupJoinDate" id="groupJoinDate" placeholder="입사일을 입력해주세요." defaultValue="2020-05-01" style={{width:"215px"}}/></li>
                            <li style={{display:"inline-block" , width:"119px", marginLeft:"5px"}}>  
                            수습적용 :
                                <select name="isProbation" id="isProbation" style={{width:"38px"}}>
                                    <option value="0" selected>부</option>
                                    <option value="1">여</option>                                                
                                </select>
                            </li>
                            <li style={{display:"inline-block" , width:"178px"}}>
                                수습만료일 :<input type="text" name="probation" id="probation" placeholder="2020-01-01"  defaultValue="2020-04-05" style={{ width:"89px"}}/>
                            </li>
                            <li>전화번호 :<input type="tel" name="tellNo" id="tellNo" placeholder="02-000-0000"  defaultValue="02-3223-2332"/></li>
                            <li>휴대폰 :<input type="tel" name="mobile" id="mobile" placeholder="010-0000-0000"  defaultValue="010-2222-3333"/></li>
                            {/* <li>
                                소득구분 : 
                                <select name="socialInsurance" id="socialInsurance">
                                    <option value="0">940100 | 저술가</option>
                                    <option value="1">940200 | 화가관련</option>
                                    <option value="2">940301 | 작곡가</option>
                                    <option value="3">940302 | 배우</option>
                                    <option value="4">940303 | 모델</option>
                                    <option value="5">940304 | 가수</option>
                                    <option value="6">940305 | 성악가</option>
                                    <option value="7">940500 | 연예보조</option>
                                    <option value="8">940600 | 자문,고문</option>
                                    <option value="9">940901 | 바둑기사</option>
                                    <option value="10">940902 | 꽃꽃이교사</option>
                                    <option value="11">940903 | 학원강사</option>
                                    <option value="12">940904 | 직업운동가</option>
                                    <option value="13">940905 | 봉사료수취자</option>
                                    <option value="14">940906 | 보험설계</option>
                                    <option value="15">940907 | 음료배달</option>
                                    <option value="16">940908 | 방판,외판</option>
                                    <option value="17">940909 | 기타자영업</option>
                                    <option value="18">940910 | 다단계판매</option>
                                    <option value="19">940911 | 기타모집수당</option>
                                    <option value="20">940912 | 간병인</option>
                                    <option value="21">940913 | 대리운전</option>
                                    <option value="22">940914 | 캐디</option>
                                    <option value="23">940915 | 목욕관리사</option>
                                    <option value="24">940916 | 행사도우미</option>
                                    <option value="25">940917 | 심부름용역</option>
                                    <option value="26">940918 | 퀵서비스</option>
                                    <option value="27">940919 | 물품배달</option>
                                    <option value="28">851101 | 병의원</option>
                                </select>
                            </li> */}
                            <li>
                                우편번호 :<input type="text" name="postNo" id="postNo" class="address" placeholder="우편번호" defaultValue="133-32" style={{width:"152px"}}/>
                                <button type="button" class="btn_gray postal_code" onClick={openPostPop}>우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소"  defaultValue="중랑구 면목동 답십리로 77길 45" style={{width:"300px"}}/>
                            </li>
                            <li>
                                <textarea type="text" name="addressDetail" id="addressDetail" placeholder="상세주소"  defaultValue="2층"></textarea>
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
                <button type="button" class="upload" onClick={()=>openJoinPop()}>통장사본 및 신분증사본 업로드</button>
                {/* <input type="file" id="upload"/>
                <label for="upload" class="upload">통장사본 및 신분증사본 업로드</label> */}
                {/* </div> */}
                <div class="div_bottom right">
                    <div class="sal_inner">
                        {/* 급여상세 */}
                        <div id="userInfoRight2" class="input_content tab_004">
                            <ul>
                                <li class="salary" style={{marginTop:"10px", height:"140px"}}>
                                    <strong>급여항목</strong>
                                    <ul>
                                        <li style={{listStyle:"none"}}>총 연간 소득금액 :
                                        <input type="text" name="totalPayOfYear" id="totalPayOfYear" placeholder="10,000,000" defaultValue="10,000,000"/> 원
                                        {/* <select name="totalPayOfYear" id="totalPayOfYear">
                                            <option value="0">60시간</option>
                                        </select> */}
                                        </li>
                                        <li style={{listStyle:"none", float:"left", display:"inline-block"}}>
                                            <select name="payQuarterType" id="payQuarterType" style={{width: "74px", textAling: "center"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="2">년간</option>
                                            </select>
                                            <input type="text" name="payQuarter" id="payQuarter" placeholder="10,000,000" defaultValue="1,000,000"/> 원
                                        </li>
                                        <li style={{listStyle:"none", marginLeft:"25px"}}>기타부대수당 : 
                                            <select name="otherExtraPayType" id="otherExtraPayType" style={{marginLeft:"10px", width: "74px", textAling: "center"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="2">년간</option>
                                            </select>
                                            <input type="text" name="otherExtraPay" id="otherExtraPay" placeholder="10,000,000" defaultValue="1,000,000"/>원
                                        </li>
                                    </ul>
                                </li>
                                
                                <li class="clear">
                                    <strong style={{display:"block", marginTop:"20px"}}>관리사항</strong>
                                    <ul>
                                        <li style={{listStyle:"none", float:"left", display:"inline-block"}}>
                                            예금주 : <input type="text" name="accountHolder" id="accountHolder" placeholder="박이삭" defaultValue="박이삭"/>
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
                                            계좌번호 :<input type="text" id="accountNo" name="accountNo" placeholder="110-491-546205" defaultValue="110-491-546205" style={{width:"178px"}}/>
                                        </li>
                                    </ul>
                                </li>
                                
                                <li class="ul_li_left" style={{height:"132px", borderBottom:"1px solid #dedede"}}>
                                    <strong>사업자등록번호</strong>
                                    <span style={{color:"#f38d8d", fontSize:"13px"}}> *소유자일 경우</span>
                                    <ul>
                                        <li style={{listStyle:"none"}}>
                                            사업자등록번호 : <input type="text" id="businessNo1" placeholder="00" defaultValue="11" style={{width:"25px", border:"none", borderBottom:"1px solid #8a8a8a"}}/>-
                                            <input type="text" id="businessNo2" placeholder="00" defaultValue="11" style={{width:"25px", border:"none", borderBottom:"1px solid #8a8a8a"}}/>-
                                            <input type="text" id="businessNo3" placeholder="000"defaultValue="110" style={{width:"35px", border:"none", borderBottom:"1px solid #8a8a8a"}}/>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* 급여상세 */}

                        {/* 학력교육 */}
                        <div class="input_content tab_005">
                            <ul>
                                <li style={{marginTog:"-22px"}}>학력
                                    <div class="tab_01_inner">
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-32px", marginLeft: "36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-32px", marginLeft: "111px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="eduGrid2" class="tab_01_grid grid_scrollX_none" style={{marginTop:"0px",     height: "240px"}}>
                                            <DataGrid rowData={rowData} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTog:"3px"}}>경력
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-32px", marginLeft:"40px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-32px",marginLeft: "115px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="carrerGrid2" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData2} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTog:"3px"}}>병역
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="militaryGrid2" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData3} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTog:"3px"}}>교육
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="curriculumGrid2" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData4} gridDefs={curriculumDefs}/>
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