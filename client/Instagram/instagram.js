var INSTAID = 'f2110566dd014ef8b818cf9e621dfb5d';
var markersArray = [];
var instaArray = [];
var ACCESSTOKEN = "";

Meteor.startup(function(){

  //If the user has a geolocation, get photos near location and set map center to location.
  function successFunction(success) {
    var navLatLng = newLatLng(success);
    getNewPhotos({lat: success.coords.latitude, lng: success.coords.longitude, distance:'3000'});
    createMap(navLatLng);
    placeNavMarker(navLatLng);
    addClickListener();
    addAutocomplete();
  }

  // //If the user did not enable geolocation, get photos and set map near Golden Gate Bridge, because it's always awesome.
  // function errorFunction(success) {
  //   var latlng = new google.maps.LatLng(37.808631, -122.474470);
  //   getNewPhotos({lat: latlng.lat(), lng: latlng.lng(), distance:'3000'});
  //   createMap(latlng);
  //   placeClickMarker(latlng);
  //   addClickListener();
  //   addAutocomplete();
  // }

  //initialize state of zoomed image
  $('#zoomed-image').hide();
  Session.set('zoomed', '');

});

Deps.autorun(function(){
  if(Meteor.user()){
    Meteor.call("getAccessToken", function(error, accessToken){
       ACCESSTOKEN = accessToken;
    })
  }
})


//Helper function to push photos to template scope
Template.instagram.photoset = function(){
  return Session.get('photoset');
}

//Event Handlers for click and mouseover events
Template.content.events({
  'click .photo': function(event){
    $(event.target).addClass('greyed');
    if (Session.equals('zoomed', '')) {
      $('<input type="submit" value="close" class="close">').appendTo('#zoomed-image');
      $('<img src='+this.images.standard_resolution.url+' alt="">').appendTo('#zoomed-image');
      Session.set('zoomed', 'zoomed');
    }
    $('#zoomed-image').toggle('');
  },
  'click .popupPhoto': function(event){
    $('.photo').toggleClass('greyed');
    if (Session.equals('zoomed', '')) {
      $('#zoomed-image').toggle('');
      $('<img src='+event.target.src+' alt="">').appendTo('#zoomed-image');
      $('<input type="submit" value="close" class="close">').appendTo('#zoomed-image');
      Session.set('zoomed', 'zoomed');
    } else {
      $('#zoomed-image').hide();
      $('#zoomed-image').children().remove();
      Session.set('zoomed', '');
    }
  },
  'click #zoomed-image': function(event){
      $(event.currentTarget).hide();
      $(event.currentTarget).children().remove();
      Session.set('zoomed', '');
      $('.photo').removeClass('greyed');
  },
  'mouseenter .photodiv': function(event){
    $(event.target.children[0]).addClass('greyed');
    for (var i =1; i < event.target.children.length; i++){
      $(event.target.children[i]).show("easing");
    }
  },
  'mouseleave .photodiv': function(event){
    $(event.target.children[0]).toggleClass('greyed');
    for (var i =1; i < event.target.children.length; i++){
      $(event.target.children[i]).hide("easing");
    }
  }
});


//INSTA HELPERS

//processses the json data on ajax success
function jsonLoad (json) {
  if (json.meta.code == 200) {
    var show = json.data;
    placeInstaMarkers(show, map);
    Session.set('photoset', show);
    $(event.target.children[1]).hide();
  } else{
    alert("Instagram API limit exceeded, please login to Instahood with Instagram to see more photos");
  };
}

//basic ajax call to instagram API, searching for photos within specified distance of passed in place
var getNewPhotos = function (data) {
  $.ajax({
    url: 'https://api.instagram.com/v1/media/search?callback=?',
    dataType: 'json',
    data: {'order': '-createdAt', lat: data.lat, lng: data.lng, distance:data.dist, client_id: INSTAID, access_token: ACCESSTOKEN},
    success: jsonLoad,
    statusCode: {
      500: function () {
        alert('Sorry, service is temporarily down.');
      }
    }
  });
};
