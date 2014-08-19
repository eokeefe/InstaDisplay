
// Build Objects
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

// Tag info
instaINFO = function (tag) {
	instagram.tags.tag(tag, function (tag, err) { 
		try {
			Fiber(function () {
				var count = tag.media_count, name = tag.name;
				if (Info.find().count() === 0) { Info.insert({type: "info", media_count: count, name: name}); } // Build
				else { Info.update({type: "info"}, {type: "info", media_count: count, name: name}); } // Update

				console.log("currently " + tag.media_count + " tags for "  + tag.name); // Change to display from DB
			}).run();
		} catch (err) { throw err; }; // Error management
	});
};

// Instagram to DB
instaDB = function (tag, id) {
	instagram.tags.media(tag, {max_tag_id: id}, function (tag, err, pag) { // max_tag_id use next_max_tag_id from pag
		try {
			Fiber(function() { 
				// Tag to DB
				for (i = 0; i < tag.length; ++i) { 
					Tags.insert(tag[i]);
					New.insert(tag[i]);
				};

				// Pagination to DB
				var max = pag.next_max_id, min = pag.next_min_id;
				if (Pagi.find().count() === 0) { 
					Pagi.insert({next_max_id: max, next_min_id: min, type: "pagi"});
				} else { 
					Pagi.update({type: "pagi"}, {next_max_id: max, next_min_id: min, type: "pagi"});
				};
			}).run();
		} catch (err) { throw err; }; // Error management
	});
};
