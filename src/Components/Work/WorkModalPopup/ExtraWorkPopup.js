import React, { useEffect } from 'react'
import useHook from '../../../GlobalState/Hooks/useHook';
import { callApi } from '../../../Utils/api';
import { useState } from 'react';

const ExtraWorkPopup=({loadPopup})=>{
    const { statePopup } = useHook();
    const [groupInfo, setGroupInfo] = useState([]);
    useEffect(()=>{
        async function init(params) {
            try{
            await callApi.getAllWorkTableByResultColor(params).then(res=> {
                var data = res.data;
                if(!data.Data || data.Data==null) return;
                setGroupInfo(data.Data);
            });
            }catch{

            }
        }
    
        init();
    },[]);
    const submitByExtraWork = ()=>{
        //정보 세팅후 호출 
        //팝업 오프, -> 1: 그냥 팝업내리기 2: 타입변경 뭘로하지 
    }

    
    return (
        <div class="modal_box mb2" style={{display:'block'}}>
        <div class="modal_top">
            <div class="modal_title">추가근무 상세</div>
            <div class="modal_close"><a href="#" onClick={()=>loadPopup('0')}></a></div>
        </div>
        <div class="modal_bottom">
            <div class="day_box">{statePopup.day}</div>
            <div class="desc_box">
                <p>
                    <span class="dsec_title">성&nbsp;&nbsp;&nbsp;명</span>
                    <span>박이삭</span>
                </p>
                <p>
                    <span class="dsec_title">근무조</span>
                    <select>
                        {groupInfo && groupInfo.map((obj)=>{
                            return (
                             <option>{obj.groupName}</option>
                            )
                        })}
                    </select>
                </p>
                <p>
                    <button class="btn_submit" onClick={submitByExtraWork}>완료</button>
                </p>
            </div>
        </div>

        <div class="modal_bg">
        </div>
    </div>
    );
}

export default ExtraWorkPopup;