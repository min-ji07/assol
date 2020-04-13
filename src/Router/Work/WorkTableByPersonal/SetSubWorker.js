import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import DataGrid from '../../../Components/DataGrid';
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import picker from '../../../Utils/datepicker';
import './TempSubworker.css'

const SetSubWorker =({subWorker}) => {

    $('#modalPopup').show();
    const setOff=()=>{
        gridCommon.onSaveRow(()=>{
             $('#modalPopup').hide();                
        });
    }

    
    let workerAllInfo={},workerAllNumber={}, workerAllPosition={}, workersMap = {}; 
    //mappings
    const dayMap = {
        "0":"일"
        ,"1":"월"
        ,"2":"화"
        ,"3":"수"
        ,"4":"목"
        ,"5":"금"
        ,"6":"토"
    }

    const [gridDefs, setGridDefs] = useState({});
    const [rowData, setRowData] = useState([]);//그리드 2개

    useEffect(()=>{
       async function init(params) {
        try {
        params = {
            "branchNo" : 1,
            "yearsMonthDate" : 202004,
            "groupName" : "A",
            "firstRestDay" : 1,
            "twoRestDay" : 4,
            "userNo" : 1
        }
        await callApi.getSubWorkerList(params).then(res=> { 
                //대체근무가능자 세팅
                const list = res.data.Data;
                list.map((obj)=> { 
                
                //workDay마다 사원리스트를 다르게 보여줘야함.
                if(!workersMap[obj.Key]) workersMap[obj.Key] = {};
                
                    for(var i=0;i<obj.Value.length;i++){
                        let user = obj.Value[i];
                        workersMap[obj.Key][user.replaceUserNo] =user.replaceUserName;
                       
                        //맵핑확인용
                        workerAllInfo[user.replaceUserNo] =user.replaceUserName;
                        workerAllNumber[user.replaceUserNo] =user.replaceEmployeeNumber;
                        workerAllPosition[user.replaceUserNo] =user.replacePosition;
                    }
                });
                subWorker.yearsMonthDate = "202010";
                subWorker.rowId = 1 ;
                callApi.getSubWorkerByGroup(subWorker).then((res)=>{
                    console.log(res.data.Data);
                    const list = res.data.Data;
                    
                    var data = list.reduce((acc, cur, index)=>{
                            cur.Value[0]["key"] = {"key":cur.Key, "length": cur.Value.length};

                            cur.Value.map((curr)=>{
                                    if(!curr.replaceWorkDay || curr.replaceWorkDay==-1) curr.replaceWorkDay = cur.Key
                                    acc.push(curr);
                            })
                            //console.log(acc)
                            return acc
                    },[]);

                    setGridDefs(gridSetting());
                    setRowData(data)
                });    
            });
            
        }catch{

        }
       };
       init();
    },[subWorker]); //init

    const gridSetting =()=>{
        //셀렌더링 
        function groupingByRestDay() {
            function groupingCell() {}
                groupingCell.prototype.init = function(params) {
                    var cellBlank = !params.value;
                    if (cellBlank) {
                      return null;
                    }
                    const day = dayMap[params.data.key.key];
                    this.ui = document.createElement("div");
                    this.ui.innerHTML = '<div class="show-name">' + day + "</div>";
                    
                };
                groupingCell.prototype.getGui = function() {
                    return this.ui;
                };
            return groupingCell;
          }
          
        
      

        
          //컬럼 정의
       const columnDefs= [  
           { headerName: "rowId", field: "rowId", hide:true }
           ,{ headerName: "processType", field: "processType", hide:true}
           ,{ headerName: "branchNo", field: "branchNo", hide:true }
           ,{ headerName: "휴무일", field: "key",editable:false
                ,rowSpan: function(params) {
                   if(params.data && params.data.key){
                        const obj = params.data.key;
                        return obj.length;
                    }else{
                         return 0;
                    }
                }
                ,cellClass: function(params){
                    return params.value !== undefined ? "show-cell" : ""
                } 
                ,cellRenderer: groupingByRestDay()
            }
           ,{ headerName: "휴무일 상세설정", field: "replaceWorkDate",cellEditor:picker.setRestTimePicker()}
           ,{ headerName: "대체근무자", field: "replaceUserNo"
           ,    editable:true, width:130,
                cellEditor:'select',
                cellEditorParams: function(params){
                    if(params.data && params.data.replaceWorkDay )
                    return { values: gridCommon.extractValues(workersMap[params.data.replaceWorkDay]) }
                },
                refData: workerAllInfo
            }
           ,{ headerName: "사원번호", field: "replaceUserNo"
                ,editable:false, width:130,
                cellEditor:'select',
                refData: workerAllNumber
            }
           ,{ headerName: "직책", field: "replaceUserNo", editable:false, width:130,
                cellEditor: "select",
                refData: workerAllPosition
            }
            ]

    
       //기본컬럼 정의
       const defaultColDef ={
           width: 100
           ,editable : true
           ,cellStyle: {textAlign: 'center'}
           ,resizable : true
       } 

       //컴포넌트 세팅
       const components = { groupCellRenderer : groupingByRestDay() };
   
       return {columnDefs, defaultColDef, components};
   }

    return (
        <div className="modal01" style={{display: "block"}} id="modalPopup">
                <div className="modal_top">
                    <div className="left">대체근무자 설정</div>
                    <div className="close_modal"><a href="" className="close_modal" ></a>
                </div>
                </div>
                <div className="modal_bottom minimodal">
                    <div className="top">
                        { rowData && rowData!=={} &&
                            <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                        }
                        </div>
                </div>
                <button type="submit" className="minicomplete" onClick={setOff}>완료</button>
                <div className="modal_layer"></div>
            </div>
    )
}

export default SetSubWorker;