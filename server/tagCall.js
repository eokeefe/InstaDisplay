// Build Instagram Object
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

// Tag Count
// instagram.tags.tag('pamurico', function (tag, error) { 
	// console.log("Tag count: " + tag.media_count + ", Tag name: " + tag.name);
// });

instagram.tags.media('pamurico', function (tag, error) { 
	Fiber(function() {
		for (i = 0; i < tag.length; ++i) {
			console.log(tag[i].images.standard_resolution.url);
			Tags.insert( {img: tag[i].images.standard_resolution.url, order: i} );
		};
		console.log(tag);
	}).run();
});