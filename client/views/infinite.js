//You can find more information on this here: http://www.meteorpedia.com/read/Infinite_Scrolling

var TAG_INCREMENT = 20; //Set the number of photos to load
  Session.setDefault('tagLimit', TAG_INCREMENT);
  Deps.autorun(function() {
    Meteor.subscribe('Tags', Session.get('tagLimit'));
  });

Template.currentTag.Tags = function() {
    return Tags.find();
  }

Template.currentTag.moreResults = function() {
    // If, once the subscription is ready, we have less rows than we
    // asked for, we've got all the rows in the collection.
    return !(Tags.find().count() < Session.get("tagLimit"));
}

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults"); //Not sure if we need the target part since we don't have a load bar
    if (!target.length) return;

    threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            // console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("tagLimit",
                Session.get("tagLimit") + TAG_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            // console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);
