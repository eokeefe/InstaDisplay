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
UI.registerHelper("Tag", function () { return Tags.find(); });
