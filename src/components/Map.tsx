import React, { useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from "@chakra-ui/react";
import { LatLngExpression } from 'leaflet';

type MapProps = {
  position: LatLngExpression | null;
  setPosition: any;
};

const Map: React.FC<MapProps> = ({ position, setPosition }) => {

  if (!position) {
    console.log(position)
    return <></>
  }
  function DraggableMarker() {
    // const center = {
    //     lat: 51.505,
    //     lng: -0.09,
    //   }
    const [draggable, ] = useState(true)
    const [, setMarkerPosition] = useState(position)
    const markerRef = useRef(null as any)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            const coordinates = marker.getLatLng();
            setMarkerPosition(coordinates);
            console.log("setting position", [coordinates.lat, coordinates.lng])
            setPosition([coordinates.lat, coordinates.lng]);
          }
        },
      }),
      [],
    )
    const map = useMap()
    map.setView(position as LatLngExpression );
  
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position as LatLngExpression}
        ref={markerRef}>
      </Marker>
    )
  }

  return (
    <Box w={{ base: '100%', md: '160%' }} h="400px" position="relative">
      <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <DraggableMarker />
      </MapContainer>
    </Box>
  );
  
};

export default Map;

