import React, { useState, useEffect } from 'react';
import EamedIncomePresenter from './EamedIncomePresenter'
import { callApi } from '../../../../Utils/api';
import gridCommon from '../../../../Utils/grid';
import picker from '../../../../Utils/datepicker';
import utils from '../../../../Utils/utils';


const EamedIncomeContainer = ({rowData, euduDefs, carrerDefs, dependDefs, militaryDefs, curriculumDefs, rowData2, rowData3, rowData4, rowData5}) => {

    return(
        <EamedIncomePresenter rowData={rowData} euduDefs ={euduDefs} carrerDefs= {carrerDefs} dependDefs={dependDefs} militaryDefs={militaryDefs} curriculumDefs={curriculumDefs} rowData2={rowData2} rowData3={rowData3} rowData4={rowData4} rowData5={rowData5}/>
    )
}
export default EamedIncomeContainer;