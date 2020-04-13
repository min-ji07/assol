import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import {gridCommon} from "../../Utils/grid.js";

function DataGrid({rowData}){
    const defs=gridCommon.init();

   
    return(
        <div className="ag-theme-balham" style={{height:"100%", width:"100%"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={defs.columnDefs}
                defaultColDef={defs.defaultColDef}
                onGridReady={gridCommon.onGridReady}
                editType="fullRow"
                onCellEditingStopped={(e)=>gridCommon.onCellEditingStopped(e,null)}
                onRowEditingStopped={(e)=>gridCommon.onRowEditingStopped(e,null)}
                rowSelection="multiple"
                suppressRowClickSelection={false}
                enableRangeSelection= {true}
                components={defs.components}
                >      
            </AgGridReact>
        </div>
    );
}

export default DataGrid;