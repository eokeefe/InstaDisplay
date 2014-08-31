if(Meteor.isClient) {
	// var $container = $('#container');
	// // init
	// $container.packery({
	// 	itemSelector: '.item',
	// 	gutter: 10
	// });

	var container = document.querySelector('#container');
	var msnry = new Masonry( container, {
	// options...
		itemSelector: '.item',
		columnWidth: 200
	});	
}
