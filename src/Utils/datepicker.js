const $ = window.$; 

const picker = { 
  settingLanguage : function() {
    $.fn.datepicker.language["lang"] = {
      monthsShort: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysShort: ['일', '월', '화', '수', '목', '금', '토'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yyyy'
    };
  },
  
  getTimePicker :  function(check) {
  function TimePicker() {}

  TimePicker.prototype.init = function(params) {
    var strTime='';
    var endTime='';

    console.log('params',params)
    if(params && params.value){
      var initArr = params.value.split("~");
      strTime = initArr[0];
      endTime = initArr[1];
    }

    this.ui = document.createElement("div");
    this.ui.innerHTML=`<div>
                        <input type="text" style="width:45%; text-align:center" readOnly
                         class="strTime" value="${strTime}"/>
                         ~ 
                        <input type="text" style="width:45%; text-align:center" readOnly
                         class="endTime" value="${endTime}"/>
                       </div>`;
    this.sInput = this.ui.querySelector(".strTime")
    this.eInput = this.ui.querySelector(".endTime")
    
    let endPicker = $(this.eInput).datepicker({
      timepicker: true,
      onlyTimepicker: true
      ,minutesStep: 5    
      ,autoClose:true
      ,onShow: function(fd,animate){
      
      }
     }).data('datepicker');

    if(endTime && endTime.indexOf(':')>-1){
      const endArr = endTime.split(':');
      endPicker.selectDate(new Date('','','',endArr[0],endArr[1]));
    }

    let strPicker = $(this.sInput).datepicker({
      timepicker: true,
      onlyTimepicker: true
      ,minutesStep: 5
     }).data('datepicker');

    
    if(strTime && strTime.indexOf(':')>-1){
      const strArr = strTime.split(':');
      strPicker.selectDate(new Date('','','',strArr[0],strArr[1]));
    }
    
  };
    TimePicker.prototype.getGui = function() {
      return this.ui;
    };
    TimePicker.prototype.afterGuiAttached = function() {      
    };
    TimePicker.prototype.getValue = function() {
      return  this.sInput.value+"~"+this.eInput.value;
    };
    TimePicker.prototype.destroy = function() {};
    TimePicker.prototype.isPopup = function() {
      return false;
    };
    return TimePicker;
  } //TimePicker

  ,setBreakTimePicker :  function() {
      function BreakTimePicker() {}
      BreakTimePicker.prototype.init = function(params) {
        if(!params || !params.value) params.value = "";
        this.ui = document.createElement("div");
        this.ui.innerHTML=` <input type="text" style="width:100%; text-align:center" readOnly
                            class="breakDate" value="${params.value}"/>
                          `;
        this.bInput = this.ui.querySelector(".breakDate");

        //set language
        picker.settingLanguage();
        $(this.bInput).datepicker({
          language: "lang"
          ,toggleSelected:true
          ,autoClose:true
          ,dateFormat:'yyyy-mm-dd'
         })
        
      };
      BreakTimePicker.prototype.getGui = function() {
        return this.ui;
      };
      BreakTimePicker.prototype.afterGuiAttached = function() {
        this.bInput.focus();
        this.bInput.select();
      };
      BreakTimePicker.prototype.getValue = function() {
        return  this.bInput.value;
      };
      BreakTimePicker.prototype.destroy = function() {};
      BreakTimePicker.prototype.isPopup = function() {
        return false;
      };
      return BreakTimePicker;
  } // setBreakTimePicker
  ,setRestTimePicker :  function() {
    function DatePicker() {}
    DatePicker.prototype.init = function(params) {
      
      if(!params.value && params.value==null) params.value="";

      this.ui = document.createElement("div");
      this.ui.innerHTML=` <input type="text" style="width:100%; text-align:center" readOnly
                          class="date" value="${params.value}"/>
                        `;
      this.bInput = this.ui.querySelector(".date");

     var disabledDays = params.data.replaceWorkDay ? params.data.replaceWorkDay+'':'';
      //set language
      picker.settingLanguage();
      $(this.bInput).datepicker({
        language: "lang"
        ,toggleSelected:true
        ,autoClose:true
        ,dateFormat:'yyyy-mm-dd'
        ,onRenderCell: function (date, cellType) {
          if (cellType == 'day') {
              var day = date.getDay(),
                  isDisabled = disabledDays.indexOf(day) <= -1;
              return {
                  disabled: isDisabled
              }
          }
        }
       })
      
    };
    //setRestTimePicker

    DatePicker.prototype.getGui = function() {
      return this.ui;
    };
    DatePicker.prototype.afterGuiAttached = function() {
      this.bInput.focus();
      this.bInput.select();
    };
    DatePicker.prototype.getValue = function() {
      return  this.bInput.value;
    };
    DatePicker.prototype.destroy = function() {};
    DatePicker.prototype.isPopup = function() {
      return false;
    };
    return DatePicker;
  } //DatePicker

 ,setMonthPicker:function (target,callback){

    picker.settingLanguage();
    
    var monthDp =$(target).datepicker({
      language: "lang"
      ,autoClose:true
      ,onSelect:function(value){
        if(callback && callback instanceof Function){
          callback(value)
        }
      }
    }).data('datepicker');
    //디폴트
    monthDp.selectDate(new Date());
 } //setMonthPicker 
 ,setPersonalRestInfo:function (target,eventDates,callback){
  picker.settingLanguage();
  var eventDates = eventDates;
  
  var monthDp =$(target).datepicker({
    language: "lang"
    ,autoClose:true
    ,selectOtherMonths: false // 이전,다음달로 못넘어감
    ,onSelect:function(value){
      if(callback && callback instanceof Function){
        callback(value);
      }
    }
    ,onRenderCell: function (date, cellType) {
        var currentDate = date.getDate();
        if (cellType == 'day' && eventDates.indexOf(currentDate) != -1) {
            return {
                html: currentDate + '<span class="calendar_day"></span>'
            }
        }
    }
  }).data('datepicker');
  //setPersonalRestInfo
} ,
// 추가
getTimePickerInput :  function(check) {
  function TimePickerInput() {}

  
  TimePickerInput.prototype.init = function(params) {
    var strTime=''; 
    var endTime='';
    console.log(params, 'params');
    if(params && params.value){
      var initArr = params.data.split("~");
      strTime = initArr[0];
      endTime = initArr[1];
    }
    console.log(params.data); 

    this.ui = document.createElement("div");
    this.ui.innerHTML=`<div>
                        <input type="text" style="width:45%; text-align:center"
                         class="strTime" value="${strTime}"/>
                         ~ 
                        <input type="text" style="width:45%; text-align:center"
                         class="endTime" value="${endTime}"/>
                       </div>`;
    this.sInput = this.ui.querySelector(".strTime")
    this.eInput = this.ui.querySelector(".endTime")

       
  };
    TimePickerInput.prototype.getGui = function() {
      return this.ui;
    };
    TimePickerInput.prototype.afterGuiAttached = function() {      

    };
    TimePickerInput.prototype.getValue = function() {
      
      console.log(this.sInput.value, '보낼 값', this.eInput.value);
      return this.sInput.value+"~"+this.eInput.value;
    };
    

    // TimePickerInput.prototype.destroy = function() {};
    // TimePickerInput.prototype.isPopup = function() {
    //   return false;
    // };
    return TimePickerInput;
  }
    













}



export default picker
