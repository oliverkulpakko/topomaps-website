fetchLayers(function(layers, error) {
  if (error) {
    alert(error);
    return
  }

  setupMap(layers);
});

function setupMap(layers) {
  let map = L.map('map').fitWorld();

  L.control.layers(layers).addTo(map);
  L.control.locate().addTo(map);
  
  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

  map.locate({
    setView: true,
    maxZoom: 16
  });
}

// Map Callbacks

function onLocationFound(e) {
  let radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

// Data

function fetchLayers(callback) {
  let url = 'https://kulpakko.com/api/topomaps/maps';

  fetch(url)
    .then(res => res.json())
    .then((out) => {
      let layers = [];

      for (map of out) {
        let urls = [];
        for (url of map.urls) {
          urls.push(L.tileLayer(url.template, {
            attribution: '<a href="' + map.copyright.url + '">' + map.copyright.text + '</a>',
            minZoom: url.minZoom,
            maxZoom: url.maxZoom
          }));
        }

        let name = map.country + ' - ' + map.type;

        layers[name] = L.layerGroup(urls);
      }

      callback(layers, null);
    })
    .catch(error => {
      callback(null, error)
    });
}
