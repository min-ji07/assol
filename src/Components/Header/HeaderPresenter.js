import React, { useEffect } from 'react';
import "../../Assets/css/common/header.css";
import useHook from '../../GlobalState/Hooks/useHook';

function HeaderPresenter() {
    const { state } = useHook();

    useEffect(()=>{
       console.log(state,'test');
    },[]);

    const menuSlide = () => {
        $(".submenu, .sub_bg").stop();
        if($(".submenu").is(":visible")){
            $(".submenu, .sub_bg").slideUp();
        } else {
            $(".submenu, .sub_bg").slideDown();
        }
    }

    const closeMenu = () => {
        $(".submenu, .sub_bg").stop();
        $(".submenu, .sub_bg").slideUp();
    }

    return(
        <header>
        <div id="header">
            <div className="headertop">
                <div id="headertop_inner">
                    <h1 className="logo"><a href="#"><img src="/images/logo.png" /></a></h1>
                    <div className="searchdiv">
                        <input type="text" maxLength="10" placeholder="검색해주세요." className="search" />
                        <button type="button" className="searchimg" ><img src="/images/search.png" /></button>
                    </div>
                    
                    <div className="userinfo">
                        <div>
                            <div className="name">
                                박이삭님 반갑습니다.
                                <ul>
                                    <li><a href="cnfxhlrms.html">출퇴근관리</a></li>
                                    <li><a href="Q&Aboard.html">고객센터</a></li>
                                    <li><a href="#" >로그아웃</a></li>
                                </ul>
                            </div>
                            <div className="photo">
                                <img src="/images/user.png" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="headermenu">
                <div className="menu_inner" >
                    <a href="#" className="menu" onClick={menuSlide}><img src="/images/menu.png" alt="메뉴" /></a>
                    <ul className="gnb">
                        <li>   
                            <a href="/user/userManagement" className="answer01" >사원관리</a> 
                            <ul className="submenu">
                                <li><a href="/user/userInfo">사원등록</a></li>
                                <li><a href="/user/userManagement">사원현황</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/work/workTableMain" className="answer02">근태관리</a>
                            <ul className="submenu">
                                <li><a href="/work/workTableByGroup">근무조 설정</a></li>

                                {/* <li><a href="/work/workTableByPersonal">근무자 설정</a></li>
                                <Route path="/work/workTableByPersonal/:yearMonth" component={WorkTableByPersonal} /> */}

                                <li><a href="/work/workTableByReplaceUser">대체근무자 설정</a></li>
                                <li><a href="/work/workTableResult">근무표</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/salary/salary" className="answer03">급여대장</a>
                            <ul className="submenu">
                                <li><a href="/salary/salaryInput">급여자료입력</a></li>
                                <li><a href="/salary/salary">급여대장</a></li>
                                <li><a href="#">서브메뉴3</a></li>
                                <li><a href="#">서브메뉴3</a></li>
                                <li><a href="#">근로소득지급명세서</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/work/workTableByRestDay" className="answer04">개인연차관리</a>
                            <ul className="submenu">
                                <li><a href="#">주간식단표</a></li>
                                <li><a href="#">식단표제공협약</a></li>
                                <li><a href="#">일일점검</a></li>
                                <li><a href="#">정기점검</a></li>
                                <li><a href="#">정기점검</a></li>

                            </ul>
                        </li>
                        <li>
                            <a href="#" className="answer04">일정관리</a>
                            <ul className="submenu">
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="answer04">급여제공</a>
                            <ul className="submenu">
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="answer04">본인부담금</a>
                            <ul className="submenu">
                                <li><a href="#">본인부담금 청구관리</a></li>
                                <li><a href="#">본인부담금 입금관리</a></li>
                                <li><a href="#"></a></li>
                                <li><a href="#">서브메뉴1</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="answer04">수급자관리</a>
                            <ul className="submenu">
                                <li><a href="#">수급자 정보관리</a></li>
                                <li><a href="#">대기 수급자관리</a></li>
                                <li><a href="#">수급자 정보 엑셀업로드</a></li>
                                <li><a href="#">기초평가 관리</a></li>
                                <li><a href="#">상담</a></li>
                                <li><a href="#">외출&외박 관리</a></li>
                                <li><a href="#">가정통신문</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="answer04">운영관리</a>
                            <ul className="submenu">
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                                <li><a href="#">서브메뉴1</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="sub_bg"></div>
                </div>
            </div>

        </div>
    </header>
    )
}
export default HeaderPresenter;