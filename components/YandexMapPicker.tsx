'use client';
import { useEffect, useRef, useState } from 'react';

interface YandexMapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLat?: number;
  initialLng?: number;
  height?: string;
}

declare global {
  interface Window {
    ymaps3: any;
  }
}

export default function YandexMapPicker({
  onLocationSelect,
  initialLat = 55.751244,
  initialLng = 37.618423,
  height = '400px',
}: YandexMapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Загружаем Yandex Maps API
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/3.0/?apikey=YOUR_API_KEY&lang=ru_RU';
    script.async = true;
    script.onload = () => {
      if (window.ymaps3) {
        window.ymaps3.ready.then(() => {
          setIsLoaded(true);
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapMarker } = window.ymaps3;

      // Создаем карту
      const map = new YMap(mapRef.current, {
        location: {
          center: [initialLng, initialLat],
          zoom: 15,
        },
      });

      // Добавляем слои
      map.addChild(new YMapDefaultSchemeLayer());
      map.addChild(new YMapDefaultFeaturesLayer());

      // Создаем маркер
      const markerElement = document.createElement('div');
      markerElement.className = 'marker-pin';
      markerElement.innerHTML = `
        <div style="
          width: 40px;
          height: 40px;
          background: #3b82f6;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `;

      const marker = new YMapMarker(
        {
          coordinates: [initialLng, initialLat],
        },
        markerElement
      );

      map.addChild(marker);
      markerRef.current = marker;

      // Обработчик клика по карте
      const listener = new YMapListener({
        layer: 'any',
        onClick: async (_object: any, event: any) => {
          const coords = event.coordinates;

          // Перемещаем маркер
          marker.update({ coordinates: coords });

          // Получаем адрес через геокодер
          try {
            const response = await fetch(
              `https://geocode-maps.yandex.ru/1.x/?apikey=YOUR_API_KEY&geocode=${coords[0]},${coords[1]}&format=json&lang=ru_RU`
            );
            const data = await response.json();
            const geoObject = data.response.GeoObjectCollection.featureMember[0];
            const address = geoObject?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text || 'Адрес не определен';

            setSelectedAddress(address);
            onLocationSelect(coords[1], coords[0], address);
          } catch (error) {
            console.error('Ошибка геокодирования:', error);
            onLocationSelect(coords[1], coords[0], 'Адрес не определен');
          }
        },
      });

      map.addChild(listener);
      mapInstanceRef.current = map;

      // Получаем начальный адрес
      try {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?apikey=YOUR_API_KEY&geocode=${initialLng},${initialLat}&format=json&lang=ru_RU`
        );
        const data = await response.json();
        const geoObject = data.response.GeoObjectCollection.featureMember[0];
        const address = geoObject?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text || '';
        setSelectedAddress(address);
      } catch (error) {
        console.error('Ошибка геокодирования:', error);
      }
    };

    initMap();
  }, [isLoaded, initialLat, initialLng]);

  if (!isLoaded) {
    return (
      <div
        style={{ height }}
        className="w-full bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        ref={mapRef}
        style={{ height }}
        className="w-full rounded-lg overflow-hidden border border-gray-300"
      />
      {selectedAddress && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-1">Выбранная точка:</p>
          <p className="text-sm text-blue-700">{selectedAddress}</p>
          <p className="text-xs text-blue-600 mt-1">
            Кликните по карте, чтобы изменить местоположение
          </p>
        </div>
      )}
      {!selectedAddress && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            Кликните по карте, чтобы выбрать местоположение вашей студии
          </p>
        </div>
      )}
    </div>
  );
}
