import React from 'react'
import {
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  
  const MapWithAMarker = withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={props.coordinates}
    >
      <Marker
        position={props.coordinates}
      />
    </GoogleMap>
  );

  export default MapWithAMarker

