import React from 'react';
import  '../../../Assets/css/pages/user/user_management.css';
import DataGrid from "../../../Components/DataGrid"
import gridCommon from '../../../Utils/grid';
// import $ from 'jquery';



function UserManagementPresenter({rowData, gridDefs, nextPage,countData}) {
console.log(countData);
   return(    
    <>
    <div class="wrapper">
        <div class="user_management">
            <div class="title">
                <h1>사원현황 및 사원관리</h1>
                <p>전체사원 현황을 볼 수 있으며, 선택하면 해당 사원 등록 페이지로 이동합니다.</p>
            </div>
            <div class="user_management_inner">
                <div class="status">
                    <div class="status_div bg_red">
                        <div class="font">
                            재직자
                        </div>
                        <div class="number">                        
                            {countData.activeEmp}
                        </div>
                    </div>
                    <div class="status_green le_mg18">
                        <div class="status_green_inner">
                            <div class="font">
                                정규직
                            </div>
                            <div class="number">
                                {countData.fullTimeEmp}
                            </div>
                        </div>
                        <div class="status_green_inner">
                            <div class="font">
                                계약직
                            </div>
                            <div class="number">
                                {countData.comtractEmp}
                            </div>
                        </div>
                        {/* <div class="status_green_inner">
                            <div class="font">
                                임시직
                            </div>
                            <div class="number">
                                {countData.temporaryEmp}
                            </div>
                        </div> */}
                        <div class="status_green_inner">
                            <div class="font">
                                파견직
                            </div>
                            <div class="number">
                                {countData.disPatchEmp}
                            </div>
                        </div>
                        <div class="status_green_inner">
                            <div class="font">
                                위촉직
                            </div>
                            <div class="number">
                              {countData.commisionEmp}
                            </div>
                        </div>
                        {/* <div class="status_green_inner">
                            <div class="font">
                                일용직
                            </div>
                            <div class="number">
                                 {countData.dailyEmp}
                            </div>
                        </div> */}
                    </div>
                    <div class="status_div bg_gray le_mg18">
                        <div class="font">
                            퇴사자
                        </div>
                        <div class="number">
                            {countData.leaveEmp}
                        </div>
                    </div>
                    <div class="status_div bg_navy le_mg18">
                        <div class="font">
                            전체 현황
                        </div>
                        <div class="number">
                           {countData.allEmpList}
                        </div>
                    </div>
                </div>
                <div class="status_table">
                    <div class="div_top">
                        <select>
                            <option>전체</option>
                            <option value="0">일반소득자</option>
                            <option value="1">사업소득자</option>
                            <option value="2">일용직근로자</option>
                            {/* <option value="3">시간직</option> */}
                        </select>
                        <input type="text" placeholder="사원검색" maxlength="10" class="user_search"/>
                        <button type="button" class="user_plus" onClick={nextPage}>사원추가</button>
                    </div>
                    <div class="div_bottom">
                        <div class="bottom_inner">
                            <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
                        </div>
                        {/* <div class="paging">
                            <ul>
                                <li class="user_back"></li>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li class="user_next"></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            
            </div>
        </div>
    </div>
    </>
    )
}
export default UserManagementPresenter;