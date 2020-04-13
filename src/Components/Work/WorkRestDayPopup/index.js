import React, { useState, useEffect } from 'react'
import useHook from '../../../GlobalState/Hooks/useHook';
import $ from 'jquery';

const WorkRestDaypPopup=(params)=>{
    // const { statePopup, setTypeForPopup } = useHook();
    // useEffect(()=>{
    //     console.log("type",statePopup.type)
    // },[statePopup]);

    // //popup rerendering by type, 
    // const loadPopup=(type)=>{
    //     console.log('type???')
    //     setTypeForPopup({type:type})
    // }

    const closePopup = () =>{
        $("#calendarPop").hide();
    }

    return (
        <div id="calendarPop" class="modal_box mb4">
            <div class="modal_top">
                <div class="modal_title">연차현황 상세</div>
                <div class="modal_close"><a href="#" onClick={closePopup()}></a></div>
            </div>
            <div class="modal_bottom">
                <div id="dayContent" class="day_box">22</div>
                <div class="table_box">
                </div>
            </div>
            <div class="modal_bg">
            </div>
        </div>
    );
}

export default WorkRestDaypPopup;