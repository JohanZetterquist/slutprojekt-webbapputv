
/* Fucntion for the updating Iss tracking map */
function myMap() {
      var startpos = {lat: 59.334, lng: 18.063};
      var mapOptions = {
          zoom: 4,
          center: startpos
        };
      var map = new google.maps.Map(document.getElementById('gpsmap'), mapOptions);

      $("#issloc").click(function getISS() {

    $.getJSON("http://api.open-notify.org/iss-now.json?callback=?", function(data) {
        var lat = data["iss_position"]["latitude"];
        var lon = data["iss_position"]["longitude"];
        var isslat = Math.round(lat*1000)/1000.0;
        var isslon = Math.round(lon*1000)/1000.0;
        $("#isspos").html("<p>The ISS is currently over " + isslat + "&deg; N, " + isslon + "&deg; E");


      var issMarker = {lat: isslat, lng: isslon};
      
      var mapOptions = {
          zoom: 4,
          center: issMarker
        };

      var map = new google.maps.Map(document.getElementById('gpsmap'), mapOptions);

      var marker = new google.maps.Marker({
          position: issMarker,
          map: map,
          animation: google.maps.Animation.DROP
        });

    });

    setTimeout(getISS, 10000);

    });
}

/* Map, marker and timestamps when ISS passes over Stockholm */
$("#passSthlm").click(function(){

  $.getJSON("http://api.open-notify.org/iss-pass.json?lat=59.334591&lon=18.063240&callback=?", function(data) {

    $("#isspass li").remove();
    data["response"].forEach(function (d) {
        var date = new Date(d["risetime"]*1000);
         $("#isspass").append("<li>" + date.toString() + "</li>");
    });

});

var mapOptions = {
  zoom: 6,
  center: new google.maps.LatLng(59.334591, 18.063240)
}
var mapSthlm = new google.maps.Map(document.getElementById("mapsthlm"), mapOptions);

var marker = new google.maps.Marker({
  position: new google.maps.LatLng(59.334591, 18.063240),
  map: mapSthlm
});

});

/* Who are currently in space */

$.getJSON("http://api.open-notify.org/astros.json?callback=?", function(data){

  var number = data["number"];

  $("#peopleinspace").append("<h2>There is currently " + number + " people in space</h2>");

  data["people"].forEach(function(d){

    $("#nameinspace").append("<li>" + d["name"] + "</li>");

  });
}); 




