$(document).ready(function(){
	var myTimeout = setTimeout(function to(){
		if(typeof echarts == "undefined" ){
			myTimeout = setTimeout(to,1);
		}else{
			init();
			clearTimeout(myTimeout);
		}
	},1);
	
	function init(){
		window.myDatePluginInit("my-date-plugin-cd", "my-date-plugin-sup-cd");
	    //画线条
	    function initline(){
	        $(".slt-box .slt-line").each(function(){
	            var bt = $(this).siblings(".list-box:last").height()-8;
	            $(this).css("bottom",bt);
	        });
	    }
	    initline();
	    $("#select_ipt").click(function(){
	        $("#select-tree").show();
	        initline();
	    });
	    /* 点击 图标 展示和隐藏子节点 */
	    $(".slt-icon").click(function(){
	        if($(this).html()=="-"){
	            $(this).siblings(".slt-box").show();
	            $(this).html("+");
	        }else{
	            $(this).siblings(".slt-box").hide();
	            $(this).html("-");
	        }
	        initline();
	    });
	    /* 判断 是否为 叶子节点 如果是隐藏icon */
	    $(".list-box").each(function(){
	        if(!$(this).children().children().hasClass("slt-box")){
	            $(this).children(".slt-main").children(".slt-icon").hide();
	        }
	    });
	
	    /* 判断 如果是否为兄弟节点 */
	    $("#select_div input[type='checkbox']").click(function(){
	        if($(this).parent().parent().attr("data-src")=="open"){
	            $(this).parent().parent().siblings(".list-box").attr("data-src","open");
	            $(this).parent().parent().parent().parent().parent().siblings(".list-box").children().children().children(".list-box").attr("data-src","open");
	
	        }else{    //否则 他们不是同级
	            $(".list-box").attr("data-src","off");      //还原所有为off  设置自己为open
	            $("#select_div input[type='checkbox']").attr("checked",false);
	            $(this).parent().parent().attr("data-src","open").siblings(".list-box").attr("data-src","open");
	            $(this).parent().parent().parent().parent().parent().siblings(".list-box").children().children().children(".list-box").attr("data-src","open");
	            $(this).prop("checked",true);     //兼容
	        }
	        select_input();
	        if($(this).is(':checked')){
	
	        }
	    });

	    $("#slt_btnok").click(function(){
	        $("#select-tree").hide();
	        select_input();
	    });
	    //	       点击空白处,下拉菜单消失
//	    $("#viem-zt #select_div .form-group").click(function(e) {
//	        e?e.stopPropagation():event.cancelBubble = true;
//	    });
//	    $(document).on("click","#viem-zt #select_div .form-group", function (e) {
//	    	 e?e.stopPropagation():event.cancelBubble = true;
//	    });
//	    $(document).click(function() {
//	        $("#select-tree").fadeOut();
//	    });
//		点击取消按钮恢复初始值
		$('#slt-cancel').click(function(){
			$("#select_ipt input").val("总裁");
			$("#select-tree").hide();
		});
		//点击重置按钮  数据重置
//	    var datazt = $("#my-date-plugin-vzt").val();
//		var orgIdzt = $("#viem-zt #select_ipt input").attr("data-id");
//		var blinezt = "zt";
//		var positonzt = "";
		$('.btn-div .reset').click(function(){

			var chk = document.getElementById('supMan');
			chk.checked = true
//			$('#supMan').attr('checked',true)
//			var mydate = new Date();
//			var year = mydate.getFullYear().toLocaleString()
//			var mouth=	mydate.getMonth() + 1;
//			if(mouth<10){mouth = '0'+ mouth.toLocaleString()}else{mouth.toLocaleString()}
//			var data = year+mouth;
//			data=data.replace(/[^\d]/g,'')
//			$("#viem-zt #select_ipt input").val("总裁");
//			$("#viem-zt #my-date-plugin-vzt").val(data);
			
		});
	    //计算被选中的checkbox 把值填充到 input 和div 里面去
	    var aa = document.getElementById("select-warper");
	   var inp = aa.getElementsByTagName('input');
	    for(i=0;i<inp.length;i++){
			inp[i].onclick=function(){
				
		    }
		}
	    function select_input(){
	        var html ="";
	        var arr=[];
	        $("#select_div input[type='checkbox']:checked").each(function(){
	            html += $(this).siblings(".slt-name").html()+"，";
	            arr.push($(this).siblings(".slt-name").html());
	        });
	        html = html.substring(0,html.length-1);
	        $("#select_ipt input").val(html);    //截取最后一个,
//	        console.log($("#select_ipt input").val())
	        $("#add-input").empty();
	        for(var i =0; i<arr.length;i++){
	            $("#add-input").append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span id="str_name">'+arr[i]+'</span></div></div>');
	        }
	    }
	
	    /* 点击 x 按钮 查找已选中的checkbox  如果名字相等  设置checkbox=flase   bug名字不能相同 */
	    $("#add-input").on('click','.close',function(){
	        var str_div = $(this).siblings("#str_name").html();
	        $("#select_div input[type='checkbox']:checked").each(function(){
	            if($(this).siblings(".slt-name").html()==str_div){
	                $(this).attr("checked",false);
	            }
	        });
	        select_input();     //重新计算 选中的checkbox
	    });
	    
	
	    var zt_myChartzs = echarts.init(document.getElementById('zt-viemzs'));
	    var zt_myChartqk = echarts.init(document.getElementById('zt-viemqk'));
	    var zt_myChart1 = echarts.init(document.getElementById('zt-viem1'));
	    var zt_myChart2 = echarts.init(document.getElementById('zt-viem2'));
	    var zt_myChart3 = echarts.init(document.getElementById('zt-viem3'));
		var $a = [];
		var year1 = '2015';
		var year2 = "2016";
	var time = 3000;
	 $('.btn-div .btn-warning').click(fun);
	var fun = function bClick(){
		 $('.btn-div .btn-warning').unbind('click');
		timer = setTimeout(function(){
			 $('.btn-div .btn-warning').click(fun);
		},time);
		console.log("执行方法");
//	}
	$('#zt-viem-btmain').hide();
//	 $('.btn-div .btn-warning').click(function(){
		zt_myChartzs.showLoading();	
		zt_myChartqk.showLoading();
		$.get('json/view.json').done(function(data){
//			var arrcompltSix1_vmd =['startLastLoseRate','arriveLastLoseRate','elseLastLoseRate'];
//			var arrcompltSix2_vmd =['startLoseRate','arriveLoseRate','elseLoseRate'];
//			var arrcompltSeven1_vmd =['startDistribLastLoseRate','startNotdistribLastLoseRate','arriveDistribLastLoseRate','arriveNotdistribLastLoseRate'];
//			var arrcompltSeven2_vmd =['startDistribLoseRate','startNotdistribLoseRate','arriveDistribLoseRate','arriveNotdistribLoseRate'];
//			var lossSix1_vmd = [];  这边想通过数组提取，没找到方法
		
//			for(var k =0;k<arrcompltSix1_vmd.length;k++){
//				var str = arrcompltSix1_vmd[k];
//				console.log(str);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//				var str1 = data.deptNatureInfo.str;  
//				console.log(str1);
////				lossSix1_vmd.push(data.viewDatas.deptNatureInfo.(arrcompltSix1_vmd[k]));
////				console.log(lossSix1_vmd);
//			}
//			console.log(data.deptNatureInfo);
			//图形下标测试
//			$a = data.viewDatas.numberPosition;
			for(var i=0;i<data.viewDatas.numberPosition.length;i++){
				$a.push(data.viewDatas.numberPosition[i].number1)
			}
			console.log($a);
			//懒加载
			zt_myChartzs.hideLoading();
			zt_myChartqk.hideLoading();
			var tabData = data.viewDatas.rankInfo;
			var $area = $('#select_ipt input').val();   //选择的地区
			//折线图
//			console.log( data.viewDatas.lossTrend.length);
//			取年份
//			var year1 = data.viewDatas.lossTrend[0].calendarId.substr(0,4) + "年";
//			var year2 = (parseInt(data.viewDatas.lossTrend[0].calendarId.substr(0,4)) + 1) + "年";
			var timer = setTimeout(function(){
	
				year1 = "fdasfd";
	
			},1000)
			console.log(year1);
			var data1 = [];
			var data2 = [];
//			for(obj in data.viewDatas.lossTrend){
//				if(tabData[obj] == null){
//					tabData[obj]="0";
//				}
//			}
//			var lossdata_vkd = data.viewDatas.lossTrend;
//			for(obj in lossdata_vkd){
//				if(lossdata_vkd[obj] == null){
//					lossdata_vkd[obj]="0";
//				}
//			}zt-viem-btmain
			dataNull_vzt(data.viewDatas.lossTrend);
			dataNull_vzt(data.viewDatas.lossPosition);
			function dataNull_vzt(data){
				for(obj in data){
					if(data[obj] == null){
						data[obj]="0";
					}
				}
			}
			var dataLen = data.viewDatas.lossTrend.length;
			for(var i=0;i<12;i++){
				data1.push(data.viewDatas.lossTrend[i].compltValue);
			}
			for(var i=12;i<dataLen;i++){
				data2.push(data.viewDatas.lossTrend[i].compltValue);
			}
//			console.log(data1)
//			console.log(data1[0].compltValue)
			zt_myChartzs.clear();
			zt_myChartzs.setOption({
		        title: {
		            text: $area + '各岗离职走势',
		            textStyle:{
		                color:"#444",
		                fontSize:16,
		                fontWeight:'normal'
		            },
		            x:'center'
		        },
		        tooltip: {
		            trigger: 'axis',
		            formatter: '{a0}{b0}离职率: {c0}%<br />{a1}{b1}离职率: {c1}%'
		        },
		        grid: {
		            left: '3%',
		            right: 40,
		            bottom: '3%',
		            containLabel: true
		        },
		        legend: {
		            data:[year1,year2],
		            y:26,
				
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
		        series : [
		            {
		                name:year1,
		                type:'line',
		                data:data1,
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
		                name:year2,
		                type:'line',
		                data:data2,
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

			//柱状图
			var dataLen2 = data.viewDatas.lossPosition.length;
//			var data3 = data.viewDatas.lossPosition;
			var year = data.viewDatas.lossPosition[0].calendarId.substr(0,4);
			var mouth = data.viewDatas.lossPosition[0].calendarId.substr(5,6);
			var year3 = year + "年" + mouth +"月";
			var year4 = (year - 1) + "年" + mouth +"月";
//			console.log(year4);
//			for(var i=1;i<dataLen2;i++){                 //数据时无序过来的，按从小到大找出年份
//				if(year3 > data3[i].calendarId){
//					year4 = year3;
//					year3 = data3[i].calendarId;	
//				}else{
//					year4 = data3[i].calendarId;
//				}
//			}
			var data4 = [];
			var data5 = [];
			var arr =['文职','接送货员','理货员','快递员','快递理货员','司机','管理人员','其他'];
			for(var k =0;k<arr.length;k++){
				for(var i=0;i<dataLen2;i++){
					if(arr[k]==data.viewDatas.lossPosition[i].levelName){
						data4.push(data.viewDatas.lossPosition[i].compltValue);
						data5.push(data.viewDatas.lossPosition[i].histValue);
					}
				}		
			}
			

			zt_myChartqk.setOption({
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
		            formatter: '{b}<br/>{a0}: {c0}%<br />{a1}: {c1}%'
		        },
		        legend: {
		            data:[year3,year4],
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
		                data : arr,
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
		                name:year3,
		                type:'bar',
		                data:data4
		            },
		            {
		                name:year4,
		                type:'bar',
		                data:data5
		            },
		        ]				
				})
		})

	}   

	$('.btn-div .btn-warning').click(fun);	
		
	    zt_myChartqk.on('click',function(params){     //点击柱状图，显示相应各职位数据。   
	    	$('#zt-viem-btmain').show();
	    	$.get('json/view.json').done(function(data){
	    		zt_myChart1.setOption({
		    		 title: {
		                text: '上海北部大区'+params.name+'离职走势',
		                textStyle:{
		                    color:"#444",
		                    fontSize:16,
		                    fontWeight:'normal'
		                },
		                x:'center'
		            },
		            tooltip: {
		                trigger: 'axis',
		            },
		            grid: {
		                left: '3%',
		                right: 40,
		                bottom: '3%',
		                containLabel: true
		            },
		            legend: {
		                data:['2015年','2016年'],
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
		                    name:'2015年',
		                    type:'line',
		                    data:[12,4,12,23,23,34,33,25,11,22,23.1,18.5],
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
		                    name:'2016年',
		                    type:'line',
		                    data:[2,4,12,17.9,23.1,12.8,19.5,4,7,24,14.9,16],
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
	    		 })
	    		zt_myChart2.setOption({
		    		title:{
		                show:'true',
		                text:'上海北部大区'+params.name+'各工龄段在职分布',
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
		                formatter: '{b}<br/>{a0}: {c0}%<br />{a1}: {c1}%'
		            },
		            legend: {
		                data:['2015年','2016年'],
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
		                    data : $a
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
		                    name:'2015年',
		                    type:'bar',
		                    data:[12,18,22,10,22]
		                },
		                {
		                    name:'2016年',
		                    type:'bar',
		                    data:[8,22,15,18,26]
		                },
		            ]
	    		});
	    		
	    		zt_myChart3.setOption({
		            title: {
		                text: '上海北部大区'+params.name+'各工龄段离职情况',
		                textStyle:{
		                    color:"#444",
		                    fontSize:16,
		                    fontWeight:'normal'
		                },
		                x:'center'
		            },
		            tooltip: {
		                trigger: 'axis',
		            },
		            grid: {
		                left: '3%',
		                right: 40,
		                bottom: '3%',
		                containLabel: true
		            },
		            legend: {
		                data:['2015年','2016年'],
		                y:26
		            },
		            xAxis:  {
		                type: 'category',
		                boundaryGap: false,
		                data : ['<1','1-3','4-9','10-18','>18']
		            },
		            yAxis: {
		                type: 'value',
		                axisLabel: {
		                    formatter: '{value}%'
		                }
		            },
		            series: [
		                {
		                    name:'2015年',
		                    type:'line',
		                    data:[12,4,12,23,23],
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
		                    name:'2016年',
		                    type:'line',
		                    data:[21,5,8.2,5.9,24],
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
	    		});
	    	});
      

	        var zt_option3 = {

	        };
	        zt_myChart3.setOption(zt_option3);
	    });
	    
		//图形自适应
	    window.onresize = function () {
	    	zt_myChartzs.resize();
	    	zt_myChartqk.resize();
	    	zt_myChart1.resize();
	    	zt_myChart2.resize();
			zt_myChart3.resize();
	    }
	}
})


