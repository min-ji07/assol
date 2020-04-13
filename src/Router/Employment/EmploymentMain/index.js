import React, { useEffect } from 'react';
import '../../../Assets/css/pages/employment/employment_support_00.css';
import $ from 'jquery'
import useHook from'../../../GlobalState/Hooks/useHook';

const EmploymentMain = () => {

    const { addBranch }=useHook();
    useEffect(()=>{
        //add branchInfo in redux store , but login page not found currently 
        addBranch('1');
    },[]);

    return(
    <div class="wrapper">
        <div class="employment_support">
            <div class="title">
                <h1>고용지원금</h1>
                <p>한눈에 보는 고용장려금 안내</p>
            </div>
            <div class="menu_main_button_div width_667">
                <button type="button" class="menu_main_button num00 mg_le_0"></button>
                <button type="button" class="menu_main_button num01"></button>
            </div>
        </div>
    </div>
    )
}

export default EmploymentMain;