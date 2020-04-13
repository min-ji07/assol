import React from 'react';
import WorkTableByPersonalContainer from './WorkTableByPersonalContainer'

const WorkTableByPersonal=({match})=>{
    return(
        <WorkTableByPersonalContainer yearMonth = {match.params.yearMonth}/>
    )
};
export default WorkTableByPersonal;