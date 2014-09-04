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
	var newTag = New.findOne(), current = newTag._id;

	if(current !== undefined) {
		setTimeout(function(current) {
			console.log(current);
			New.remove({_id: current}).remove();
		}, 1000);
	}

	return newTag 
});

// UI.insert(UI.renderWithData(Template.modal, New), );
