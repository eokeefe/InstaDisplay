// Build Instagram Object
instagram = new Instagram.createClient('5166661f18554a699feaed3de378c3bf', 'bfebf48354df4928a0aab8efec13d906');
Fiber = Npm.require('fibers');

// Tag Count
instagram.tags.tag('medx', function (tag, error) { 
	Fiber(function () {
		console.log(tag);
		if (Info.find().count() === 0) Info.insert(tag);
		else Info.update("media_count", tag);
	}).run();
});

instagram.tags.media('medx', function (tag, error) { 
	Fiber(function() {
		if (Tags.find().count() === 0) {
			for (i = 0; i < tag.length; ++i) {
				// console.log(tag[i].images.standard_resolution.url);
				Tags.insert({
					order: i,
					img: tag[i].images.standard_resolution.url, 
					time: tag[i].created_time,
					user: tag[i].user
				});
			};
		}
	}).run();
});



// { attribution: null,
// tags: [ 'pamurico', 'bestcousins', 'fabfam' ],
// location: null,
// comments: { count: 2, data: [Object] },
// filter: 'Valencia',
// created_time: '1403122099',
// link: 'http://instagram.com/p/pZfQbDrqHk/',
// likes: { count: 5, data: [Object] },
// images: 
//  { low_resolution: [Object],
//    thumbnail: [Object],
//    standard_resolution: [Object] },
// users_in_photo: [ [Object] ],
// caption: 
//  { created_time: '1403122099',
//    text: 'Couldn\'t have done it all without these two ladies, amirite @ayshbot #fabfam #bestcousins',
//    from: [Object],
//    id: '745764682017448520' },
// type: 'image',
// id: '745764681312805348_5382983',
// user: 
//  { username: 'jasbacca',
//    website: '',
//    profile_picture: 'http://images.ak.instagram.com/profiles/profile_5382983_75sq_1352061537.jpg',
//    full_name: 'Jasmin',
//    bio: '',
//    id: '5382983' } }