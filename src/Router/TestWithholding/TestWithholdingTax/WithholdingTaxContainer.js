import React, { useEffect, useState } from 'react';
import picker from '../../../Utils/datepicker'
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import WithholdingTaxPresenter from './WithholdingTaxPresenter'


function WithholdingTaxContainer() {
    //컬럼 정의
    const columnDefs= [  
        { headerName: "rowId", field: "rowId", hide :true}
        ,{ headerName: "processType", field: "processType", hide:true}
        ,{ headerName: "branchNo", field: "branchNo", hide:true }
        ,{ headerName: "소득자 소득구분", field: "themrwk", editable: false,

            rowSpan: function(params){
                if(params.data && params.data.key){
                    const obj = params.data.key;
                    return obj.length;
                }else{
                     return 3;
                }
            }, cellClassRules: { "show-cell" : "data.key !== undefined" }
        }
        ,{ headerName: "코드", field: "codeNumber", width: 100}
        ,{ headerName: '원천징수명세', field: "", cellStyle:{"textAlign":"center"}, 
            children: 
                [{headerName: '소득지급(과세 미달 일부 비과세 포함)', field: '',
                    children:
                        [{ headerName: '인원', field: '', width: 50,},
                            { headerName: '총지급액', field: '', width: 80, }
                        ]
                },
                {headerName: '징수세액', field: '', 
                    children:
                        [{ headerName: '소득세등', field: '', width: 80 },
                            { headerName: '농어촌특별세', field: '', width: 80 },
                                { headerName: '가산세', field: '', width: 80 }
                        ]
                }
        ]}
        ,{ headerName: "당월 조정 환급세액", field: "ekddnjfwhwjd" }
        ,{ headerName: "납부세액", 
            children: 
                [{headerName: '소득지급(과세 미달 일부 비과세 포함)', field: ''}
                ,{headerName: '농어촌특별세', field: ''}
            ]
        }
    ]


    const gridSetting =()=>{
        //셀렌더링 
        function groupingByRestDay() {
            function groupingCell() {}
                groupingCell.prototype.init = function(params) {
                    if(!params.data.key || !params.data.key.key) return null;
                    this.ui = document.createElement("div");
                    this.ui.innerHTML = '<div class="show-name">' + params.data.key.key + "</div>";
                };
                groupingCell.prototype.getGui = function() {
                    return this.ui;
                };
            return groupingCell;
        }
    }
    

    //기본컬럼 정의
    const defaultColDef ={
        width: 200
        ,enableColResize : false
        ,editable : true
        ,cellStyle: {textAlign: 'center'}
        ,resizable : true
    } 

    //컴포넌트 세팅
    const components =  { }
    
    //현 페이지에서 정의된 함수 호출
    const onRowEditingStopped = function(e) { 
       
        if(e.data && e.data.workTime ) {//&& e.data.workTime!=='~'
           let workTimeArr  = e.data.workTime.split("~");

           //근무시간
           const strTime= new Date(0,0,0,workTimeArr[0].split(":")[0],workTimeArr[0].split(":")[1],0);
           const endTime = new Date(0,0,0,workTimeArr[1].split(":")[0],workTimeArr[1].split(":")[1],0);
           const diffTime = endTime.getTime() - strTime.getTime();
           
           const diffHour = (diffTime/1000)/3600;
           const diffMin = ((diffTime/1000)%3600)/60;
           console.log('hour, min', Math.floor(diffHour)+':'+Math.floor(diffMin))
           e.node.setDataValue('currentTime',Math.floor(diffHour)+'시간'+Math.floor(diffMin)+'분')
       }

       if(e.data && e.data.restTime ){//&& e.data.workTime!=='~'
           let restTimeArr  = e.data.restTime.split("~");
           
           let strTime= new Date(0,0,0,restTimeArr[0].split(":")[0],restTimeArr[0].split(":")[1],0);
           let endTime = new Date(0,0,0,restTimeArr[1].split(":")[0],restTimeArr[1].split(":")[1],0);
           let diffTime = endTime.getTime() - strTime.getTime();
           
           let subRestTimeArr  = e.data.subRestTime.split("~");
           
           //휴게시간 총합
           let subStrTime= new Date(0,0,0,subRestTimeArr[0].split(":")[0],subRestTimeArr[0].split(":")[1],0);
           let subEndTime = new Date(0,0,0,subRestTimeArr[1].split(":")[0],subRestTimeArr[1].split(":")[1],0);
           let subDiffTime = subEndTime.getTime() - subStrTime.getTime();
           e.node.setDataValue('totalRestTime', (diffTime/60000)+(subDiffTime/60000)+'분')
       }

       let workArr = (e.data.currentTime).split('시간');
       let workTime = ((workArr[0])*3600 + (workArr[1].replace(/분/gi,''))*60)
       let restTime = ((e.data.totalRestTime).replace(/분/gi,''))*60;
       let overTime = ((e.data.overTime).replace(/분/gi,''))*60;

       let pass = 'Y'
       if( ((workTime-restTime)+overTime)/3600 > 8 ||
               ((workTime-restTime)+overTime)/3600 < 8 ) {
                   pass = 'N'
       }

       e.node.setDataValue('passYn',pass)
    }
    
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
       async function initGrid(params) {
        try {

            if(!params){
                const d = new Date();
                params = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);
            } 
            //근속연도 세팅 
            const target = document.querySelector('#month-picker')
            target.value = params;
            await callApi.getGridData(params).then(res=>{
                console.log(res)
                if(res.data && res.data.length>0){
                      //공통 그리드 데이터 셋팅
                    setRowData(res.data);
                    setGridDefs({columnDefs, defaultColDef ,components, onRowEditingStopped});
                }
            })
        }catch{

        }
       };
       initGrid(); 
       //날짜 피커 변경시 콜백으로 리로드 
       picker.setMonthPicker(('#month-picker'),function(value){
            initGrid(value); 
        });
    },[]); //init


    const nextPage = () => {
        let value = document.getElementById('month-picker').value;
        if(!value||value=="") return alert("선택된 연월이 없습니다.");
        
        //저장후 페이지 이동 
        gridCommon.onSaveRow(()=>{
            value = value.replace(/-/gi,'');
            window.location.href="/work/workTableByPersonal/"+value;            
        });
    };

return (
    <WithholdingTaxPresenter 
        rowData={rowData}
        gridDefs={gridDefs}
        nextPage={nextPage}/>
  );
}

export default WithholdingTaxContainer;
