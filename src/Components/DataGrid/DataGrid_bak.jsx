import React,{Component, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import useDataGrid from '../../GlobalState/Hooks/DataGrid/useDataGrid';


var gridApi;   
//저장시 전달
var removeData=[];

function DataGrid(){

const {gridData,setGridData,addRowData}=useDataGrid();
const onAddRow = () => {
    const newRow = {
        "rowId": '',
        "processType":1,
        "branchNo": '',
        "workManCnt": '',
        "groupName": "B", 
        "startHour": '',
        "startMinute": '',
        "endHour": '',
        "endMinute": '',
        "firstRestTime": '',
        "twoRestTime": 6,
        "totalTime": " 9시간",
        "needTime": " 30분"
    }
    gridApi.updateRowData({add: [newRow], addIndex:0}); 
}

//행삭제 
const onRemoveRow = () => {
    var selectedData = gridApi.getSelectedRows();
    console.log(selectedData)
    //레알 삭제 --> 삭제데이터 따로 저장후 전달
    selectedData.forEach(function(selectedRow, index){
        if(selectedRow.processType !=1 ){ //1번 최초 추가만 아닐떄 
            selectedRow.processType = 3;
            removeData.push(selectedRow)
        }
    });
    
    console.log(removeData)
    var res = gridApi.updateRowData({ remove: selectedData });
    //현재 행이 변경
   
}
    


    const init=() => {
        //추후 호출부는 분리
        axios.get('dummy/testFile.json')
        .then(res=>{
           const columnDefs= [
                { headerName: "rowId", field: "rowId", hide:true }
                ,{ headerName: "processType", field: "processType", hide:true }
                ,{ headerName: "branchNo", field: "branchNo", hide:true }
                ,{ headerName: "", field: "", width:30 ,resizable:false,editable : false
                    ,checkboxSelection:true,headerCheckboxSelection: true,
                 }
                ,{ headerName: "근무팀명", field: "groupName"}
                ,{ headerName: "근무인원수", field: "workManCnt",
                     cellEditor: "agSelectCellEditor",cellEditor:'select', cellEditorParams:{values:["1",'2']}}
                ,{ headerName: "근무시작시간 ~ 근무종료시간",field:"startHour", width:250}
                ,{ headerName: "휴게시간1", field: "firstRestTime" }
                ,{ headerName: "휴게시간2", field: "twoRestTime" }
                ,{ headerName: "총근무시간", field: "totalTime" , editable:false}
                ,{ headerName: "연장시간", field: "needTime" }
                ,{ headerName: "검토", field: "" }
                ]
            setGridData({columnDefs, rowData: res.data, editType: "fullRow"});
        });
    }  
    
   

    //최초 1회 마운트
    useEffect(()=>{
        init();
    },[]);

    const defaultColDef ={
        width: 100
        ,editable : true
        ,resizable : true
    }
    //그리드 완료후 전역 api 사용
    const onGridReady=(params)=>{
       gridApi = params.api;
    }

    //저장 서버통신 
    const onSaveRow=()=>{
        
    //1 : insert, 2 : update, 3: delete, 4 : select
        gridApi.stopEditing();
        var rowData = getRowData();
        rowData.push(...removeData);
        console.log(rowData)
        //axios 
     
        /*이석민 확인 request전달 어캐 줄지 
        rowData.forEach(function(elements){
            console.log()
        });    
    axios.post('https://test.com',{
        params:
    });*/

    }

    //전체 로우 탐색
     const getRowData=()=> {
        var rowData = [];
        gridApi.forEachNode(function(node) {
          rowData.push(node.data);
        });
        return rowData;
      }
    // 수정 로우 - processType변경
    const onRowEditingStopped  =(e) =>{
        if(e.data.processType == 4 ){//셀렉된 경우에만 
            e.data.processType=2; //업데이트로 변경  
        }
        //event.data.edit = true;
        gridApi.updateRowData({update: [e.data]});
    } 

  

    return(
        <>
        <div className="ag-theme-balham" style={{height: '300px', width: '900px'}}>
        <div>
            <button onClick={onAddRow}> 행추가 </button>
            <button onClick={onRemoveRow}> 행삭제 </button>
            <button onClick={onSaveRow}> 완료 </button>
        </div>
      
        <AgGridReact
            columnDefs={gridData.columnDefs}
            rowData={gridData.rowData.filter(d=> d.processType!=3)}
            defaultColDef={defaultColDef}  
            editType={gridData.editType}
            onGridReady={onGridReady}
            rowSelection="multiple"
            suppressRowClickSelection={false}
            enableRangeSelection= {true}
            onRowEditingStopped={onRowEditingStopped}
            >
        
        </AgGridReact>
        </div>
        </>
    );
}

export default DataGrid;