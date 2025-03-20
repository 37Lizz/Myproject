import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';

interface MapComponentProps {
  route: number[][];
}

const MapComponent: React.FC<MapComponentProps> = ({ route }) => {
  const [mapState, setMapState] = useState({ center: [55.75, 37.57], zoom: 9 });

  useEffect(() => {
    if (route.length > 0) {
      // Центрируем карту на первом месте маршрута
      setMapState({ center: route[0], zoom: 12 });
    }
  }, [route]);

  return (
    <YMaps>
      <Map state={mapState} width="100%" height="400px">
        {route.map((coordinates, index) => (
          <Placemark key={index} geometry={coordinates} />
        ))}
        {route.length > 1 && (
          <Polyline
            geometry={route}
            options={{
              strokeColor: '#0000FF',
              strokeWidth: 4,
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default MapComponent;