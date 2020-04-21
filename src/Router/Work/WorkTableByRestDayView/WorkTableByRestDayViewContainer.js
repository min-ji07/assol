import React, { useState, useEffect } from 'react';
import { callApi } from '../../../Utils/api';
import gridCommon from '../../../Utils/grid';
import picker from '../../../Utils/datepicker';
import WorkTableByRestDayViewPresenter from './WorkTableByRestDayViewPresenter';

const WorkTableByRestDayViewContainer = () => {

    const [rowData, setRowData] = useState([]); //그리드 데이터 
    const [gridDefs, setGridDefs] = useState({}); //그리드 정의
    let params = {
        "branchNo" : 1,
        "years" : "2020",
        "pageNumber" : 1
    }
    useEffect(()=>{
       setGridDefs(gridSetting());
       async function init() {
        try {
            await callApi.getWorkerListByRestDayView(params).then(res=> {
                console.log(res);
                
                setRowData(res.data.Data)
            });
        }catch{

        }
       };
       init();
    },[]); //init


    const gridSetting =()=>{
        //컬럼 정의
           const columnDefs= [  
               { headerName: "rowId", field: "rowId", hide:true}
               ,{ headerName: "processType", field: "processType", hide:true}
               ,{ headerName: "branchNo", field: "branchNo", hide:true }
               ,{ headerName: "성명", field: "userName", width:100}
               ,{ headerName: "직책", field: "position", width:100}
               ,{ headerName: "직위", field: "levelPosition", width:100}
               ,{ headerName: "입사일자", field: "joinDate", width:100}
               ,{ headerName: "퇴사일자", field: "leaveDate", width:100}
               ,{ headerName: "발생연차", field: "accumulatedAnnual", width:100} 
               ,{ headerName: "사용연차", field: "allUseAnnual", width:100,
                    cellRenderer:function(params){
                        return `<span class='txt_red02'>${params.value}</span>`
                    }
                }
               ,{ headerName: "잔여연차", field: "remainAnnual", width:100,
                    cellRenderer:function(params){
                        return `<span class='txt_blue01'>${params.value}</span>`
                    }
                }
               ,{ headerName: "정산연차", field: "payAnnualCount", width:100}
               ,{ headerName: "이월연차", field: "payBackAnnualCount", width:100}

               ,{ headerName: "1월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[0];
                    },
                }
               ,{ headerName: "2월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[1];
                    },
                }
               ,{ headerName: "3월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[2];
                    },
                }
               ,{ headerName: "4월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[3];
                    },
                }
               ,{ headerName: "5월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[4];
                    },
                }
               ,{ headerName: "6월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[5];
                    },
                }
               ,{ headerName: "7월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[6];
                    },
                }
               ,{ headerName: "8월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[7];
                    },
                }
               ,{ headerName: "9월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[8];
                    },
                }
               ,{ headerName: "10월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[9];
                    },
                }
               ,{ headerName: "11월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[10];
                    },
                }
               ,{ headerName: "12월", field: "days", width:80,
                    valueGetter: function(params) {
                        return params.data.days[11];
                    },
                }
           ]
   
           
           //기본컬럼 정의
           const defaultColDef ={
               width: 100
               ,editable : false
               ,cellStyle: {textAlign: 'center'}
               ,resizable : false
           } 
   
           //컴포넌트 세팅 
           const components = {  };
       
           return {columnDefs, defaultColDef, components};
       }


    return (
        <WorkTableByRestDayViewPresenter rowData={rowData} gridDefs={gridDefs}/>
    )
}

export default WorkTableByRestDayViewContainer;