import React from 'react';
import DataGrid from '../../../Components/DataGrid';
import  '../../../Assets/css/pages/work/work_setting_02.css';
import gridCommon from '../../../Utils/grid';
import SetSubWorker from './SetSubWorker';



function WorkTableByPersonalPresenter({rowData, minCount,subWorker,gridDefs}) {
   
   return(
    <>
        <div className="wrapper">
        <div className="work_setting_02">
            <div className="title">
                <h1>근무설정</h1>
                <p>설정하신 데이터기반으로 근무 현황을 확인 할 수 있습니다.</p>
            </div>
            <div className="emTable">
                    <div className="leftDiv">
                        <div className="option">
                            <p className="year_inner">근속년월
                            <input type="text"
                                readOnly
                                id="month-picker"
                                className="datepicker-here"
                                data-language='lang'
                                data-min-view="months"
                                data-view="months"
                                data-date-format="yyyy-mm"/>
                            </p>
                            <p>사원근무 설정</p>
                        </div>

                        <div className="buttonset">
                        <button type="button" className="insert"  onClick={gridCommon.onAddRow}>추가</button>
                            <button type="button" className="delete1" onClick={gridCommon.onRemoveRow}>삭제</button>
                            <button type="button" className="save" onClick={gridCommon.onSaveRow}>저장</button>
                        </div>
                        <div className="right_border">
                            <div className="table">
                                
                                <DataGrid rowData={rowData} gridDefs={gridDefs}/>
                            </div>
                        </div>
                    </div>

                    <div className="rightDiv">
                        <div className="">
                            <p>근무조별 최소 인원현황</p>
                        </div>

                        <div className="num0">
                            <div>근무조</div>
                            <div>필수 인원수</div>
                            <div>지정 인원수</div>
                        </div>
                        <div className="table2">
                            <div className="left_border">
                            {
                                minCount.map((obj, key)=>{
                                    const className = "num bg_c"+obj.groupColor;
                                    return <div key={key} className={className}>
                                        <div> {obj.groupName} </div> 
                                        <div> {obj.requireCount} </div> 
                                        <div> {obj.setWorkerCount}  </div> 
                                    </div>
                                })
                             }   
                            </div>
                        </div>
                        <div className="backnext">
                            {/* <button type="button" className="back" >이전으로</button> */}
                            <button type="button" className="next" onClick={()=>{window.location.href='/work/workTableByRestDay'}}>다음으로</button>
                        </div>
                    </div>
            </div>

            {
              subWorker &&
              subWorker!={} &&
              <SetSubWorker subWorker={subWorker}/> 
            }                            
        </div>
    </div>
    </>
    )
}
export default WorkTableByPersonalPresenter;