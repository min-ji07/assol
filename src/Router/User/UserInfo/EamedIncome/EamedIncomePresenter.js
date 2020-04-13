import React, { useEffect } from 'react';
import DataGrid from "../../../../Components/DataGrid";
import { callApi } from '../../../../Utils/api';
import $ from 'jquery';
import gridCommon from '../../../../Utils/grid';

const EamedIncomePresenter = ({rowData, euduDefs, carrerDefs, dependDefs, rowData2, rowData3}) => {



    let params = {};

    const fnSave = () => {

        
        let i=0;
        const inputListLeft = $("#userInfoLeft input:not([name=tab]), #userInfoLeft select, #userInfoLeft textarea");
        const inputListTab1 = $("#userInfoRight input:not([name=tab]), #userInfoRight select");
        const inputListTab2 = $("#insurnaceTable input");
        
        let tempParams = {};
        for(i; i<inputListLeft.length; i++){
            tempParams[inputListLeft[i].id] = inputListLeft[i].value; 
        }
        params["userInfo"] = tempParams;
        params.userInfo.userType = 0; // 일반소득자
        params.userInfo.branchNo = 30; // 임시 나중에 수정해야함

        i=0;
        tempParams = {};
        for(i; i<inputListTab1.length; i++){
            tempParams[inputListTab1[i].id] = inputListTab1[i].value; 
        }

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
        
        async function saveInit() {
            try {
                console.log(JSON.stringify(params));
                console.log(params);
                await callApi.saveUserInfo(params).then(res=> {
                    console.log(res);
                   console.log("완료");
                });

            }catch(e){
                console.log(e);
            }
        };
        saveInit();
    }
    




    /*
        addRow 
    */

    const addDependRow = () => {
        var gridApi = $("#dependGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        gridCommon.onAddRow();
    }
    const addEduRow = () => {
        var gridApi = $("#eduGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        gridCommon.onAddRow();
    }
    const addCarrerRow = () => {
        var gridApi = $("#carrerGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        gridCommon.onAddRow();
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
    const imgUpload = (e) => {
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#userImgView').attr('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
        $("#userImgText").hide();
    }

    // insDefs,
    return (
    <div class="div_bottom tab_01">
        <form>
            <div class="left_div">
                {/* 왼쪽기본 내용 */}
                <div id="userInfoLeft" class="test">
                    <div class="left_div_inner">
                    <div class="imgload"><img id="userImgView" src='/images/user02.png' alt="유저사진" style={{width:"140px",height:"140px",borderRadius:"50%"}}/></div>
                        {/* <span id="userImgText">사원 사진을 등록해주세요.</span><br /> */}
                        <div style={{marginTop:"10px"}}>
                            <label for="userImage" class="userImg">등록</label><input type="file" id="userImage" onChange={imgUpload}/>
                            <label for="imgDelete">삭제</label><button type="button" id="imgDelete" />
                        </div>
                        <ul>
                        <li>성명 :<input type="text" name="userName" id="userName" placeholder="성명을 입력해주세요." defaultValue="테스트"/></li>
                        {/* <li>아이디 :<input type="text" name="id" id="joinId" placeholder="아이디를 입력해주세요."/></li> */}
                        <li>직무 : <input type="text" name="position" id="position" placeholder="사회복지사" defaultValue="테스트"/></li>
                        <li>직위 : 
                            <select name="workLevel" id="workLevel">
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
                            <li>주민번호 :<input type="text" name="personalNumber" id="personalNumber" placeholder="123456-1234567" defaultValue="950527-00101001"/></li>
                            <li>  
                            국적 :
                                <select name="national" id="national">
                                    <option value="내국인" selected>내국인</option>
                                    <option value="외국인">외국인</option>                                                
                                </select>
                            </li>
                            <li> 
                            비자타입 :
                                <select name="visaType" id="visaType">
                                    <option value="내국인" selected>내국인</option>
                                    <option value="외국인">외국인</option>                                                
                                </select>
                            </li>
                            <li>입사일 :<input type="text" name="joinDate" id="joinDate" placeholder="입사일을 입력해주세요." defaultValue="2020-04-05"/></li>
                            <li>그룹입사일 :<input type="text" name="groupJoinDate" id="groupJoinDate" placeholder="입사일을 입력해주세요." defaultValue="2020-04-05"/></li>
                            <li>  
                            수습적용 :
                                <select name="isProbation" id="isProbation">
                                    <option value="0" selected>부</option>
                                    <option value="1">여</option>                                                
                                </select>
                            </li>
                            <li>수습만료일 :<input type="text" name="probation" id="probation" placeholder="2020-01-01"  defaultValue="2020-04-05"/></li>
                            <li>고용형태 : 
                                <select name="regularEmployee" id="regularEmployee">
                                    <option value="0">정규직</option>
                                    <option value="1" selected>계약직</option>
                                    <option value="2">임시직</option>
                                    <option value="3">파견직</option>
                                    <option value="4">위촉직</option>
                                    <option value="5">일용직</option>                                                
                                </select>
                            </li>
                            <li>계약기간 :<input type="text" name="contractPeriod" id="contractPeriod" placeholder="2020-01-01 ~ 2021-01-01" defaultValue="2020-01-01~2020-01-16"/></li>
                            {/* 숫자제한 , 3자리 4자리 4자리 -추가*/}
                            <li>전화번호 :<input type="tel" name="tellNo" id="tellNo" placeholder="02-000-0000" defaultValue="010-4412-8516"/></li>
                            {/* 숫자제한 , 3자리 4자리 4자리 -추가*/}
                            <li>휴대폰 :<input type="tel" name="mobile" id="mobile" placeholder="010-0000-0000" defaultValue="010-4412-8516"/></li>
                            <li>
                                우편번호 :<input type="text" name="postNo" id="postNo" class="address" placeholder="우편번호" defaultValue="서울시"/>
                                <button type="button" class="btn_gray postal_code" defaultValue="131-212">우편번호</button>
                            </li>
                            <li>
                                <input type="text" name="address" id="address" placeholder="주소"  defaultValue="중랑구 답십리로"/>
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
                    <label for="tab_001">상세설정</label>
                    <input type="radio" id="tab_002" name="tab02" />
                    <label for="tab_002">4대보험/부양가족</label>
                    <input type="radio" id="tab_003" name="tab02" />
                    <label for="tab_003">학력/교육</label>
                    
                    <input type="file" id="upload"/>
                    <label for="upload" class="upload">통장사본 및 신분증사본 업로드</label>
                {/* </div> */}

                <div class="div_bottom right"> 
                    {/* 오른쪽전체 div  */}
                    <div class="sal_inner">
                        {/* 급여상세 */}
                        <div id="userInfoRight" class="input_content tab_001">
                            <ul>
                                <li class="salary" style={{overflowY: "scroll"}}>
                                    <strong>급여 항목</strong><button type="button" class="btn_gray wi64he19" id="addSalary">추가</button>
                                    <ul>
                                        <li class="li_left">월급 :<input type="text" name="salaryOfMonth" id="salaryOfMonth" placeholder="1,700,000" defaultValue="1000000"/></li>
                                        <li class="li_right">연봉 :<input type="text" name="salaryOfYears" id="salaryOfYears" placeholder="2,100,500" defaultValue="1000000" 
                                        style={{fontSize: "25px", border:"none", width: "100px", height:"30px"}} readOnly/></li>
                                        <br/>
                                        <li class="li_left">기본급 :<input type="text" name="baseSalary" id="baseSalary" class="address" placeholder="1,700,000" defaultValue="1000000"/></li>
                                        <li class="li_left">식대 :<input type="text" name="foodSalary" id="foodSalary" class="address" placeholder="1,700,000" defaultValue="1000000"/></li>
                                        <li class="li_left">차량유지비 :<input type="text" name="carSalary" id="carSalary" class="address" placeholder="1,700,000" defaultValue="1000000"/></li>
                                        <li class="li_left">복리후생 :<input type="text" name="welfareSalary" id="welfareSalary" class="address" placeholder="1,700,000" defaultValue="1000000"/></li>
                                        <li class="li_left">직책수당 :<input type="text" name="positionSalary" id="positionSalary" class="address" placeholder="1,700,000" defaultValue="1000000"/></li>     
                                    </ul>
                                </li>
                                <li class="clear">
                                    <strong>성과급, 상여급</strong>
                                    <ul>
                                        <li class="in_block">
                                            성과금 :<input type="text" name="insentive" id="insentive" placeholder="1,700,000" defaultValue="1000000"/>
                                            <select id="insentiveType" style={{width: "74px", textAling: "center"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="3">년간</option>
                                            </select>
                                        </li>
                                        <li class="in_block" style={{marginLeft: "15px"}}>
                                            상여금 :<input type="text" name="bonus" id="bonus" placeholder="1,700,000" defaultValue="1000000"/>
                                            <select id="bonusType" style={{width: "74px"}}>
                                                <option value="0">월간</option>
                                                <option value="1">분기</option>
                                                <option value="2">반기</option>
                                                <option value="3">년간</option>
                                            </select>
                                        </li>
                                    </ul>
                                </li>
                                <li class="ul_li_left">
                                    <strong>관리사항</strong>
                                    <ul>
                                        <li>예금주 :<input type="text" id="accountHolder" name="accountHolder" placeholder="박이삭" defaultValue="김경주"/></li>
                                        <li>
                                            급여이체은행 :
                                            <select style={{ marginLeft: "10px", textIndent :"11px"}} id="bankName">
                                                <option value="우리은행">우리은행</option>
                                                <option value="국민은행">국민은행</option>
                                                <option>우리은행</option>
                                                <option>우리은행</option>
                                                <option>우리은행</option>
                                                <option>우리은행</option>
                                                <option>우리은행</option>
                                                <option>우리은행</option>
                                            </select>
                                        </li>
                                        <li>계좌번호 :<input type="text" id="accountNo" placeholder="1000-100-1000000" style={{width:"178px"}} defaultValue="110-222-2222"/></li>
                                        <br />
                                        <li>
                                            중소기업취업감면 여부 :
                                            <select id="jobReductActive" class="small_bs" style={{width: "43px", marginLeft: "10px"}}>
                                                <option value="0" defaultChecked>부</option>
                                                <option value="1">여</option>
                                            </select>
                                        </li>
                                        <li>기간 :<input type="text" id="reductDate" placeholder="2020.01-01~2025.01.01" style={{width: "213px"}}  defaultValue="2020-01-01~2020-05-05"/></li>
                                        <li>감면율 :<input type="text" id="reductPer" placeholder="90"  style={{width: "43px"}} defaultValue="80"/>%</li>
                                        <li>감면대상 :<input type="text" id="reductTarget" placeholder="급여" style={{width: "53px"}} defaultValue="50"/>%</li>
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
                                            <table>
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
                                                            <input type="text" id="fourIns0" defaultValue="국민1"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="getOfIns0"  defaultValue="국민2"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="lostOfIns0" defaultValue="국민3"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>건강보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns1"  defaultValue="건강1"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="getOfIns1"  defaultValue="건강2"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="lostOfIns1"  defaultValue="건강3"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>고용보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns2"   defaultValue="고용1"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="getOfIns2" defaultValue="고용2"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="lostOfIns2" defaultValue="고용3"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>산재보험</th>
                                                        <td>
                                                            <input type="text" id="fourIns3" defaultValue="산재1"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="getOfIns3"  defaultValue="산재2"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="lostOfIns3"  defaultValue="산재3"/>
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
                                        <button type="button" class="btn_gray" style={{marginLeft: "5px"}} onClick={addDependRow}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginLeft: "5px"}}>삭제</button>

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
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "36px"}} onClick={addEduRow}>추가</button>
                                        <button type="button" class="btn_gray" style={{position: "absolute;", marginTop: "-90px", marginLeft: "5px"}}>삭제</button>

                                        <div id="eduGrid" class="tab_01_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData2} gridDefs={euduDefs}/>
                                        </div>
                                    </div>
                                </li>
                                <li  style={{marginTog:"3px"}}>교육
                                    <div class="tab_02_inner">
                                        <button type="button" class="btn_gray" onClick={addCarrerRow} style={{marginTop:"-88px", marginLeft:"36px"}}>추가</button>
                                        <button type="button" class="btn_gray" style={{marginTop: "-88px",marginLeft: "5px"}}>삭제</button>
                                        <div id="carrerGrid" class="tab_02_grid grid_scrollX_none">
                                            <DataGrid rowData={rowData3} gridDefs={carrerDefs}/>
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
            <button type="button" class="btn_backnext save_position" onClick={fnSave}>저장하기</button>
        </form>
    </div>
    )
}

export default EamedIncomePresenter;