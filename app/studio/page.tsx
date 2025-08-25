import Navbar from '../../components/Navbar';

export default function StudioPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Кабинет студии/центра</h1>
        <p className="mb-4 max-w-prose">
          Здесь студия сможет создать объявления о поиске преподавателей, указав
          направление, дату и время, станцию метро, вид тренировки и условия
          оплаты. Инструкторы, подходящие по параметрам, получат уведомления.
        </p>
        <p>
          Этот интерфейс является заглушкой. Реализация требует подключения к
          базе данных и разработку формы создания запросов.
        </p>
      </main>
    </>
  );
}