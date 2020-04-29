import React from 'react';
import  '../../../Assets/css/pages/user/user_management.css';
import DataGrid from "../../../Components/DataGrid"
import gridCommon from '../../../Utils/grid';
// import $ from 'jquery';



function UserManagementPresenter({rowData, gridDefs,countData}) {
    const userInfo = () =>{
        window.location.href="/user/userInfo";
    }
   return(    
    <>
    <div className="wrapper">
        <div className="user_management">
            <div className="title">
                <h1>사원현황 및 사원관리</h1>
                <p>전체사원 현황을 볼 수 있으며, 선택하면 해당 사원 등록 페이지로 이동합니다.</p>
            </div>
            <div className="user_management_inner">
                <div className="status">
                    <div id="btnIsActive0" className="status_div bg_red">
                        <div className="font">
                            재직자
                        </div>
                        <div className="number">                        
                            {countData.activeEmp}
                        </div>
                    </div>
                    <div className="status_green le_mg18">
                        <div id="btnAllTime" className="status_green_inner">
                            <div className="font">
                                정규직
                            </div>
                            <div className="number">
                                {countData.fullTimeEmp}
                            </div>
                        </div>
                        <div id="btnComtract" className="status_green_inner">
                            <div className="font">
                                계약직
                            </div>
                            <div className="number">
                                {countData.comtractEmp}
                            </div>
                        </div>
                        {/* <div className="status_green_inner">
                            <div className="font">
                                임시직
                            </div>
                            <div className="number">
                                {countData.temporaryEmp}
                            </div>
                        </div> */}
                        <div id="btnDisPatch" className="status_green_inner">
                            <div className="font">
                                파견직
                            </div>
                            <div className="number">
                                {countData.disPatchEmp}
                            </div>
                        </div>
                        <div id="btnCommision" className="status_green_inner">
                            <div className="font">
                                위촉직
                            </div>
                            <div className="number">
                              {countData.commisionEmp}
                            </div>
                        </div>
                        {/* <div className="status_green_inner">
                            <div className="font">
                                일용직
                            </div>
                            <div className="number">
                                 {countData.dailyEmp}
                            </div>
                        </div> */}
                    </div>
                    <div id="btnIsActive1" className="status_div bg_gray le_mg18">
                        <div className="font">
                            퇴사자
                        </div>
                        <div className="number">
                            {countData.leaveEmp}
                        </div>
                    </div>
                    <div id="btnAllUser" className="status_div bg_navy le_mg18">
                        <div className="font">
                            전체 현황
                        </div>
                        <div className="number">
                           {countData.allEmpList}
                        </div>
                    </div>
                </div>
                <div className="status_table">
                    <div className="div_top">
                        <select id="userTypeSelect">
                            <option value="전체">전체</option>
                            <option value="0">일반소득자</option>
                            <option value="1">사업소득자</option>
                            <option value="2">일용직근로자</option>
                            {/* <option value="3">시간직</option> */}
                        </select>
                        <div class="user_search_box">
                            <input id="userNameInput" type="text" placeholder="사원검색" maxLength="10" className="user_search"/>
                            <button id="btnUserSearch" type="button" class="btn_search"></button>
                        </div>
                        <button type="button" className="user_plus" onClick={userInfo}>사원추가</button>
                    </div>
                    <div className="div_bottom">
                        <div className="bottom_inner">
                            <DataGrid rowData={rowData} gridDefs={gridDefs} gridCommon={gridCommon}/>
                        </div>
                        {/* <div className="paging">
                            <ul>
                                <li className="user_back"></li>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li className="user_next"></li>
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