import React, { useEffect } from 'react';
import '../../../Assets/css/pages/contract/contract_00.css';
import useHook from'../../../GlobalState/Hooks/useHook';
import $ from 'jquery'

const Contractmain = () => {

    const { addBranch }=useHook();
    useEffect(()=>{
        //add branchInfo in redux store , but login page not found currently 
        addBranch('1');
    },[]);

    return(
    <div class="wrapper">
        <div class="contract_00">
            <div class="title">
                <h1>전자근로계약서</h1>
                <p>전자근로계약서로 간편하게 계약서 관리를 할 수 있습니다.</p>
            </div>
            <div class="menu_main_button_div">
                <button type="button" class="menu_main_button num00 mg_le_0"></button>
                <button type="button" class="menu_main_button num01"></button>
                <button type="button" class="menu_main_button num02"></button>
                <button type="button" class="menu_main_button num03"></button>
            </div>
        </div>
    </div>
    )
}

export default Contractmain;