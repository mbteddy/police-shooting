// Function to draw map
var drawMap = function() {
  var map = L.map('container').setView([35, -94], 4);
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  layer.addTo(map)
  getData(map) 
}

// Function for getting data
var getData = function(map) {
  $.getJSON('data/response.json', function(data) {
    customBuild(data, map); 
  }); 
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
  var maleLayer = new L.LayerGroup([]);
  var femaleLayer = new L.LayerGroup([]); 
  var blackLayer = new L.LayerGroup([]); 
  var whiteLayer = new L.LayerGroup([]); 
  var asianLayer = new L.LayerGroup([]); 
  var nativeLayer = new L.LayerGroup([]);
  var islanderLayer = new L.LayerGroup([]);
  var unknownLayer =  new L.LayerGroup([]);
  var black = 0; 
  var white = 0; 
  var male = 0; 
  var female = 0; 
  for (var i=0; i<data.length;i++) {
      var lat = data[i]["lat"];
      var lng = data[i]["lng"];
      var circ = L.circleMarker([lat, lng], {
        radius: 7,
      });
      circ.bindPopup(data[i]["Summary"]);
      var race = data[i]["Race"];
      if (data[i]["Victim's Gender"] == "Male") {
        circ.setStyle({color: 'blue', fillColor: 'blue'});
        if (race == "White") {
          white++
        } else if (race == "Black or African American") {
          black++
        }
      } else if (data[i]["Victim's Gender"] == "Female") {
        circ.setStyle({color: 'red', fillColor: 'red'});
        if (race == "White") {
          male++
        } else if (race == "Black or African American") {
          female++
        }
      } else {
        circ.setStyle({color: 'black', fillColor: 'black'});
      }

      if (race == "Black or African American") {
        black++
      } else if (race == "White") {
        white++
      }
      if (race == "Black or African American") {
        circ.addTo(blackLayer);
      } else if (race == "White") {
        circ.addTo(whiteLayer);
      } else if (race == "Asian") {
        circ.addTo(asianLayer);
      } else if (race == "American Indian or Alaskan Native") {
        circ.addTo(nativeLayer);
      } else if (race == "Native Hawaiian or Other Pacific Islander") {
        circ.addTo(islanderLayer);
      } else {
        circ.addTo(unknownLayer);
      }
  }

  var layers = {"White" : whiteLayer, "Black or African American" : blackLayer, 
  "Asian" : asianLayer, "American Indian or Alaskan Native" : nativeLayer, 
  "Native Hawaiian or Other Pacific Islander" : islanderLayer, "Unknown" : unknownLayer,};
  L.control.layers(null, layers).addTo(map);

  $('#blackMale').text(black);
  $('#whiteMale').text(white);
  $('#blackFemale').text(male);
  $('#whiteFemale').text(female);
}
