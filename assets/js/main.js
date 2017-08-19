;
(function(window, $, document){
	/**  questionaire  **/
	window.questionBack = function (index){
		if(index > 1){
			$(".questionActive").addClass("bounceOut").removeClass("questionActive").hide();
			$(".questionContain:eq("+(index-2)+")").addClass("bounceLeft questionActive").show();
		}
	}

	$('.text-left').on('click', function(){
		var $this = $(this);
		$this.find('input[type="radio"]').prop('checked', 'true');
		$('.text-left').css({
			color : '#000'
		});
		
		$this.css({
			color : '#337ab7'
		});
	});

	var answers = [];
	var answerToNum = {
		'A' : 1,
		'B' : 2,
		'C' : 3,
		'D' : 4,
		'E' : 5,
	};
	window.questionContinue = function (index){
		var progress = (index+1) * 12.5;

		$('.progress').css({'width' :  progress + '%'});

		var value = $('#question'+index+" [name='question"+index+"']:checked").attr('value');
		answers[index-1] = value;
		if(!value){
			alert("Please select an answer！");
			return;
		}

		if(index == 8){

			$.ajax({
				method: 'post',
				dataType : 'json',
				url:"/getRiskRecommend.php",
				data: {
					'answers': answers
				},
				success: function(res){

					localStorage.setItem('barChart', JSON.stringify(res.barChart));
					localStorage.setItem('recommendValue', res.recommendValue);
					localStorage.setItem('text1', res.text1);
					localStorage.setItem('text2', res.text2);
					localStorage.setItem('text3', res.text3);
					location.href="./choosingPlan.html";
					
				},
				fail: function(){
					localStorage.setItem('recommendValue', 5);
				}
			});

		}else if(index >= 1 && index < 8){
			$(".questionActive").removeClass("questionActive").hide();
			$(".questionContain:eq("+index+")").addClass("bounceRight questionActive").show();
		}
	}
	/** end questionaire  **/
})(window, $, document);
