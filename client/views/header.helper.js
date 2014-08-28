Template.header.helpers({
	name: function () {
		var info = Info.find().fetch();

		return info[0].name;
	}
});