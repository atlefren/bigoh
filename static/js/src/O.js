/*global ol: true*/
var O = this.O || {};
(function (ns) {
    'use strict';

    ns.Icon = {Default: {imagePath: 'static/img'}};

    var defaultStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: ns.Icon.Default.imagePath + '/marker-icon.png'
        }))
    });

    function flip(arr) {
        return arr.slice(0).reverse();
    }

    function toMerc(position) {
        return ol.proj.transform(position, 'EPSG:4326', 'EPSG:3857');
    }

    var Map = function (div) {
        this.map = new ol.Map({
            target: div,
            renderer: 'canvas'
        });
    };

    Map.prototype.setView = function (position, zoom) {

        var view = this.map.getView();
        view.setCenter(toMerc(flip(position)));
        view.setZoom(zoom);
        return this;
    };

    Map.prototype.getVectorLayer = function () {
        if (!this.vectorLayer) {
            var vectorSource = new ol.source.Vector();

            this.vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            this.map.addLayer(this.vectorLayer);
        }
        return this.vectorLayer;
    };

    var TileLayer = function (url, options) {
        url = url.replace('{s}', '{a-c}');
        var attributions = [];
        if (options.attribution) {
            attributions.push(new ol.Attribution({
                html: options.attribution
            }));
        }

        this.layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                attributions: attributions,
                url: url
            })
        });
    };

    TileLayer.prototype.addTo = function (map) {
        map.map.addLayer(this.layer);
        return this;
    };

    var Marker = function (position) {
        this.feature = new ol.Feature({
            geometry: new ol.geom.Point(toMerc(flip(position))),
        });
        this.feature.setStyle(defaultStyle);
    };

    Marker.prototype.addTo = function (map) {
        var layer = map.getVectorLayer();
        layer.getSource().addFeature(this.feature);
        return this;
    };

    ns.map = function (div) {
        return new Map(div);
    };

    ns.tileLayer = function (url, options) {
        return new TileLayer(url, options);
    };

    ns.marker = function (position) {
        return new Marker(position);
    };

}(O));
