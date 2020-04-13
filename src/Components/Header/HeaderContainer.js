import React from 'react';
import HeaderPresenter from './HeaderPresenter'
import { useEffect } from 'react';
import useHook from '../../GlobalState/Hooks/useHook';

function HeaderContainer() {
      
    const { addBranch } = useHook();
  
    useEffect(()=>{
        //add branchInfo in redux store , but login page not found currently 
        addBranch(1);
    },[]);
    
    return(
        <>
         <HeaderPresenter />
        </>
    )
}
export default HeaderContainer;