;
(function(window, $, document, echarts){

	/** home  **/
	var homechart1 = echarts.init(document.getElementById('homeChart1'));
	var homechart2 = echarts.init(document.getElementById('homeChart2'));
	var option1 = {
    legend: {
        orient : 'vertical',
        x : 'right',
        selectedMode: false,
        data:['WealthEdge charge','Your return']
    },
    color:["#87CECB","#38817A",],
    calculable : false,
    series : [
        {
            name:'portfolio',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
							  {value:0.94, name:'Your return'},
                {value:0.06, name:'WealthEdge charge'},
            ]
        }
    ]
	};
	var option2 = {
    legend: {
        orient : 'vertical',
        x : 'right',
        selectedMode: false,
        data:['Unit Trust charge','Your return']
    },
    color:["#525050","#38817A",],
    calculable : false,
    series : [
        {
            name:'portfolio',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
							  {value:0.73, name:'Your return'},
                {value:0.27, name:'Unit Trust charge'},
            ]
        }
    ]
	};

	homechart1.setOption(option1);
	homechart2.setOption(option2);

	$("#home_investment_preiod").slider({
	    range: "min",
	    min: 1,
	    max: 30,
	    value: 10,
	    slide: function (event, ui) {
	        $("#home_investment_preiod_value").val(ui.value);
	        changeCharts(ui.value);
	    }
	});
	$(".ui-slider-range").css('background','#38817A');
	$(".ui-slider-handle").css('borderColor','#38817A');
	$("#home_investment_preiod_value").val($("#home_investment_preiod").slider("value"));
	$('#home_investment_preiod_value').on('blur', function(){
	    var nowValue = $("#home_investment_preiod_value").val();
			if (nowValue <= 0 || nowValue >= 31){
      alert("Please select investment period between 1 to 30 years")
		}else {
			$("#home_investment_preiod").slider({value : nowValue});
			changeCharts(nowValue);
		}
	});

	function changeCharts(value){
		var saveValue = Math.ceil(1000000*(Math.pow(1.06*0.995, value) - Math.pow(1.06*0.97, value)));
		var chartData1 = [{
				value: Math.pow(1.06*0.995, value)/Math.pow(1.06, value),
				name:'Your return'
			},
			{
				value: (Math.pow(1.06, value) - Math.pow(1.06*0.995, value))/Math.pow(1.06, value),
				name:'WealthEdge charge'
			}];
		var chartData2 = [{
				value: Math.pow(1.06*0.97, value)/Math.pow(1.06, value),
				name:'Your return'
			},
			{
				value: (Math.pow(1.06, value) - Math.pow(1.06*0.97, value))/Math.pow(1.06, value),
				name:'Unit Trust charge'
			}];
		$('#saveValue').html('$'+saveValue);

		homechart1.setOption({
			series : [
        	{
	            name:'portfolio',
	            type:'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data: chartData1
        	}
   		 	]
   		});
   		homechart2.setOption({
			series : [
        	{
	            name:'portfolio',
	            type:'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data: chartData2
        	}
   		 	]
   		});
	};

	$('.mbr-navbar__hamburger').on('click', function () {
		$('header').toggleClass('show-xs');
	});

	/** end home **/
})(window, $, document, echarts);
