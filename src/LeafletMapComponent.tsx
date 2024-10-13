import React, { useCallback, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, createTheme, OutlinedInput, Theme, ThemeProvider, Typography } from "@mui/material";


interface InputWindowProps {
  mapCenterX: number,
  mapCenterY: number,
  zoom: number,
  theme: Theme,
  handleSelection: (input: MapPoint) => any,
  getPoints: (position: Position, zoom: number) => [MapPoint]
};

interface MapPoint {
  key: string,
  type: string,
  name: string,
  description: string,
  service: string,
  geocode: [number]
};

interface Position {
  lat: string,
  lng: string,
  zoom: number
}

const LeafletMap: React.FC<InputWindowProps> = ({
  mapCenterX = 52.22,
  mapCenterY = 21.02,
  zoom = 13,
  theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(106,24,19)',
      },
      secondary: {
        main: 'rgb(218, 207, 185)'
      }
    },
    typography: {
      fontFamily: "Ysabeau",
      h6: {
        wordWrap: "break-word",
      },
      h5: {
        wordWrap: "break-word",
      },
      h4: {
        wordWrap: "break-word",
      },
      body1: {
        wordWrap: "break-word",
      },
      body2: {
        wordWrap: "break-word",
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px"
          }
        }
      }
    }
  }),
  handleSelection,
  getPoints
}) => {
  const [mapPoints, setMapPoints] = useState<[MapPoint]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(null!);
  const [position, setPosition] = useState(() => map ? map.getCenter() : { lat: mapCenterX, lng: mapCenterY })
  const [zoomState, setZoomState] = useState(zoom);

  const onMove = useCallback(() => {
    if (map)
      setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    if (map) {
      map.on('move', onMove)
      return () => {
        map.off('move', onMove)
      }
    }
  }, [map, onMove])

  useEffect(() => {
    if (position && !isSearching) {
      setIsSearching(true);
      setTimeout(() => {
        let points = getPoints(position, zoomState);
        setMapPoints(points);
        setIsSearching(false);
      }, 1000);
    }
  }, [position, setPosition])

  const getcustomIcon = (marker: MapPoint) => {
    return new Icon({
      iconUrl: selectedPoint && selectedPoint.key === marker.key ? require("./marker-selected.png") : require("./marker.png"),
      iconSize: [32, 32]
    })
  };

  const createClusterCustomIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(20, 20, true)
    });
  };

  const handleSelectMarker = (point: MapPoint) => {
    setSelectedPoint(point);
  }

  const handleDeselectMarker = () => {
    setSelectedPoint(null!);
  }

  let displayDetails = () => {
    return <>
      <Button
        onClick={() => handleDeselectMarker()}
        aria-label="back"
        startIcon={<ArrowBackIcon />}
        sx={{

        }}
      >
        <Typography> Powrót </Typography>
      </Button>

      <div className='point-details'>
        <div className='icon'><img src='/images/inpost-logo.jpg'></img></div>
        <div className='service'>{selectedPoint.service}</div>
        <div className='name'>{selectedPoint.name}</div>
        <div className='description'>{selectedPoint.description}</div>
        <Button
          onClick={() => handleSelection(selectedPoint)}
          sx={{
            borderRadius: "20px",
            bgcolor: "rgb(106,24,19)",
            ':hover': {
              bgcolor: 'rgb(106,24,19)'
            }
          }} variant='contained'>
          <Typography>Zatwierdź punkt</Typography>
        </Button>
      </div>
    </>
  }

  let displayList = () => {

    return <><div className="location-input">
      <OutlinedInput fullWidth placeholder="Adres" sx={{
        borderRadius: "20px", "&.Mui-focused": {
          borderColor: 'gray'
        }
      }} />
      <IconButton onClick={() => handleDeselectMarker()} aria-label="back">
        <ArrowForwardIcon />
      </IconButton>
    </div>
      <div className="points-list">
        {mapPoints.map((point) => {
          return <div className="point-container">
            <div className="title">
              <div className='icon'><img src='/images/inpost-logo.jpg'></img></div>
              <div className='service'>{point.service}</div>
            </div>
            <div className='content'>
              <div className='name'>{point.name}</div>
              <div className='description'>{point.description}</div>
            </div>
            <Button
              onClick={() => handleSelectMarker(point)}
              sx={{
                borderRadius: "20px",
                bgcolor: "rgb(106,24,19)",
                ':hover': {
                  bgcolor: 'rgb(106,24,19)'
                }
              }} variant='contained'>
              <Typography>Wybierz punkt</Typography>
            </Button>
          </div>
        })}</div></>
  }

  return <ThemeProvider theme={theme}>
    <div className='container'>
      {/* {position ? <p>latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}, zoom:{map ? map.getZoom() : null}{' '}</p> : null} */}
      <div className='container-map'>
        <MapContainer
          center={[mapCenterX, mapCenterY]}
          zoom={zoom}
          ref={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
          >
            {mapPoints.map((marker) => (
              <Marker position={marker.geocode} icon={getcustomIcon(marker)} eventHandlers={{
                click: (e) => {
                  handleSelectMarker(marker)
                },
              }} />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        <div className='sidebar-container'>
          {selectedPoint ? displayDetails() : displayList()}
        </div>
      </div>
    </div>
  </ThemeProvider>
}

export default LeafletMap;