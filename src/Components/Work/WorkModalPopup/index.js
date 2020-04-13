import React, { useState, useEffect } from 'react'
import MainPopup from './MainPopup';
import ExtraWorkPopup from './ExtraWorkPopup';
import ExtraRestPopup from './ExtraRestPopup';
import useHook from '../../../GlobalState/Hooks/useHook';

const WorkModalPopup=()=>{
    const { statePopup, setTypeForPopup } = useHook();
    useEffect(()=>{
        console.log("type",statePopup.type);

    },[statePopup]);

    //popup rerendering by type, 
    const loadPopup=(type)=>{
        setTypeForPopup({type:type})
    }

    
    return (
        <> {/*default type==0, off  */}
        { statePopup.type==1 && <MainPopup loadPopup={loadPopup}/>}
        { statePopup.type==2 && <ExtraWorkPopup loadPopup={loadPopup}/>}
        { statePopup.type==3 && <ExtraRestPopup loadPopup={loadPopup}/>}
        </>
    );
}

export default WorkModalPopup;