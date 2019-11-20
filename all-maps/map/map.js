const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch('https://api.topomaps.app/maps/' + id)
    .then(response => {
        return response.json()
    })
    .then(data => {
        setMap(data);
    })
    .catch(err => {
        alert(err);
    })


function setMap(map) {
    let mapElement = L.map('map').fitWorld();

    if (map.location !== null) {
        mapElement.setView([map.location.latitude, map.location.longitude], 13);
    }

    map.urls.forEach(element => {
        if (element.wms == null) {
            L.tileLayer(element.template, {
                attribution: '© ' + map.copyright.owner,
                minZoom: element.minZoom,
                maxZoom: element.maxZoom
            }).addTo(mapElement);
        } else {
            L.tileLayer.wms(element.template, {
                layers: element.wms.layerName,
                minZoom: element.minZoom,
                maxZoom: element.maxZoom
            }).addTo(mapElement);
        }
    });
}