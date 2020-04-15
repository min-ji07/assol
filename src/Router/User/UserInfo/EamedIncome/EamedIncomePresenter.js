import React, { useEffect } from 'react';
import DataGrid from "../../../../Components/DataGrid";
import { callApi } from '../../../../Utils/api';
import $ from 'jquery';
import gridCommon from '../../../../Utils/grid';
import utils from '../../../../Utils/utils';

const EamedIncomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {

    

    let params = {};

    const fnSave = () => {

        
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
                key = "imagePath";   
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
                await callApi.UserRegistration(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                        console.log(res.data);
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
            console.log(reader);
        }
        $("#userImgText").hide();
    }

    const userImgDelete = (e) => {
        $("#userImgView").attr("src","/images/user02.png");
        $("#userImage").val("");
        $("#userImgText").show();
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

    const openPostPop = (e) => {
        $("#daumPostPop").show();
    }

    const addSalary = (e) => {
        const salaryUl = $("#userInfoRight li.salary > ul:nth-child(2)");
        const li = $("<li class='li_left add_li'>");
        const btn = $('<button type="button" style="color:#7d7d7d; background-color:transparent;">X</button>').on("click",function(e){
            $(e.target).parent().remove();  // 삭제이벤트
        });
        li.append('<input class="money_input" type="text" id="addSalaryTitle" class="address" placeholder="추가수당"/>');
        li.append(' : <input class="money_input" type="text" id="addSalaryPay" class="address" placeholder="1,700,000" style="margin-right:5px;"/>');
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
                    <div class="imgload"><img id="userImgView" src='/images/user02.png' alt="유저사진" style={{width:"140px",height:"140px",borderRadius:"50%"}}/></div>
                        <br/><span id="userImgText">사원 사진을 등록해주세요.</span><br />
                        <div style={{marginTop:"10px"}}>
                            <label for="userImage" class="userImg">수정</label><input type="file" id="userImage" onChange={imgUpload}/>
                            <label for="imgDelete">삭제</label><button type="button" id="imgDelete" onClick={userImgDelete}/>
                        </div>
                        <ul>
                        <li>성명 :<input type="text" name="userName" id="userName" placeholder="성명을 입력해주세요." defaultValue="테스트"/></li>
                        {/* <li>아이디 :<input type="text" name="id" id="joinId" placeholder="아이디를 입력해주세요."/></li> */}
                        <li>직무 : 
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
                        <li>직위 : 
                            <select name="workLevel" id="workLevel" style={{borderRadius:"0px", marginLeft:"20px", width:"172px", marginTop:"-4px"}}>
                                <option value="0">부장</option>
                                <option value="1">과장</option>
                                <option value="2">대리</option>
                                <option value="3">사원</option>
                            </select>
                        </li>
                        <li>이메일 :<input type="email" name="email" id="email" placeholder="이메일을 입력해주세요." defaultValue="kkj6670@naver.com"/></li>
                        </ul>
                    </div>
                    <div class="right_div_inner">
                        <ul>
                            <li>주민번호 :<input type="text" class="personal_input" name="personalNumber" id="personalNumber" placeholder="123456-1234567" defaultValue="950527-00101001"/></li>
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
                            <li>입사일 :<input type="text" class="date_input" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요." defaultValue="2020-04-05"/></li>
                            <li>그룹입사일 :<input type="text" class="date_input" name="groupJoinDate" id="groupJoinDate" placeholder="입사일을 입력해주세요." defaultValue="2020-04-05"/></li>
                            <li style={{display:"inline-block" , width:"119px", marginLeft:"5px"}}>  
                            수습적용 :
                                <select name="isProbation" id="isProbation" style={{width:"38px"}}>
                                    <option value="0" selected>부</option>
                                    <option value="1">여</option>                                                
                                </select>
                            </li>
                            <li style={{display:"inline-block" , width:"178px"}}>
                                수습만료일 :<input type="text" class="date_input" name="probation" id="probation" placeholder="2020-01-01"  defaultValue="2020-04-05" style={{ width:"89px"}}/>
                            </li>
                            <li style={{display:"inline-block" , width:"155px", marginLeft:"5px" }}>고용형태 : 
                                <select name="regularEmployee" id="regularEmployee" style={{marginLeft:"5px"}}>
                                    <option value="0">정규직</option>
                                    <option value="1" selected>계약직</option>
                                    <option value="2">임시직</option>
                                    <option value="3">파견직</option>
                                    <option value="4">위촉직</option>
                                    <option value="5">일용직</option>                                                
                                </select>
                            </li>
                            <li style={{display:"inline-block" , width:"140px"}}>  
                            재직여부 :
                                <select name="isActive" id="isActive" style={{width:"50px"}}>
                                    <option value="0" selected>부</option>
                                    <option value="1">여</option>                                                
                                </select>
                            </li>
                            <li>계약기간 :<input type="text" class="dateto_input" name="contractPeriod" id="contractPeriod" placeholder="2020-01-01 ~ 2021-01-01" defaultValue="2020-01-01~2020-01-16"/></li>
                            {/* 숫자제한 , 3자리 4자리 4자리 -추가*/}
                            <li>전화번호 :<input type="tel" class="tell_input" name="tellNo" id="tellNo" placeholder="02-000-0000" defaultValue="010-4412-8516"/></li>
                            {/* 숫자제한 , 3자리 4자리 4자리 -추가*/}
                            <li>휴대폰 :<input type="tel" class="phone_input" name="mobile" id="mobile" placeholder="010-0000-0000" defaultValue="010-4412-8516"/></li>
                            <li>
                                우편번호 :<input type="text" name="postNo" id="postNo" class="address" placeholder="우편번호" defaultValue="서울시" style={{width:"152px"}}/>
                                <button type="button" class="btn_gray postal_code" onClick={openPostPop}>우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소"  defaultValue="중랑구 답십리로" style={{width:"300px"}}/>
                            </li>
                            <li>
                                <textarea name="addressDetail" id="addressDetail" placeholder="상세주소"  defaultValue="77길45"></textarea>
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
                    <label for="upload" class="upload">통장사본 및 신분증사본 업로드</label> */}
                    <button type="button" class="upload" onClick={()=>openJoinPop()}>통장사본 및 신분증사본 업로드</button>
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
                                <li class="salary" style={{overflowY: "scroll", marginTop:"10px"}}>
                                    <ul style={{ borderBottom:"1px dotted #e7e7e7", height:"51px"}}>
                                        <li class="li_left">
                                            월급 :<input type="text" class="money_input" name="salaryOfMonth" id="salaryOfMonth" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>
                                        <li class="li_right">
                                            연봉 :<input type="text" class="money_input" name="salaryOfYears" id="salaryOfYears" placeholder="2,100,500" defaultValue="1,000,000" 
                                            style={{fontSize: "20px", border:"none", width: "105px", height:"30px"}} readOnly/>원
                                        </li>
                                    </ul>    
                                    <ul style={{height:"0px", top:"78px"}}>
                                        <li class="li_left big">
                                            <span>기본급 :</span>
                                            <input type="text" name="baseSalary" id="baseSalary" class="address money_input" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>
                                        <li class="li_left">
                                            <span>식대 :</span>
                                           <input type="text" name="foodSalary" id="foodSalary" class="address money_input" placeholder="1,700,000" defaultValue="1000000"/>
                                        </li>
                                        <li class="li_left">
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
                                    <strong style={{display:"block", marginTop:"20px"}}>성과급, 상여급</strong>
                                    <ul>
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
                                    </ul>
                                </li>
                                <li class="ul_li_left" style={{height:"132px", borderBottom:"1px solid #dedede"}}>
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
                                                <option value="0" defaultChecked>부</option>
                                                <option value="1">여</option>
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
                                    <li style={{listStyle:"disc", fontSize:"17px"}}>
                                    4대보험<button type="button" class="btn_gray" style={{marginLeft: "5px", marginTop: "-5px", marginLeft:"7px"}}>신청하기</button>
                                        <div class="tab_01_grid">
                                            {/* <DataGrid rowData={rowData} gridDefs={insDefs} gridCommon={gridCommon}/> */}
                                            <table id="insurnaceTable">
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
                                                            <input type="text" class="date_input " id="getOfIns0"  defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns0" defaultValue=""/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>건강보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns1"  defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns1"  defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns1"  defaultValue=""/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>고용보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns2"   defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns2" defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns2" defaultValue=""/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>산재보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns3" defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="getOfIns3"  defaultValue=""/>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="date_input " id="lostOfIns3"  defaultValue=""/>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                    {/* <li style={{marginLeft: "25px"}}>
                                    </li> */}
                                    <li style={{listStyle:"disc", fontSize:"17px", marginLeft:"7px"}}>
                                        부양가족
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
                                <li style={{marginTog:"-22px"}}>학력
                                    <div class="tab_01_inner">
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>

                                        <div id="eduGrid" class="tab_01_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTog:"3px"}}>경력
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="carrerGrid" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTog:"3px"}}>병역
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" style={{marginTop:"-88px", marginLeft:"36px"}} onClick={(e)=>addRow(e)}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}} onClick={(e)=>removeRow(e)}>삭제</button>
                                        <div id="militaryGrid" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData4} gridDefs={militaryDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTog:"3px"}}>교육
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
        {/* 팝업 */}
        <div className="modal_box">
            {/* <div className=""> */}
            {/* html 추가 */}
            <div class="file_upload">

                <img src="/images/esc.png" alt="닫기" style={{position:"absolute", right:"-95px", top:"-38px", cursor:"pointer"}} onClick={()=>closePopup()} />

                <div class="file_upload_board">
                    {/* 파일등록 전 */}
                    <div class="file_upload_inner ">
                        {/* <img src="/images/user_info_file_upload.png" style={{width:"53px", height:"47px", marginTop:"23%"}} />
                        <p style={{color:"#a4a4a4", fontSize:"25px", fontWeight:"500"}}>[파일등록]</p>
                        <p style={{color:"#a4a4a4", fontSize:"18px", fontWeight:"400"}}>업로드 할 파일을 드래그 해주세요.</p> */}
                        {/* 파일등록 후 */}
                        <div class="file_upload_plus">
                            <ul>
                                <li>
                                    <a>
                                        {/* <input type="file" id="test" style={{display:"none"}}/> */}
                                        <span><img scr="/images/xhdwkdcnrk.png" /></span>
                                        <span class="push_file"></span>
                                        <span style={{position: "absolute", top:"160px", left:"10px"}}>파일명</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        {/* <input type="file" id="test" style={{display:"none"}}/> */}
                                        <span><img scr="/images/xhdwkdcnrk.png" /></span>
                                        <span class=""></span>
                                        <span style={{position: "absolute", top:"160px", left:"10px"}}>박이삭 통장사본.jpg</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <p className="btn_box">
                    <button className="btn_next" style={{marginRight:"105px"}} onClick={()=>openJoinForm2()}>삭제하기</button>
                    <button className="btn_next" style={{ background:"#87c395"}}onClick={()=>openJoinForm2()}>완료하기</button>
                </p>
            </div>
            {/* </div> */}
            {/* 뒷배경 */}
            <div className="modal_bg">
            </div>
        </div>
    </div>
    
    )
}

export default EamedIncomePresenter;