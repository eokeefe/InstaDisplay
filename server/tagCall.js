
// Build Instagram Object
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

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

var instaDB = function (pagi) {
	instagram.tags.media('pamurico', {max_tag_id: pagi}, function (tag, err, pag) { // for max_tag_id get next_max_tag_id from pag
		try {
			Fiber(function() { 
				// Tag to DB
				for (i = 0; i < tag.length; ++i) { 
					Tags.insert(tag[i]);
					New.insert(tag[i]);
				}; 

				Pagi.insert(pag); // Pagination to DB
			}).run();
		} catch (err) {
			throw err;
		}
	});
}

instaDB('0');
instaDB('1402721579746994');
