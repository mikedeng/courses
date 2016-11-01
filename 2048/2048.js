$.fn.make2048 = function (options) {
	var defaultOptions, $this, 
		getEmptyBlockIndexes, buildBackground, buildBlock, getCoordinate, getIndex, getPosition,
		state, position, move, moveStep, generateBlock
		;

	defaultOptions = {
		width: 4,
		height: 4,
		style: {
			background_color       : "rgb(184,175,158)",
			block_background_color : "rgb(204,192,178)",
			padding                : 18,
			block_size             : 60,
			block_style            : {
				"text-align": "center",
				"font-weight": "bolder",
				"font-size":   "20px"
			}

		},
		blocks: [
			{level : 0, value  : 2, style    : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,106"}, "font-size" : 58},
			{level : 1, value  : 4, style    : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,108"}, "font-size" : 58},
			{level : 2, value  : 8, style    : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,112"}, "font-size" : 58},
			{level : 3, value  : 16, style   : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,114"}, "font-size" : 58},
			{level : 4, value  : 32, style   : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,116"}, "font-size" : 58},
			{level : 6, value  : 64, style   : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,118"}, "font-size" : 58},
			{level : 7, value  : 128, style  : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,120"}, "font-size" : 58},
			{level : 8, value  : 256, style  : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,122"}, "font-size" : 58},
			{level : 9, value  : 512, style  : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,124"}, "font-size" : 58},
			{level : 10, value : 1024, style : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,126"}, "font-size" : 58},
			{level : 11, value : 2048, style : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,128"}, "font-size" : 58},
			{level : 12, value : 4096, style : {"background-color" : "rgb(238,228,218)", "color" : "rgb(124,115,130"}, "font-size" : 58},
		],
		animateSpeed: 300
	}

	state = [];

	options = $.extend({}, defaultOptions, options);

	if(this.length > 1){
		throw "一次只能开始一个游戏";
	}else if(this.length === 0){
		throw "未找到游戏";
	}

	$this = $(this[0]);
	$this.css({
		"background-color"    : options.style.background_color,
		"border-radius"       : options.style.padding,
		"position"            : "relative",
		"-webkit-user-select" : "none"
	});


	getPosition = function(x, y){
		return	{
				 top  : options.style.padding + y * (options.style.block_size + options.style.padding) ,
				 left : options.style.padding + x * (options.style.block_size + options.style.padding)
				};
	};

	getCoordinate = function(index){
		return {
			x: index % options.width,
			y: Math.floor(index / options.width)
		};
	};

	getIndex = function(x, y){
		return x + y * options.width;
	};

	getBlock = function(x, y){
		return state[getIndex(x, y)];
	};

	getEmptyBlockIndexes = function(){
		var _emptyBlockIndexes = [];

		$(state).each(function(i, o){
			if(!o){
				_emptyBlockIndexes.push(i);
			}
		});

		return _emptyBlockIndexes;
	};

	buildBackground = function(){
		var	_backgrounds, _x, _y, _len1, _len2,
			bg_block, _position;

		_backgrounds = [];
		for(_x = 0, _len1 = options.width; _x < _len1; _x++){
			for(_y = 0, _len2 = options.width; _y < _len2; _y++){
				state.push(null);
				bg_block  = $("<div></div>");
				_position = getPosition(_x, _y);
				bg_block.css({
					"width"            : options.style.block_size + "px",
					"height"           : options.style.block_size + "px",
					"background-color" : options.style.block_background_color,
					"position"         : "absolute",
					"top"              : _position.top + "px",
					"left"             : _position.left + "px"
				});

				_backgrounds.push(bg_block);
			}
		}

		$this.width((options.style.block_size + options.style.padding) * options.width + options.style.padding);
		$this.height((options.style.block_size + options.style.padding) * options.height + options.style.padding);

		return _backgrounds;
	};


	buildBlock = function(level, x, y){
		var _emptyBlockIndexes, _block, put_index;

		_emptyBlockIndexes = getEmptyBlockIndexes();
		if(_emptyBlockIndexes.length === 0) return false;

		if(x != null && y != null){
			put_index = getIndex(x, y);
		}else{
			put_index = _emptyBlockIndexes[Math.floor(Math.random() * _emptyBlockIndexes.length)];
		}		

		if(level != undefined){
			_block = $.extend({}, options.blocks[level]);
		}else{
			_block = $.extend({}, Math.random() >= 0.5 ? options.blocks[0] : options.blocks[1]);
		}		

		var coordinate = getCoordinate(put_index);
		var position = getPosition(coordinate.x, coordinate.y);
		var blockDom = $("<div></div>");
		blockDom.addClass("block_" + coordinate.x + "_" + coordinate.y);
		blockDom.css($.extend(options.style.block_style, {
			"position" : "absolute",
			"top"      : position.top + options.style.block_size / 2,
			"left"     : position.left + options.style.block_size / 2,
			"width"    : 0,
			"height"   : 0
		}, _block.style));

		$this.append(blockDom);
		state[put_index] = _block;

		blockDom.animate({
			"width"       : options.style.block_size + "px",
			"height"      : options.style.block_size + "px",
			"line-height" : options.style.block_size + "px",
			"top"         : position.top + "px",
			"left"        : position.left + "px"
		}, options.animateSpeed, (function(blockDom){
			return function(){
				return blockDom.html(_block.value);	
			}			
		})(blockDom));

		return true;
	};

	moveStep = function(direction, state, x, y){
		var _position, _blockDom, _updateBlock, _moved, targetCoord, _targetBlock;

		_block = getBlock(x, y);
		if(!_block) return;

		//todo
		if(direction === 'right'){
			targetCoord = { x: x + 1, y: y };
		}else if(direction === 'left'){
			targetCoord = { x: x - 1, y: y };
		}else if(direction === 'up'){
			targetCoord = { x: x, y: y - 1 };
		}else if(direction === 'down'){
			targetCoord = { x: x, y: y + 1 };
		}

		_targetBlock = getBlock(targetCoord.x, targetCoord.y);
		_moved       = 0;

		if(direction === "right" || direction == 'left'){
			while(!_targetBlock && targetCoord.x < options.width - 1){
				if(direction === 'right'){
					targetCoord.x = targetCoord.x + 1;
				}else if(direction == 'left'){
					targetCoord.x = targetCoord.x - 1;
				}

				_targetBlock   = getBlock(targetCoord.x, targetCoord.y);
				if(++_moved > Math.max(options.width, options.height)) break;
			}
		} else if(direction === "up" || direction == 'down'){
			while(!_targetBlock && targetCoord.y < options.height - 1){
				if(direction == 'up'){
					targetCoord.y = targetCoord.y - 1;
				}else if(direction == 'down'){
					targetCoord.y = targetCoord.y + 1;
				}
				
				_targetBlock   = getBlock(targetCoord.x, targetCoord.y);
				if(++_moved > Math.max(options.width, options.height)) break;
			}
		}

		_position = getPosition(targetCoord.x, targetCoord.y);
		_blockDom = $(".block_" + x + "_" + y);
		if(!_targetBlock){
			state[getIndex(x, y)] = null;
			state[getIndex(targetCoord.x, targetCoord.y)] = _block;
			_blockDom.removeClass();
			_blockDom.addClass("block_" + targetCoord.x + "_" + targetCoord.y);
			_blockDom.animate({"top": _position.top, "left": _position.left});
		} else if(_targetBlock.value === _block.value){
			state[getIndex(x, y)] = null;
			_updateBlock = $.extend({}, options.blocks[_block.level + 1]);
			_blockDom.removeClass();
		    _blockDom.addClass("block_" + targetCoord.x + "_" + targetCoord.y);
		    _blockDom.animate({"top": _position.top, "left": _position.left}, options.animateSpeed, (function(_blockDom, targetCoord, _updateBlock){
		    	return function(){
		    		_blockDom.remove();
		    		$(".block_" + targetCoord.x + "_" + targetCoord.y).html(_updateBlock.value).css(_updateBlock.style);
		    	 }
		    })(_blockDom, targetCoord, _updateBlock));
		} else {
			//todo
			if(direction === 'right'){
				targetCoord.x = targetCoord.x - 1;
			}else if(direction === 'left'){
				targetCoord.x = targetCoord.x + 1;
			}else if(direction === 'up'){
				targetCoord.y = targetCoord.y + 1;
			}else if(direction === 'down'){
				targetCoord.y = targetCoord.y - 1;
			}

			_position               = getPosition(targetCoord.x, targetCoord.y);
			state[getIndex(x, y)] = null;
			state[getIndex(targetCoord.x, targetCoord.y)] = _block;
			_blockDom.removeClass();
			_blockDom.addClass("block_" + targetCoord.x + "_" + targetCoord.y);
			_blockDom.animate({
				"top": _position.top,
				"left": _position.left
			}, options.animateSpeed);
		}
	};

	move = function(direction){
		var _x, _y;
		switch(direction){
			case 'up'    :{
				for(_x = 0; _x < options.width; _x ++){
					for (_y = 1; _y < options.height; _y ++) {
						moveStep(direction, state, _x, _y);
					}
				}
				break;
			} 
			case 'down'  : {
				for(_x = 0; _x < options.width; _x ++){
					for (_y = options.height - 2; _y >= 0; _y --) {
						moveStep(direction, state, _x, _y);
					}
				}
				break;
			}
			case 'left'  : {
				for(_y = 0; _y < options.height; _y ++){
					for (_x = 1; _x < options.width; _x ++) {
						moveStep(direction, state, _x, _y);
					}
				}
				break;
			}
			case 'right' : {
				for(_y = 0; _y < options.height; _y ++){
					for (_x = options.width - 2; _x >= 0; _x --) {
						moveStep(direction, state, _x, _y);
					}
				}
				break;
			}
		}
	};

	generateBlock = function(direction){
		var _x, _y, _lvl;
		_lvl = Math.floor(Math.random() * 2);
		switch(direction){
			case 'up': {
				OUTER:
				for (_y = options.height - 1; _y >= 0; _y--) {					
					while(buildBlock(_lvl, Math.floor(Math.random() * options.width), _y)){						
						break OUTER;
					}
				}
				break;
			} break;
			case 'down': {
				OUTER:
				for (_y = 0; _y < options.height; _y++) {					
					while(buildBlock(_lvl, Math.floor(Math.random() * options.width), _y)){						
						break OUTER;
					}
				}
			} break;
			case 'left': {
				OUTER:
				for (_x = options.width - 1; _x >= 0; _x--) {
					while(buildBlock(_lvl, _x , Math.floor(Math.random() * options.height))){
						break OUTER;
					}
				}
			} break;
			case 'right': {
				OUTER:
				for (_x = 0; _x < options.width; _x++) {
					while(buildBlock(_lvl, _x , Math.floor(Math.random() * options.height))){
						break OUTER;
					}
				}
			} break;
		}
	};

	$this.append(buildBackground());

	buildBlock(0, 0, 0);
	buildBlock(0, 0, 1);
	buildBlock(1, 0, 2);
	buildBlock(1, 0, 3);

	
	setTimeout(function(){ move('right');generateBlock('right'); }, 1000);
}