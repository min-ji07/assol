var gridCommon = function() {
    var removeData=[]
        ,defsObj = {}
        ,gridApi = {}

    return {
        init:()=>{ //갖고오는 로직,
           return defsObj;
        },
        setDefs:(defs) => {
            defsObj = defs;
        }
        ,onGridReady:(params)=>{
            gridApi = params;
            // console.log(gridApi);

            // var allColumnIds = [];
            // gridApi.columnApi.getAllColumns().forEach(function(column) {
            //   allColumnIds.push(column.colId);
            // });
            // gridApi.columnApi.autoSizeColumns(allColumnIds, false);
        }
        ,getRowData : ()=> { //전체로우 탐색
            var rowData = [];
            gridApi.api.forEachNode(function(node) {
            rowData.push(node.data);
            });
            return rowData;
        }
        ,onAddRow : () => {
            const newRow = { processType: 1 }
            //추가 기입 
            gridApi.api.updateRowData({add: [newRow]});
        }
        ,onRemoveRow : () => {
            var selectedData = gridApi.api.getSelectedRows();
            //실 삭제
            selectedData.forEach(function(selectedRow, index){
                if(selectedRow.processType !=1 ){ //1번 최초 추가만 아닐떄 
                removeData.push({...selectedRow,processType:3})
                }
            });
            console.log(removeData)
            var res = gridApi.api.updateRowData({ remove: selectedData });
        }
        ,onSaveRow : (callback)=>{ //저장 
            //1 : insert, 2 : update, 3: delete, 4 : select
            gridApi.api.stopEditing();
            
            var rowData = gridCommon.getRowData();
            rowData.push(...removeData); //삭제 데이터 추가
            var qs = '';
            rowData.forEach(row=>{
                var str = JSON.stringify(row);
            });
            if(callback && callback instanceof Function) callback(rowData);
        },onRowEditingStopped : (e, func) =>{ //페이지내에서 미리 콜백정의, 이후 그리드 호출후 콜백으로 전달 
            if( !e.data ) return;
            if( !e.data.processType || e.data.processType == 4 ){//조회 타입일 경우에만 업데이트 타입으로 변경
                e.data.processType=2; 
            }
            gridApi.api.updateRowData({update: [e.data]});
            
            //콜백이 있을경우 전달
            if(func && func instanceof Function) func(e);
        }
        ,onCellEditingStopped : (e,func)=>{
            if( !e.data ) return;
            if( !e.data.processType || e.data.processType == 4 ){//조회 타입일 경우에만 업데이트 타입으로 변경
                e.data.processType=2; 
            }
            gridApi.api.updateRowData({update: [e.data]});
            //콜백이 있을경우 전달
            if(func && func instanceof Function) func(e);
        }
        ,onCellClicked : (e,func) => {
            //콜백이 있을경우 전달
            if(func && func instanceof Function) func(e);
        }
        ,onRowDoubleClicked : (e,func) => {
            //콜백이 있을경우 전달
            if(func && func instanceof Function) func(e);
        }
        ,excelDownload : () => {
            console.log(gridApi)
        },
        // 셀렉박스 추출 형태 
        extractValues : function(mappings) {
            return  Object.keys(mappings);
        }
        ,onAddColumn : (addCol) => {
            let cols = gridApi.api.columnController.columnDefs;
            if(cols === undefined){
                cols = [
                    addCol
                ];
            }
            cols.push(addCol);
            gridApi.api.setColumnDefs(cols);
        }
        ,setGridApi : (targetApi) => {
            // 한페이지 grid 여러개일때 사용
            gridApi = {
                api : targetApi,
                columnApi : targetApi.columnController.columnApi
            };
        }
        ,setColumn : (columnDefs) => {
            gridApi.api.setColumnDefs(columnDefs);
        }
    }
}();

export default gridCommon;