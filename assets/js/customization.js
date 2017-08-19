;
(function(window, $, document, echarts){
	/** tabs **/
	var returnPercent = ['5.85%','6.69%','7.39%','7.94%','8.43%'];
	var barData = JSON.parse(localStorage.getItem('barChart'));
	var text1 = localStorage.getItem('text1');
	var text2 = localStorage.getItem('text2');
	var text3 = localStorage.getItem('text3');
	var yourRisk = barData['yourRisk'];
	var barData = [barData['part_1_level'], barData['part_2_level'], barData['part_3_level']];
	var recommendValue = localStorage.getItem('recommendValue') ? localStorage.getItem('recommendValue') : 5;
	var isRetimentSlider = false, isEducationSlider = false, isMajorSlider = false;

	$('#riskRecoment').text(recommendValue);
	$('#recomentText1').text(text1);
	$('#recomentText2').text(text2);
	$('#recomentText3').text(text3);
	$('#returnPercent').text(returnPercent[recommendValue-1]);
	$('#showModalBtn').click();
	$('#tabs').tabs();
	var nowTab = 'General saving';
	/** tabs **/

	$('#recommendDetail').on('mouseover', function(){
		$('#showModalBtn').click();
	});

	/** charts **/
	var customizationPie = echarts.init(document.getElementById('customizationPie'));
	var customizationLine = echarts.init(document.getElementById('customizationLine'));
	var customizationBar = echarts.init(document.getElementById('barBox'));
	var optionBar ={
	    tooltip : {
	        trigger: 'axis'
	    },
	    color: ['#87CECB'],
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: '4px'
                    }
                },
	            data : ['Risk Capacity','Risk Appeitite','Investment Period']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'risk',
	            type:'bar',
	            data:barData,
	            itemStyle: {
				    normal: {
				        width : '10px',
				        fontSize: '8px'
				    }
				},
	            markPoint : {
	                data : [
	                    // {type : 'max', name: '最大值'},
	                    // {type : 'min', name: '最小值'}
	                ]
	            },
	            markLine : {
	                data : [
	           			// {name: '标线1起点', value: 100, x: 0, y: 5},
	              //       {name: '标线1终点', x: 3, y: 5}}
	                ]
	            }
	        }
	    ]
	};

	var optionPie = {
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        selectedMode: false,
	        data:['US NASDQ','US Large Cap','Emerging Market','Developed Market','Real Estate','Gold','US Long-term Treasury Bond', 'US Corporate Bond','US Total Bond Market']
	    },
	    tooltip : {
	        trigger: 'item',
	        backgroundColor: 'rgba(255,255,255,0.9)',
					borderWidth:1,
			borderColor: '#000',
			formatter: function(data){
		 	        	var seriesData = data.data;
		 	        	var text1 = seriesData.text1;
		 	        	var text2 = seriesData.text2;
		 	        	return text1+'<br>' + text2;
		 	        },
			textStyle: {
	        	color:　'#333',
				fontStyle: 'normal',
				fontFamily: ' Microsoft Yahei',
				fontSize: 12,
			},
    	},
	    // color: ['#D2691E', '#FF4500', '#F4A460', '#191970', '#4682B4', '#87CECB', '#32CD32'],
	    calculable : false,
	    series : [
	        {
	            name:'Vanguard Total US Stock Market(VTI)',
	            type:'pie',
	            radius: ['50%', '70%'],
	            center: ['70%', '60%'],
	            itemStyle: {
				    normal: {
				      label: {
				        show: false,
				      },
				      labelLine: {
				        show: false
				      }
				    }
				},

	            data:[
	                {value:0, name:'US NASDQ'},
	                {value:0, name:'US Large Cap'},
	                {value:0, name:'Emerging Market'},
	                {value:0, name:'Developed Market'},
	                {value:0, name:'Real Estate'},
	                {value:0, name:'Gold'},
	                {value:0, name:'US Long-term Treasury Bond'},
	                {value:0, name:'US Corporate Bond'},
	                {value:0, name:'US Total Bond Market'}
	            ]
	        }
	    ]
	};

	var optionLine = {
		tooltip : {
		    trigger: 'axis'
		},
		legend : {
	        data:['Bull Market','Normal Market','Weak Market','Our Recommendation']
	    },
	 //   color: ['#3C1B1F', '#314A52', '#2994B2','7FB414'],
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            splitLine:{
                    show:false
                },
	         //   data : [2017,2018]
	        }
	    ],
		yAxis : [
		    {
		        type : 'value',
		        splitLine:{
                    show:false
                },
		    }
		],
		series : [
		    {
		        name:'Bull',
		        type:'line',
		        smooth:true,
		        itemStyle: {normal: {areaStyle: {type: 'default'}}},
		       // data:[0,0]
		    },
		    {
		        name:'Normal',
		        type:'line',
		        smooth:true,
		        itemStyle: {normal: {areaStyle: {type: 'default'}}},
		       // data:[0]
		    },
		    {
		        name:'Weak',
		        type:'line',
		        smooth:true,
		        itemStyle: {normal: {areaStyle: {type: 'default'}}},
		      //  data:[0,0]
		    },
				{
						name:'Recommend',
						type:'line',
						smooth:true,
						itemStyle: {normal: {areaStyle: {type: 'default'}}},
					//data:[0,0]
				},
		]
		};


	customizationPie.setOption(optionPie);
	customizationLine.setOption(optionLine);
	customizationBar.setOption(optionBar);
   	/** end charts  **/

	/** begin load page **/
		//获取tolerance的值
		getTolerance();

		//tab
		$('#tabs >ul').on('click', function(event){
			var target = event.target;
			var text = $(target).text();
			if(text == 'General saving'){
				nowTab = 'General saving';
				changeSavingCharts();
			}else if(text == 'Retirement'){
				nowTab = 'Retirement';
				changeRetirementChart();
			}else if(text == 'Education'){
				nowTab = 'Education';
				changeEducationChart();
			}else if(text == 'Major Purchase'){
				nowTab = 'Major Purchase';
				changeInitMajorPurchaseChart();
			}
		});

	/** end load**/
	/** data get **/
	function getTolerance(){
		var recommendValue = localStorage.getItem('recommendValue') ? localStorage.getItem('recommendValue') : 5;

		/** end mock**/
		$('#recommend_value').text(recommendValue);
		changeRiskTolerance(recommendValue);
		changeDefaulValue(recommendValue);
		/** slider  **/
		$("#tolerance_amount_slider").slider({
		    range: "min",
		    min: 1,
		    max: 5,
		    value: recommendValue,
		    slide: function (event, ui) {
		        $("#tolerance_amount").text(ui.value);
						$('#returnPercent').text(returnPercent[ui.value-1]);
		        changeRiskTolerance(ui.value);
		    }
		});

		$("#tolerance_amount").text($("#tolerance_amount_slider").slider("value"));
		/** end slider  **/
	}

	function changeRiskTolerance(value){
		$.ajax({
			method: 'post',
			dataType : 'json',
			url:"/riskTolerance/getData.php",
			data: {
				'risk': value
			},
			success: function(res){

				changePieCharts(res);
		        //changeDefaulValue(value);
		        if(nowTab == 'General saving'){
					changeSavingCharts();
				}else if(nowTab == 'Retirement'){
					changeRetirementChart();
				}else if(nowTab == 'Education'){
					changeEducationChart();
				}else if(nowTab == 'Major Purchase'){
					changeInitMajorPurchaseChart();
				}
			},
			fail: function(){
				console.log('fali');
			}
		});
	}

	function changePieCharts(data){
		var options ={
			legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:data.nameArea
		    },
			series : [
	        {
	            name:'Vanguard Total US Stock Market(VTI)',
	            type:'pie',
	            radius: ['50%', '70%'],
	            center: ['70%', '42%'],
	            itemStyle: {
							    	normal: {
								      label: {
									        show: true,
													formatter:function(params){
														return (params.percent-0).toFixed(0)+"%"
													}
									      },
									      labelLine: {
									        show: false
									      }
								    }
				},
	            data:data.pieChartData
	        }
	    ]};
		customizationPie.setOption(options);
	}

	function changeDefaulValue(value){
		//genral saving 模块
		initGenralSaving(value);
		//retirement 模块
		initRetirment(value);
		//education 模块
		initEducation(value);
		//Major Purchase 模块
		initMajorPurchase(value);
	}

	function initGenralSaving(value){

		var genralInvestYear = 10;
		var generalInvestMoney = 10000;
		var generalMothlySaving = [1,2,3].indexOf(value) != -1 ?  150 : 100;

		$("#general-invest-year-sider").slider({
		    range: "min",
		    min: 1,
		    max: 80,
		    value: genralInvestYear,
		    slide: function (event, ui) {
		        $("#general-invest-year-value").val(ui.value);
		    }
		});

		$("#general-invest-year-sider").on('mouseup', function(){
			changeSavingCharts();
		});

		$("#general-invest-year-value").val($("#general-invest-year-sider").slider("value"));
		$('#general-invest-year-value').on('change', function(){
		    var nowValue = $("#general-invest-year-value").val();
			$("#general-invest-year-sider").slider({value : nowValue});
				changeSavingCharts();
		});

		$('#general-invest-money-value').val(generalInvestMoney);
		$('#general-mothly-saving-value').val(generalMothlySaving);

		$('#general-invest-money-value').on('change', function(){ changeSavingCharts(); });
		$('#general-mothly-saving-value').on('change', function(){ changeSavingCharts(); });
	}

	function changeSavingCharts(){
		var toleranceAmount = $('#tolerance_amount').text();
		var genralInvestYear = $('#general-invest-year-value').val();
		var generalInvestMoney = $('#general-invest-money-value').val();
		var generalMothlySaving = $('#general-mothly-saving-value').val();

		//var mockData = mockLine();
		var data = {
			risk: toleranceAmount,
			generalPeriod: genralInvestYear,
			initialInvestment: generalInvestMoney,
			mothlySaving: generalMothlySaving
		};

		// var res = mockLine();
		// changeLineChart(res);
		$.ajax({
			method: 'post',
			dataType : 'json',
			url:"/generalSaving/chartData.php",
			data: data,
			success: function(res){
				var lineName = res.lineName,
					xYears = res.xYears,
					seriesData = res.data

				var option = {
						tooltip : {
					    trigger: 'axis'
					},
					legend : {
				        data:lineName
				    },
				    color: ['#3C1B1F', '#314A52', '#2994B2','#7FB414'],
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            splitLine:{
			                    show:false
			                },
				            data : xYears
				        }
				    ],
					yAxis : [
					    {
					        type : 'value',
					        splitLine:{
			                    show:false
			                },
					    }
					],
					series : seriesData
				};

				changeLineChart(option);
			},
			fail: function(){
				console.log('fali');
			}
		});


	}

	function initRetirment(value){
		var retirementYearOld = 28;
		var retirementMonthlyIncome = 3000;
		var retirementYear = 60;
		// var retirementMonthlyPayout = 2000;
		var retirementMonthSpend = 2000;
		var retirementMonthSpendYears = 30;
		var retirementYourChoiceInvestment = 0;

		if(value == 1){
			var retirementMonthlySavingSlider = 595;
			var retirementYourChoiceMonthlySaving = 500;
		}else if(value == 2){
			var retirementMonthlySavingSlider = 474;
			var retirementYourChoiceMonthlySaving = 400;
		}else if(value == 3){
			var retirementMonthlySavingSlider = 383;
			var retirementYourChoiceMonthlySaving = 330;
		}else if(value == 4){
			var retirementMonthlySavingSlider = 327;
			var retirementYourChoiceMonthlySaving = 280;
		}else if(value == 5){
			var retirementMonthlySavingSlider = 284;
			var retirementYourChoiceMonthlySaving = 230;
		}

		$('#retirement-year-old').val(retirementYearOld);
		$('#retirement-monthly-income').val(retirementMonthlyIncome);
		$('#retirement-year').val(retirementYear);
		// $('#retirement-monthly-payout').val(retirementMonthlyPayout);
		$('#retirement-month-spend').val(retirementMonthSpend);
		$('#retirement-month-spend-years').val(retirementMonthSpendYears);
		$('#retirement-your-choice-investment').val(retirementYourChoiceInvestment);
		$('#retirement-your-choice-monthly-saving').val(retirementYourChoiceMonthlySaving);

		$('#retirement-year-old').on('change', function(){
			var value = $('#retirement-year-old').val();
			value <= 99 && value >= 18 ? changeRetirementChart() : alert("必须在18和99之间");
			$('#retirement-year').attr('min', value);
		});
		$('#retirement-monthly-income').on('change', function(){
			changeRetirementChart();
		});
		$('#retirement-year').on('change', function(){
			changeRetirementChart();
			var value = $('#retirement-year').val();
			$('#retirement-month-spend-years').attr('max', 100-value);
		});
		// $('#retirement-monthly-payout').on('change', function(){
		// 	changeRetirementChart();
		// });
		$('#retirement-month-spend').on('change', function(){
			changeRetirementChart();
		});
		$('#retirement-month-spend-years').on('change',function(){
			changeRetirementChart();
		});
		$('#retirement-your-choice-investment').on('change',function(){
			isRetimentSlider = true;
			changeRetirementChart();
		});
		$('#retirement-your-choice-monthly-saving').on('change',function(){
			isRetimentSlider = true;
			changeRetirementChart();
		});

		// $("#retirement-init-investment-slider").slider({
		//     range: "min",
		//     min: 0,
		//     max: retirementInitInvestmentSliderMax,
		//     value: retirementInitInvestmentSlider,
		//     slide: function (event, ui) {
		//         $("#retirement-init-investment").text(ui.value);
		//         changeRetirementChart(ui.value);
		//     }
		// });

		// $("#retirement-init-investment").text($("#retirement-init-investment-slider").slider("value"));

		$("#retirement-monthly-saving-slider").slider({
		    range: "min",
		    min: 0,
		    max: 2000,
		    value: retirementMonthlySavingSlider,
		    slide: function (event, ui) {
		    	isRetimentSlider = true;
		        $("#retirement-monthly-saving").text(ui.value);
		    }
		});
		$("#retirement-monthly-saving-slider").on('mouseup', function(){
			changeRetirementChart();
		});

		$("#retirement-monthly-saving").text($("#retirement-monthly-saving-slider").slider("value"));

	}

	function changeRetirementChart(){
		var toleranceAmount = $('#tolerance_amount').text();
		var retirementYearOld = $('#retirement-year-old').val();
		var retirementMonthlyIncome = $('#retirement-monthly-income').val();
		var retirementYear = $('#retirement-year').val();
		// var retirementMonthlyPayout = $('#retirement-monthly-payout').val();
		var retirementMonthSpend = $('#retirement-month-spend').val();
		var retirementMonthSpendYears = $('#retirement-month-spend-years').val();
		var retirementYourChoiceInvestment = $('#retirement-your-choice-investment').val();
		var retirementYourChoiceMonthlySaving = $('#retirement-your-choice-monthly-saving').val();
		// var retirementInitInvestmentSlider = $("#retirement-init-investment").text();
		var retirementMonthlySavingSlider = $("#retirement-monthly-saving").text();
		var userSliderFlag = isRetimentSlider ? 1 : 0;
		isRetimentSlider = false;
		//var mockData = mockLine();
		var data = {
			userSliderFlag: userSliderFlag,
			risk: toleranceAmount,
			retirementYearsOld : retirementYearOld,
			retirementIncome: retirementMonthlyIncome,
			retirementRetireYearOld: retirementYear,
			retirementSpend: retirementMonthSpend,
			retireSpendYears: retirementMonthSpendYears,
			// retireRecommendInvestment: retirementInitInvestmentSlider,
			retireRecommendSaving: retirementMonthlySavingSlider,
			retireYourInvestment : retirementYourChoiceInvestment,
			retireYourMonthSaving: retirementYourChoiceMonthlySaving
		};

		$.ajax({
			method: 'post',
			dataType : 'json',
			url:"/retirement/chartData.php",
			data: data,
			success: function(res){

				$("#retirement-monthly-saving-slider").slider({
					max: res.retirementSavingSliderMax,
					value: res.retirementInitMonthSaving,
				});
				$("#retirement-monthly-saving").text(res.retirementInitMonthSaving);


				$("#retirement-init-investment").text(res.retireRecommendInvestment);

				var lineName = res.lineName,
					xYears = res.xYears,
					seriesData = res.data

				var option = {
						tooltip : {
					    trigger: 'axis'
					},
					legend : {
				        data:lineName
				    },
				    color: ['#314A52','#3C1B1F'],
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            splitLine:{
			                    show:false
			                },
				            data : xYears
				        }
				    ],
					yAxis : [
					    {
					        type : 'value',
					        splitLine:{
			                    show:false
			                },
					    }
					],
					series : seriesData
				};

				changeLineChart(option);
			},
			fail: function(){
				console.log('fali');
			}
		});
	}

	function initEducation(value){
		var educationYear = 8;
		var educationMonthly = 100000;
		var educationMonthlyIncome = 5000;
		var educationYourChoiceInvestment = 0;

		if(value == 1){
			var educationMonthlySavingSlider = 962;
			var educationYourChoiceMonthlySaving = 800;
		}else if(value == 2){
			var educationMonthlySavingSlider = 932;
			var educationYourChoiceMonthlySaving = 750;
		}else if(value == 3){
			var educationMonthlySavingSlider = 904;
			var educationYourChoiceMonthlySaving = 700;
		}else if(value == 4){
			var educationMonthlySavingSlider = 884;
			var educationYourChoiceMonthlySaving = 630;
		}else if(value == 5){
			var educationMonthlySavingSlider = 868;
			var educationYourChoiceMonthlySaving = 600;
		}

		$('#education-year').val(educationYear);
		$('#education-monthly').val(educationMonthly);
		$('#education-monthly-income').val(educationMonthlyIncome);
		$('#education-your-choice-investment').val(educationYourChoiceInvestment);
		$('#education-your-choice-monthly-saving').val(educationYourChoiceMonthlySaving);

		$('#education-year').on('change', function(){
			changeEducationChart();
		});
		$('#education-monthly').on('change', function(){
			changeEducationChart();
		});
		$('#education-monthly-income').on('change', function(){
			changeEducationChart();
		});
		$('#education-your-choice-investment').on('change', function(){
			isEducationSlider=true;
			changeEducationChart();
		});
		$('#education-your-choice-monthly-saving').on('change', function(){
			isEducationSlider=true;
			changeEducationChart();
		});

		// $("#education-init-investment-slider").slider({
		//     range: "min",
		//     min: 0,
		//     max: educationInitInvestmentSliderMax,
		//     value: educationInitInvestmentSlider,
		//     slide: function (event, ui) {
		//         $("#education-init-investment").text(ui.value);
		//         	changeEducationChart();
		//     }
		// });

		// $("#education-init-investment").text($("#education-init-investment-slider").slider("value"));

		$("#education-monthly-saving-slider").slider({
		    range: "min",
		    min: 0,
		    max: 2000,
		    value: educationMonthlySavingSlider,
		    slide: function (event, ui) {
		    	isEducationSlider = true;
		        $("#education-monthly-saving").text(ui.value);

		    }
		});

		$("#education-monthly-saving-slider").on('mouseup', function(){
			changeEducationChart();
		});

		$("#education-monthly-saving").text($("#education-monthly-saving-slider").slider("value"));
	}

	function changeEducationChart(){
		var toleranceAmount = $('#tolerance_amount').text();
		var educationYear = $('#education-year').val();
		var educationMonthly = $('#education-monthly').val();
		var educationMonthlyIncome = $('#education-monthly-income').val();
		var educationYourChoiceInvestment = $('#education-your-choice-investment').val();
		var educationYourChoiceMonthlySaving = $('#education-your-choice-monthly-saving').val();
		// var educationInitInvestmentSlider = $("#education-init-investment").text();
		var educationMonthlySavingSlider = $("#education-monthly-saving").text();
		var userSliderFlag = isEducationSlider ? 1 : 0;
		isEducationSlider = false;
		//var mockData = mockLine();
		var data = {
			userSliderFlag : userSliderFlag,
			risk : toleranceAmount,
			educationYearsOld : educationYear,
			educationMoney : educationMonthly,
			educationMonthIncome : educationMonthlyIncome,
			// educationRecommendInvestment: educationInitInvestmentSlider,
			educationRecommendSaving : educationMonthlySavingSlider,
			educationYourInvestment: educationYourChoiceInvestment,
			educationYourMonthSaving: educationYourChoiceMonthlySaving,
		};

		$.ajax({
			method: 'post',
			dataType : 'json',
			url:"/education/chartData.php",
			data: data,
			success: function(res){
				$("#education-monthly-saving-slider").slider({
					max: res.educationSavingSliderMax,
					value: res.educationInitMonthSaving,
				});

				$("#education-monthly-saving").text(res.educationInitMonthSaving);
				$("#education-init-investment").text(res.educationRecommendInvestment);

				var lineName = res.lineName,
					xYears = res.xYears,
					seriesData = res.data

				var option = {
						tooltip : {
					    trigger: 'axis'
					},
					legend : {
				        data:lineName
				    },
				    color: ['#3C1B1F', '#314A52', '#2994B2','#7FB414'],
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            splitLine:{
			                    show:false
			                },
				            data : xYears
				        }
				    ],
					yAxis : [
					    {
					        type : 'value',
					        splitLine:{
			                    show:false
			                },
					    }
					],
					series : seriesData
				};

				changeLineChart(option);
			},
			fail: function(){
				console.log('fali');
			}
		});
	}

	function initMajorPurchase(value){
		var majorPurchaseYear = 8;
		var majorPurchaseMonthly = 100000;
		var majorPurchaseMonthlyIncome = 5000;
		var majorPurchaseYourChoiceInvestment = 0;


		if(value == 1){
			var majorPurchaseMonthlySavingSlider = 962;
			var majorPurchaseYourChoiceMonthlySaving = 800;
		}else if(value == 2){
			var majorPurchaseMonthlySavingSlider = 932;
			var majorPurchaseYourChoiceMonthlySaving = 750;
		}else if(value == 3){
			var majorPurchaseMonthlySavingSlider = 904;
			var majorPurchaseYourChoiceMonthlySaving = 700;
		}else if(value == 4){
			var majorPurchaseMonthlySavingSlider = 884;
			var majorPurchaseYourChoiceMonthlySaving = 630;
		}else if(value == 5){
			var majorPurchaseMonthlySavingSlider = 868;
			var majorPurchaseYourChoiceMonthlySaving = 600;
		}

		$('#major-purchase-year').val(majorPurchaseYear);
		$('#major-purchase-monthly').val(majorPurchaseMonthly);
		$('#major-purchase-monthly-income').val(majorPurchaseMonthlyIncome);
		$('#major-purchase-your-choice-investment').val(majorPurchaseYourChoiceInvestment);
		$('#major-purchase-your-choice-monthly-saving').val(majorPurchaseYourChoiceMonthlySaving);

		$('#major-purchase-year').on('change', function(){
			changeInitMajorPurchaseChart();
		});
		$('#major-purchase-monthly').on('change', function(){
			changeInitMajorPurchaseChart();
		});
		$('#major-purchase-monthly-income').on('change', function(){
			changeInitMajorPurchaseChart();
		});
		$('#major-purchase-your-choice-investment').on('change', function(){
			isMajorSlider=true;
			changeInitMajorPurchaseChart();
		});
		$('#major-purchase-your-choice-monthly-saving').on('change', function(){
			isMajorSlider=true;
			changeInitMajorPurchaseChart();
		});

		// $("#major-purchase-init-investment-slider").slider({
		//     range: "min",
		//     min: 0,
		//     max: majorPurchaseInitInvestmentSliderMax,
		//     value: majorPurchaseInitInvestmentSlider,
		//     slide: function (event, ui) {
		//         $("#major-purchase-init-investment").text(ui.value);
		//         changeInitMajorPurchaseChart();
		//     }
		// });

		// $("#major-purchase-init-investment").text($("#major-purchase-init-investment-slider").slider("value"));

		$("#major-purchase-monthly-saving-slider").slider({
		    range: "min",
		    min: 0,
		    max: 2000,
		    value: majorPurchaseMonthlySavingSlider,
		    slide: function (event, ui) {
		    	isMajorSlider = true;
		        $("#major-purchase-monthly-saving").text(ui.value);

		    }
		});

		$("#major-purchase-monthly-saving-slider").on('mouseup', function(){
			 changeInitMajorPurchaseChart();
		});

		$("#major-purchase-monthly-saving").text($("#major-purchase-monthly-saving-slider").slider("value"));

	}

	function changeInitMajorPurchaseChart(){
		var toleranceAmount = $('#tolerance_amount').text();
		var majorPurchaseYear = $('#major-purchase-year').val();
		var majorPurchaseMonthly = $('#major-purchase-monthly').val();
		var majorPurchaseMonthlyIncome = $('#major-purchase-monthly-income').val();
		var majorPurchaseYourChoiceInvestment = $('#major-purchase-your-choice-investment').val();
		var majorPurchaseYourChoiceMonthlySaving = $('#major-purchase-your-choice-monthly-saving').val();
		// var majorPurchaseInitInvestmentSlider = $("#major-purchase-init-investment").text();
		var majorPurchaseMonthlySavingSlider = $("#major-purchase-monthly-saving").text();
		var userSliderFlag = isMajorSlider ? 1 : 0;
		isMajorSlider = false;
		//var mockData = mockLine();
		var data = {
			userSliderFlag : userSliderFlag,
			risk: toleranceAmount,
			majorYearsOld : majorPurchaseYear,
			majorMoney : majorPurchaseMonthly,
			majorMonthIncome: majorPurchaseMonthlyIncome,
			// majorRecommendInvestment : majorPurchaseInitInvestmentSlider,
			majorRecommendSaving : majorPurchaseMonthlySavingSlider,
			majorYourInvestment : majorPurchaseYourChoiceInvestment,
			majorYourMonthSaving : majorPurchaseYourChoiceMonthlySaving
		};

		$.ajax({
			method: 'post',
			dataType : 'json',
			url:"/major/chartData.php",
			data: data,
			success: function(res){

				$("#major-purchase-monthly-saving-slider").slider({
					max: res.majorSavingSliderMax,
					value: res.majorInitMonthSaving,
				});

				$("#major-purchase-monthly-saving").text(res.majorInitMonthSaving);
				$("#major-purchase-init-investment").text(res.majorRecommendInvestment);

				var lineName = res.lineName,
					xYears = res.xYears,
					seriesData = res.data

				var option = {
					tooltip : {
					    trigger: 'axis'
					},
					legend : {
				        data:lineName
				    },
				    color: ['#3C1B1F', '#314A52', '#2994B2','#7FB414'],
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            splitLine:{
			                    show:false
			                },
				            data : xYears
				        }
				    ],
					yAxis : [
					    {
					        type : 'value',
					        splitLine:{
			                    show:false
			                },
					    }
					],
					series : seriesData
				};

				changeLineChart(option);
			},
			fail: function(){
				console.log('fali');
			}
		});
	}

	function changeLineChart(data){
		// console.log(data);re
		customizationLine.setOption(data,true);
	}

	function mockLine(){
		var mockData = [];
		for(var i = 0; i<3; i++){
			mockData[i] = [];
			for(var j=0; j < 8; j++){
				mockData[i].push(Math.ceil(j*100*i*Math.random()))
			}
		}

		return {
			lineName: ['Stock','Bond','Golen'],
			xYears : ['2007','2008','2009','2010','2011','2012','2013','2014'],
			data : [
		    {
		        name:'Stock',
		        type:'line',
		        smooth:true,
		        itemStyle: {normal: {areaStyle: {type: 'default'}}},
		        data:mockData[0],
		    },
		    {
		        name:'Bond',
		        type:'line',
		        smooth:true,
		        itemStyle: {normal: {areaStyle: {type: 'default'}}},
		        data:mockData[1],
		    },
		    {
		        name:'Golen',
		        type:'line',
		        smooth:true,
		        itemStyle: {normal: {areaStyle: {type: 'default'}}},
		        data:mockData[2]
		    }
		]
		}
	}

})(window, $, document, echarts);
