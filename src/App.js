import "leaflet/dist/leaflet.css";
import './App.css';
import LeafletMap from "./LeafletMapComponent.tsx";

const points = [
  {
    key: '1',
    selected: true,
    type: "Punkt sieciowy",
    name:"Częstochowa 1",
    description:"Przystanek komunikacji miejskiej",
    service: "ul. Kinowa 19 04-030 Warszawa",
    geocode: [52.3, 20.8966151]
  },
  {
    key: '2',
    selected: false,
    type: "Punkt sieciowy 2",
    name:"ul. Grenadierów 44 04-007 Warszawa",
    description:"Przystanek komunikacji miejskiej 2",
    service: "InPost Paczkomat WAW64H",
    geocode: [52.2330974, 20.7]
  },
  {
    key: '2',
    selected: false,
    type: "Punkt sieciowy 2",
    name:"ul. Grenadierów 44 04-007 Warszawa",
    description:"Przystanek komunikacji miejskiej 2",
    service: "InPost Paczkomat WAW64H",
    geocode: [52.2330974, 20.7]
  },
  {
    key: '2',
    selected: false,
    type: "Punkt sieciowy 2",
    name:"ul. Grenadierów 44 04-007 Warszawa",
    description:"Przystanek komunikacji miejskiej 2",
    service: "InPost Paczkomat WAW64H",
    geocode: [52.2330974, 20.7]
  },
  {
    key: '2',
    selected: false,
    type: "Punkt sieciowy 2",
    name:"ul. Grenadierów 44 04-007 Warszawa",
    description:"Przystanek komunikacji miejskiej 2",
    service: "InPost Paczkomat WAW64H",
    geocode: [52.2330974, 20.7]
  },
  {
    key: '2',
    selected: false,
    type: "Punkt sieciowy 2",
    name:"ul. Grenadierów 44 04-007 Warszawa",
    description:"Przystanek komunikacji miejskiej 2",
    service: "InPost Paczkomat WAW64H",
    geocode: [52.2330974, 20.7]
  }
]

const getPoints = (position, zoomState) => {
  console.log('searching for points...');
  return points;
}

function App() {
  return (
    <div style={{height: "800px", width: "1800px", borderRadius:"20px", padding:"20px"}}>
      <LeafletMap getPoints={getPoints}/>
    </div>
    
  );
}

export default App;
