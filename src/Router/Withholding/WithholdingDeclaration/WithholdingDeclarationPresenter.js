import React, { useEffect } from 'react';
import '../../../Assets/css/pages/withholdingTax/withholding_tax_01.css';
import useHook from'../../../GlobalState/Hooks/useHook';
// import $ from 'jquery';
// import gridCommon from '../../../Utils/grid';


const WithholdingDeclarationPresenter=({rowData,  gridDefs, nextPage }) => { 

    const { addBranch }=useHook();
    useEffect(()=>{
        //add branchInfo in redux store , but login page not found currently 
        addBranch('1');
    },[]);

    return(
        <div class="grid_table">
            <table class="earnings">
                <thead>
                    <tr>
                        <th colspan="12">원천징수 명세 및 납부세액 (단위 : 원)</th>
                    </tr>
                    <tr>
                        <th rowspan="3" colspan="3">소득자 소득구분</th>
                        <th rowspan="3">코드</th>
                        <th colspan="5">원천징수명세</th>
                        <th rowspan="3">당월조정<br />환급세액</th>
                        <th colspan="2">납부세액</th>
                    </tr>
                    <tr>
                        <th colspan="2">소득지급</th>
                        <th colspan="3">징수세액</th>
                        <th rowspan="2">소득세 등<br />(가산세 포함)</th>
                        <th rowspan="2">농어촌특별세</th>
                    </tr>
                    <tr>
                        <th>인원</th>
                        <th>총지급액</th>
                        <th>소득세등</th>
                        <th>농어촌특별세</th>
                        <th>가산세</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowspan="22" class="mixed">개인 [거주자, 비거주자]</th>
                        <th rowspan="5">근로소득</th>
                        <th>간이세액</th>
                        <th>A01</th>
                        <td><input type="number" id="A01person"></input></td>
                        <td><input type="number" id="A01payment"></input></td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>중도퇴사</th>
                        <th>A02</th>
                        <td><input type="number" id="A01person"></input></td>
                        <td><input type="number" id="A01payment"></input></td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>일용근로</th>
                        <th>A03</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input> </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>연말정산</th>
                        <th>A04</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>가감계</th>
                        <th>A10</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th rowspan="3">퇴직소득</th>
                        <th>연금계좌</th>
                        <th>A21</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>   </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input>  </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>그 외</th>
                        <th>A22</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>  </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>가감계</th>
                        <th>A20</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>      </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input> </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th rowspan="3">사업소득</th>
                        <th>매월징수</th>
                        <th>A25</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>   </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input> </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>연말정산</th>
                        <th>A26</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>가감계</th>
                        <th>A30</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th rowspan="3">기타소득</th>
                        <th>연금계좌</th>
                        <th>A41</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>  </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"></td>
                    </tr>
                    <tr>
                        <th>그 외</th>
                        <th>A42</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input> </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input> </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>가감계</th>
                        <th>A40</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th rowspan="4">연금소득</th>
                        <th>연금계좌</th>
                        <th>A48</th>
                        <td><input type="number" id="A01person"></input></td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>  </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>공적연금(매월)</th>
                        <th>A45</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input> </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>연말정산</th>
                        <th>A46</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input> </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td class="bg_gray"><input type="number" id="A01month"></input></td>
                        <td class="bg_gray"><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>가감계</th>
                        <th>A47</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input> </td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th colspan="2">이자소득</th>
                        <th>A50</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th colspan="2">배당소득</th>
                        <th>A60</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th colspan="2">저축해지 추징세액 등</th>
                        <th>A69</th>
                        <td><input type="number" id="A01person"></input></td>
                        <td class="bg_gray"><input type="number" id="A01payment"></input>  </td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input> </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th colspan="2">비거주자 양도소득</th>
                        <th>A70</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th>법인</th>
                        <th colspan="2">내, 외국법인원천</th>
                        <th>A80</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td class="bg_gray"><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th colspan="3">수정신고(세액)</th>
                        <th>A90</th>
                        <td class="bg_gray"><input type="number" id="A01person"></input>    </td>
                        <td class="bg_gray"><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                    </tr>
                    <tr>
                        <th colspan="3">총합계</th>
                        <th>A99</th>
                        <td><input type="number" id="A01person"></input>    </td>
                        <td><input type="number" id="A01payment"></input>   </td>
                        <td><input type="number" id="A01tax"></input>       </td>
                        <td><input type="number" id="A01village"></input>   </td>
                        <td><input type="number" id="A01additional"></input></td>
                        <td><input type="number" id="A01month"></input></td>
                        <td><input type="number" id="A01incometax"></input></td>
                        <td><input type="number" id="A01village"></input></td>
                    </tr>
                </tbody>
            </table>
            <div class="grid_inner">
                {/* 그리드 */}
                {/* <DataGrid rowData={rowData} gridDefs={gridDefs}/> */}
            </div>
            <table class="Refunds">
                <thead>
                    <tr>
                        <th colspan="11">환급세액 조정 (단위 : 원)</th>
                    </tr>
                    <tr>
                        <th colspan="4">전월 미환급 세액의 계산</th>
                        <th colspan="3">당월 발생 환급세액</th>
                        <th rowspan="3">조정대상<br />환급세액</th>
                        <th rowspan="3">당월조정<br />환급세액계</th>
                        <th rowspan="3">차월이월<br />환급세액</th>
                        <th rowspan="3">환급신청액</th>
                    </tr>
                    <tr>
                        <th rowspan="2">전월 미<br />환급세액</th>
                        <th rowspan="2">기환급<br />신청세액</th>
                        <th rowspan="2">차감잔액</th>
                        <th rowspan="2">일반환급</th>
                        <th rowspan="2">신탁재산<br />(금융회사등)</th>
                        <th colspan="2">그 밖의 환급세액</th>
                    </tr>
                    <tr>
                        <th>금융회사 등</th>
                        <th>합병 등</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default WithholdingDeclarationPresenter;