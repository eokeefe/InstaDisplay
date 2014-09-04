// URL Mapping
Router.map(function () {
	this.route('layout', {
		path: '/'
	});
});

// Helper name
UI.registerHelper("name", function () {
		var info = Info.find().fetch();

		return info[0].name;
	}
);

// Helper Tag
UI.registerHelper("Tag", function () {
	return Tags.find().map(function (tags, index) {
		// if(index === 0) {
		// 	tags.idx = true;
		// } else {
		// 	tags.idx = false;
		// }

		return tags;
	});
});

// Helper New
UI.registerHelper("NewTag", function () { 
	var newTag = New.findOne();

	if(newTag._id) current = newTag._id;

	return newTag;
});

// Modal control
if(Meteor.isClient) {
	Meteor.setInterval(function () {
		if(current){
			$("#modal").show();
			Meteor.setTimeout(function() { 
				$("#modal").hide();
				New.remove({_id: current});
			}, 3000);
		}
	}, 10000);
}


