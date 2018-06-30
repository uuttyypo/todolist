




$(document).ready(function(){//点击按钮切换背景图片
  $(".changeimage").click(function(){
  $("#app").css("backgroundImage","url(./images/DeepSpace.jpg)");},
  function () {
  $("#app").css("backgroundImage","url(./images/KyooTah.jpg)");
  
     
     
    });
  })

window.onload = function(){
     var winHeight = 0;
    if (window.innerHeight){
      winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)){
      winHeight = document.body.clientHeight;
      $(document).ready(function(){
       // $(".secondline").height(winHeight);
       
    });
    }
    var html = document.getElementsByTagName('html')[0];
    if(document.body.offsetHeight < winHeight){
        html.style.height = winHeight;
       $(document).ready(function(){
         $(".secondline").height(winHeight-73);
        //左边导航栏的高度是页面高度减去上方导航栏的高度
       
      });
    }
  
}



  
  