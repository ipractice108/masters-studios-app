export default function HomePage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Masters & Studios</h1>
      <p className="mb-6 max-w-prose">
        Добро пожаловать! Это платформа, которая помогает связывать инструкторов
        wellness‑направлений (йога, фитнес, танцы и другие) со студиями и
        фитнес‑центрами. Зарегистрируйтесь как преподаватель или студия, чтобы
        обмениваться запросами и находить замены на занятия.
      </p>
      <div className="flex space-x-4">
        <a
          href="/instructor"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Я преподаватель
        </a>
        <a
          href="/studio"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Я студия/центр
        </a>
      </div>
    </main>
  );
}