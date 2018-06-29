
window.onload = function(){
     var winHeight = 0;
    if (window.innerHeight){
      winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)){
      winHeight = document.body.clientHeight;
    }
    var html = document.getElementsByTagName('html')[0];
    if(document.body.offsetHeight < winHeight){
        html.style.height = winHeight;
    }
});
}



  
  