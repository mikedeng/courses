function nav_list(id){
	var target = document.getElementById(id);
	var navs = target.getElementsByClassName("nav-item");
	var blocks = target.getElementsByClassName("block-item");

	var findIndex = function(target, list){
		for(var i=0; i<list.length; i++){
			if(list[i] == target) return i;
		}
		return -1;
	}

	var loopFunction = function(){
		this.hideAll();
		this.showBlock(++this.currentIndex);
		if(this.currentIndex >= blocks.length - 1) this.currentIndex = -1;
	}.bind(this);

	if(navs.length != blocks.length) throw "length of navigation not match";

	for(var i=0; i<navs.length; i++){
		var nav = navs[i];
		nav.addEventListener('mouseenter', function(evt){
			this.hideAll();
			var index  = findIndex(evt.target, navs);
			this.showBlock(index);
			clearInterval(this.runId);
		}.bind(this))
	}

	target.addEventListener('mouseleave', function(evt){
		var index = findIndex(evt.target, navs);
		this.hideAll();
		this.runId = setInterval(loopFunction, 500)
	}.bind(this))

	this.showBlock = function(index){
		blocks[index].style.display = "block";
	}
	this.hideAll = function(){
		for(var i=0; i<blocks.length; i++){
			blocks[i].style.display = "none";
		}
	}

	for(var i=0; i<blocks.length; i++){
		var block = blocks[i];
		var links = block.getElementsByTagName('a');
		for(var j=0; j<links.length; j++){
			links[j].target = "_self";
		}
	}

	this.currentIndex = 0;
	this.showBlock(0);
	this.runId = setInterval(loopFunction, 5000)
}

var nav1 = new nav_list("myNav");