// FOR Production once finished!
// Template.currentTag.helpers({
// 	Tag: function () {
// 		// var T = Tags.find();
// 		// var url = T.images.stand.... // for loop
// 		return Tags.find();
// 	}
// });




// FOR TESTING BACKEND ONLY!
Template.currentTag.helpers({
	Tag: function (i) {
		var photos = Tags.find().fetch();

		return photos[i].images.standard_resolution.url;
	}
});
