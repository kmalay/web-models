/**
 * Created by kmalay on 5/18/15.
 */
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var options = {
    draw: {
        polyline: false,
        polygon: {
            allowIntersection: false,
            drawError: {
                color: '#e1e100',
                message: '<strong>Oh snap!<strong> you can\'t draw that!'
            },
            shapeOptions: {
                color: '#8da541'
            }
        },
        circle: false,
        rectangle: false,
        marker: false
    },
    /*
     edit: {
     featureGroup: drawnItems,
     remove: true
     }
     */
    edit: false
};
var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

var xMax, yMax, xMin, xMax, bbox;

map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);
    xMax = drawnItems.getBounds()._northEast.lat;
    yMax = drawnItems.getBounds()._northEast.lng;
    xMin = drawnItems.getBounds()._southWest.lat;
    yMin = drawnItems.getBounds()._southWest.lng;
    bbox = xMax + " " + yMax + " " + xMin + " " + yMin;
    console.log('bbox:  ' + bbox);
});

var sidebar = L.control.sidebar('sidebar', {
    position: 'right',
    closeButton: false
});

map.addControl(sidebar);

setTimeout(function () {
    sidebar.show();
}, 500);
