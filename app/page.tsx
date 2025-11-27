import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Masters & Studios
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Платформа для связи инструкторов wellness-направлений со студиями и фитнес-центрами.
              Находите замены на занятия, расширяйте свою клиентскую базу и развивайте бизнес.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link
              href="/instructor"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Для преподавателей</h2>
                <p className="text-gray-600 mb-6">
                  Создайте профиль, укажите свои дисциплины и станции метро.
                  Получайте уведомления о подходящих вакансиях от студий.
                </p>
                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Создать профиль
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              href="/studio"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-green-500"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Для студий</h2>
                <p className="text-gray-600 mb-6">
                  Создавайте запросы на поиск преподавателей.
                  Находите квалифицированных инструкторов для замены или постоянной работы.
                </p>
                <div className="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Создать запрос
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Как это работает</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Регистрация</h3>
                <p className="text-gray-600">
                  Создайте профиль преподавателя или студии с необходимой информацией
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Поиск и подбор</h3>
                <p className="text-gray-600">
                  Система автоматически находит подходящие совпадения по параметрам
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Сотрудничество</h3>
                <p className="text-gray-600">
                  Договоритесь о деталях и начните работу вместе
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}