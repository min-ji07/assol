import React, { useEffect, useState }  from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DataGridPresentation from "./DataGridPresentation";

function DataGridContainer(){
    return(
        <DataGridPresentation rowData={rowData}>
        </DataGridPresentation>
    );
}

export default DataGridContainer;