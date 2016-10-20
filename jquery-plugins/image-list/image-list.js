$.fn.imgList = function (seconds) {	
	var  $imglistArr, ms, i;
	ms = (seconds && tme * 1000) || 3000;

	$imglistArr  = $(this);
	var controls =  $imglistArr.map(function(index, obj){
		var runId, curIndex, $obj, $images, start, stop, showImag;

		runId    = 0, curIndex = 0,
		$obj     = $(obj),
		$images  = $obj.find('img');

		showImag = function(_index){
			$images.fadeOut().eq(_index).fadeIn();
		};

		start = function(){
			if(runId == 0){
				runId = setInterval(function(){
					if(curIndex == $images.length - 1){ curIndex = -1; }
					showImag(++curIndex);
				}, ms);
			}
		};
		
		stop = function(){
			clearInterval(runId);

			runId = 0;
		};

		start();

		return {start: start, stop: stop}
	});

	return {start: function(){			
					$(controls).each(function(_index, control){
						control.start();
					});
		}, stop: function(){
					$(controls).each(function(_index, control){
						control.stop();
					});
		}};
}