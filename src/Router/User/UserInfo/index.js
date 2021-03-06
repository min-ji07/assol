import React, { useState, useEffect } from 'react';
import '../../../Assets/css/pages/user/user_info.css';
import EamedIncomeContainer from './EamedIncome/EamedIncomeContainer';
import BusinessIncomeContainer from './BusinessIncome/BusinessIncomeContainer';
import DailyIncomeContainer from './DailyIncome/DailyIncomeContainer';
import DaumPostcode from 'react-daum-postcode';
import Utils from '../../../Utils/utils';
import { callApi } from '../../../Utils/api';
import $ from 'jquery';
import utils from '../../../Utils/utils';
import gridCommon from '../../../Utils/grid';
import { _ } from 'ag-grid-community';



const UserInfo = () => {
    let branchNo = 29;
    let imgInputLastIndex = 0;
    let pramsString = window.location.search.replace("?","");
    let checkUserModify = false;
    let paramData = {};
    let deleteImgList = {
        delData : [],
        upLoad : {
            "userNo": "",
            "branchNo": "",
            "employeeNumber": "",
            "imageIsNull": "Y"
        }
    };

    // {
    //     "delData": [
    //         {
    //             "rowId": 0,
    //             "imagePath": null
    //         }
    //     ],
    //     "upLoad": {
    //         "imageType": 0,
    //         "userNo": 0,
    //         "branchNo": 0,
    //         "employeeNumber": null,
    //         "imageIsNull": null
    //     }
    // }

    let params = {};
    let frm = new FormData();
    let checkUserImage = true;
    let delDataList = {
        "sfDelRowId": [],
        "eduDelRowId": [],
        "exDelRowId": [],
        "miDelRowId": [],
        "cuDelRowId": []
    }

    if(pramsString.length != 0){
        let paramArr = pramsString.split("&");
        let paramArrLen = paramArr.length;
        let tempArr = [];
        let i = 0;

        for(i; i<paramArrLen; i++){
            tempArr = paramArr[i].split("=");
            paramData[tempArr[0]] = tempArr[1];
        };
        
        checkUserModify = true;
        // let paramsData = {
        //     "branchNo": ,
        //     "employeeNumber": ,
        //     "userType":
        // };
        $(".user_input > .title").hide();
        $("#userInfoTitle").show();
    } else {
        $("#userInfoTitle").hide();
    }

    const userInfoEvent = (data,othercontent,imgData) => {
        let userType = data.userType;
        let tab;
        if(userType == "0"){
            tab = "tab_01";
        } else if(userType == "1"){
            tab = "tab_02";
        } else if(userType == "2"){
            tab = "tab_03";
        }


        if(userType == "2"){
            $("#userNo").val(data.dailyUserNo);
        } else {
            $("#userNo").val(data.userNo);
        }
        $("#employeeNumber").val(data.employeeNumber);
        deleteImgList.upLoad["branchNo"] = data.branchNo;
        deleteImgList.upLoad["userNo"] = data.userNo;
        deleteImgList.upLoad["employeeNumber"] = data.employeeNumber;
        
        $("#"+tab).click();
        $(".user_type_label[for="+tab+"]").css("width","150px");
        $("input[name=tab1]:not(#"+tab+")").remove();
        $(".user_type_label:not([for="+tab+"])").remove();
        $(".div_bottom:not(.right):not(."+tab+")").remove();
        

        // $(".user_type_label:not([for="+tab+"])").remove();

        $(".leave_li").show();
        for(var key in data){
            let elem = $("#"+key);
            let val = data[key] == null ? "" : data[key];
            // let checkClass = elem.attr("class");

            // if(checkClass.indexOf("money_input") != -1){
            //     val = utils.regExr.comma(val);
            // }
            if(elem.length != 0){
                if(elem[0].className.indexOf("money_input") != -1){
                    val = utils.regExr.comma(val);
                }
                elem.val(val);
            }
            // 수습기간 on
            if(key == "isProbation" && val == "0"){
                elem.next().show();
            }
            // 비자타입 on
            if(key == "national" && val == "외국인"){
                $(".visa_li").show();
            }
            // 퇴사여부
            if(key == "isActive" && val == "0"){
                elem.next().hide();
                elem.parent().next().hide();
            }
            // 수습기간
            if(key == "jobReductActive" && val == "0"){
                $(".job_reduct_li").css("display","inline-block");
            }

            if(key == "businessNo"){
                const businessArr = val.split("-");
                $("#businessNo1").val(businessArr[0]);
                $("#businessNo2").val(businessArr[1]);
                $("#businessNo3").val(businessArr[2]);
            }

            // $(".visa_li").show();
            // $("#isProbation").next().show();
            
            console.log(key,"",data[key]);
            // 에러체크하자
            // 해당 아이디 element 있는지 체크
            // null체크
        }

        // 이미지 체크
        let i = 0;
        for(i in imgData){
            // "D:\AdminSite\Save\c249bf54-c7e1-4bea-bd5c-eb7ab87aa13f_2004221.jpg"
            let path = imgData[i].fileName;
            let type = imgData[i].imageType;
            let url = "http://211.251.238.215:5302/Save/";
            let rowId = imgData[i].rowId;
            
            // 유저사진
            if(type == "1"){
                $(".userImgView").prop("src",url+path);
                $("#userImgModify").attr("data-row-id", rowId == undefined ? "" : rowId);
                $("#userImgModify").attr("data-image-path",path);
                $(".userImgText").addClass("txt_hide");
                deleteImgList.upLoad.imageIsNull = "";
            } else { // 인사서류
                addFileList("파일"+i,url+path,true,rowId,path);
            }
        }

        $("input").trigger("keyup");
        $("input").trigger("change");
        if(!othercontent){
            addSalaryList(othercontent);
        }
    }

    const addSalaryList = (othercontent) => {
        for(var index in othercontent){
            console.log(othercontent[index]);
            var title = othercontent[index].title;
            var value = othercontent[index].value;
            var checkLen = $("input[name=addSalaryTitle]").length;
            $("#addSalary").click();
            var addTitleList = $("input[name=addSalaryTitle]");
            var addPayList = $("input[name=addSalaryPay]");
            addTitleList[checkLen].value = title;
            addPayList[checkLen].value = value;
        }
    }

    async function initUserInfo(paramData) {
        try {
            await callApi.getUserInformation(paramData).then(res=>{
                console.log(res);
                if(res.data.ErrorCode == 1){
                    alert(res.data.Msg);
                } else {
                    let data = res.data;
                    userInfoEvent(data.baseData,data.othercontent,data.imageData);
                    setRowData(data.sfData);
                    setRowData2(data.eduData);
                    setRowData3(data.exData);
                    setRowData4(data.miData);
                    setRowData5(data.cuData);
                }   
            })
        }catch(error){
            console.log("CATCH !! : " + error);
        } 
    };

    //기본컬럼 정의
    const defaultColDef ={
        width: 100
        ,editable : true
        ,cellStyle: {textAlign: 'center'}
        ,resizable : true
    } 

    const [rowData, setRowData] = useState([]);
    const [rowData2, setRowData2] = useState([]);
    const [rowData3, setRowData3] = useState([]);
    const [rowData4, setRowData4] = useState([]);
    const [rowData5, setRowData5] = useState([]);

    //그리드 정의
    const [euduDefs, setEduDefs] = useState({});
    const [carrerDefs, setCarrerDefs] = useState({});
    const [dependDefs, setDependDefs] = useState({});
    const [militaryDefs, setMilitaryDefs] = useState({});
    const [curriculumDefs, setCurriculumDefs] = useState({});
    
    

    

    //부양가족
    const regtaxAdjustmentMappings = {
        "0" : "소득자본인"
        ,"1" : "소득자의 직계존속"
        ,"2" : "배우자의 직계존속"
        ,"3" : "배우자"
        ,"4" : "직계비속(자녀, 입양자)"
        ,"5" : "직계비속(코드 4 제외)"
        ,"6" : "형제자매"
        ,"7" : "수급자(코드1~6제외)"
        ,"8" : "위탁아동"
    }
    const regHouseholdMappings = {
        "0" : "부"
        ,"1" : "여" 
    }
    const regWomanMappings = {
        "0" : "부"
        ,"1" : "여" 
    }
    const regObstacleMappings = {
        "0" : "부"
        ,"1" : "여"
    }
    const regSilverMappings = {
        "0" : "부"
        ,"1" : "여"
    }
    const regSingleParentMappings = {
        "0" : "부"
        ,"1" : "여"
    }
    const regConsignerMappings = {
        "0" : "소득자본인"
        ,"1" : "소득자의 직계존속"
        ,"2" : "배우자의 직계존속"
        ,"3" : "배우자"
        ,"4" : "직계비속(자녀, 입양자)"
        ,"5" : "직계비속(코드 4 제외)"
        ,"6" : "형제자매"
        ,"7" : "수급자(코드1~6제외)"
        ,"8" : "위탁아동"
    }
    const eGradeMappings = {
        "0" : "초등학교"
        ,"1" : "중학교"
        ,"2" : "고등학교"
        ,"3" : "대학교"
    }

    const mContentMappings = {
        "0" : "만기제대",
        "1" : "의가사제대",
        "2" : "의병제대",
        "3" : "소집해제",
        "4" : "불명예제대",
        "5" : "상이제대",
        "6" : "면제",
        "7" : "기타"
    }

    const mTypeMappings = {
        "0" : "육군",
        "1" : "해군",
        "2" : "공군",
        "3" : "해병",
        "4" : "의경",
        "5" : "전경",
        "6" : "공익",
        "7" : "기타"
    }



    // 교육
    const gridCurriculumSeitting = () =>{
        const columnDefs= [  
            { headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: '교육과정', field: "curriculum",  width:230}
            ,{ headerName: "시간", field: "classTime", width:120,}
            ,{ headerName: '강사', field: "teacher",  width:120}
            ,{ headerName: '교육상태', field: "isStatus",  width:120 }
            ,{ headerName: '교육기간', field: "curriculumDate",  width:278,
                valueGetter: function(params){
                    var num = utils.regExr.numOnly(params.data.curriculumDate);
                    var checkVal = utils.regExr.date(num.substring(0,8));
                    var checkVal2 = utils.regExr.date(num.substring(8,16));

                    if(!dateValidation(checkVal) || !dateValidation(checkVal2) || checkVal > checkVal2){
                        return "";
                    }
                    return utils.regExr.dateToDate(params.data.curriculumDate);
                }
            }
        ]

        //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }

    // 병역
    const gridMilitarySeitting = () =>{
        const columnDefs= [  
            { headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: '병역구분', field: "militaryContent",  width:150,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(mContentMappings)},
                refData: mContentMappings
            }
            ,{ headerName: "군별", field: "militaryType", width:100,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(mTypeMappings)},
                refData: mTypeMappings
            }
            ,{ headerName: '복무기간', field: "militaryDate",  width:200,
                valueGetter: function(params){
                    var num = utils.regExr.numOnly(params.data.militaryDate);
                    var checkVal = utils.regExr.date(num.substring(0,8));
                    var checkVal2 = utils.regExr.date(num.substring(8,16));

                    if(!dateValidation(checkVal) || !dateValidation(checkVal2) || checkVal > checkVal2){
                        return "";
                    }
                    return utils.regExr.dateToDate(num);
                }
            }
            ,{ headerName: '최종계급', field: "finalLevel",  width:100 }
            ,{ headerName: '병과', field: "miltaryClass",  width:100}
            ,{ headerName: '미필사유', field: "unmiltaryReason",  width:218}
        ]

        //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }

    // 부양가족
    const gridDependSeitting = () =>{
        const columnDefs= [  
            { headerName: "userId", field: "id", hide :true}
            ,{ headerName: "processType", field: "processType", hide:true}
            ,{ headerName: "branchNo", field: "branchNo", hide:true }
            ,{ headerName: '성명', field: "sfName",  width:90
                ,valueGetter: function(params){
                    return utils.regExr.koreanOnly(params.data.sfName);
                }
            }
            ,{ headerName: '주민(외국인)번호', field: "sfPersnoalNumber", editable:true, width:160}
            ,{ headerName: "연말정산관계", field: "sfRelation", width:120,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regtaxAdjustmentMappings)},refData: regtaxAdjustmentMappings}
            ,{ headerName: '세대주', field: "sfHouseHolder" , width:120
                ,valueGetter: function(params){
                    return utils.regExr.koreanOnly(params.data.sfHouseHolder);
                }
            }
            ,{ headerName: "부녀자", field: "sfWomenDeduction", width:70,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regWomanMappings)},refData: regWomanMappings}
            ,{ headerName: "장애", field: "sfdisable", width:60,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regObstacleMappings)},refData: regObstacleMappings}
            ,{ headerName: '경로70세', field: "sfSeventy", width:120,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regSilverMappings)},refData: regSilverMappings}
            ,{ headerName: '한부모', field: "sfParentDeduction", width:80,
                cellEditor : "select", 
                cellEditorParams: { values : gridCommon.extractValues(regSingleParentMappings)},refData: regSingleParentMappings}
            ,{ headerName: '위탁자관계', field: "sfTrustRelation", width:140,
                cellEditor : "select",
                cellEditorParams: { values : gridCommon.extractValues(regConsignerMappings)},refData: regConsignerMappings}
        ]
        //컴포넌트 세팅 
        const components = {  };
        return {columnDefs, defaultColDef, components};
    }

    // 학력
    const gridEducationSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
                { headerName: "userId", field: "id", hide :true}
                ,{ headerName: "processType", field: "processType", hide:true}
                ,{ headerName: "branchNo", field: "branchNo", hide:true }
               ,{ headerName: "구분", field: "eGrade", width: 120,
                    cellEditor : "select", 
                    cellEditorParams: { values : gridCommon.extractValues(eGradeMappings)},refData: eGradeMappings
                }
               ,{headerName: "입학년월",field:"eEnterDate", width:150
                    ,valueGetter: function(params){
                        var checkVal = utils.regExr.date(params.data.eEnterDate);
                        if(!dateValidation(checkVal)){
                            return "";
                        }
                        return checkVal;
                    }
                }
               ,{headerName: "졸업년월", field: "eGraduaterDate", width:150
                    ,valueGetter: function(params){
                        var checkVal = utils.regExr.date(params.data.eGraduaterDate);
                        if(!dateValidation(checkVal)){
                            return "";
                        }
                        return checkVal;
                    }
                }
                ,{headerName: "학교명", field: "eSchoolName", width:100}
               ,{ headerName: "전공", field: "major", width:150}
               ,{ headerName: "이수", field: "complete", width:198}
           ]
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
    }


    // 경력
    const gridAllCarrerSetting =()=>{
        //컬럼 정의
           const columnDefs= [
                { headerName: "processType", field: "processType", hide:true}
                ,{ headerName: "branchNo", field: "branchNo", hide:true }
                ,{ headerName: "회사명", field: "exCompanyName", width: 130}
                ,{headerName: "입사일자",field:"exEnterDate", width:130,
                    valueGetter: function(params){
                        var checkVal = utils.regExr.date(params.data.exEnterDate);
                        if(!dateValidation(checkVal)){
                            return "";
                        }
                        return checkVal;
                    }
                }
                ,{headerName: "퇴사일자", field: "exLeaveDate", width:130
                    ,valueGetter: function(params){
                        var checkVal = utils.regExr.date(params.data.exLeaveDate);
                        if(!dateValidation(checkVal)){
                            return "";
                        }
                        return checkVal;
                    }
                }
                ,{headerName: "근무기간", field: "exWorkPeriod", width:100,
                    editable:false,
                    valueGetter: function(params){
                        var enterDate = utils.regExr.date(params.data.exEnterDate);
                        var leaveDate = utils.regExr.date(params.data.exLeaveDate);
                        console.log(leaveDate);
                        var date1 = new Date(enterDate);
                        var date2 = new Date(leaveDate);
                        var interval = date2 - date1;
                        var day = 1000*60*60*24;
                        var month = day*30;
                        var checkVal = parseInt(interval/month);
                        if(isNaN(checkVal)){
                            return 0;
                        } else if(checkVal < 0){
                            return 0;
                        }
                        if(checkVal>=12){
                            let year = Math.floor(checkVal/12);
                            let month = checkVal - 12 * year;
                            checkVal = year + "년 " + month + "개월";
                        } else {
                            checkVal = checkVal + "개월";
                        }
                        return checkVal;
                    }
                }
                ,{ headerName: "최종직위", field: "exLastWorkLevel", width:100}
                ,{ headerName: "담당직무", field: "exPosition", width:130}
                ,{ headerName: "퇴직사유", field: "exLeaveReason", width:148}
           ]
           //컴포넌트 세팅 
           const components = {  };
           return {columnDefs, defaultColDef, components};
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
    
    const closePostPop = (e) => {
        $("#daumPostPop").hide();
    }

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
                $(".div_bottom.tab_01").find("#postNo").val(postNo).attr("readonly",true);
                $(".div_bottom.tab_01").find("#address").val(address).attr("readonly",true);
                break;
            case "tab_02" :
                $(".div_bottom.tab_02").find("#postNo").val(postNo).attr("readonly",true);
                $(".div_bottom.tab_02").find("#address").val(address).attr("readonly",true);
                break;
            case "tab_03" :
                $(".div_bottom.tab_03").find("#postNo").val(postNo).attr("readonly",true);
                $(".div_bottom.tab_03").find("#address").val(address).attr("readonly",true);
                break;
        }
        $("#daumPostPop").hide();
    }

    useEffect(()=>{

        setDependDefs(gridDependSeitting());
        setEduDefs(gridEducationSetting());
        setCarrerDefs(gridAllCarrerSetting());
        setMilitaryDefs(gridMilitarySeitting());
        setCurriculumDefs(gridCurriculumSeitting());

        async function init() {
            try {
               if(checkUserModify){
                    initUserInfo(paramData);
               }
            }catch(e){
                alert(e);
            }
        };
        init();
        fileDropDown();
        bindEvent();
        setInputAutocompleteOff();
    },[]); //init

    const setInputAutocompleteOff = () => {
        $("input").attr("autocomplete","off");
    }

    const bindEvent = () => {
        // 급여항목 추가
        $("#addSalary").on("click",(e)=>{
            addSalary(e);
        });

        // 유저 사진 변경
        $("input[name=userImageInput]").on("change",(e)=>{
            userImgChange(e);
        });

        // 우편 팝업 oepn
        $("button[name=btnPost]").on("click",(e)=>{
            openPostPop();
        });

        // 인사서류 업로드
        $("button[name=btnInsaUpload]").on("click",(e)=>{
           $(".modal_box.imgupload").show(); 
        });

        // 로우추가
        $("button[name=btnAddRow]").on("click",(e)=>{
            addRow(e);
        });

        // 로우제거
        $("button[name=btnRemoveRow]").on("click",(e)=>{
            removeRow(e);
        });

        // 저장버튼
        $("button[name=btnSave]").on("click",function(e){
            var checkTab = $("[name=tab1]:checked")[0].id;

            switch(checkTab){
                case "tab_01":
                    fnSave();
                    break;
                case "tab_02":
                    fnSave2();
                    break;
                case "tab_03":
                    fnSave3();
                    break;
            }
        });

        $(document).on("keyup","input.money_input",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.comma(targetVal);
        });
        $("input[type=email]").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.email(targetVal);
        });
        $("input.phone_input").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.phone(targetVal);
        });
        $("input.tell_input").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.tell(targetVal);
        });
        $("input.dateto_input").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.dateToDate(targetVal);
        });
        $("input.date_input").on("keyup",function(e){
            let selectionPosition = e.target.selectionStart;
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.date(targetVal);

            // if(targetVal.length < e.target.value.length){
            //     selectionPosition += 1;
            // }
            // e.target.selectionStart = selectionPosition;
            // e.target.selectionEnd = selectionPosition;
        });
        $("input.personal_input").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.personalNum(targetVal); 
        }).on("change",function(e){
            var checkVisa = e.target.value.substring(7,8);
            if(checkVisa == "5" || checkVisa == "6"){
                e.target.parentElement.nextSibling.style.display = "inline-block";
                e.target.nextSibling.value = "외국인";
            } else {
                e.target.parentElement.nextSibling.style.display = "none";
                e.target.nextSibling.value = "내국인";
                $("input[name=visaType]").val("");
            }
        });
        $("input.num_input").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.numOnly(targetVal);
        });

        $(".join_date").on("focusout",function(e){
            e.target.parentElement.nextSibling.children[0].value = e.target.value;
        });

        $(".tab_03 #workTime, .tab_03 #payOfHour").on("change",function(e){
            var salaryMonth = utils.regExr.numOnly($(".tab_03 #workTime").val());
            var hour = utils.regExr.numOnly($(".tab_03 #payOfHour").val());

            $("#predictionMonth").val(utils.regExr.comma(Number(salaryMonth)*Number(hour)));
        });

        $("select[name=isProbation]").on("change",function(e){
            if(e.target.value == "1"){
                $(e.target.nextSibling).hide();
            } else {
                $(e.target.nextSibling).show();
            }
            e.target.nextSibling.children[0].value = "";
        });

        $("select[name=isActive]").on("change",function(e){
            let dateInput = e.target.nextSibling;
            let resonBox = e.target.parentElement.nextSibling;
            let checkVal = e.target.value;
            console.log(dateInput);
            if(checkVal == "1"){
                $(dateInput).show();
                $(resonBox).show();
            } else {
                $(dateInput).hide();
                $(resonBox).hide();
            }
        });

        // 연봉변경 이벤트
        $("#salaryOfMonth").on("click",function(){
            yearSalaryEvent();
        });
        $("#insentiveType, #bonusType, #insentive, #bonus").on("change",function(e){
            yearSalaryEvent();
        });

        // 월급변경 이벤트
        $("#baseSalary, #foodSalary, #carSalary, #welfareSalary, #positionSalary")
        .on("change",function(){
            monthSalaryEvent();
        });
        $(document).on("change","input[name=addSalaryPay]",function(){
            monthSalaryEvent();
        })
        
        $(".userImgView").on("click",function(e){
            console.log(e);
            e.target.nextSibling.nextSibling.children[0].click();
        });

        $("#addFile").on("click",(e)=>{
            imgInputLastIndex = $("input[name=imgFileInput]").length - 1;
            $("input[name=imgFileInput]")[imgInputLastIndex].click();
            return false;
        });

        $(document).on("click","#fileBox li a",function(e){
            if(this.className == "check_file"){
                $(this).removeClass("check_file");
            } else {
                $(this).addClass("check_file");
            }
            return false;
        });

        $(document).on("change","input[name=imgFileInput]",(e)=>{
            const fileInput = e.target;
            console.log(e);
            if(e.target.files.length != 0){
                var type = e.target.files[0].type;
                if(type.indexOf("image") == -1){
                    alert("이미지 파일만 업로드 가능합니다.");
                    e.target.value = "";
                    return;
                }
            }
            $(".modal_box.imgupload").append($("<span>"));
            if (fileInput.files && fileInput.files[0]) {
                var reader = new FileReader();
                var fileName = e.target.files[0].name;
                reader.onload = function(e) {
                    var filePath = e.target.result;
                    addFileList(fileName,filePath);
                }
                reader.readAsDataURL(fileInput.files[0]);
                // const formData = new FormData();    
                // formData.append('body', fileInput.files[0]);
                // console.log(fileInput.files[0]);
                // console.log(formData);
                
                // saveInit(formData);
                
            }
        });
        $("input[name=userName]").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.koreanOnly(targetVal);
        });
        $("#accountHolder").on("keyup",function(e){
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.koreanOnly(targetVal);
        });

        $("#jobReductActive").on("change",function(e){
            var targetVal = e.target.value;
            if(targetVal == "0"){
                $(".job_reduct_li").css("display","inline-block");
            } else {
                $(".job_reduct_li").hide();
            }
        });

        // 유저 이미지 삭제
        $("button[name=imgDelete]").on("click",function(e){
            let img = $(e.target).parent().siblings(".userImgView");
            let text = $(e.target).parent().siblings(".userImgText");
            let rowId = $("#userImgModify").attr("data-row-id");
            let imagePath = $("#userImgModify").attr("data-image-path");
            rowId = rowId == undefined ? "" : rowId;
            imagePath = imagePath == undefined ? "" : imagePath;

            img.attr("src","/images/user02.png");
            text.removeClass("txt_hide");
            $(e.target).siblings(".userImage").val("");

            console.log(rowId);
            if(rowId.length != 0 ){
                const paramas = {
                    rowId : rowId,
                    imagePath : imagePath
                }
                deleteImgList.delData.push(paramas);
                deleteImgList.upLoad.imageIsNull = "Y";
                $("#userImgModify").attr("data-row-id","");
            }
        });
    }

    const monthSalaryEvent = () =>{
        var inputList = $("#monthSalary input");
        var i = 0;
        var monthSalary = 0;

        for(i; i<inputList.length; i++){
            if(inputList[i].id == "salaryOfMonth" 
            || inputList[i].id == "addSalaryTitle"){
                continue;
            }
            monthSalary += Number(utils.regExr.numOnly(inputList[i].value));
        }
        $("#salaryOfMonth").val(utils.regExr.comma(monthSalary)).click();
    }

    const yearSalaryEvent = () => {
        var monthSalary = Number(utils.regExr.numOnly($("#salaryOfMonth").val())) * 12;
        var inputList = $("#insentive, #bonus");
        var yearsSalary = 0;
        var i=0;
        for(i; i<inputList.length; i++){
            var type = inputList[i].nextSibling.value;
            var baseVal = Number(utils.regExr.numOnly(inputList[i].value));
            var typeVal = 0;
            switch(type){
                case "0" : typeVal = 12;
                break;
                case "1" : typeVal = 4;
                break;
                case "2" : typeVal = 2;
                break;
                case "3" : typeVal = 1;
                break;
            }
            yearsSalary += baseVal * typeVal;
        }
        yearsSalary += monthSalary;
        $("#salaryOfYears").val(utils.regExr.comma(yearsSalary));
    }

    /***************************************
     * 파일 드래그앤 드롭
     ***************************************/
     
    // 파일 리스트 번호
    var fileIndex = 0;
    // 등록할 전체 파일 사이즈
    var totalFileSize = 0;
    // 파일 리스트
    var fileList = new Array();
    // 파일 사이즈 리스트
    var fileSizeList = new Array();
    // 등록 가능한 파일 사이즈 MB
    var uploadSize = 50;
    // 등록 가능한 총 파일 사이즈 MB
    var maxUploadSize = 500;
 
    // 파일 드롭 다운
    function fileDropDown(){
        var dropZone = $(".file_upload_board");
        //Drag기능 
        dropZone.on('dragenter',function(e){
            e.stopPropagation();
            e.preventDefault();
            // 드롭다운 영역 css
            dropZone.css('background-color','#E3F2FC');
        });
        dropZone.on('dragleave',function(e){
            e.stopPropagation();
            e.preventDefault();
            // 드롭다운 영역 css
            dropZone.css('background-color','#FFFFFF');
        });
        dropZone.on('dragover',function(e){
            e.stopPropagation();
            e.preventDefault();
            // 드롭다운 영역 css
            dropZone.css('background-color','#E3F2FC');
        });
        dropZone.on('drop',function(e){
            var files = e.originalEvent.dataTransfer.files;
            e.preventDefault();
            // 드롭다운 영역 css
            dropZone.css('background-color','#FFFFFF');

            if(files != null){
                if(files.length < 1){
                    alert("폴더 업로드 불가");
                    return;
                }
                selectFile(files);
            }else{
                alert("ERROR");
            }
        });
    }
 
    // 파일 선택시
    function selectFile(files){
        // 다중파일 등록
        if(files != null){
            for(var i = 0; i < files.length; i++){
                // 파일 이름
                var fileName = files[i].name;
                var fileNameArr = fileName.split("\.");
                // 확장자
                var ext = fileNameArr[fileNameArr.length - 1];
                // 파일 사이즈(단위 :MB)
                var fileSize = files[i].size / 1024 / 1024;
                
                if($.inArray(ext, ['jsp', 'png', 'gif', 'jpeg']) < 0){
                    // 확장자 체크
                    alert("등록 불가 확장자");
                    break;
                }else if(fileSize > uploadSize){
                    // 파일 사이즈 체크
                    alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " MB");
                    break;
                }else{
                    // 전체 파일 사이즈
                    totalFileSize += fileSize;
                    
                    // 파일 배열에 넣기
                    fileList[fileIndex] = files[i];
                    
                    // 파일 사이즈 배열에 넣기
                    fileSizeList[fileIndex] = fileSize;
 
                    // 업로드 파일 목록 생성
                    addFileList(fileName, fileSize);

                    // 파일 번호 증가
                    fileIndex++;
                }
            }
        }else{
            alert("ERROR");
        }
    }
 
    // 업로드 파일 목록 생성
    function addFileList(fileName, filePath, check, rowId, imagePath){
        var li = $("<li>");
        var a = $("<a style='cursor:pointer'>");
        var img_box = $("<span class='img_box'>");
        var img = $("<img src='"+filePath+"'>");
        var title_box = $("<span class='title_box'>");
        var check_box = $("<span class='check_box'>");
        var file_input = $("<input type='file' name='imgFileInput' accept='image/*'/>")
        
        if(check){
            a.addClass("check_file");
            a.attr("data-row-id",rowId);
            a.attr("data-image-path",imagePath);
        }
        $(".img_file_box").append(file_input);
        img_box.append(img);
        title_box.text(fileName);
        a.append(img_box).append(title_box).append(check_box);
        
        li.append(a);
        $('#fileBox').append(li);
        $("#fileBox").append($("#fileBox .img_add_li"));
    }
    const removeFileList = () => {
        let checkList = $("#fileBox li a");
        let checkInputList = $("input[name=imgFileInput]");
        let i = 0;
        let tempArr = [];
        for(i; i<checkList.length; i++){
            if(checkList[i].className == "check_file"){
                checkList[i].parentElement.remove();
                checkInputList[i].remove();
                if(checkList[i].dataset.rowId != undefined){
                    // deleteImgList
                }
                // tempArr.push(imgFileList[i]);
            }
        }
    }

    const hideFileList = () => {
        $(".modal_box.imgupload").hide();
    }

    /****************************************************
     * 합치자!!!!
     * 전체 공통부분
     ****************************************************/
    const addRow = (e) => {
        var gridApi = $(e.target).siblings("div").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        gridCommon.onAddRow();
    }

    const removeRow = (e) => {
        var gridBox = $(e.target).siblings("div");
        var gridApi = gridBox.find(".ag-root")[0]["__agComponent"].gridApi;
        
        let selectRow = gridApi.getSelectedRows();
        selectRow.forEach((data)=>{
            if(data.rowId != undefined){
                switch(gridBox.attr("id").replace(/[0-9]/g,"")){
                    case "dependGrid":
                        delDataList["sfDelRowId"].push(data.rowId);
                    break;
                    case "eduGrid":
                        delDataList["eduDelRowId"].push(data.rowId);
                    break;
                    case "carrerGrid":
                        delDataList["exDelRowId"].push(data.rowId);
                    break;
                    case "militaryGrid":
                        delDataList["miDelRowId"].push(data.rowId);
                    break;
                    case "curriculumGrid":
                        delDataList["cuDelRowId"].push(data.rowId);
                    break;
                }
            }
        });
        gridCommon.setGridApi(gridApi);
        gridCommon.onRemoveRow();
    }

    const getDependRow = () => {
        var checkTab = "."+document.querySelector("[name=tab1]:checked").id;
        var gridApi = $(checkTab+" .dependGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getEduRow = () => {
        var checkTab = "."+document.querySelector("[name=tab1]:checked").id;
        var gridApi = $(checkTab+" .eduGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCarrerRow = () => {
        var checkTab = "."+document.querySelector("[name=tab1]:checked").id;
        var gridApi = $(checkTab+" .carrerGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getMilitaryRow = () => {
        var checkTab = "."+document.querySelector("[name=tab1]:checked").id;
        var gridApi = $(checkTab+" .militaryGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }
    const getCurriculumRow = () => {
        var checkTab = "."+document.querySelector("[name=tab1]:checked").id;
        var gridApi = $(checkTab+" .curriculumGrid").find(".ag-root")[0]["__agComponent"].gridApi;
        gridCommon.setGridApi(gridApi);
        return gridCommon.getRowData();
    }

    const openPostPop = (e) => {
        // $("name=btnPost")
        $("#daumPostPop").show();
    }

    const userImgChange = (e) => {
        let checkTab = "."+document.querySelector("[name=tab1]:checked").id;
        // $("name=userImageInput") 
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                $(checkTab+' .userImgView').attr('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
            $(checkTab+" .userImgText").addClass("txt_hide");
            deleteImgList.upLoad.imageIsNull = "";
        }
    }

    // 인사서류 파일 리스트 리턴
    const selectFileList = () => {
        let checkList = $("#fileBox li a");
        let inputList = $("input[name=imgFileInput]");
        let i = 0;
        let tempArr = [];
        for(i; i<checkList.length; i++){
            if(checkList[i].className == "check_file" && checkList[i].dataset.imagePath.length == 0){
                tempArr.push(inputList[i].files[0]);
            }
        }
        return tempArr;
    }

    const fnValidation = () => {
        let checkTab = "."+document.querySelector("[name=tab1]:checked").id;
        let tabDiv = ".div_bottom"+checkTab;
        const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        
        
        let personalNumber = $(tabDiv).find("#personalNumber").val();
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
                if(dateInput[i].id == "getOfIns0" || dateInput[i].id == "lostOfIns0"
                    || dateInput[i].id == "getOfIns1" || dateInput[i].id == "lostOfIns3"
                    || dateInput[i].id == "getOfIns2" || dateInput[i].id == "lostOfIns2"
                    || dateInput[i].id == "getOfIns3" || dateInput[i].id == "lostOfIns1"
                ){
                    $(tabDiv).find("label[for='tab_002']").click();
                } else {
                    $(tabDiv).find("label[for='tab_001']").click();
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
                if(date1.length != 0 && date2.length != 0){
                    alert("날짜가 올바르지 않습니다.");
                    dateToInput[i].select();
                    dateToInput[i].focus();
                    return false;
                }
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


    const dateValidation = (date) =>{
        var date = utils.regExr.numOnly(date);
        var month = date.substring(4,6);
        var day = date.substring(6,8);
        
        if(month>12 || month<1){
            return false;
        }

        if(day>31 || day<1){
            return false;
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


    const saveImgFile = (userNo,employeeNumber) => {
        const checkTab = $("[name=tab1]:checked")[0].id;
        const checkModify = $("#userImgModify").attr("data-row-id");
        const checkFile = $("."+checkTab+" input[name=userImageInput]")[0].files[0];
        frm = new FormData();
        frm.append("userNo",userNo);
        frm.append("employeeNumber",employeeNumber);
        checkUserImage = $("."+checkTab+" input[name=userImageInput]")[0].value == "" ? true : false;
        if(checkUserImage && deleteImgList.upLoad.imageIsNull == "Y"){
            frm.append("imageIsNull","Y");
        } else if(checkModify.length == 0){
            if(checkFile != undefined){
                frm.append("userImage",checkFile);
            }
        }
        var imgFileArr = selectFileList();
        var i = 0;
        for(i; i<imgFileArr.length; i++){
            console.log(imgFileArr[i]);
            frm.append("insa"+i,imgFileArr[i]);
            // 요기
        }
        async function saveImg(){
            try {
                await callApi.uploadFileToServer(frm).then(res=> {
                    console.log(res,"이미지 저장");
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
        if(imgFileArr.length > 0 && checkFile != undefined){
            saveImg();
        }

        async function deleteImg(deleteImgList){
            try {
                await callApi.UpdateFileToServer(deleteImgList).then(res=> {
                    console.log(res,"이미지 삭제");
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
        if(deleteImgList.delData.length != 0){
            deleteImg(deleteImgList);
        }
    }


    /***********************************
     * 그외 
     */
    const addSalary = (e) => {
        // $("#addSalary").on("click",function(){});
        const salaryUl = $("#userInfoRight li.salary > ul:nth-child(2)");
        const li = $("<li class='li_left add_li'>");
        const btn = $('<button type="button" tabindex="-1" style="color:#7d7d7d; background-color:transparent;">X</button>').on("click",function(e){
            $(e.target).parent().remove();  // 삭제이벤트
        });
        li.append('<input type="text" id="addSalaryTitle" name="addSalaryTitle" className="address" placeholder="추가수당"/>');
        li.append(' : <input class="money_input" type="text" name="addSalaryPay" id="addSalaryPay" className="address" placeholder="1,700,000" style="margin-right:5px;"/>');
        
        li.append(btn);
        salaryUl.append(li);
    }
    
    

     /****************************************************
     * 합치자!!!!
     * 각 save부분
     ****************************************************/

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
                continue;
            }
            tempParams[key] = value;
        }
        params["userInfo"] = tempParams;
        params.userInfo.userType = 0; // 일반소득자
        params.userInfo.branchNo = branchNo;
        
        params.userInfo.userNo = $("#userNo").val();
        params.userInfo.employeeNumber = $("#employeeNumber").val();

        i=0;
        tempParams = {
            "otherContent" : [
            ]
        };

        let tempJson = {};
        for(i; i<inputListTab1.length; i++){
            var checkId = inputListTab1[i].id;
            var checkClass = inputListTab1[i].className;
            var val = inputListTab1[i].value;
            // 급여항목 추가리스트
            if(checkId.indexOf("addSalary") != -1){
                if(checkId == "addSalaryTitle"){
                    // tempParams.otherContent += '"'+inputListTab1[i].value+'":';
                    tempJson.title = val;
                } else if(checkId == "addSalaryPay"){
                    // tempParams.otherContent += '"'+inputListTab1[i].value+'"';
                    tempJson.value = val;
                    tempParams.otherContent.push(tempJson);
                    tempJson = {};
                }
            } else {
                if(checkClass.indexOf("money_input") != -1){
                    val = utils.regExr.numOnly(val);
                }
                tempParams[inputListTab1[i].id] = val;
            }
        }

        params["detailData"] = tempParams;

        i=0;
        tempParams = {};
        for(i; i<inputListTab2.length; i++){
            if(checkUserModify){
                params["detailData"][inputListTab2[i].id] = inputListTab2[i].value;
            } else {
                tempParams[inputListTab2[i].id] = inputListTab2[i].value; 
            }
        }

        params["insData"] = tempParams;
        if(checkUserModify){
            params["sfData"] = getDependRow();
            params["eduData"] = getEduRow();
            params["exData"] = getCarrerRow();
            params["miData"] = getMilitaryRow();
            params["cuData"] = getCurriculumRow();
        } else {
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
        }
        

        async function saveInit(params) {
            try {
                if(checkUserModify){
                    await callApi.updateUserInformation(params).then(res=> {
                        console.log(res,"사원정보 수정");
                        if(res.data.ErrorCode == 1){
                            alert(res.data.Msg);
                        } else {
                            alert("수정이 완료되었습니다.");
                            const userNo = $("#userNo").val();
                            const employeeNumber = $("#employeeNumber").val();
                            saveImgFile(userNo, employeeNumber);
                            // window.location.href = "/user/userManagement";
                            // location.reload();
                        }
                    });
                } else {
                    await callApi.userRegistration(params).then(res=> {
                        console.log(res,"사원정보 등록");
                        if(res.data.ErrorCode == 1){
                            alert(res.data.Msg);
                        } else {
                            alert("저장이 완료되었습니다.");
                            saveImgFile(res.data.Data, res.data.Id);
                            // window.location.href = "/user/userManagement";
                            // location.reload();
                        }
                    });
                }
            }catch(e){
                console.log(e);
                alert("관리자에게 문의하세요.",e);
            }
        };

        if(checkUserModify){
            params["delDataList"] = delDataList;
        }
        saveInit(params);
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
        params.userInfo.branchNo = branchNo;

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

        if(checkUserModify){
            params.userInfo.userNo = $("#userNo").val();
            params.userInfo.employeeNumber = $("#employeeNumber").val();
            params["businessdetail"] = tempParams;
            params["eduData"] = getEduRow();
            params["exData"] = getCarrerRow();
            params["miData"] = getMilitaryRow();
            params["cuData"] = getCurriculumRow();
        } else {
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
        }

        if(checkUserModify){
            params["delDataList"] = delDataList;
        }
        saveInit(params);
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
        
        let checkName = "userInfo";
        if(checkUserModify){
            checkName = "dailyuserInfo"; 
        }
        
        params[checkName] = tempParams;
        params[checkName].userType = 2; // 일용직근로자
        params[checkName].branchNo = branchNo;

        if(checkUserModify){
            params[checkName].userNo = $("#userNo").val();
            params[checkName].employeeNumber = $("#employeeNumber").val();

            params["sfData"] = getDependRow();
            params["eduData"] = getEduRow();
            params["exData"] = getCarrerRow();
            params["miData"] = getMilitaryRow();
            params["cuData"] = getCurriculumRow();
        } else {
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
        }
        if(checkUserModify){
            params["delDataList"] = delDataList;
        }
        saveInit(params);
    }



    async function saveInit(params) {
        try {
            console.log(params);
            console.log(JSON.stringify(params));
            console.log(deleteImgList,"삭제사진 리스트");
            console.log(JSON.stringify(deleteImgList));
            if(checkUserModify){
                await callApi.updateUserInformation(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        alert("수정이 완료되었습니다.");
                        const userNo = $("#userNo").val();
                        const employeeNumber = $("#employeeNumber").val();
                        saveImgFile(userNo, employeeNumber);
                        // window.location.href = "/user/userManagement";
                        // location.reload();
                    }
                });
            } else {
                await callApi.userRegistration(params).then(res=> {
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        alert("저장이 완료되었습니다.");
                        saveImgFile(res.data.Data, res.data.Id);
                        // window.location.href = "/user/userManagement";
                        // location.reload();
                    }
                });
            }
        }catch(e){
            alert("관리자에게 문의하세요.",e);
        }
    };

    return(

    <div className="wrapper">
        <div className="user_input">
            <div className="title">
                <h1>사원등록</h1>
                <p>사원정보를 등록하는 메뉴입니다. 해당 항목을 입력해주세요.<span>*표시는 필수 입력사항입니다.</span></p>
            </div>
            <div id="userInfoTitle" className="title">
                <h1>사원 정보관리</h1>
                <p>설정하신 데이터기반으로 근무현황을 확인 할 수 있습니다.</p>
            </div>
            <div className="user_input_inner">
                <input id="userNo" type="text" hidden></input>
                <input id="employeeNumber" type="text" hidden></input>
                <input id="userImgModify" type="text" data-row-id="" data-image-path="" hidden></input>
                
                <input type="radio" id="tab_01" name="tab1" defaultChecked/>
                <label className="user_type_label" for="tab_01">일반근로자</label>
                <input type="radio" id="tab_02" name="tab1" />
                <label className="user_type_label" for="tab_02">사업소득자</label>
                <input type="radio" id="tab_03" name="tab1" />
                <label className="user_type_label" for="tab_03">일용직근로자</label>
                <div className="white_board">
                    <EamedIncomeContainer rowData={rowData} euduDefs ={euduDefs} carrerDefs= {carrerDefs} dependDefs={dependDefs} militaryDefs={militaryDefs} curriculumDefs={curriculumDefs} rowData2={rowData2} rowData3={rowData3} rowData4={rowData4} rowData5={rowData5}/>
                    <BusinessIncomeContainer rowData={rowData} euduDefs ={euduDefs} carrerDefs= {carrerDefs} dependDefs={dependDefs} militaryDefs={militaryDefs} curriculumDefs={curriculumDefs} rowData2={rowData2} rowData3={rowData3} rowData4={rowData4} rowData5={rowData5}/>
                    <DailyIncomeContainer  rowData={rowData} euduDefs ={euduDefs} carrerDefs= {carrerDefs} dependDefs={dependDefs} militaryDefs={militaryDefs} curriculumDefs={curriculumDefs} rowData2={rowData2} rowData3={rowData3} rowData4={rowData4} rowData5={rowData5}/>
                </div>
            </div>
        </div>
        {/* 우편번호 api*/}
        <div id="daumPostPop" className="post_wrapper">
            <button className="post_close" onClick={closePostPop}></button>
            <DaumPostcode
                onComplete={daumPostComplete}
            />
        </div>
        {/* 팝업 */}
        <div className="modal_box imgupload" style={{display:"none"}}>
            {/* <div className=""> */}
            {/* html 추가 */}
            <div className="file_upload">
                <img className="btn_close" src="/images/esc.png" alt="닫기" onClick={()=>hideFileList()} />
                <div className="file_upload_board">
                    <div className="file_upload_inner">
                        {/* 파일등록 전 */}
                        {/* <div className="drag_box">
                            <img src="/images/user_info_file_upload.png" style={{width:"53px", height:"47px", marginTop:"23%"}} />
                            <p style={{color:"#a4a4a4", fontSize:"25px", fontWeight:"500"}}>[파일등록]</p>
                            <p style={{color:"#a4a4a4", fontSize:"18px", fontWeight:"400"}}>업로드 할 파일을 드래그 해주세요.</p>
                        </div> */}
                        
                        {/* 파일등록 후 */}
                        <ul id="fileBox" className="file_list">
                            <li className="img_add_li">
                                <a id="addFile" className="btn_img_add" href="#">
                                    <span className="img_box add"></span>
                                    <span className="title_box"></span>
                                    <span className="check_box"></span>
                                </a>
                            </li>
                        </ul>
                        <div className="img_file_box">
                            <input name="imgFileInput" type="file" accept="image/*"/>
                        </div>
                    </div>
                </div>
                <p className="btn_box">
                    <button className="btn_next btn_backnext" onClick={removeFileList}>삭제하기</button>
                    <button className="btn_next btn_backnext" style={{ background:"#87c395"}} onClick={hideFileList}>완료하기</button>
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

export default UserInfo;