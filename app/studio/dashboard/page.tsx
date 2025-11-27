'use client';
import Navbar from '@/components/Navbar';
import YandexMap from '@/components/YandexMap';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

interface Instructor {
  id: string;
  name: string;
  disciplines: string[];
  rating: number;
  lat: number;
  lng: number;
  distance: string;
}

export default function StudioDashboardPage() {
  // Мок-данные преподавателей
  const [instructors] = useState<Instructor[]>([
    {
      id: '1',
      name: 'Анна Иванова',
      disciplines: ['Йога', 'Пилатес'],
      rating: 4.9,
      lat: 55.751244,
      lng: 37.618423,
      distance: '2.3 км',
    },
    {
      id: '2',
      name: 'Михаил Петров',
      disciplines: ['Фитнес', 'Кроссфит'],
      rating: 4.7,
      lat: 55.753244,
      lng: 37.620423,
      distance: '3.1 км',
    },
    {
      id: '3',
      name: 'Елена Сидорова',
      disciplines: ['Танцы', 'Стретчинг'],
      rating: 4.8,
      lat: 55.749244,
      lng: 37.616423,
      distance: '1.8 км',
    },
  ]);

  const mapLocations = instructors.map((instructor) => ({
    id: instructor.id,
    type: 'instructor' as const,
    name: instructor.name,
    lat: instructor.lat,
    lng: instructor.lng,
    details: `${instructor.disciplines.join(', ')} • ${instructor.distance}`,
  }));

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col pb-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold">Доступные инструкторы</h1>
          <p className="text-gray-600">Найдено преподавателей: {instructors.length}</p>
        </div>

        {/* Map */}
        <div className="flex-1">
          <YandexMap locations={mapLocations} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{instructors.length}</p>
              <p className="text-sm text-gray-600">Рядом</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-sm text-gray-600">Активных запросов</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-600">Откликов</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav userType="studio" />
    </>
  );
}
