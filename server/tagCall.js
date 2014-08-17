
// Build Instagram Object
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

var next = '0';

// Tag Count
instagram.tags.tag('pamurico', function (tag, err) { 
	try {
		Fiber(function () {
			if (Info.find().count() === 0) Info.insert(tag);
			else Info.update("media_count", tag);
		}).run();
	} catch (err) {
		throw err;
	}
});

instagram.tags.media('pamurico', {max_tag_id: next}, function (tag, err, pag) { // for max_tag_id get next_max_tag_id from pag
	console.log(pag);
	try {
		Fiber(function() { 
			for (i = 0; i < 20; ++i) Tags.insert(tag[i]);
		}).run();
	} catch (err) {
		throw err;
	}
});

