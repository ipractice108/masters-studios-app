'use client';
import { useState } from 'react';

interface Location {
  id: string;
  type: 'instructor' | 'studio' | 'request';
  name: string;
  lat: number;
  lng: number;
  details: string;
}

interface MapProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  onLocationClick?: (location: Location) => void;
}

export default function Map({ locations, center, onLocationClick }: MapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Заглушка для карты - позже интегрируем Yandex Maps или 2GIS
  const defaultCenter = center || { lat: 55.751244, lng: 37.618423 }; // Москва

  const handleLocationClick = (location: Location) => {
    setSelectedId(location.id);
    onLocationClick?.(location);
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Заглушка карты */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center p-8">
          <svg
            className="w-20 h-20 mx-auto mb-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Карта</h3>
          <p className="text-gray-600 mb-4">
            Центр: {defaultCenter.lat.toFixed(4)}, {defaultCenter.lng.toFixed(4)}
          </p>
          <p className="text-sm text-gray-500">
            Интеграция с Yandex Maps или 2GIS будет добавлена
          </p>
        </div>
      </div>

      {/* Список локаций */}
      {locations.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-h-48 overflow-y-auto">
          <div className="p-4">
            <h4 className="font-semibold mb-2">Найдено: {locations.length}</h4>
            <div className="space-y-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
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
