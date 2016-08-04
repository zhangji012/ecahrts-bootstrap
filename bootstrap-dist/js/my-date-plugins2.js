/******************************************************
 * @自定义日期插件
 */
!function(){
	
	//进入严格模式
	"use strict";
	
	function myDatePluginInit(id, supId){
		
		//插入样式
		var styles = document.createElement('style');
		styles.type = "text/css";
		styles.rel = "stylesheet";
				//兼容浏览器的插件规则
		try{
						
			styles.appendChild(
				document.createTextNode("div#" + supId +" {position: relative;z-index:999;display:inline;}"+
								"div#" + supId +" div#date-plugin{position: absolute;background:#fff;width: 180px;height: 128px;border: 1px solid rgb(200,216,237);top: 25px;left: 0px;z-index:9999}"+
								"div#" + supId +" div#date-plugin ul{list-style: none;margin: 0;padding: 0; }"+
								"div#" + supId +" div#date-plugin ul li{float: left;text-align: center;}"+
								"div#" + supId +" ul#date-plugin-year > li{width: 59px;height: 30px;line-height: 30px;background: none repeat scroll 0 0 rgb(32,62,118);color:#fff;}"+
								"div#" + supId +" ul#date-plugin-year > li > span{display: block;width: 42px;height: 30px;line-height: 30px;background: none repeat scroll 0 0 rgb(32,62,118);font-weight: bold;cursor: pointer;color: white;color:#fff;}"+
								"div#" + supId +" ul#date-plugin-year > li > span.right{margin-left: 17px;}"+
								"div#" + supId +" ul#date-plugin-month li{width: 42px;height: 30px;line-height: 30px;margin: 1px 1px;background:rgb(200,216,237);color: #000;font-weight: bold;cursor: pointer;}"
			));
			
		}catch(ex){
			
			styles.text = "div#" + supId +" {position: relative;z-index:999;display:inline;}"+
			"div#" + supId +" div#date-plugin{position: absolute;background:#fff;width: 180px;height: 128px;border: 1px solid rgb(200,216,237);top: 25px;left: 0px;}"+
			"div#" + supId +" div#date-plugin ul{list-style: none;margin: 0;padding: 0; }"+
			"div#" + supId +" div#date-plugin ul li{float: left;text-align: center;}"+
			"div#" + supId +" ul#date-plugin-year > li{width: 59px;height: 30px;line-height: 30px;background-color:rgb(32,62,118); color:#fff;}"+
			"div#" + supId +" ul#date-plugin-year > li > span{display: block;width: 42px;height: 30px;line-height: 30px;background-color:rgb(32,62,118);font-weight: bold;cursor: pointer;color: white;color:#fff;}"+
			"div#" + supId +" ul#date-plugin-month li{width: 42px;height: 30px;line-height: 30px;margin: 1px 1px;background:rgb(200,216,237);color: #000;font-weight: bold;cursor: pointer;}"
		
		}
		
		document.head.appendChild(styles);
		
		//插入元素
		var inerH = '<div id="date-plugin">' +
					'<ul id="date-plugin-year">' +
					'<li><span class="left year-btn">&lt;&lt;</span></li>'+
					'<li id="yearValue"></li>'+
					'<li><span class="right year-btn">&gt;&gt;</span></li>'+
					'</ul>'+
					'<ul id="date-plugin-month">'+
					'<li>1</li>'+
					'<li>2</li>'+
					'<li>3</li>'+
					'<li>4</li>'+
					'<li>5</li>'+
					'<li>6</li>'+
					'<li>7</li>'+
					'<li>8</li>'+
					'<li>9</li>'+
					'<li>10</li>'+
					'<li>11</li>'+
					'<li>12</li>'+
					'</ul>'+
					'</div>';
					
					
		
		var supPlugin = document.getElementById(supId);
		supPlugin.innerHTML = supPlugin.innerHTML + inerH;
		
		
		//获取插件主块元素，然后隐藏
		var date_plugin = document.querySelector("div#" + supId + ' #date-plugin');
		
		
		date_plugin.style.display = "none";
		
		//获取显示的输入框的元素
		var date_plugin_btn = document.getElementById(id);
		
		//获取月数的按钮组
		var month_btns = document.querySelectorAll("div#" + supId + " ul#date-plugin-month li");

		
		//操作年
		var year_left_btn = document.querySelector("div#" + supId + " ul#date-plugin-year li span.left");
		var year_right_btn = document.querySelector("div#" + supId + " ul#date-plugin-year li span.right");
		var year_value = document.querySelector("div#" + supId + " ul#date-plugin-year li#yearValue");
		
		//初始化年的值
		year_value.innerHTML = new Date().getFullYear();
		
		//定义当前时间
		var currentDate = new Date();
		
		
		
		//时间插件DIV,添加点击事件，阻止事件冒泡。
		supPlugin.addEventListener('click',function(e){
			e = e || window.event;
			e.stopPropagation(); 
		});
		
		//向前前按钮，年数减小
		year_left_btn.addEventListener('click', yearPrev);
		
		function yearPrev(e){
			year_value.innerHTML = year_value.innerHTML - 1;
			
			//判断如果年数等于当前时间的年数，且月数大于当前时间就修改按钮背景颜色
			if(parseInt(year_value.innerHTML) == currentDate.getFullYear()){
				for(var i = 0, len = month_btns.length; i < len; i++){
					if(currentDate.getMonth() < i){
						month_btns[i].style.backgroundColor = "#fff";
						month_btns[i].removeEventListener('click', monthBtnsEvent);
					}else{
						month_btns[i].style.backgroundColor = "rgb(200,216,237)";
					}
				}
				
			}else if(parseInt(year_value.innerHTML) < currentDate.getFullYear()){
				//如果当前年数大于所选年数还原按钮背景色。
				for(var i = 0, len = month_btns.length; i < len; i++){
					month_btns[i].style.backgroundColor = "rgb(200,216,237)";
					month_btns[i].addEventListener('click', monthBtnsEvent);
				}
				year_right_btn.addEventListener('click', yearNext);
				year_right_btn.style.backgroundColor = "rgb(32,62,118)";
			}
		}
		
		//向后按钮，年数增加
		year_right_btn.addEventListener('click', yearNext);
		
		//年数向后按钮点击事件处理程序
		function yearNext(e){
			
			//隐式转换，与使用Number构造函数效果一样。
			year_value.innerHTML = year_value.innerHTML - 1 + 2;
			
			//判断如果年数等于于当前时间年数，而月数大于当前时间就修改按钮背景颜色
			if(parseInt(year_value.innerHTML) == currentDate.getFullYear()){
				for(var i = 0, len = month_btns.length; i < len; i++){
					if(currentDate.getMonth() < i){
						month_btns[i].style.backgroundColor = "#fff";
						month_btns[i].removeEventListener('click', monthBtnsEvent);
					}else{
						month_btns[i].style.backgroundColor = "rgb(200,216,237)";
						month_btns[i].addEventListener('click', monthBtnsEvent);
					}
				}
				year_right_btn.style.backgroundColor = "rgb(32,62,118)";
				year_right_btn.removeEventListener('click', yearNext);
				
			}else if(parseInt(year_value.innerHTML) < currentDate.getFullYear()){
				//如果当前年数大于所选年数还原按钮背景色。
				for(var i = 0, len = month_btns.length; i < len; i++){
					month_btns[i].style.backgroundColor = "rgb(200,216,237)";
					month_btns[i].addEventListener('click', monthBtnsEvent);
				}
				year_right_btn.style.backgroundColor = "rgb(32,62,118)";
			}
			
		}
		
		//月数按钮点击事件
		function monthBtnsEvent(e){
			var monthValue = parseInt(this.innerHTML);
			switch(monthValue){
				case 1: monthValue = "0" + monthValue; break;
				case 2: monthValue = "0" + monthValue; break;
				case 3: monthValue = "0" + monthValue; break;
				case 4: monthValue = "0" + monthValue; break;
				case 5: monthValue = "0" + monthValue; break;
				case 6: monthValue = "0" + monthValue; break;
				case 7: monthValue = "0" + monthValue; break;
				case 8: monthValue = "0" + monthValue; break;
				case 9: monthValue = "0" + monthValue; break;
			}
			
			date_plugin_btn.value = year_value.innerHTML + monthValue;
			date_plugin.style.display = "none";
			year_value.innerHTML = new Date().getFullYear();
		}
		
		
		//为输入框添加点击事件，显示插件,并初始化按钮显示样式
		date_plugin_btn.addEventListener('click', function(e){
			date_plugin.style.display = "block";
			
			//判断如果年数等于于当前时间年数，而月数大于当前时间就修改按钮背景颜色
			if(parseInt(year_value.innerHTML) == currentDate.getFullYear()){
				for(var i = 0, len = month_btns.length; i < len; i++){
					if(currentDate.getMonth() < i){
						month_btns[i].style.backgroundColor = "#fff";
						month_btns[i].removeEventListener('click', monthBtnsEvent);
					}else{
						month_btns[i].style.backgroundColor = "rgb(200,216,237)";
						month_btns[i].addEventListener('click', monthBtnsEvent);
					}
				}
				year_right_btn.style.backgroundColor = "rgb(32,62,118)";
				year_right_btn.removeEventListener('click', yearNext);
				
			}
		});
		
		//点击DOM元素，隐藏插件
		var container = document.getElementById(container);
		document.documentElement.addEventListener('click', function(){
			date_plugin.style.display = "none";
			year_value.innerHTML = new Date().getFullYear();
		});
		
	}
	
	window.myDatePluginInit = myDatePluginInit;
	
}();

