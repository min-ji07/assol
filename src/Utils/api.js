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

//http://172.30.1.24:5302/Admin/CheckDuplicateAdmin
const testUrl3 = "http://150f7585.ngrok.io"; //

const Justin2 = "http://172.30.1.24:5302"; // 김성일 ip
const localTest = "http://localhost:5302"; // 김성일 ip
const noJustin = "http://211.251.238.215:5302";
const Justin = "http://52b2f4e9.ngrok.io";



// const test = "http://172.30.1.24:5302/SendMailer/SendCertificationValue";

//const testUrl_user = testUrl2 + "User/GetUserInfobyBranchNo?branchNo=";
export const callApi = {
    

    getUserInfo:(params) => axios.get(noJustin+'/user/GetUserInfobyBranchNo',{params:params}), // 사원조회
    initPayRollPage:(params) => axios({
        method: 'post',
        url: noJustin+'/PayRoll/InitPayRollPage',
        data: params
    }), // 급여입력 - 사원 전체명부 조회
    selectTargetUser:(params) => axios({
        method: 'post',
        url: noJustin+'/PayRoll/SelectTargetUser',
        data: params
    }), // 급여입력 - 지급 항목상세 조회
    savePayRoll:(params) => axios({
        method: 'post',
        url: noJustin+'/PayRoll/SavePayRoll',
        data: params
    }), // 급여입력 - 지급 항목상세 저장
    getPayRollListOfBranch:(params) => axios.get(noJustin+'/PayRoll/GetPayRollListOfBranch',{params:params}), // 급여대장 - 조회

    // saveUserInfo:(params) => axios.post('http://82230995.ngrok.io/User/UserRegistration',{params:params}), // 사원등록
    userRegistration:(params) => axios({
        method: 'post',
        url: noJustin+'/User/UserRegistration',
        data: params
    }), // 사원등록 - 일반근로자
    businessUserRegistration:(params) => axios({
        method: 'post',
        url: noJustin+'/User/BusinessUserRegistration',
        data: params
    }), // 사원등록 - 사업소득자
    dayilyUserRegistration:(params) => axios({
        method: 'post',
        url: noJustin+'/User/DailyUserRegistration',
        data: params
    }), // 사원등록 - 일용직근로자
    getUserInformation:(params) => axios({
        method: 'post',
        url: noJustin+'/user/GetUserInformation',
        data: params
    }), // 사원상세 조회
    uploadFileToServer:(params) => axios({
        method: 'post',
        url: noJustin+'/Save/UploadFileToServer',
        data : params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }), // 사원등록 - 이미지파일 업로드
    // 대체근무자 설정 할 근무자 조회
    getSetSceduleInfo:(params) => axios.get(localTest+'/Worker/AlReadySetWorker',{params:params}), // 급여대장 - 조회
    

    // getUserInfo:(params) => axios.get('/Work/dummy/User/UserInfoTable.json',{params:params}), // 사원등록
    /*
        /work/workTableByGroup
        근무조 설정 페이지
    */
    getGridData:(params) => axios.get(noJustin+'/TimeTable/SelectTimeTable',{params:params}), //근무조설정
    /* 
        /work/workTableByPersonal/202001 
        근무자 설정 페이지 
    */
    getSearchList:(params) => axios.get(noJustin+'/Worker/SerchWorker',{params:params}), // 근무자 저장 불러오기

    // 근무자 설정 저장 
    setWorkerList:(params) => axios({ 
        method: 'post',
        url: noJustin+'/Worker/SetWorkerTable',
        data: params
        }), 

    getAllWorkTableByResultColor:(params)=> axios.get(noJustin+'/TimeTable/GetGroupNameInfo',{params:params}), // 근무표 - 근무조 color
    getCurrentStatusWorkerTable:(params) => axios.get(noJustin+'/Worker/GetCurrentStatusWorkerTable',{params:params}), //근무자설정 - 그룹 최소인원수

    getSubWorkerByGroup:(subWorker)=> axios.get(noJustin+'/Worker/GetReplaceWorkerInfo',{params:subWorker}),//대체근무
    getSubWorkerList:(params)=> axios.get(noJustin+'/Worker/SerchReplaceWorker',{params:params}),//대체근무 - 근무자들 조회
    /*
        /work/workTableByRestDay
        연차설정 페이지
    */
    getWorkerInfos:(params) => axios.get(noJustin +'/Worker/GetWorkerByBranchNo',{params:params}),  // 사원내역 불러오기
    getWorkerListByRestDay:(params)=> axios.get(noJustin+'/Worker/GetAnnualWorker',{params:params}), // 연차설정 - 조회
    getWorkerListByRestDayView:(params)=> axios.get(noJustin+'/AdminManager/GetAnnualManager',{params:params}), // 연차대장 - 조회
    /*
        /work/workTableResult
        근무표, 연차관리현황 페이지
    */
    getAllWorkTableByResult:(params)=> axios.get(noJustin+'/Worker/SelectAllWorkerTable',{params:params}), //근무표 - 그래프타입
    getPersonalRestDayMontly:(params)=> axios.get(noJustin+'/Worker/GetAnnualInfosYearsMonthDate',{params:params}), //연차관리현황 - 사원리스트
    getPersonalRestDayMontlyCalendar:(params)=> axios.get(noJustin+'/Worker/GetMonthAnnualBaseStatue',{params:params}),  // 연차관리현황 - 달력조회

    
    getWithholdingTax:(params)=> axios.get('/Withholding/dummy/getWithholdingTax.json',{params:params}), //원천세신고조회
    
    /*
        로그인 콜 
    */
   joinLogin:(params) => axios({
    method: 'post',
    url: noJustin+'/Admin/Login',
    data: params
    }), // 로그인
    
    //연차사용 - 저장
    setWorkerListByRestDay:(params)=> axios ({
        method: 'post',
        url: noJustin + '/Worker/SetAnnualWorker',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    }), 
    /* 회원가입 */
    JoinUser:(params) => axios ({
        method: 'post',
        url: noJustin + '/Admin/AdminRegistration',
        data: params
    }) ,  
    // 아이디 중복체크
    // checkDuplicateAdmin:(params) => axios.post(noJustin+'/Admin/CheckDuplicateAdmin',{params:params}), 
    checkDuplicateAdmin:(params) => axios ({
        method: 'post',
        url: noJustin + '/Admin/CheckDuplicateAdmin',
        data: params
    }),


    // 이메일 인증번호 보내기
    SendCertificationValue:(params) => axios ({
        method: 'post',
        url: noJustin + '/SendMailer/SendCertificationValue',
        data: params
    }),
    // 이메일 인증번호 체크
    //http://172.30.1.24:5302/Admin/CheckCertification
    CheckCertification:(params) => axios ({
        method: 'post',
        url: noJustin + '/Admin/CheckCertification',
        data: params
    }),
    
    // 근무조 저장 
    SaveGroupRow :(params) => axios({
        method: 'post',
        url: noJustin+'/TimeTable/SetTimeTable',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    

};