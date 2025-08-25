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
'use client';
import Navbar from '../../components/Navbar';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  disciplines: string;
  stations: string;
  price: string;
  groupTraining: boolean;
  individualTraining: boolean;
  employmentStatus: string;
  experience: string;
  photo: File | null;
}

export default function InstructorPage() {
  const [formData, setFormData] = useState<FormData>({
    disciplines: '',
    stations: '',
    price: '',
    groupTraining: false,
    individualTraining: false,
    employmentStatus: '',
    experience: '',
    photo: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, photo: fileInput.files ? fileInput.files[0] : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Supabase or backend to save the data
    alert('Профиль сохранён (функционал сохранения не реализован)');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Кабинет преподавателя</h1>
        <p className="mb-6 text-gray-700">
          Заполните свой профиль, укажите дисциплины, станции метро, стоимость, типы тренировок (групповые/индивидуальные),
          отметьте статус (самозанятый или физическое лицо) и расскажите о своём опыте.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Дисциплины</label>
            <input
              type="text"
              name="disciplines"
              value={formData.disciplines}
              onChange={handleChange}
              placeholder="Например, йога, фитнес, стретчинг"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Станции метро</label>
            <input
              type="text"
              name="stations"
              value={formData.stations}
              onChange={handleChange}
              placeholder="Например, Таганская, Курская"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Стоимость (руб.)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Вид тренировок</label>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="groupTraining"
                  checked={formData.groupTraining}
                  onChange={handleChange}
                  className="mr-2"
                />
                Групповые
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="individualTraining"
                  checked={formData.individualTraining}
                  onChange={handleChange}
                  className="mr-2"
                />
                Индивидуальные
              </label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Статус</label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите статус</option>
              <option value="selfEmployed">Самозанятый</option>
              <option value="individual">Физическое лицо</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Стаж и опыт</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              placeholder="Опишите свой опыт и квалификацию"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block font-medium mb-1">Фото</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-white file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none"
          >
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
}
