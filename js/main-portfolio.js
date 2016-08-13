window.onload = function(){
	var images = ['img/cloud1.png', 'img/cloud2.png', 'img/cloud3.png', 'img/lua_animation.gif', 'img/lua_olhosFundo.png','img/mountains.gif','img/rocketFlames_rotated.gif','img/rocketFlames.gif','img/spaceShipFlying.gif','img/sprite_aldeia.png','img/sprite_finalMoon.gif','img/sprite_passeio.svg','img/sprite_spaceships_all_rotated.png','img/sprite_spaceships_code_rotated.png','img/sprite_spaceships_code.png','img/sprite_spaceships_illustration_rotated.png','img/sprite_spaceships_illustration.png','img/sprite_spaceships_mobile_rotated.png','img/sprite_spaceships_mobile.png','img/sprite_spaceships_print_rotated.png','img/sprite_spaceships_print.png','img/sprite_spaceships_video_rotated.png','img/sprite_spaceships_video.png','img/stars.gif','img/topBanner.png'];

	var loadingScreen = document.getElementById('loadingScreen');
	var loader = document.getElementsByClassName('loader')[0];
	var loadingInfo = document.getElementById('loadingScreenInfo');
	var loaded_images = 0;  //图片数初始化
	var numImages = images.length;

	for(var i = 0;i<numImages;i++){
		var image = new Image();
		image.src = images[i];

		loadingInfo.innerHTML = '';
		image.onload = function(ev){
			loaded_images++;  //图片数量增加
			if(loaded_images == numImages){ //判断图片数量等于图片数组总长度
	 		  	loader.className = 'hideLoader';
	 			loadingScreen.style.opacity = '0';
	 			loadingInfo.style.opacity = '0';
	 			setTimeout(function(){
	 				loadingScreen.style.display = 'none';
	 			},1000);
			}else{
				loadingInfo.innerHTML = (100*loaded_images/numImages) + '%';
			}
		};
	}

	/*--bluePrint--*/
	var centerTheSpaceShips = document.getElementById('centerTheSpaceShips');
	var spaceShips = centerTheSpaceShips.getElementsByTagName('a');
	var spaceshipTypeSelected = document.getElementById('spaceshipTypeSelected');
	var bluePrintFooter = document.getElementById('bluePrintFooter');
	var shootCoordinates = document.getElementById('shootCoordinates');
	var h2 = shootCoordinates.getElementsByTagName('h2')[0];
	var wavingSpaceship = document.getElementById('wavingSpaceship');
	var mira = document.getElementById('mira');
	var text = ['Web design','Mobile','Print','Video','Illustration'];

	//遍历centerTheSpaceShips下面的a标签
	for(var i=0;i<spaceShips.length;i++){
		spaceShips[i].index = i;
		//添加移入移出事件
		spaceShips[i].onmouseover = function(){
			//changeNameOnBluePrint(text[this.index],i);
			spaceshipTypeSelected.innerHTML = text[this.index];
			bluePrintFooter.innerHTML = '&minus; CLICK TO CONTINUE &minus;';
		};
		spaceShips[i].onmouseout = function(){
			//cleanNameOnBluePrint();
			spaceshipTypeSelected.innerHTML = 'ALL';
			bluePrintFooter.innerHTML = '&minus; Start the adventure &minus;';
		};
		//点击之后，运动到shootCoordinates，wavingSpaceship变成相应的图标和type
		spaceShips[i].onclick = function(){
			h2.innerHTML = '';
			//添加href
			this.href = "javascript:animateToID('shootScope',1000);";
			var type = this.attributes[1].value.split('_')[1]; //code  
			for(var i=0;i<data.length;i++){
				for(var j=0;j<data[i].type.length;j++){
					if(data[i].type[j] == type){
						wavingSpaceship.style.backgroundImage = 'url(img/sprite_spaceships_'+ data[i].type[j] +'_rotated.png)';
					}
				}
			}
			h2.innerHTML = "Shoot For <br/> The Moon";
		};
	}

	mira.onclick = function(){
		var url = getComputedStyle(wavingSpaceship)['backgroundImage']; //url
		var type = url.split('_')[2];  //all
		centerAndMiddle.style.display = 'block';
		portfolioDFC.style.display = 'none';

		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].type.length;j++){
				if(data[i].type[j] == type){
					//改变href地址
					mira.href = 'javascript:shotFired=true;animateToID("button_'+ type +'");';
					//清空内容
					html = '';
				}else{
					mira.href = 'javascript:shotFired=true;animateToID("portfolio");'
				}
			}
		}
		portfolio(type);  //调用
	};

	/*--portfolio点击事件--*/
	var portfolioFilter = document.getElementsByClassName('portfolioFilter');
	var portfolio_thumbnails=document.getElementById('portfolio_thumbnails');
	var thumbnail = portfolio_thumbnails.getElementsByClassName('thumbnail');
	var html = '';
	
	changePortfolioVisibility('type','all'); //初始化
	//typeOfWork每一个a标签的点击事件
	for(var i=0;i<portfolioFilter.length;i++){
		portfolioFilter[i].index = i;
		portfolioFilter[i].onclick = function(ev){
			centerAndMiddle.style.display = 'block';
			portfolioDFC.style.display = 'none';

			//点击的时候，需要清空所有的内容
			for(var i=0;i<portfolioFilter.length;i++){
				html = '';  //注意是清空html
				changeSelectedButton();
			}
			//判断如果当前索引是第0个
			if(this.index == 0){
				changePortfolioVisibility('type','all');
			}else{
				var type = this.attributes[0].value.split('_')[1]; //code
				portfolio(type);
			}
		};
	}

	function portfolio(type){
		//判断如果点击的当前a标签的id与data数据中的type值一致，调用函数
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].type.length;j++){
				if(data[i].type[j] == type){  //true
					html += '<div class="thumbnail"> <a href="javascript:;"> <img src="img/portfolio/' + data[i].thumbnail + '" alt="laFourchete" /> <span class="dark-background">' + data[i].name + '<em>' + data[i].date + '</em></span></a></div>';
				}
			}
		}
		portfolio_thumbnails.innerHTML = html;
		//为防止点击事件冲突，在数据渲染之后再添加事件
		//用事件委托，将id挂起，找事件源，对应id添加事件
		for(var n=0;n<thumbnail.length;n++){
			thumbnail[n].index = n;
			thumbnail[n].onclick = function(ev){
				var imgs = ev.target; //找到事件源
				var tId = imgs.src.match(/\d+/g); //用正则匹配到src中的数字，找到下标
				showThisJobFullscreen(tId);
			};
		}
		changeSelectedButton(type);  //给当前添加样式
	}

	//图片点击事件
	function imageClick(){
		for(var i=0;i<data.length;i++){
			//showThisJobFullscreen('+ data[i].id +')
			html += '<div class="thumbnail"> <a href="javascript:;"> <img src="img/portfolio/' + data[i].thumbnail + '" alt="laFourchete" /> <span class="dark-background">' + data[i].name + '<em>' + data[i].date + '</em></span></a></div>';
		} 
		portfolio_thumbnails.innerHTML = html;
		//遍历每一项，点击缩略图显示相应大图内容
		for(var i=0;i<thumbnail.length;i++){
			thumbnail[i].index = i;
			thumbnail[i].onclick = function(ev){
				showThisJobFullscreen(data[this.index].id);
				ev.cancelBubble=true; //阻止冒泡
			};
		}
	}

	var totalImages = 0;
	var currentImage = 0;
	function changeVisibleImage(num){
		var mainImage = document.getElementById('mainImage');
		var imageElement = mainImage.getElementsByClassName('imageElement');
		var buttonPrevious = mainImage.getElementsByClassName('buttonPrevious')[0];
		var buttonNext = mainImage.getElementsByClassName('buttonNext')[0];
		//下一个按钮点击事件
		buttonNext.onclick = function(){
			num++;
			if(num > imageElement.length - 1){
				num = 0;
			}
			changeImg();
		};
		//上一个按钮点击事件
		buttonPrevious.onclick = function(){
			num--;
			if(num < 0){
				num = imageElement.length - 1;
			}
			changeImg();
		};
		function changeImg(){
			for(var i=0;i<imageElement.length;i++){
				imageElement[i].style.display = 'none';
			}
			imageElement[num].style.display = 'block';
		}
	}

	var centerAndMiddle = document.querySelector('#portfolio .centerAndMiddle');
	var portfolioDFC = document.getElementById('portfolioDisplayFixedContainer');
	var content = portfolioDFC.getElementsByClassName('content')[0];
	/*--点击portfolio中每一张图片显示大图或者视频，进行切换--*/
	function showThisJobFullscreen(jobID){
		centerAndMiddle.style.display = 'none';
		portfolioDFC.style.display = 'block';
		for(var i=0;i<data.length;i++){
			if(data[i].id == jobID){  //data[i].id == jobID
				var t = data[i].type.length;
				var t_html = '';
				for(var j=0;j<t;j++){
					if(!t_html){
						t_html = "<a href='javascript:changePortfolioVisibility(\"type\",\"" + data[i].type[j] + "\");' class='detailButton'>" + data[i].type[j] + "</a>";
					}else{
						t_html += "<a href='javascript:changePortfolioVisibility(\"type\",\"" + data[i].type[j] + "\");' class='detailButton'>" + data[i].type[j] + "</a>";
					}
				}
				//获取typeOfCode
				var tc = data[i].typeOfCode.length; 
				var tc_html = '';
				for(var tcTemp = 0 ; tcTemp < tc ; tcTemp++){
					if(!tc_html){
						tc_html = "";
					}else{
						tc_html += "<a href='javascript:changePortfolioVisibility(\"typeOfCode\",\"" + data[i].typeOfCode[tcTemp] + "\");' class='detailButton'>" + data[i].typeOfCode[tcTemp] + "</a>";
					}
				}
				//获取typeOfSoftware
				var ts = data[i].typeOfSoftware.length;  
				var ts_html = '';
				for(var tsTemp = 0 ; tsTemp < ts ; tsTemp++){
					if(!ts_html){
						ts_html = "<a href='javascript:changePortfolioVisibility(\"typeOfSoftware\",\"" + data[i].typeOfSoftware[tsTemp] + "\");' class='detailButton'>" + data[i].typeOfSoftware[tsTemp] + "</a>";
					}else{
						ts_html += "<a href='javascript:changePortfolioVisibility(\"typeOfSoftware\",\"" + data[i].typeOfSoftware[tsTemp] + "\");' class='detailButton'>" + data[i].typeOfSoftware[tsTemp] + "</a>";
					}
				}

 				//获取数据中mainImages
				var mi = data[i].mainImages.length; 
				var mi_html = '';
				totalImages = mi;
				currentImage = 0;
				for(var miTemp = 0; miTemp < mi; miTemp++){
					var str = data[i].mainImages[miTemp];
					if(!mi_html){
						//判断图片格式
						if(str.slice(-3) == 'jpg' || str.slice(-3) == 'png' || str.slice(-4) == 'jpeg'){
							mi_html = '<div class="imageElement visible"><img src="img/portfolio/'+ data[i].mainImages[miTemp] +'"></div>';
						}else if(str.slice(-3) == 'mp4'){
							mi_html = '<div class="imageElement visible"><video width="1024" height="575" controls autoplay><source src="img/portfolio/'+ data[i].mainImages[miTemp] +'" type="video/mp4">Your browser does not support the video tag.</video></div>';
						}else{
							mi_html = '<div class="imageElement visible">' + data[i].mainImages[miTemp] +'</div>';
						}
					}else{
						if(str.slice(-3) == 'jpg' || str.slice(-3) == 'png' || str.slice(-4) == 'jpeg'){
							mi_html += '<div class="imageElement hidden"><img src="img/portfolio/'+ data[i].mainImages[miTemp] +'"></div>';
						}else if(str.slice(-3) == 'mp4'){
							mi_html += '<div class="imageElement hidden"><video width="1024" height="575" controls autoplay><source src="img/portfolio/'+ data[i].mainImages[miTemp] +'" type="video/mp4">Your browser does not support the video tag.</video></div>';
						}else{
							mi_html += '<div class="imageElement hidden">' + data[i].mainImages[miTemp] +'</div>';
						}
					}
				}
				//changeVisibleImage(currentImage-1)
				content.innerHTML = "<div id='mainImage'><a href='javascript:;' class='navigationButtons buttonPrevious'>" +
						"<i class='fa fa-chevron-left' style='left:20px;'></i></a>" + 
						"<a href='javascript:;' class='navigationButtons buttonNext'><i class='fa fa-chevron-right' style='right:20px;'></i></a>" + 
						"<a href='javascript:;' class='closeButton'><i class='fa fa-times'></i></a>" + mi_html + "</div>" +
						"<div id='centerColumns'>" +
						"<div class='leftColumn'>" +
							"<h2>" + data[i].name + "</h2>" +
							"<h4>" + data[i].clientName + " | " + data[i].date + "</h4>" + 
							"<p>" + data[i].description + "</p>" +
							"<p><a href='" + data[i].linkToProject + "' target='_BLANK' class='linkToProject'>Visit work</a></p></div>" +
						"<div class='rightColumn'>" +
							"<h3>Category</h3>" + t_html +
							"<div id='codeUsed'><h3>Code used</h3>" + tc_html + "</div>" +
							"<h3>Software used</h3>" + ts_html + "</div></div>";

				var navigationButtons = document.getElementsByClassName('navigationButtons');
				var linkToProject = document.getElementsByClassName('linkToProject');
				var codeUsed = document.getElementById('codeUsed');
				var closeButton = document.getElementsByClassName('closeButton')[0];
				
				if(totalImages > 1){ //如果总的图片数大于1,就让切换的箭头显示，否则隐藏
					// navigationButtons[0].style.display = 'block';  类数组，要加下标，否则报错
					$(".navigationButtons").css("display", "block");
				}else{
					// navigationButtons[0].style.display = 'none';
					$(".navigationButtons").css("display", "none");
				}
				if(data[i].linkToProject == '' || data[i].linkToProject == '#'){
					linkToProject[0].style.display = 'none';
					// $(".linkToProject").css("display", "none");
				}
				if(tc_html == "" || tc_html == "#" ){
					codeUsed.style.display = 'none';
					// $("#codeUsed").css("display", "none");
				}
				animateToID('portfolio', 20);

				//调用图片切换函数
				changeVisibleImage(currentImage);

				if(portfolioDFC.style.display == 'block'){
					closeButton.onclick = function(){
						portfolioDFC.style.display = 'none';
						centerAndMiddle.style.display = 'block';
					};
				}
				
			}
		}
	}

	/*--给portfolio_thumbnails添加内容--*/
	function changePortfolioVisibility(filter,portfolioToShow){
		changeSelectedButton(portfolioToShow);  //显示selected样式
		hidePortfolioDisplay();  
		html = '';

		if(filter == ''){
			filter = 'type';
		}
		//portfolioToShow为all时，让showThisJob = true
		if(portfolioToShow == 'all'){ //changePortfolioVisibility('type','all')
			var showThisJob = true;
		}

		for(var i=0;i<data.length;i++){
			//判断参数类型为type
			if(filter == 'type'){
				var t = data[i].type.length;
				var t_html = '';
				for(var tTemp = 0 ; tTemp < t ; tTemp++){
					if(data[i].type[tTemp] == portfolioToShow){
						showThisJob = true;
					}
				}
			}
			//判断参数类型为typeOfCode
			if(filter == 'typeOfCode'){
				alert(0);
				var tc = data[i].typeOfCode.length;
				var tc_html = '';
				for(var tcTemp = 0 ; tcTemp < tc ; tcTemp++){
					if(data[i].typeOfCode[tcTemp] == portfolioToShow){
						showThisJob = true;
					}
				}
			}
			//判断参数类型为typeOfSoftware
			if(filter == 'typeOfSoftware'){
				var ts = data[i].typeOfSoftware.length;
				var ts_html = '';
				for(var tsTemp = 0 ; tsTemp < ts ; tsTemp++){
					if(data[i].typeOfSoftware[tsTemp] == portfolioToShow){
						showThisJob = true;
					}
				}
			}
		}
		if(showThisJob){
			//如果为true，拼接字符串将缩略图及内容添加到页面
			imageClick();
		}
	}

	/*---change class/css---*/
	function changeSelectedButton(newHighlight){
		$('#typeOfWork a').removeClass('selected');
		if(newHighlight){
			$('#button_' + newHighlight).addClass('selected');
		}
	}
	function hidePortfolioDisplay(){
		$('#mainImage').html('');
		$('#portfolioDisplayFixedContainer').css('display','none');
		$('#portfolio .conterAndMiddle').css('display','block');
	}
}; 	

