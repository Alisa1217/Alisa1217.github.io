var heightOfBrowser;
var pixelsScrolled;

var isTouch = false;
var parallaxIsActive = true;
var shotFired = false;
var isScrolling = false;

var mountain_start;
var mountain_finish;
var mountain_increment;

var aldeia_start;
var aldeia_finish;
var aldeia_increment;

var cloud1_start;
var cloud1_finish;
var cloud1_increment;

var cloud2_start;
var cloud2_finish;
var cloud2_increment;

var cloud3_start;
var cloud3_finish;
var cloud3_increment;

// --- IDs to variables --- //

var id_openScreen = $("#openScreen"),
id_bluePrint = $("#bluePrint"),
id_shootScope = $("#shootScope"),
id_window = $(window),
id_mainTitle = $("#mainTitle"),
id_startButton = $("#startButton"),
id_mira = $("#mira"),
id_shootCoordinates = $("#shootCoordinates"),
id_mountainsBackground = $("#mountainsBackground"),
id_aldeia = $("#aldeia"),
id_clouds1 = $("#clouds1"),
id_clouds2 = $("#clouds2"),
id_clouds3 = $("#clouds3"),
id_flyingSpaceship = $("#flyingSpaceship"),
id_pageWrapper = $("#page-wrapper"),
id_shootButtonForTablet = $("#shootButtonForTablet");

// ------------------------ //

var total_heightOfAnimationDivs = id_openScreen.height() + id_bluePrint.height() + id_shootScope.height() + id_bluePrint.height();
var pixelsScrolled = id_window.scrollTop();
var distanceToFlyingSpaceship = id_openScreen.height() + (id_bluePrint.height()*2);
if(isTouch){distanceToFlyingSpaceship = id_openScreen.height() + id_bluePrint.height();}
var distanceToMira = id_openScreen.height();
var limitOfMira = id_openScreen.height() + id_bluePrint.height() + id_shootScope.height();



//
function heightOfAnimationDivs(){
	total_heightOfAnimationDivs = id_openScreen.height() + id_bluePrint.height() + id_shootScope.height() + id_bluePrint.height();
	distanceToFlyingSpaceship = id_openScreen.height() + (id_bluePrint.height()*2);
	if(isTouch){distanceToFlyingSpaceship = id_openScreen.height() + id_bluePrint.height();}
	distanceToMira = id_openScreen.height();
	limitOfMira = id_openScreen.height() + (id_bluePrint.height()*2);
}


//On scroll
$( window ).scroll(function() {

	isScrolling = true;
	
	clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        isScrolling = false;
    }, 250));

	if(pixelsScrolled > limitOfMira){
		id_mainTitle.css("display","none");
		id_startButton.css("display","none");
		id_mira.css("display", "none");
		id_shootButtonForTablet.css("display","none");
		id_shootCoordinates.css("display", "none");
		shotFired = false;
	} else if(pixelsScrolled > distanceToMira && pixelsScrolled < limitOfMira){
		id_mainTitle.css("display","none");
		id_startButton.css("display","none");
		if(shotFired){
			id_mira.css("display", "none");
			id_shootButtonForTablet.css("display","none");
			id_shootCoordinates.addClass("shootCoordinates_disappear");

			setTimeout(function(){id_shootCoordinates.css("display","none"),id_shootCoordinates.removeClass("shootCoordinates_disappear")},500);

		} else {
			id_mira.css("display", "block");
			if(isTouch){ id_shootButtonForTablet.css("display","block"); }
			//animateMiraForTouch();
			id_shootCoordinates.css("display", "block");
		}
	} else if(pixelsScrolled < distanceToMira-100) {
		id_mainTitle.css("display","block");
		id_startButton.css("display","block");
		id_mira.css("display", "none");
		id_shootButtonForTablet.css("display","none");
		id_shootCoordinates.css("display", "none");
		shotFired = false;
	}

	
	pixelsScrolled = id_window.scrollTop();

	if(parallaxIsActive){
		id_mountainsBackground.css("margin-top", Math.round(pixelsScrolled * -mountain_increment) + "px");
		id_aldeia.css("margin-top", Math.round(pixelsScrolled * -aldeia_increment) + "px");
		id_clouds1.css("margin-top", Math.round(pixelsScrolled * -cloud1_increment) + "px");
		id_clouds2.css("margin-top", Math.round(pixelsScrolled * -cloud2_increment) + "px");
		id_clouds3.css("margin-top", Math.round(pixelsScrolled * -cloud3_increment) + "px");
	}
	
	// Anima a nave que passa de fundo
	//
	// --- É preciso corrigir
	// --- Detectar quantos pixels são de incremento por cada pixel scrollado
	// --- Como está agora vai dar problemas ao fazer scroll repetidamente ou em screens diferentes
	//

	if(pixelsScrolled > distanceToFlyingSpaceship){
		id_flyingSpaceship.css("display", "block");
		var flyingSpaceship_pos = id_flyingSpaceship.position();
		var startAnimationPoint = pixelsScrolled - distanceToFlyingSpaceship;
		id_flyingSpaceship.css("left", ((startAnimationPoint)*.4)-450 + "px");
	} else {
		id_flyingSpaceship.css("display", "none");
	}
});


// +++ TAMANHO DO INCREMENTO +++ //

function defineIncrementPixels(){
	mountain_start = (heightOfBrowser / 100) * 100;
	mountain_finish = (heightOfBrowser / 100) * 30;
	mountain_increment = total_heightOfAnimationDivs/(mountain_start - mountain_finish);
	mountain_increment = 1/mountain_increment;

	aldeia_start = (heightOfBrowser / 100) * 150;
	aldeia_finish = (heightOfBrowser / 100) * 50;
	aldeia_increment = total_heightOfAnimationDivs/(aldeia_start - aldeia_finish);
	aldeia_increment = 1 / aldeia_increment;

	cloud1_start = (heightOfBrowser / 100) * 70;
	cloud1_finish = (heightOfBrowser / 100) * 30;
	cloud1_increment = total_heightOfAnimationDivs/(cloud1_start - cloud1_finish);
	cloud1_increment = 1 / cloud1_increment;

	cloud2_start = (heightOfBrowser / 100) * 50;
	cloud2_finish = (heightOfBrowser / 100) * 30;
	cloud2_increment = total_heightOfAnimationDivs/(cloud2_start - cloud2_finish);
	cloud2_increment = 1 / cloud2_increment;

	cloud3_start = (heightOfBrowser / 100) * 90;
	cloud3_finish = (heightOfBrowser / 100) * 60;
	cloud3_increment = total_heightOfAnimationDivs/(cloud3_start - cloud3_finish);
	cloud3_increment = 1 / cloud3_increment;
}



//Document ready
$(function() {

// --- IDs to variables --- //

id_openScreen = $("#openScreen"),
id_bluePrint = $("#bluePrint"),
id_shootScope = $("#shootScope"),
id_window = $(window),
id_mainTitle = $("#mainTitle"),
id_startButton = $("#startButton"),
id_mira = $("#mira"),
id_shootCoordinates = $("#shootCoordinates"),
id_mountainsBackground = $("#mountainsBackground"),
id_aldeia = $("#aldeia"),
id_clouds1 = $("#clouds1"),
id_clouds2 = $("#clouds2"),
id_clouds3 = $("#clouds3"),
id_flyingSpaceship = $("#flyingSpaceship"),
id_pageWrapper = $("#page-wrapper");

// ------------------------ //

	/* Change height of divs */
    heightOfBrowser = id_window.height();
 	$(".screenHeight").css({"height":heightOfBrowser});
 	$(".no-touch .x3").css({"height":heightOfBrowser*3});
 	heightOfAnimationDivs();
 	defineIncrementPixels();
 	id_mountainsBackground.css("top", mountain_start + "px");
 	id_aldeia.css("top", aldeia_start + "px");
 	id_clouds1.css("top", cloud1_start + "px");
 	id_clouds2.css("top", cloud2_start + "px");
 	id_clouds3.css("top", cloud3_start + "px");
 	
 	$( window ).resize(function() {
 		
		heightOfBrowser = id_window.height();
		$(".screenHeight").css({"height":heightOfBrowser});
		$(".no-touch .x3").css({"height":heightOfBrowser*3});
		heightOfAnimationDivs();
		defineIncrementPixels();
		id_mountainsBackground.css("top", mountain_start + "px");
		id_aldeia.css("top", aldeia_start + "px");
		id_clouds1.css("top", cloud1_start + "px");
		id_clouds2.css("top", cloud2_start + "px");
 		id_clouds3.css("top", cloud3_start + "px");

	});

});

//Controla visibilidade do menu de contacto
var menuVisibility = false;

function toggleMenu(){
	if(!menuVisibility){
		id_pageWrapper.css("display", "block");
		$("#menu").html("<i class='fa fa-times'></i>");
		menuVisibility = true;
	} else {
		id_pageWrapper.css("display", "none");
		$("#menu").html("<i class='fa fa-comments'></i>");
		menuVisibility = false;
	}
}



//PORTFOLIO CONTROLER
var portfolioSection = 0;


// PAGE ANIMATIONS
var pageOrder = ["openScreen", "bluePrint", "shootScope", "portfolio"];
var currentPage = "openScreen";
var currentPageIndex = pageOrder.indexOf(currentPage);


function animateToID(nameOfID, speedOfScroll){
	if(!speedOfScroll){
		speedOfScroll = 4000;
	}
	//Bloqueia detecção de scroll enquanto a animação decorre
	automaticScrolling	= false;
	//	

	$('html, body').animate({
    	scrollTop: $("#"+nameOfID).offset().top
    }, speedOfScroll);
	currentPage = nameOfID;
	currentPageIndex = pageOrder.indexOf(currentPage);
	//return false;

	//$("#infoMessages").text(currentPageIndex);
	//volta a permitir fazer scroll automático
	setTimeout( function() { automaticScrolling	= true; }, 1600);
}

// ON WINDOW STOP RESIZE
var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;
id_window.resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        //animateToID(currentPage, 300);
        if(!isTouch) { animateToID(currentPage, 300); }
    }               
}


//Sound Manager
// function playSound(soundFile){
// 	$("<audio></audio>").attr({ 
// 		'src':'sounds/'+soundFile+'.mp3', 
// 		'autoplay':'autoplay'
// 	});
// }
// function playMoaning(){
// 	var audioPlayer = this; setTimeout(function() { 
// 		playSound('moaning'); 
// 	}, 3500);
// }
