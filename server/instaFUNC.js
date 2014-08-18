
// Build Objects
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

// Tag info
instaINFO = function () {
	instagram.tags.tag('pamurico', function (tag, err) { 
		try {
			Fiber(function () {
				if (Info.find().count() === 0) Info.insert(tag); // Build
				else Info.update("media_count", tag); // Update

				console.log("currently " + tag.media_count + " tags for "  + tag.name); // Change to display from DB
			}).run();
		} catch (err) { throw err; }; // Error management
	});
};

// Instagram to DB
instaDB = function (pagi) {
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
};
