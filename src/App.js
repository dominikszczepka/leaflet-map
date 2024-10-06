import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import './App.css';

import { Icon, divIcon, point } from "leaflet";

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

const markers = [
  {
    geocode: [52.3, 20.8966151],
    popUp: "Hello, I am pop up 2"
  },
  {
    geocode: [52.2330974, 20.7],
    popUp: "Hello, I am pop up 3"
  }
];

const points = [
  {
    type: "Punkt sieciowy",
    name:"Częstochowa 1",
    description:"Przystanek komunikacji miejskiej",
    service: "inpost"
  },
  {
    type: "Punkt sieciowy",
    name:"Częstochowa 1",
    description:"Przystanek komunikacji miejskiej",
    service: "inpost"
  },
  {
    type: "Punkt sieciowy",
    name:"Częstochowa 1",
    description:"Przystanek komunikacji miejskiej",
    service: "inpost"
  },
  {
    type: "Punkt sieciowy",
    name:"Częstochowa 1",
    description:"Przystanek komunikacji miejskiej",
    service: "inpost"
  },
  {
    type: "Punkt sieciowy",
    name:"Częstochowa 1",
    description:"Przystanek komunikacji miejskiej",
    service: "inpost"
  }
]

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

let generatePopup = (marker) => {
  return <div>
    <div>
    {marker.popUp}
      </div>
    <button>select</button>
  </div>
}

function App() {
  return (
    <div className='container'>
    <MapContainer center={[52.2330974, 20.8966151]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{generatePopup(marker)}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
    <div className='points-list'>
        {points.map((point) => {
          return <div className="point-container">
            <div className='service'>{point.service}</div>
            <div className='icon'><image src='./placeholder.png'></image></div>
            <div className='name'>{point.name}</div>
            <div className='description'>{point.description}</div>
          </div>
        })}
    </div>
    </div>
  );
}

export default App;
