import React, { useEffect, useState } from 'react';
import WorkGraphPresenter from './WorkGraphPresenter';
import { callApi } from '../../../../Utils/api';
import useHook from '../../../../GlobalState/Hooks/useHook';

const WorkGraphContainer = () => {
  
    const { state, setPopupData }=useHook();
    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    useEffect(()=>{
       async function init(params) {
        try {
          params= {
              "branchNo" : 1,
              "yearsMonthDate" : 202010
          }
            await callApi.getAllWorkTableByResult(params).then(res=> {
                console.log(res.data);
                //그리드 정의 세팅
                const graphInit = graphSetting(res.data.Data);
                const gridInit = gridSetting();
                gridInit.columnDefs = graphInit.columnDefs;
                setGridDefs(gridInit);
                setRowData(graphInit.rowData);


                callApi.getAllWorkTableByResultColor(params).then(res=> {
                    var data = res.data;
                    console.log(res);

                    if (data.Data == null){
                        alert(data.Msg);
                        return;
                    }

                    const workGraphColor = document.querySelector("#workGraphColor");
                    let i = 0;
                    workGraphColor.innerText = "";
                    for(i; i<data.Data.length; i++){
                        var li = document.createElement("li");
                        var span = document.createElement("span");
                        var text = document.createTextNode(data.Data[i].groupName);
                        span.className = "color_box bg_c" + data.Data[i].groupColor;
                        li.appendChild(span);
                        li.appendChild(text);
                        workGraphColor.appendChild(li);
                    }
              });
            });
        }catch{

        }
       };
       init();
    },[]); //init

    const colorSetting = (name,color)=>{
        
    }

    const graphSetting=(list)=> {
        //상단 달력 선택으로 추후 변경,
        const mm = "04"; //January is 0!
        const yyyy = "2020";

        const firstDay = new Date(yyyy, mm).getDate();
        const lastDay = new Date(yyyy, mm, 0).getDate();

        var week = ["일", "월", "화", "수", "목", "금", "토"];
        var dayOfIdx = new Date(yyyy+"-"+mm+"-01").getDay(); 


        var workerMap = {};
        const columnDefs = [
          {
            headerName: "userNo",
            field: "userNo",
            pinned: "left",
            refData: workerMap
          }
        ];

        for (var i = firstDay; i < lastDay + 1; i++) {
          var dayOfWeek = week[dayOfIdx];
          var headerObj = {
            headerName: i+":"+dayOfWeek,
            field: "day" + i,
            width: 50,
            value: {yearsMonthDate:yyyy+"-"+mm, day: i}, // using cell click event,  
            cellClass:function(params){
              if (params.value && params.value.groupName) {
                    const color =params.value.color;
                    //그룹컬러 지정
                    return 'bg_c'+color;
                  }
            },
            valueFormatter: function(params) {
              if (params.value && params.value.groupName) {
                return params.value.groupName;
              }
              return "";
            }
          };
          dayOfIdx++;
          if (dayOfIdx == 7) dayOfIdx = 0;
          columnDefs.push(headerObj);
        } 

        //데이터 세팅
        var rowData = list.reduce((arr, cur) => {
          let obj = {};
          obj["userNo"] = cur.Key; // userNo 설정

            cur.Value.map((data, idx) => {
            workerMap[cur.Key] = data.userName;

            const dayKey = data.day;
            obj["day" + dayKey] = {
              groupName: data.groupName,
              color: data.groupColor
            };
          });
          arr.push(obj);
          return arr;
        }, []);

        return { columnDefs, rowData, workerMap};
    };

    const onCellClicked=(e)=> {
      console.log('eeee',e)
      //팝업 오픈,
      //$('.mb1').show();
      if(!e.value || e.value.groupName == null) return ;
      
      const userNo = e.data.userNo;
      const colDef = e.colDef.value;

      setPopupData({type:1, yearsMonthDate:colDef.yearsMonthDate, day:colDef.day, userNo:userNo});    
    }

    const gridSetting =()=>{
          //컬럼 정의
           const columnDefs= [  
               { headerName: "rowId", field: "rowId", hide:true }
               ,{ headerName: "processType", field: "processType", hide:true}
               ,{ headerName: "", field: "branchNo", width:50 ,resizable:false,editable : false
                   ,checkboxSelection:true,headerCheckboxSelection: true,
                    valueFormatter:function(params){ 
                    params.data.branchNo = state.branchNo
                    return state.branchNo
                }
               }
           ]
             //기본컬럼 정의
           const defaultColDef ={
               width: 100
               ,editable : false
               ,cellStyle: {textAlign: 'center'}
               ,resizable : false
           } 
   
           //컴포넌트
           const components = {  };
           return {columnDefs, defaultColDef, components, onCellClicked};
    }

     
    return (
       <WorkGraphPresenter gridDefs={gridDefs} rowData={rowData}/>  
    )
}

export default WorkGraphContainer;