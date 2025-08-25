import Navbar from '../../components/Navbar';

export default function InstructorPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Кабинет преподавателя</h1>
        <p className="mb-4 max-w-prose">
          Здесь вы сможете заполнить свой профиль, указать дисциплины, станции
          метро, стоимость, типы тренировок (групповые/индивидуальные), а также
          отметиться как самозанятый или физическое лицо.
        </p>
        <p>
          Функционал пока не реализован. Этот шаблон демонстрирует структуру
          приложения; дальнейшая реализация предполагает интеграцию с
          Supabase для хранения данных и учетных записей.
        </p>
      </main>
    </>
  );
}