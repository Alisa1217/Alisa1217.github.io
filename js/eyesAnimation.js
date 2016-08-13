$(function() {
    
    var elementToTrack = $('#moonFixedContainer');
    var mouse_x = 0;
    var mouse_y = 0; 

    var miraObject = document.getElementById("mira");
    var miraDentro = document.getElementById("miraDentro");
    var IE = document.all?true:false
    if (!IE) document.captureEvents(Event.MOUSEMOVE)

    document.onmousemove = getMouseXY;

    //Get mouse x-y pos.s
    function getMouseXY(e) {
        if (IE) { // grab the x-y pos.s if IE
            mouse_x = event.clientX + document.body.scrollLeft;
            mouse_y = event.clientY + document.body.scrollTop;
        } else {  // grab the x-y pos.s if NS
            mouse_x = e.pageX;
            mouse_y = e.pageY - miraObject.clientHeight/2;
        }  
        // catch possiblpixelsScrollede negative values in NS4
        if (mouse_x < 0){mouse_x = 0}
        if (mouse_y < 0){ mouse_y = 0}
           
        if(!isScrolling && !isTouch){
            miraObject.style.top = mouse_y + miraObject.clientHeight/2 + "px";
            miraObject.style.left = mouse_x + "px";
        }
        $("#miraDentro").addClass("miraCenterAnim");
        $("#xCoordInfo").html(mouse_x);
        $("#yCoordInfo").html(mouse_y-pixelsScrolled+miraObject.clientHeight/2);
       
        setTimeout(function(){$("#miraDentro").removeClass("miraCenterAnim")},1700)

        return true;
    }


    window.setInterval(activateEyeMotion, 2000);
    function activateEyeMotion(){
        //tamanho do
        var w = elementToTrack.width();
        var h = elementToTrack.height();

        //screen position em percentage
        var w_percentage = Math.round((mouse_x*100)/w);
        var h_percentage = Math.round(((mouse_y-pixelsScrolled)*100)/h);

        //TOP
        if(w_percentage < 50 && h_percentage < 30){  moveTheEyesHere(8,25); } 
        else if(w_percentage >= 50 && w_percentage <= 80 && h_percentage < 30){  moveTheEyesHere(32,25);shootScopeMessage(); } 
        else if(w_percentage > 80 && w_percentage <= 100 && h_percentage < 30){  moveTheEyesHere(56,25);shootScopeMessage(); } 
        //
        //MIDDLE
        else if(w_percentage < 50 && h_percentage >= 30 && h_percentage < 60){  moveTheEyesHere(8,40); shootScopeMessage(); } 
        else if(w_percentage >= 50 && w_percentage <= 80 && h_percentage >= 30 && h_percentage < 60){  moveTheEyesHere(32,40);shootScopeMessage('SHOOT<br />NOW!'); } 
        else if(w_percentage > 80 && w_percentage <= 100 && h_percentage >= 30 && h_percentage < 60){  moveTheEyesHere(56,40);shootScopeMessage(); } 
        //
        //BOTTOM
        else if(w_percentage < 50 && h_percentage >= 33 && h_percentage >= 60){  moveTheEyesHere(8,65);shootScopeMessage(); } 
        else if(w_percentage >= 50 && w_percentage <= 80 && h_percentage >= 60){  moveTheEyesHere(30,60);shootScopeMessage(); } 
        else if(w_percentage > 80 && w_percentage <= 100 && h_percentage >= 60){  moveTheEyesHere(55,60);shootScopeMessage(); }

        else { moveTheEyesHere(32,40); }
        //alert("W: " + w + " H: " + h);
        $('#distance span').text("X: " + mouse_x + " Y: " + mouse_y + "W: " + w + " H: " + h + "w_percentage: " + w_percentage + " h_percentage: " + h_percentage); 
    }

    //Selecciona os olhos
    $elementLeft  = $('#moonEyeLeft').find('.retina');
    $elementRight  = $('#moonEyeRight').find('.retina');

    function moveTheEyesHere(eyePositionX,eyePositionY){
        $( $elementLeft ).animate({
            top: eyePositionY, left: eyePositionX
        }, 800, function() {
            // Animation complete.
        });
        $( $elementRight ).animate({
            top: (eyePositionY+14), left: eyePositionX
        }, 800, function() {
            // Animation complete.
        });
    }
    moveTheEyesHere(32,40);

    function shootScopeMessage(text){
        if(text){
            $("#shootCoordinates h2").html(text);
        } else {
            $("#shootCoordinates h2").html('SHOOT FOR<br />THE MOON!');
        }
    }
    

});