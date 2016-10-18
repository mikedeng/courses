function Nav() {
	var container, navItems, i, _nav_item, _index,
		findIndex, hideAll, addEvents, init;

	findIndex = function(item, list){
		for(i = 0; i < list.length; i++){
			if(list[i] === item) return i;
		}

		return -1;
	};

	hideAll = function(){
		for(i = 0; i < blockItems.length; i++){
			blockItems[i].style.display = 'none';
		}
	};

	addEvents = function(){
		for(i = 0; i < navItems.length; i++){
			navItems[i].addEventListener('mouseenter', function(evt){
			   hideAll();

			   _nav_item = evt.target;
			   _index    = findIndex(_nav_item, navItems);
			   blockItems[_index].style.display = 'block';
			}.bind(this));
		}

		container.addEventListener('mouseleave', function(evt){
		   hideAll();
		}.bind(this));
	};

	init = function(conId){
		container  = document.getElementById(conId);
		navItems   = document.getElementsByClassName('nav-item');
		blockItems = document.getElementsByClassName('block-item');

		if(navItems.length != blockItems.length) throw "length of nav & block not match";
		addEvents();
	};

	return {init: init};
}

new Nav().init('myNav');