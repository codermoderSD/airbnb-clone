import { getCenter } from "geolib";
import { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

function Map({ searchResults }) {
  const [result, setResult] = useState([]);
  const [center, setCenter] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
        setViewPort({
          width: "100%",
          height: "100%",
          latitude: latitude,
          longitude: longitude,
          zoom: 12,
        });
      });
    } else {
      console.log("Geolocation is not available");
    }
  }, [latitude, longitude]);

  // const center = getCenter(coordinates);

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: center ? center.latitude : latitude,
    longitude: center ? center.longitude : longitude,
    zoom: 11,
  });

  useEffect(() => {
    fetch(
      `https://api.geoapify.com/v2/places?categories=catering&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=5&apiKey=cac80b76af43422896032f7798468743`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => setResult(result.features))
      .catch((error) => console.log("error", error));
    const coordinates = result?.map((e) => ({
      latitude: e.properties.lat,
      longitude: e.properties.lon,
    }));
    const center = getCenter(coordinates);
    setCenter(center);
  }, [latitude, longitude, viewport]);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/shubhamd13/ckwah3i55dfes14paz3o76ky9"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)}
    >
      {result.map((e, i) => (
        <div key={i}>
          <Marker
            longitude={e.properties.lon}
            latitude={e.properties.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p>📍</p>
          </Marker>
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
