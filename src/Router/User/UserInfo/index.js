import React, { useState, useEffect } from 'react';
import '../../../Assets/css/pages/user/user_info.css';
import EamedIncomeContainer from './EamedIncome/EamedIncomeContainer';
import BusinessIncomeContainer from './BusinessIncome/BusinessIncomeContainer';
import DailyIncomeContainer from './DailyIncome/DailyIncomeContainer';
import DaumPostcode from 'react-daum-postcode';
import Utils from '../../../Utils/utils';
import { callApi } from '../../../Utils/api';
import { post } from 'axios';
import $ from 'jquery';
import utils from '../../../Utils/utils';



const UserInfo = () => {
    let imgFileList = [];

    const saveImgList = () => {

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
            var targetVal = e.target.value;
            e.target.value = Utils.regExr.date(targetVal);
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
            }
        });

        $(".join_date").on("focusout",function(e){
            e.target.parentElement.nextSibling.children[0].value = e.target.value;
        });

        $(".tab_03 #workTime, .tab_03 #payOfHour").on("focusout",function(e){
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

        $("select[name=isActive]").on("change",function(){

        });

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
            $("#imgFileInput").click();
            return false;
        });

        $("#imgFileInput").on("change",(e)=>{
            const fileInput = e.target;
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

        fileDropDown();
    },[]); //init

    async function saveInit(formData) {
        try{
            await callApi.ImgUpload(formData).then(res=> {
                if(res.data.ErrorCode == 1){
                    alert(res.data.Msg);
                } else {
                    console.log(res);
                }
            });
        } catch(e){
        }
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
            e.preventDefault();
            // 드롭다운 영역 css
            dropZone.css('background-color','#FFFFFF');

            if(files != null){
                if(files.length < 1){
                    alert("폴더 업로드 불가");
                    return;
                }
                // selectFile(files);
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
                
                if($.inArray(ext, ['exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml', 'psd']) >= 0){
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
    function addFileList(fileName, filePath){
        var li = $("<li>");
        var a = $("<a>");
        var img_box = $("<span class='img_box'>");
        var img = $("<img src='"+filePath+"'>");
        var title_box = $("<span class='title_box'>");
        var check_box = $("<span class='check_box'>");

        img_box.append(img);
        title_box.text(fileName);
        a.append(img_box).append(title_box).append(check_box);

        li.append(a);
        imgFileList.push($("#imgFileInput")[0].files[0]);
        $('#fileBox').prepend(li);
    }
    
    $(document).on("click","#fileBox li a",function(e){
        console.log($(this));
        if(this.id == "btn_img_add"){
            return;
        }
        if(this.className == "check_file"){
            $(this).removeClass("check_file");
        } else {
            $(this).addClass("check_file");
        }
    });

    const selectFileList = () => {
        let checkList = $("#fileBox li a");
        let i = 0;
        let tempArr = [];
        for(i; i<checkList.length; i++){
            if(checkList[i].className == "check_file"){
                tempArr.push(imgFileList[i]);
            }
        }
        imgFileList = tempArr;
        console.log(imgFileList);
    }
    
    // 업로드 파일 삭제
    function deleteFile(fIndex){
        // 전체 파일 사이즈 수정
        totalFileSize -= fileSizeList[fIndex];
        
        // 파일 배열에서 삭제
        delete fileList[fIndex];
        
        // 파일 사이즈 배열 삭제
        delete fileSizeList[fIndex];
        
        // 업로드 파일 테이블 목록에서 삭제
        $("#fileTr_" + fIndex).remove();
    }
 
    // 파일 등록
    function uploadFile(){

    }
    
    const closePopup = () => {
        $(".modal_box.imgupload").hide();
    }

    return(
    <div class="wrapper">
        <div class="user_input">
            <div class="title">
                <h1>사원등록</h1>
                <p>사원정보를 등록하는 메뉴입니다. 해당 항목을 입력해주세요.<span>*표시는 필수 입력사항입니다.</span></p>
            </div>
            <div class="user_input_inner">
                <input type="radio" id="tab_01" name="tab1" defaultChecked/>
                <label for="tab_01">일반근로자</label>
                <input type="radio" id="tab_02" name="tab1" />
                <label for="tab_02">사업소득자</label>
                <input type="radio" id="tab_03" name="tab1" />
                <label for="tab_03">일용직근로자</label>
                
                <div class="white_board">
                    <EamedIncomeContainer />
                    <BusinessIncomeContainer />
                    <DailyIncomeContainer />
                </div>
            </div>
        </div>
        {/* 우편번호 api*/}
        <div id="daumPostPop" class="post_wrapper">
            <button class="post_close" onClick={closePostPop}></button>
            <DaumPostcode
                onComplete={daumPostComplete}
            />
        </div>
        {/* 팝업 */}
        <div className="modal_box imgupload" style={{display:"none"}}>
            {/* <div className=""> */}
            {/* html 추가 */}
            <div class="file_upload">
                <img class="btn_close" src="/images/esc.png" alt="닫기" onClick={()=>closePopup()} />
                <div class="file_upload_board">
                    <div class="file_upload_inner">
                        {/* 파일등록 전 */}
                        {/* <div class="drag_box">
                            <img src="/images/user_info_file_upload.png" style={{width:"53px", height:"47px", marginTop:"23%"}} />
                            <p style={{color:"#a4a4a4", fontSize:"25px", fontWeight:"500"}}>[파일등록]</p>
                            <p style={{color:"#a4a4a4", fontSize:"18px", fontWeight:"400"}}>업로드 할 파일을 드래그 해주세요.</p>
                        </div> */}
                        
                        {/* 파일등록 후 */}
                        <ul id="fileBox" class="file_list">
                            <li>
                                <a id="addFile" class="btn_img_add" href="#">
                                    <span class="img_box add"></span>
                                    <span class="title_box"></span>
                                    <span class="check_box"></span>
                                </a>
                            </li>
                        </ul>
                        <div class="img_file_box">
                            <input id="imgFileInput" type="file" multiple/>
                        </div>
                    </div>
                </div>
                <p className="btn_box">
                    <button className="btn_next">삭제하기</button>
                    <button className="btn_next" style={{ background:"#87c395"}} onClick={selectFileList}>완료하기</button>
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