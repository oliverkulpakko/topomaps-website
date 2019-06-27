let url = 'https://kulpakko.com/api/topomaps/maps';

fetch(url)
  .then(res => res.json())
  .then((out) => {
    let layers = [];

    for (map of out) {
      let urls = [];
      for (url of map['urls']) {
        urls.push(L.tileLayer(url['template'], {
          attribution: '<a href="' + map['copyright']['url'] + '">' + map['copyright']['text'] + '</a>',
          minZoom: url['minZoom'],
          maxZoom: url['maxZoom']
        }));
      }

      let name = map['country'] + ' - ' + map['type'];

      layers[name] = L.layerGroup(urls);
    }

    var map = L.map('map', {
      layers: layers,
      layer: layers[0]
    }).fitWorld();

    L.control.layers(layers).addTo(map);

    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({
      setView: true,
      maxZoom: 16
    });
  })
  .catch(err => {
    throw err
  });
