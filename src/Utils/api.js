import axios from 'axios';

/*if (location.href.indexOf("https") !== -1) {
    flexProtocol = window.SHOP_SSL_DOMAIN.replace("http://", "https://");
 } else {
    flexProtocol = window.SHOP_SSL_DOMAIN.replace("https://", "http://");
}*/

const api = axios.create({
    //baseUrl:
}
)

const testUrl = "http://172.30.1.29:5302"; // 이석민 ip
const testUrl2 = "http://172.30.1.24:5302"; // 김성일 ip

const local = "http://172.30.1.24:5302"; // 김성일 ip


//const testUrl_user = testUrl2 + "User/GetUserInfobyBranchNo?branchNo=";
export const callApi = {

    getUserInfo:(params) => axios.get(testUrl2+'/User/GetUserInfobyBranchNo',{params:params}), // 사원조회

    // saveUserInfo:(params) => axios.post('http://82230995.ngrok.io/User/UserRegistration',{params:params}), // 사원등록
    UserRegistration:(params) => axios({
        method: 'post',
        url: testUrl2+'/User/UserRegistration',
        data: params
    }), // 사원등록 - 일반근로자
    BusinessUserRegistration:(params) => axios({
        method: 'post',
        url: testUrl2+'/User/BusinessUserRegistration',
        data: params
    }), // 사원등록 - 사업소득자
    DayilyUserRegistration:(params) => axios({
        method: 'post',
        url: testUrl2+'/User/DailyUserRegistration',
        data: params
    }), // 사원등록 - 일용직근로자
    

    // getUserInfo:(params) => axios.get('/Work/dummy/User/UserInfoTable.json',{params:params}), // 사원등록
    /*
        /work/workTableByGroup
        근무조 설정 페이지
    */
    getGridData:(params) => axios.get(testUrl+'/TimeTable/SelectTimeTable',{params:params}), //근무조설정
    /* 
        /work/workTableByPersonal/202001 
        근무자 설정 페이지 
    */
    getWorkerList:(params) => axios.get(testUrl+'/Worker/GetWorkerTable',{params:params}), //근무자설정 - 사원
    getCurrentStatusWorkerTable:(params) => axios.get(testUrl+'/Worker/GetCurrentStatusWorkerTable',{params:params}), //근무자설정 - 그룹 최소인원수
    getWorkTableBypersonal:(params) => axios.get(testUrl+'/Worker/GetWorkerTable',{params:params}), //근무자설정 - 2020-04-03 어디에 사용하는지 확인 필요함.
    getSubWorkerByGroup:(subWorker)=> axios.get(testUrl+'/Worker/GetReplaceWorkerInfo',{params:subWorker}),//데체근무
    getSubWorkerList:(params)=> axios.get(testUrl+'/Worker/SerchReplaceWorker',{params:params}),//대체근무 - 근무자들 조회
    /*
        /work/workTableByRestDay
        연차설정 페이지
    */
    getWorkerListByRestDay:(params)=> axios.get(testUrl+'/Worker/GetAnnalWorker',{params:params}), // 연차설정 - 조회
    getWorkerListByRestDayView:(params)=> axios.get(testUrl+'/AdminManager/GetAnnualManager',{params:params}), // 연차대장 - 조회
    /*
        /work/workTableResult
        근무표, 연차관리현황 페이지
    */
    getAllWorkTableByResult:(params)=> axios.get(testUrl+'/Worker/SelectAllWorkerTable',{params:params}), //근무표 - 그래프타입
    getAllWorkTableByResultColor:(params)=> axios.get(testUrl+'/TimeTable/GetGroupNameInfo',{params:params}), // 근무표 - 근무조 color
    getPersonalRestDayMontly:(params)=> axios.get(testUrl+'/Worker/GetAnnualInfosYearsMonthDate',{params:params}), //연차관리현황 - 사원리스트
    getPersonalRestDayMontlyCalendar:(params)=> axios.get(testUrl+'/Worker/GetMonthAnnualBaseStatue',{params:params}),  // 연차관리현황 - 달력조회

    
    getWithholdingTax:(params)=> axios.get('/Withholding/dummy/getWithholdingTax.json',{params:params}), //원천세신고조회
    setWorkerListByRestDay:(params)=>axios.post('/test/test',{wokerAnnalInfos:params}) //연차사용 - 저장
};