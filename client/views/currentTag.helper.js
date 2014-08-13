Template.currentTag.helpers({
	Tag: function () {
		var size = Tags.find().count(),
			photos = Tags.find().fetch();

		return photos[10].img;
	}
});