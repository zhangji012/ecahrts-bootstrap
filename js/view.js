$(document).ready(function(){
//	echarts.js报echarts is not defined,使用定时器解决
	var myTimeout_vzt = setTimeout(function to(){
		if(typeof echarts == "undefined" ){
			myTimeout_vzt = setTimeout(to,1);
		}else{
			init_vzt();
			clearTimeout(myTimeout_vzt);
		}
	},1);
	

	function init_vzt(){
		//页面初始化时#select_ipt input获取总裁、data-id
		var defaultOrgName = BI.VisibilityOrg.getVisibilityOrgDataById(BI.CONTEXT.getCurrentUserOrgId()).defaultChoosedOrgName;
		var defaultOrgId = BI.VisibilityOrg.getVisibilityOrgDataById(BI.CONTEXT.getCurrentUserOrgId()).defaultChoosedOrgId;
		$("#viem-zt #select_ipt input").val(defaultOrgName);
		$("#viem-zt #select_ipt input").attr("data-id",defaultOrgId);
		var rootNodeId = '2010000004405665637,2010000004405662475,2010000004405662474,7046000008701129867';
		var parentOrgIdList = BI.VisibilityOrg.getVisibilityOrgDataById(BI.CONTEXT.getCurrentUserOrgId()).parentOrgIdList;
		var orgMinLevel = 5;
		var node = parentOrgIdList;//要展开的节点
		var url_vzt = '../organization/loadOrganizationTree.action?organizationVo.maxLevel=1&organizationVo.defaultChoosedOrgId='+defaultOrgId;
		function strURL_vzt(){
			if(rootNodeId!=null){
				url_vzt += '&organizationVo.rootNodeId='+rootNodeId;
			}
			if(parentOrgIdList!=null && parentOrgIdList.split(',').length>1){
				url_vzt += "&organizationVo.parentOrgIdList="+parentOrgIdList;
			}
			if(node!=null){
				url_vzt += "&node="+node;
			}
			if(orgMinLevel!=null){
				url_vzt += "&organizationVo.minLevel="+orgMinLevel;
			}
		}
		strURL_vzt();
		//页面初始化时下拉菜单添加总裁
		$.ajax({
			url:url_vzt,
			type: "get",
	        async: false,
	        dataType: "json",
	        success: function (datas) {
	        	for(var i =0; i<datas.length; i++){
	        		$("#slttree-zt").append('<div class="select-tree">' +
							 '<div class="slt-box" >' +
								 '<div class="list-box">' +
									 '<div class="slt-main" id='+datas[i].entity.id+'>' +
									 	'<input type="radio" id="supMan" name="zt-bm-title" data-id='+datas[i].entity.id+' class="radio-inline" checked><i class="slt-icon">+</i><span class="slt-name" >'+datas[i].entity.name+'</span>' +
						 			 '</div>' +
						 		'</div>' +
						 	 '</div>');
	        	}
	        	
	        },
	        error:function(){
	        	alert("出错了");
	        }
		});
		
		/* 时间日历  模块 开始  */
		window.myDatePluginInit("my-date-plugin-vzt", "my-date-plugin-sup-vzt");
		var userDate_vzt = new Date();
		//处理时间的方法。
		function conversionDate_vzt(month, day){
			if(month < 10){
				month = "0" + month;
			}
			if(day < 10){ 
				day = "0" + day;
			}
			return day == undefined ? month : month + day;
		}

		//获取日期插件的元素
		var mydate_vzt = document.getElementById("my-date-plugin-vzt");
		mydate_vzt.value = userDate_vzt.getFullYear()+conversionDate_vzt(userDate_vzt.getMonth() + 1);
		/* 时间日历  模块 结束   */
		
	    //点击下拉选择框
	    $("#viem-zt #select_ipt").click(function(){
	        $("#viem-zt #select-tree").show();
	        initline_vzt();
	    }); 
	    
	    /* 点击 图标 展示和隐藏子节点 */
	    function clickIcon_vzt(){
	    	var onoff = false;
	    	node = $(this).parent().attr("id");
	    	url_vzt = '../organization/loadOrganizationTree.action?organizationVo.maxLevel=1&organizationVo.defaultChoosedOrgId='+defaultOrgId;
	    	strURL_vzt();
	    	if($(this).html()=="+"){
	    		//再次点击先去判断  是否发送过ajax请求
	    		if($(this).attr("data-ajax")=="open"){
	    			console.log("请求过了,不再处理");
	    		}else{
	    			$.ajax({
			        	url:url_vzt,
			        	type: "get",
				        async: false,
				        dataType: "json",
				        success: function (datas) {
				        	for(var i=0;i<datas.length;i++){
				        		//用于判断 具体某条分支下的  最后一个子节点  如果是最后一个子节点initline_vzt()方法  用于画线
				        		var strclass = "slt-line";
				        		if(i==datas.length-1){    //某条分支下的  最后一个节点
					        		strclass = "last-line";
					        	}
				        		//添加新的节点
				        		$("#viem-zt #"+node).append('<div class="slt-box" >' +
										 '<div class='+strclass+'></div>' +
										 '<div class="list-box" >' +
											 '<span class="box-line"></span>' +
											 '<div class="slt-main" id='+datas[i].entity.id+'>' +
											 	'<input type="radio" name="zt-bm-title" data-id='+datas[i].entity.id+' class="radio-inline"><i class="slt-icon">+</i><span class="slt-name" >'+datas[i].entity.name+'</span>' +
								 			 '</div>' +
								 		'</div>');
				        	}
				        	
				        	//判断是否为叶子节点  标记判断
				        	if(datas.length<=0){
				        		onoff = true;
				        	}
				        	
				        },
				        error:function(){
				        	alert("出错了");
				        }
			        });
	    		}
	    		//是叶子节点 隐藏icon图标 
	    		if(onoff){
	    			$(this).hide();
	    		}
	    		$(this).attr("data-ajax","open");    //发送ajax请求后  给自己加上一个标记  代表已经请求过了
	            $(this).siblings(".slt-box").show();
	            $(this).html("-");
	            initline_vzt();
	           
	        }else{
	            $(this).siblings(".slt-box").hide();
	            $(this).html("+");
	            initline_vzt();
	        }
	    	
	    	$("#viem-zt .slt-icon").unbind('click').on("click", clickIcon_vzt);  //点击失效，解绑后再绑定click事件解决
	        initline_vzt();
	    }
	    $("#viem-zt .slt-icon").unbind('click').on("click", clickIcon_vzt);
	    
	    initline_vzt();

	    /* 点击确定按钮  */
	    $("#viem-zt #slt_btnok").on("click", function () {
	    	$("#viem-zt #select-tree").hide();
	    	getChecked_vzt();
	        select_input_vzt();
	    });
	    
	    /*点击空白处下拉菜单消失  阻止冒泡*/
	    $("#viem-zt #select_div .form-group").on("click", function (e) {
	    	 e?e.stopPropagation():event.cancelBubble = true;
	    });
	    $(document).click(function() {
	        $("#viem-zt #select-tree").fadeOut();
	    });
	    //	点击取消按钮恢复初始值
		$('#viem-zt #slt-cancel').click(function(){
			$("#viem-zt #select_ipt input").val("总裁");
			$("#viem-zt #select-tree").hide();
			var chk = $('#viem-zt #supMan');
			chk[0].checked = true;
			getChecked_vzt();
		});
		//点击重置按钮  数据重置  日历重置 本月  组织选择 默认为总裁 
		$('#viem-zt .btn-div .reset').click(function(){
			$("#viem-zt #select_ipt input").val("总裁");
			
			//设置日历 为当前 本月时间
			mydate_vzt.value = userDate_vzt.getFullYear()+conversionDate_vzt(userDate_vzt.getMonth() + 1);
			var chk = $('#viem-zt #supMan');
			chk[0].checked = true;
			getChecked_vzt();
			/*下面图表消失*/
			$("#viem-zt #zt-viem-topmain").hide();
			$("#viem-zt #zt-viem-btmain").hide();
			$("#viem-zt .zt-table").show();
			$("#viem-zt #zt_table").empty();
		});
		
		//计算被选中的radio 把值填充到 input 和div 里面去
	    function select_input_vzt(){
	        var html ="";
	        $("#viem-zt #select_div input[type='radio']:checked").each(function(){
	            html += $(this).siblings(".slt-name").html();
	        });
	        $("#viem-zt #select_ipt input").val(html);    //截取最后一个,
	        
	    }
	    //input显示框获取下拉 树形菜单 选中按钮的值 data-id
	    function getChecked_vzt(){
	    	var data_id =$("#viem-zt #select_div input[type='radio']:checked").attr("data-id");
	    	$("#viem-zt #select_ipt input").attr("data-id",data_id);
	    }
	    //画线条
	    function initline_vzt(){
	    	//每条分支下的  最后一个节点  类名为last-line  计算线条bottom 值
	    	$("#viem-zt .last-line").each(function(){
	    		var h = $(this).siblings(".list-box").height()-8;
	    		$(this).css("bottom",h);
	    		$("#viem-zt .slt-line").css("bottom",0); /*同时打开两个页面时线的长度会出现问题*/
	    	})
	    	
	    }
	    /*图表中数据缺失为null时转化为0*/
		function dataNull_vzt(data){
			for(obj in data){
				if(data[obj] == null){
					data[obj]="0";
				}
			}
		}
		
	    /* echarts 绘制图表  模块  开始 */
	    //获取图表  初始化
	    var myChartzs_vzt = echarts.init(document.getElementById('zt-viemzs')); //图1 各岗位离职走势
	    var myChartqk_vzt = echarts.init(document.getElementById('zt-viemqk')); //图2 各岗位离职情况
	    var myChart1_vzt = echarts.init(document.getElementById('zt-viem1'));   //点击图2生成图3 离职走势
	    var myChart2_vzt = echarts.init(document.getElementById('zt-viem2'));   //点击图2生成图4 各工龄段在职分布
	    var myChart3_vzt = echarts.init(document.getElementById('zt-viem3'));   //点击图2生成图5 各工龄段离职情况
	    //图表公用的地区、日期、data-id
	    var $area = '';
	    var data_vzt = '';
	    var orgId_vzt = '';
	    /*点击查询 按钮  数据展示,点击之后0.2秒才可以再次请求数据，防止短时间高频点击对服务器产生负担 */
		$('#viem-zt .btn-div .btn-warning').click(funzt);
		var funzt = function bClick(){
			 $('#viem-zt .btn-div .btn-warning').unbind('click');
			timer = setTimeout(function(){
				 $('#viem-zt .btn-div .btn-warning').click(funzt);
			},200);

	    	data_vzt = $("#viem-zt #my-date-plugin-vzt").val(); /*共用日期*/
			orgId_vzt = $("#viem-zt #select_ipt input").attr("data-id");/*共用data-id*/
			var bline_vzt = "ZT";
			var position_vzt = "";			
	    	$area = $('#viem-zt #select_ipt input').val();   //选择的地区
	    	$('#viem-zt #zt-viem-btmain').hide(); /*重新查询时下面三张图消失*/
			$("#viem-zt #zt-viem-topmain").show();
			/* 清除画布 */
			myChartzs_vzt.clear();
			myChartqk_vzt.clear();
	    	/*懒加载*/
			myChartzs_vzt.showLoading();	
			myChartqk_vzt.showLoading();
			$.get('../hrdatas/obtainViewDataUp.action?calendarId='+data_vzt+'&orgId='+orgId_vzt+'&bline='+bline_vzt+'&position='+position_vzt+'').done(function(data){

				/*后台无数据显示无数据*/
//				if(data.viewDatas.lossPosition.length == 0 ){
//					$("#viem-zt #zt-viemqk").html("fd");
//				}else if(data.viewDatas.lossTrend.length == 0){
//					$("#viem-zt #zt-viemzs").html("");
//				}else if(data.viewDatas.length == 0 ){
//					$("#viem-zt #zt-viem-topmain").html("");
//				}
				/* 表格 填充数据  开始  */
				var tabData_vzt = data.viewDatas.rankInfo;
				for(obj in tabData_vzt){
					if(tabData_vzt[obj] == null){ //无数据时替换为--
						tabData_vzt[obj]="--";  
					}
				}
				var tabhtml_vzt ="";
				tabhtml_vzt ='<tr>'+
							'<td>部门负责人</td>'+
							'<td>'+tabData_vzt.deptManager+'</td>'+
							'<td>人数</td>'+
							'<td>'+tabData_vzt.deptCount+'</td>'+
							'<td>绩效排名(公司)</td>'+
							'<td>'+tabData_vzt.perfRank+'</td>'+
						 '</tr>'+
						 '<tr>'+
						 	'<td>离职排名（事业部内）</td>'+
						 	'<td>'+tabData_vzt.lossRanksy+ '/' + tabData_vzt.lossRanksy1 +'</td>'+
						 	'<td>离职排名（本部内）</td>'+
						 	'<td>'+tabData_vzt.lossRankbb+ '/' + tabData_vzt.lossRankbb1 +'</td>'+
						 	'<td>离职排名（公司）</td>'+
						 	'<td>'+tabData_vzt.lossRankgs+'/'+tabData_vzt.lossRankgs1+'</td>'+
						 '</tr>';
				$("#viem-zt .zt-table").hide();
				$("#viem-zt #zt_table").empty();
				$("#viem-zt #zt_table").append(tabhtml_vzt);
				/* 表格 填充数据  结束 */
				/* 数据加载完懒加载结束 */
				myChartzs_vzt.hideLoading();
				myChartqk_vzt.hideLoading();

				/*第一张图--折线图*/
				/*图表显示数据为null时显示为0*/
				dataNull_vzt(data.viewDatas.lossTrend);
				dataNull_vzt(data.viewDatas.lossPosition);
				
				var yearOne1_vzt = (data_vzt.substr(0,4)-1)  + "年";
				var yearOne2_vzt = data_vzt.substr(0,4) + "年";
				var lossOne1_vzt = [];     /*图1 去年离职率*/
				var lossOne2_vzt = [];     /*图1  今年离职率*/
				/*测试数据  数据缺失少于12个月情况*/ 
				var dataOnelg_vzt = data.viewDatas.lossTrend.length;
				if(dataOnelg_vzt<12){   
					for(var i=0;i<dataOnelg_vzt;i++){
						lossOne1_vzt.push(data.viewDatas.lossTrend[i].compltValue);
					}
				}else{
					for(var i=0;i<12;i++){
						lossOne1_vzt.push(data.viewDatas.lossTrend[i].compltValue);
					}
					for(var i=12;i<dataOnelg_vzt;i++){
						lossOne2_vzt.push(data.viewDatas.lossTrend[i].compltValue);
					}
				}
				//今年的 数据小于12  后面的月份缺失不足的  情况处理
				if(lossOne2_vzt.length<12){
					for(var i =lossOne2_vzt.length;i<12;i++){
						lossOne2_vzt.push("-");
					}
				}

				myChartzs_vzt.setOption({
			        title: {
			            text: $area+'各岗离职走势',
			            textStyle:{
			                color:"#444",
			                fontSize:16,
			                fontWeight:'normal'
			            },
			            x:'center'
			        },
			        tooltip: {
			            trigger: 'axis',
			            //formatter: '{a0}{b0}: {c0}%<br />{a1}{b1}: {c1}%'
			        },
			        grid: {
			            left: '3%',
			            right: 40,
			            bottom: '3%',
			            containLabel: true
			        },
			        legend: {
			            data:[yearOne1_vzt,yearOne2_vzt],
			            y:26
			        },
			        xAxis:  {
			            type: 'category',
			            boundaryGap: false,
			            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
			            axisLabel :{
			                interval:0       //设置成 0 强制显示所有标签
			            }
			        },
			        yAxis: {
			            type: 'value',
			            axisLabel: {
			                formatter: '{value}%'
			            }
			        },
			        series: [
			            {
			                name:yearOne1_vzt,
			                type:'line',
			                data:lossOne1_vzt,
			                markPoint: {
			                    data: [
			                        {type: 'max', name: '最大值'},
			                        {type: 'min', name: '最小值'}
			                    ]
			                },
			                markLine: {
			                   	data:[
			                        {type: 'average', name: '平均值'}
			                    ]
			                }
			            },
			            {
			                name:yearOne2_vzt,
			                type:'line',
			                data:lossOne2_vzt,
			                markPoint: {
			                    data: [
			                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
			                    ]
			                },
			                markLine: {
			                    data: [
			                        {type: 'average', name: '平均值'},
			                        [{
			                            symbol: 'arrow',
			                            label: {
			                                normal: {
			                                    formatter: '最大值'
			                                }
			                            },
			                            type: 'max',
			                            name: '最大值'
			                        }, {
			                            symbol: 'circle',
			                            x: '60%',
			                            y: '50%'
			                        }]
			                    ]
			                }
			            }
			        ]				
				})
				
				//第二张图--柱状图
				var dataTwolg_vzt = data.viewDatas.lossPosition.length;
				var yearTwo2_vzt = (data_vzt.substr(0,4)-1)  + "年" + data_vzt.substr(5,6) + '月'; //去年
				var yearTwo3_vzt = data_vzt.substr(0,4) + "年" + data_vzt.substr(5,6) + '月';      //今年
				var compltTwo_vzt = [];  /*图2 去年数据*/
				var compltTwo2_vzt = []; /*图2 今年数据*/
				var arrcompltTwo_vzt =['文职','接送货员','理货员','快递员','快递理货员','司机','管理人员','其他岗位'];
				for(var k =0;k<arrcompltTwo_vzt.length;k++){
					for(var i=0;i<dataTwolg_vzt;i++){
						if(arrcompltTwo_vzt[k]==data.viewDatas.lossPosition[i].levelName){
							compltTwo_vzt.push(data.viewDatas.lossPosition[i].histValue);
							compltTwo2_vzt.push(data.viewDatas.lossPosition[i].compltValue);
						}
					}		
				}
			
				myChartqk_vzt.setOption({
			        title:{
			            show:'true',
			            text:$area+'各岗离职情况',
			            textStyle:{
			                color:"#444",
			                fontSize:16,
			                fontWeight:'normal'
			            },
			            x:'center'
			        },
			        tooltip : {
			            trigger: 'axis',
			            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			            },
			            padding:[5,10],
			            textStyle:{
			
			            },
			            //formatter: '{b}<br/>{a0}: {c0}%<br />{a1}: {c1}%'
			        },
			        legend: {
			            data:[yearTwo2_vzt,yearTwo3_vzt],
			            y:26
			        },
			        grid: {
			            left: '3%',
			            right: '4%',
			            bottom: '3%',
			            containLabel: true
			        },
			        xAxis : [
			            {
			                type : 'category',
			                data : arrcompltTwo_vzt,
			                axisLabel :{
			                    interval:0       //设置成 0 强制显示所有标签
			                }
			            }
			
			        ],
			        yAxis: {
			            type: 'value',
			            axisLabel: {
			                formatter: '{value}%'
			            }
			        },
			        series : [
			            {
			                name:yearTwo2_vzt,
			                type:'bar',
			                data:compltTwo_vzt
			            },
			            {
			                name:yearTwo3_vzt,
			                type:'bar',
			                data:compltTwo2_vzt
			            },
			        ]				
				})
				
				myChartzs_vzt.resize();   //生成图表时图表自适应
	    		myChartqk_vzt.resize();
			})

	    }
		$('#viem-zt .btn-div .btn-warning').click(funzt);	
		
		/*点击图表生成3、4、5三张图,0.2秒后可以点击不同的柱状图请求数据*/
	    var time_vzt = '';      //定时器
		var onoff_vzt = true;   //开关，点击后0.2s切换
		var nameNext_vzt = '';	//点击第二张图，获取柱体的name,防止重复点击时重复加载	
	    myChartqk_vzt.on('click',function(params){ 
	    	$('#viem-zt #zt-viem-btmain').show();
	    	/*判断点击不同柱状并且间隔0.2可以获取后台数据*/
	    	if(onoff_vzt && nameNext_vzt!=params.name){
	    		/*清除画布*/
	    		myChart1_vzt.clear(); 
	    		myChart2_vzt.clear(); 
	    		myChart3_vzt.clear(); 
		    	/*下面三张图懒加载*/
		    	myChart1_vzt.showLoading();	
		    	myChart2_vzt.showLoading();
		    	myChart3_vzt.showLoading();
		    	
	    		nameNext_vzt = params.name;
	    		onoff_vzt = false;
	    		timer_vzt = setTimeout(function(){
		    		onoff_vzt = true;
		    	},200)
	    		clearTimeout(time_vzt);
				var bline_vzt = "ZT";
				var position_vzt = "";
				position_vzt =params.name;
				var yearThree1_vzt = (data_vzt.substr(0,4)-1)  + "年" ;
				var yearThree2_vzt = data_vzt.substr(0,4) + "年" ;
				var yearThree3_vzt = (data_vzt.substr(0,4)-1) + "年" + data_vzt.substr(5,6) + '月';
				var yearThree4_vzt = data_vzt.substr(0,4) + "年" + data_vzt.substr(5,6) + '月';
		    	$.get('../hrdatas/obtainViewDataDown.action?calendarId='+data_vzt+'&orgId='+orgId_vzt+'&bline='+bline_vzt+'&position='+position_vzt+'').done(function(data){
		    		/*数据加载完成，懒加载消失*/
		    		myChart1_vzt.hideLoading(); 
		    		myChart2_vzt.hideLoading(); 
		    		myChart3_vzt.hideLoading(); 

		    		/*图表显示数据为null时显示为0*/
					dataNull_vzt(data.viewDatas.lossPositionTrend);
					dataNull_vzt(data.viewDatas.workAgeInfo);
					var lossThree1_vzt = [];     /*图3 去年离职率*/
					var lossThree2_vzt = [];     /*图3  今年的离职率*/
					var dataThreelg1_vzt = data.viewDatas.lossPositionTrend.length;
					if(dataThreelg1_vzt<12){   //测试数据  数据缺失情况 
						for(var i=0;i<dataThreelg1_vzt;i++){
							lossThree1_vzt.push(data.viewDatas.lossPositionTrend[i].empLoseRate);
						}
					}else{
						for(var i=0;i<12;i++){
							lossThree1_vzt.push(data.viewDatas.lossPositionTrend[i].empLoseRate);
						}
						for(var i=12;i<dataThreelg1_vzt;i++){
							lossThree2_vzt.push(data.viewDatas.lossPositionTrend[i].empLoseRate);
						}
					}
					//今年的 数据小于12  后面的月份缺失不足的  情况处理
					if(lossThree2_vzt.length<12){
						for(var i =lossThree2_vzt.length;i<12;i++){
							lossThree2_vzt.push("-");
						}
					}
		    		var option1_vzt = {
		    	            title: {
		    	                text: $area+params.name+'离职走势',
		    	                textStyle:{
		    	                    color:"#444",
		    	                    fontSize:16,
		    	                    fontWeight:'normal'
		    	                },
		    	                x:'center'
		    	            },
		    	            tooltip: {
		    	                trigger: 'axis',
		    	                //formatter: '{a0}{b0}: {c0}%<br />{a1}{b1}: {c1}%'
		    	            },
		    	            grid: {
		    	                left: '3%',
		    	                right: 40,
		    	                bottom: '3%',
		    	                containLabel: true
		    	            },
		    	            legend: {
		    	                data:[yearThree1_vzt,yearThree2_vzt],
		    	                y:26
		    	            },
		    	            xAxis:  {
		    	                type: 'category',
		    	                boundaryGap: false,
		    	                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
		    	                axisLabel :{
		    	                    interval:0       //设置成 0 强制显示所有标签
		    	                }
		    	            },
		    	            yAxis: {
		    	                type: 'value',
		    	                axisLabel: {
		    	                    formatter: '{value}%'
		    	                }
		    	            },
		    	            series: [
		    	                {
		    	                    name:yearThree1_vzt,
		    	                    type:'line',
		    	                    data:lossThree1_vzt,
		    	                    markPoint: {
		    	                        data: [
		    	                            {type: 'max', name: '最大值'},
		    	                            {type: 'min', name: '最小值'}
		    	                        ]
		    	                    },
		    	                    markLine: {
		    	                        data: [
		    	                            {type: 'average', name: '平均值'}
		    	                        ]
		    	                    }
		    	                },
		    	                {
		    	                    name:yearThree2_vzt,
		    	                    type:'line',
		    	                    data:lossThree2_vzt,
		    	                    markPoint: {
		    	                        data: [
		    	                            {type: 'max', name: '最大值'},
		    	                            {type: 'min', name: '最小值'}
		    	                        ]
		    	                    },
		    	                    markLine: {
		    	                        data: [
		    	                            {type: 'average', name: '平均值'},
		    	                        ]
		    	                    }
		    	                }
		    	            ]
		    	        };
		    		
		    	        myChart1_vzt.setOption(option1_vzt);  
						var lossFour1_vzt = [];     //图4 去年在职
						var lossFour2_vzt = [];     //图4  今年的在职
						var lossFive1_vzt = [];     //图5 去年离职
						var lossFive2_vzt = [];     //图5 今年离职
						var dataThreeX_vzt = [];        //X轴坐标
						var dataThreelg2_vzt = data.viewDatas.workAgeInfo.length;
						for(var i=0;i<dataThreelg2_vzt/2;i++){  
							lossFour1_vzt.push(data.viewDatas.workAgeInfo[i].pesnAgeRate);
							lossFive1_vzt.push(data.viewDatas.workAgeInfo[i].leavpAgeRate);
						}
						for(var i=dataThreelg2_vzt/2;i<dataThreelg2_vzt;i++){
							lossFour2_vzt.push(data.viewDatas.workAgeInfo[i].pesnAgeRate);
							lossFive2_vzt.push(data.viewDatas.workAgeInfo[i].leavpAgeRate);
						}
						for(var i=0;i<dataThreelg2_vzt/2;i++){
							dataThreeX_vzt.push(data.viewDatas.workAgeInfo[i].empAgeName);
						}
		    	        var option2_vzt = {
		    	            title:{
		    	                show:'true',
		    	                text:$area+params.name+'各工龄段在职分布',
		    	                textStyle:{
		    	                    color:"#444",
		    	                    fontSize:16,
		    	                    fontWeight:'normal'
		    	                },
		    	                x:'center'
		    	            },
		    	            tooltip : {
		    	                trigger: 'axis',
		    	                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		    	                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		    	                },
		    	                padding:[5,10],
		    	                textStyle:{
		    	
		    	                },
		    	                //formatter: '{b}<br/>{a0}: {c0}%<br />{a1}: {c1}%'
		    	            },
		    	            legend: {
		    	                data:[yearThree3_vzt,yearThree4_vzt],
		    	                y:26
		    	            },
		    	            grid: {
		    	                left: '3%',
		    	                right: '4%',
		    	                bottom: '3%',
		    	                containLabel: true
		    	            },
		    	            xAxis : [
		    	                {
		    	                    type : 'category',
		    	                    data : dataThreeX_vzt
		    	                }
		    	            ],
		    	            yAxis: {
		    	                type: 'value',
		    	                axisLabel: {
		    	                    formatter: '{value}%'
		    	                }
		    	            },
		    	            series : [
		    	                {
		    	                    name:yearThree3_vzt,
		    	                    type:'bar',
		    	                    data:lossFour1_vzt
		    	                },
		    	                {
		    	                    name:yearThree4_vzt,
		    	                    type:'bar',
		    	                    data:lossFour2_vzt
		    	                },
		    	            ]
		    	        };
		    	
		    	        myChart2_vzt.setOption(option2_vzt);
		    	        var option3_vzt = {
		    	            title: {
		    	                text: $area+params.name+'各工龄段离职情况',
		    	                textStyle:{
		    	                    color:"#444",
		    	                    fontSize:16,
		    	                    fontWeight:'normal'
		    	                },
		    	                x:'center'
		    	            },
		    	            tooltip: {
		    	                trigger: 'axis',
		    	                //formatter: '{b}<br/>{a0}: {c0}%<br />{a1}: {c1}%'
		    	            },
		    	            grid: {
		    	                left: '3%',
		    	                right: 40,
		    	                bottom: '3%',
		    	                containLabel: true
		    	            },
		    	            legend: {
		    	                data:[yearThree3_vzt,yearThree4_vzt],
		    	                y:26
		    	            },
		    	            xAxis:  {
		    	                type: 'category',
		    	                boundaryGap: false,
		    	                data : dataThreeX_vzt
		    	            },
		    	            yAxis: {
		    	                type: 'value',
		    	                axisLabel: {
		    	                    formatter: '{value}%'
		    	                }
		    	            },
		    	            series: [
		    	                {
		    	                    name:yearThree3_vzt,
		    	                    type:'line',
		    	                    data:lossFive1_vzt,
		    	                    markPoint: {
		    	                        data: [
		    	                            {type: 'max', name: '最大值'},
		    	                            {type: 'min', name: '最小值'}
		    	                        ]
		    	                    },
		    	                    markLine: {
		    	                        data: [
		    	                            {type: 'average', name: '平均值'}
		    	                        ]
		    	                    }
		    	                },
		    	                {
		    	                    name:yearThree4_vzt,
		    	                    type:'line',
		    	                    data:lossFive2_vzt,
		    	                    markPoint: {
		    	                        data: [
		    	                            {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		    	                        ]
		    	                    },
		    	                    markLine: {
		    	                        data: [
		    	                            {type: 'average', name: '平均值'},
		    	                            [{
		    	                                symbol: 'arrow',
		    	                                label: {
		    	                                    normal: {
		    	                                        formatter: '最大值'
		    	                                    }
		    	                                },
		    	                                type: 'max',
		    	                                name: '最大值'
		    	                            }, {
		    	                                symbol: 'circle',
		    	                                x: '60%',
		    	                                y: '50%'
		    	                            }]
		    	                        ]
		    	                    }
		    	                }
		    	            ]
		    	        };
		
		    	        myChart3_vzt.setOption(option3_vzt);
		    	    	myChart1_vzt.resize();
		    	    	myChart2_vzt.resize();
		    			myChart3_vzt.resize();
		    	});
		    
		    }else{
		    	console.log("不执行");
			}
	    });
	    
		//图形自适应1
	    window.onresize = function () {
	    	myChartzs_vzt.resize();
	    	myChartqk_vzt.resize();
	    	myChart1_vzt.resize();
	    	myChart2_vzt.resize();
			myChart3_vzt.resize();
	    }
	    /* echarts 绘制图表  模块  结束  */
	}
})