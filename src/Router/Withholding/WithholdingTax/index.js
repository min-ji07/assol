import React, { useEffect } from 'react';
import '../../../Assets/css/pages/withholdingTax/withholding_tax_00.css';
import useHook from'../../../GlobalState/Hooks/useHook';
import $ from 'jquery'

const WithholdingTax = () => {

    const { addBranch }=useHook();
    useEffect(()=>{
        //add branchInfo in redux store , but login page not found currently 
        addBranch('1');
    },[]);

    return(
    <div class="wrapper">
        <div class="withholding_tax_00">
            <div class="title">
                <h1>원천세 신고서</h1>
                <p>원천세 신고, 수정신고, 정기수정신고, 기한 후 수정신고를 솔루션을 통해 편하게 관리할 수 있습니다.</p>
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

export default WithholdingTax;