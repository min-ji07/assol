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
    ,comma: function(number){ //콤마
      number = number.replace(/\,/g,"");
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // ,tab: function(){

    // }

    // $(document).ready(function(){
    //   $('#tab_01').click(function(){
    //     var div = $(this).attr('div_bottom');

    //     $('#tab_01').removeClass('current');
    //     $('.tab_content').removeClass('current');

    //     $(this).addClass('current');
    //     $("#"+tab_id).addClass('current');

    //     $('.tab_01').removeClass('current');
    //   })
    // })


}


export default utils;