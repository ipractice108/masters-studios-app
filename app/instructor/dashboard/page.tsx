'use client';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

interface JobRequest {
  id: string;
  studioName: string;
  discipline: string;
  date: string;
  time: string;
  payment: number;
  lat: number;
  lng: number;
  distance: string;
}

export default function InstructorDashboardPage() {
  // Мок-данные запросов
  const [jobRequests] = useState<JobRequest[]>([
    {
      id: '1',
      studioName: 'Yoga Studio Moscow',
      discipline: 'Йога',
      date: '2025-11-30',
      time: '10:00',
      payment: 3000,
      lat: 55.752244,
      lng: 37.619423,
      distance: '1.5 км',
    },
    {
      id: '2',
      studioName: 'Fitness Club Premium',
      discipline: 'Фитнес',
      date: '2025-12-01',
      time: '18:00',
      payment: 3500,
      lat: 55.750244,
      lng: 37.617423,
      distance: '2.1 км',
    },
    {
      id: '3',
      studioName: 'Dance Studio Elite',
      discipline: 'Танцы',
      date: '2025-11-29',
      time: '16:00',
      payment: 4000,
      lat: 55.754244,
      lng: 37.621423,
      distance: '3.2 км',
    },
  ]);

  const mapLocations = jobRequests.map((request) => ({
    id: request.id,
    type: 'request' as const,
    name: request.studioName,
    lat: request.lat,
    lng: request.lng,
    details: `${request.discipline} • ${request.date} • ${request.payment}₽`,
  }));

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col pb-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold">Актуальные замены</h1>
          <p className="text-gray-600">Найдено запросов: {jobRequests.length}</p>
        </div>

        {/* Map */}
        <div className="flex-1">
          <Map locations={mapLocations} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{jobRequests.length}</p>
              <p className="text-sm text-gray-600">Рядом</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-sm text-gray-600">Подходящих</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">15</p>
              <p className="text-sm text-gray-600">Выполнено</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav userType="instructor" />
    </>
  );
}
