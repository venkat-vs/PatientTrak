import { Component, OnInit } from "@angular/core";
declare let L;
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js";
import { ELEMENT_PROBE_PROVIDERS } from "@angular/platform-browser/src/dom/debug/ng_probe";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  private layerDetails: string;

  private jsonDrawn = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"pane":"overlayPane","nonBubblingEvents":[],"fill":"true","smoothFactor":1,"noClip":false,"stroke":"true","color":"#3388ff","weight":"3","opacity":"1","lineCap":"round","lineJoin":"round","dashArray":null,"dashOffset":null,"fillColor":"#000000","fillOpacity":"0.2","fillRule":"evenodd","interactive":true,"name":"zone1"},"geometry":{"type":"Polygon","coordinates":[[[-123.14017295837404,49.308784358032355],[-123.14017295837404,49.31594672729814],[-123.1245517730713,49.31594672729814],[-123.1245517730713,49.308784358032355],[-123.14017295837404,49.308784358032355]]]}},{"type":"Feature","properties":{"pane":"overlayPane","nonBubblingEvents":[],"fill":true,"smoothFactor":1,"noClip":false,"stroke":true,"color":"#3388ff","weight":3,"opacity":1,"lineCap":"round","lineJoin":"round","dashArray":null,"dashOffset":null,"fillColor":null,"fillOpacity":0.2,"fillRule":"evenodd","interactive":true},"geometry":{"type":"Polygon","coordinates":[[[-123.1589698791504,49.31270140775414],[-123.1589698791504,49.320086996978475],[-123.15150260925294,49.320086996978475],[-123.15150260925294,49.31270140775414],[-123.1589698791504,49.31270140775414]]]}},{"type":"Feature","properties":{"pane":"overlayPane","nonBubblingEvents":[],"fill":true,"smoothFactor":1,"noClip":false,"stroke":true,"color":"#3388ff","weight":3,"opacity":1,"lineCap":"round","lineJoin":"round","dashArray":null,"dashOffset":null,"fillColor":null,"fillOpacity":0.2,"fillRule":"evenodd","interactive":true},"geometry":{"type":"Polygon","coordinates":[[[-123.10644149780275,49.30044560084641],[-123.10644149780275,49.30598627468646],[-123.0886745452881,49.30598627468646],[-123.0886745452881,49.30044560084641],[-123.10644149780275,49.30044560084641]]]}}]}';

  constructor() {
    this.layerDetails = '';
  }

  ngOnInit() {
    this.DisplayMap();
  }

  DisplayMap() {
    const osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      osmAttrib =
        '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
      map = new L.Map("map", { center: new L.LatLng(51.505, -0.04), zoom: 13 }),
      drawnItems = L.featureGroup().addTo(map);
    L.control
      .layers(
        {
          osm: osm.addTo(map),
          google: L.tileLayer(
            "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
            {
              attribution: "google"
            }
          )
        },
        { drawlayer: drawnItems },
        { position: "topleft", collapsed: false }
      )
      .addTo(map);

    const drawControl = new L.Control.Draw({
      draw: {
        polyline: {
          shapeOptions: {
            color: "blue",
            weight: 10
          }
        },
        polygon: {
          allowIntersection: false,
          showArea: true,
          drawError: {
            color: "#e1e100"
          },
          shapeOptions: {
            color: "red"
          }
        },
        circle: false,
        rectangle: {
          shapeOptions: {
            clickable: false
          }
        }
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        poly: {
          allowIntersection: false
        }
      }
    });
    map.addControl(drawControl);
    // drawControl.setDrawingOptions();

    const usersObjectsJson = drawnItems.toGeoJSON();

    console.log(usersObjectsJson);

    map.on(L.Draw.Event.CREATED, function(event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      const j = layer.toGeoJSON();
      let feature = '';
      j.properties = layer.options;
      feature += JSON.stringify(j);
      this.layerDetails += JSON.stringify((JSON.parse(feature)));
      console.log(this.layerDetails);
      alert(this.layerDetails);
    });
  }
}
