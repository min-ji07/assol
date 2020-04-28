import React, { useEffect, useState } from 'react';
import gridCommon from '../../../Utils/grid';
import SalaryPresenter from './SalaryPresenter'
import utils from '../../../Utils/utils';
import { callApi } from '../../../Utils/api';
import picker from '../../../Utils/datepicker';
import useHook from '../../../GlobalState/Hooks/useHook';
import { addBranchNo } from '../../../GlobalState/Reducers/reducerGroupInfo';

function SalaryContainer() {
    const { state } = useHook();
    const branchNo = state.branchNo;
    // 급여대장조회내역
    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의

    // const defaultHeader = {
    //     position : "직책",
    //     userName : "성명",
    //     employeeNumber : "사원번호",
    //     joinDate : "입사일자",
    //     userName : "성명",
    //     userName : "성명",
    //     userName : "성명",
    // };

    // const [rowData2, setRowData2] = useState([]); 
    //그리드 데이터 
    // const [gridDefs2, setGridDefs2] = useState({}); 
    //그리드 정의
    
    const rightGridBaseColumn = () => {
        let baseColumn = [
            "position",
            "userName",
            "employeeNumber",
            "joinDate",
            "leaveDate",
            "baseSalary",
            "foodSalary",
            "carSalary",
            "welfareSalary",
            "positionSalary"
        ];
        return baseColumn;
    }

    let rightColumnList = rightGridBaseColumn();

    //     {
    //         "processType":1,
    //         "userName":"일반직먼지",
    //         "position":"사회복지사",
    //         "employeeNumber":"2004231",
    //         "baseSalary":"1",
    //         "foodSalary":"2",
    //         "carSalary":"3",
    //         "welfareSalary":"45",
    //         "positionSalary":"5",
    //         "otherContent":[
    //             {title:"타이틀1",value:1},
    //             {title:"타이틀2",value:2},
    //             {title:"타이틀3",value:3},
    //             {title:"타이틀4",value:4},
    //             {title:"타이틀5",value:5}
    //         ]
    //     }
    // ]

     //기본컬럼 정의
    const defaultColDef ={
        width: 50
        ,editable : false
        ,cellStyle: {textAlign: 'center'}
        ,resizable : true
    } 

    const gridSalarySetting = () => {
        //컬럼 정의
        const columnDefs= [  
            {headerName: "userId", field: "id", hide :true}
            ,{headerName: "processType", field: "processType", hide:true}
            ,{headerName: "branchNo", field: "branchNo", hide:true }
            ,{headerName: "급여차수", field: "payDegree", width:100}
            ,{headerName: "급여선정기간",field:"payDayMonth", width:120}
            ,{headerName: "급여총원", field: "totalUser", width:90}
            ,{headerName: "인건비총액", field: "totalSalary", width:130
            }
            ,{headerName: "4대보험총액", field: "fourIns", width:130
            }
            ,{ headerName: "소득공제총액", field: "inDeduction", width:130
            }
            ,{ headerName: "실지급 총액", field: "actualPay", width:130}
        ];
        
        //클릭 이벤트
        const onRowDoubleClicked = (e) => {
            console.log(e);
            let employeeNumber = e.data.employeeNumber;
            let userNo = e.data.userNo;
            let payDegree = e.data.payDegree;
            let yearMonthDate = $("#month-picker").val();
            let userType = 0;

            let params = {
                "yearMonthDate" : utils.regExr.numOnly(yearMonthDate),
                "payDegree" : payDegree,
                "branchNo": branchNo,
                "userType": userType
            }
            

            async function init(params) {
                try{
                    await callApi.getSelectPayRoll(params).then(res=> {
                        console.log(res);
                        if(res.data.ErrorCode == 1){
                            alert(res.data.Msg);
                        } else {
                            rightGridInit(res.data);
                            // selectContent(res.data.Data);
                        }
                    });
                } catch(error){
                    alert(error);
                }
            }
            init(params);

            // let testParam = [
            //     {
            //         "processType":1,
            //         "userName":"일반직먼지",
            //         "position":"사회복지사",
            //         "employeeNumber":"2004231",
            //         "baseSalary":"1",
            //         "foodSalary":"2",
            //         "carSalary":"3",
            //         "welfareSalary":"45",
            //         "positionSalary":"5",
            //         "otherContent":[
            //             {title:"타이틀1",value:1},
            //             {title:"타이틀2",value:2},
            //             {title:"타이틀3",value:3},
            //             {title:"타이틀4",value:4},
            //             {title:"타이틀5",value:5}
            //         ]
            //     }
            // ]
            // selectContent(testParam);
        }

        //컴포넌트 세팅
        const components = {  };
        return {columnDefs, defaultColDef, components, onRowDoubleClicked};
    }

    const setOtherColumn = (listData) =>{
        const otherTitleBox = $("#otherTitle");
        otherTitleBox.find("li[col-id=otherColumn]").remove();
        rightColumnList = rightGridBaseColumn();

        listData.forEach((index)=>{
            let li = $("<li>");
            let span = $("<span>");
            li.attr("col-id","otherColumn");
            span.text(index.title);
            li.append(span);
            otherTitleBox.append(li);
            rightColumnList.push("addSalary"+index.title);
        });
    }

    const setOtherContent = (otherData) => {
        otherData.forEach((json)=>{
            const userNo = json.userNo;
            const colId = "addSalary"+json.title;
            const colVal = utils.regExr.comma(json.value);
            console.log(userNo+","+colId);
            console.log($("li[row-id="+userNo+"] [col-id="+colId+"]").length);
            $("li[row-id="+userNo+"] [col-id="+colId+"] span").text(colVal);
        });
    }
    
    const setContent = (baseData) => {
        const textBox = $("#rightGridText");
        const gridBox = $("#rightGridBox");
        let salaryDesc = $("#salaryDesc");
        

         // 기존 추가컬럼 초기화
        if(baseData.length == 0){
            alert("데이터가 없습니다.");
            textBox.show();
            gridBox.hide();
            return false;
        } else {
            textBox.hide();
            gridBox.show();
            salaryDesc.empty();
        }

        baseData.forEach(function(json,index) {
            let row;
            let dataBox;
            let text;
            dataBox = $("<ul>");
            row = $("<li>");
            row.attr("row-id",json.userNo);

            rightColumnList.forEach(function(colId){
                text = json[colId];
                if(colId.indexOf("Salary") != -1){
                    text = utils.regExr.comma(text);
                }
                let li = $("<li>");
                let span = $("<span>");
                span.text(text);
                li.attr("col-id",colId);
                li.append(span);
                dataBox.append(li);
            });
            // for(var key in rightGridBaseColumn){
            //     let li = $("<li>");
            //     let span = $("<span>");
            //     span.text(json[key]);
            //     li.append(span);
            //     dataBox.append(li);
            // }
            row.append(dataBox);
            salaryDesc.append(row);
        });
        // contentBox
    }

    useEffect(()=>{
        bindEvent();
        picker.setMonthPicker(('#month-picker'),function(value){
            console.log(value);
            // leftGridInit(utils.regExr.numOnly(value));
        });
        leftGridInit();
    },[]); //init

    const leftGridInit = () => {
        let month = utils.regExr.numOnly($("#month-picker").val());
        let params = {
            branchNo : branchNo,
            // month : utils.regExr.numOnly(month)
            month : month
        };

        setGridDefs(gridSalarySetting());
        async function init(params) {
            try{
                await callApi.getPayRollListOfBranch(params).then(res=> {
                    console.log(res);
                    if(res.data.ErrorCode == 1){
                        alert(res.data.Msg);
                    } else {
                        setRowData(res.data.Data);
                    }
                });
            } catch(error){
                alert(error);
            }
        }
        init(params);
    }

    const rightGridInit = (data) => {
        const baseData = data.Data;
        const otherData = data.OtherData;
        const listData = data.ListData;

        setOtherColumn(listData);   // 추가컬럼 셋팅
        setContent(baseData);    // 기본 데이터 셋팅
        setOtherContent(otherData); // 추카컬럼 데이터 셋팅
        setRightGridWidth(); // 넓이 셋팅
    }

    const setRightGridWidth = () => {
        const girdContent = $("#salaryDesc");
        const liList = girdContent.children("li");
        let gridWidth = 0;
        let i = 0;
        for(i; i<liList.length; i++){
            gridWidth += liList[i].offsetWidth;
        }
        girdContent.width(gridWidth);
    }

    const bindEvent = () => {
        $(".table_left_wrap").on("scroll",(e)=>{
            const scrollTop = e.target.scrollTop;
            // $(".table_left_header_overflow").scrollTop(scrollTop);
            $(".table_left_header_overflow").css("marginTop","-"+scrollTop+"px");
        });
    }
    return(
        <SalaryPresenter rowData={rowData} gridDefs={gridDefs} leftGridInit={leftGridInit}
        // rowData2={rowData2} gridDefs2={gridDefs2}
        />
    )
}

export default SalaryContainer;
