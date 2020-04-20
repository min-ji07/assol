import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import gridCommon from '../../Utils/grid.js';

import '../../Assets/css/grid/grid.css';


function DataGrid({rowData:rowData,gridDefs,idTest}){

    return(
        <div id={idTest} className="ag-theme-balham" style={{height:"100%", width:"100%"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={gridDefs.columnDefs}
                defaultColDef={gridDefs.defaultColDef}
                onGridReady={gridCommon.onGridReady}
                components={gridDefs.components}
                // editType="fullRow"
                onRowEditingStopped={(e)=>gridCommon.onCellEditingStopped(e,gridDefs.onRowEditingStopped)}
                onCellEditingStopped={(e)=>gridCommon.onCellEditingStopped(e,gridDefs.onRowEditingStopped)}
                onCellClicked={(e)=>gridCommon.onCellClicked(e,gridDefs.onCellClicked)}
                onRowDoubleClicked={(e)=>gridCommon.onRowDoubleClicked(e,gridDefs.onRowDoubleClicked)}
                rowSelection="multiple"
                // suppressRowClickSelection={true} // rowsapn시 필요, 공통속성으론 쓰면 안될듯
                suppressRowTransform={true}
                enableRangeSelection= {true}
                // singleClickEdit={true}
                >      
            </AgGridReact>
        </div>
    );
}

export default DataGrid;