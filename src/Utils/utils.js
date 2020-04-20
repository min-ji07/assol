import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const utils = {
    pdfDownload:function(id){ //pdf download
        const input = document.getElementById(id);
  
        html2canvas(input,{
          windowWidth:'100%'
        }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        
        var imgWidth = 500; // 이미지 가로 길이(mm) A4 기준
        var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var pdf = new jsPDF('p', 'mm');
  
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
   
        pdf.addImage(imgData, "PNG", 0, 0, width, heightLeft);
        pdf.save(`${id}.pdf`);
        });
    }
    ,regExr:{
      comma: function(num){ //콤마
        num = num == undefined ? "" : num;
        num = num.toString();
        num = this.numOnly(num);
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      ,email: function(text){
        return text.replace(/[^a-zA-Z\@\.0-9]/g,'');
      }
      ,numOnly: function(num){
        num = num == undefined ? "" : num;
        return num.replace(/[^0-9]/g,'');
      }
      ,phone : function(num){
          num = this.numOnly(num);
          var phone = "";

          if(num.length < 4) {
              return num;
          } else if(num.length < 7) {
              phone += num.substr(0, 3);
              phone += "-";
              phone += num.substr(3);
          } else if(num.length < 11) {
              phone += num.substr(0, 3);
              phone += "-";
              phone += num.substr(3, 3);
              phone += "-";
              phone += num.substr(6);
          } else {
              phone += num.substr(0, 3);
              phone += "-";
              phone += num.substr(3, 4);
              phone += "-";
              phone += num.substr(7);
          }
          return phone;
      }
      ,tell : function(num){
          if(num.substring(0,2) == "02" && num.length > 12){
              return num.substring(0,12);
          }
          num = this.numOnly(num);
          return num.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-");
      }
      ,date : function(num){
          num = num == undefined ? "" : num;
          num = this.numOnly(num);
          var numLen = num.length;

          if(numLen <=4){
              return num;
          } else if(numLen <= 6){
              return num.substring(0,4) + "-" + num.substring(4,6);
          } else{
              return num.substring(0,4) + "-" + num.substring(4,6) + "-" + num.substring(6,8);
          }
      }
      ,dateToDate : function(num){
          num = this.numOnly(num);
          var numLen = num.length;
          var returnVal = "";

          if(numLen <=4){
              returnVal = num
          } else if(numLen <= 6){
              returnVal = num.substring(0,4) + "-" + num.substring(4,6);
          } else if(numLen <= 8){
              returnVal =  num.substring(0,4) + "-" + num.substring(4,6) + "-" + num.substring(6,8);
          } else if(numLen <= 12){
              returnVal =  num.substring(0,4) + "-" + num.substring(4,6) + "-" + num.substring(6,8) + "~" + num.substring(8,12);
          } else if(numLen <= 14){
              returnVal = num.substring(0,4) + "-" + num.substring(4,6) + "-" + num.substring(6,8) + "~" + num.substring(8,12) + "-" + num.substring(12,14);
          } else {
              returnVal = num.substring(0,4) + "-" + num.substring(4,6) + "-" + num.substring(6,8) + "~" + num.substring(8,12) + "-" + num.substring(12,14) + "-" + num.substring(14,16);
          }

          return returnVal;
      }
      ,personalNum : function(num){
          num = this.numOnly(num);
          var numLen = num.length;
          var returnVal = "";
          if(numLen <= 6){
              returnVal = num.substring(0,6);
          } else{
              returnVal = num.substring(0,6) + "-" + num.substring(6,13);
          }
          return returnVal;
      }
      ,koreanOnly : function(string){
          string = string == undefined ? "" : string;
          return string.replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g,"");
      }
    }


}


export default utils;