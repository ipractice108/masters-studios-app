'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudioPage() {
  const router = useRouter();

  useEffect(() => {
    // Проверяем, зарегистрирована ли студия
    // TODO: Проверка через API/Supabase
    const isRegistered = false; // Заглушка

    if (isRegistered) {
      router.push('/studio/dashboard');
    } else {
      router.push('/studio/register');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
