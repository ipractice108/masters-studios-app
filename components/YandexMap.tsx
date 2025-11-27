'use client';
import { useEffect, useRef, useState } from 'react';

interface Location {
  id: string;
  type: 'instructor' | 'studio' | 'request';
  name: string;
  lat: number;
  lng: number;
  details: string;
}

interface YandexMapProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  onLocationClick?: (location: Location) => void;
  height?: string;
}

declare global {
  interface Window {
    ymaps3: any;
  }
}

export default function YandexMap({
  locations,
  center,
  onLocationClick,
  height = '100%',
}: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapInstanceRef = useRef<any>(null);

  const defaultCenter = center || { lat: 55.751244, lng: 37.618423 };

  useEffect(() => {
    // Загружаем Yandex Maps API
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (existingScript) {
      if (window.ymaps3) {
        setIsLoaded(true);
      }
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || 'YOUR_API_KEY';
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/3.0/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.onload = () => {
      if (window.ymaps3) {
        window.ymaps3.ready.then(() => {
          setIsLoaded(true);
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = window.ymaps3;

      // Создаем карту
      const map = new YMap(mapRef.current, {
        location: {
          center: [defaultCenter.lng, defaultCenter.lat],
          zoom: 12,
        },
      });

      // Добавляем слои
      map.addChild(new YMapDefaultSchemeLayer());
      map.addChild(new YMapDefaultFeaturesLayer());

      // Добавляем маркеры для каждой локации
      locations.forEach((location) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker-container';
        markerElement.style.cursor = 'pointer';

        const color =
          location.type === 'instructor'
            ? '#3b82f6'
            : location.type === 'studio'
            ? '#10b981'
            : '#f59e0b';

        markerElement.innerHTML = `
          <div class="marker-pin" style="
            width: 40px;
            height: 40px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
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

        markerElement.addEventListener('mouseenter', () => {
          const pin = markerElement.querySelector('.marker-pin') as HTMLElement;
          if (pin) pin.style.transform = 'rotate(-45deg) scale(1.2)';
        });

        markerElement.addEventListener('mouseleave', () => {
          const pin = markerElement.querySelector('.marker-pin') as HTMLElement;
          if (pin) pin.style.transform = 'rotate(-45deg) scale(1)';
        });

        markerElement.addEventListener('click', () => {
          setSelectedId(location.id);
          onLocationClick?.(location);
        });

        const marker = new YMapMarker(
          {
            coordinates: [location.lng, location.lat],
          },
          markerElement
        );

        map.addChild(marker);
      });

      mapInstanceRef.current = map;
    };

    initMap();
  }, [isLoaded, locations, defaultCenter.lat, defaultCenter.lng]);

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
    <div className="relative w-full h-full">
      <div ref={mapRef} style={{ height }} className="w-full rounded-lg overflow-hidden" />

      {/* Список локаций */}
      {locations.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-h-48 overflow-y-auto">
          <div className="p-4">
            <h4 className="font-semibold mb-2">Найдено: {locations.length}</h4>
            <div className="space-y-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedId(location.id);
                    onLocationClick?.(location);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedId === location.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {location.type === 'instructor' && (
                          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                            Инструктор
                          </span>
                        )}
                        {location.type === 'studio' && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                            Студия
                          </span>
                        )}
                        {location.type === 'request' && (
                          <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded">
                            Запрос
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-gray-900">{location.name}</p>
                      <p className="text-sm text-gray-600">{location.details}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
