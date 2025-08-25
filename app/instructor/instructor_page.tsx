'use client';

import Navbar from '../../components/Navbar';
import { useState, ChangeEvent, FormEvent } from 'react';

// Interface describing the shape of the instructor profile form data
interface InstructorFormData {
  discipline: string;         // Selected discipline from the list
  customDiscipline: string;   // Custom discipline when "Other" is selected
  station: string;            // Selected metro station
  price: string;              // Desired price for a class
  groupTraining: boolean;     // Whether the instructor conducts group classes
  individualTraining: boolean;// Whether the instructor conducts individual classes
  employmentStatus: string;   // Employment status: self-employed or individual
  experience: string;         // Teaching experience and description
  photo: File | null;         // Uploaded photo file
  photoPreview: string | null;// Base64 preview of the uploaded photo
}

// Predefined list of disciplines with an "Other" option
const disciplines: string[] = [
  'Йога',
  'Фитнес',
  'Стретчинг',
  'ОФП',
  'Цигун',
  'Танцы',
  'Пилон',
  'Другое',
];

// A list of Moscow Metro stations. This list is not exhaustive but covers many major stations.
const stations: string[] = [
  'Авиамоторная','Автозаводская','Академическая','Алексеевская','Алтуфьево','Аннино','Арбатская','Бабушкинская','Баррикадная','Бауманская','Беговая','Белорусская','Беляево','Бибирево','Борисово','Ботанический сад','Братиславская','ВДНХ','Варшавская','Владыкино','Водный стадион','Войковская','Волгоградский проспект','Волжская','Воробьёвы горы','Выставочная','Выхино','Деловой центр','Динамо','Дмитровская','Достоевская','Домодедовская','Дубровка','Измайловская','Калужская','Кантемировская','Каширская','Киевская','Китай‑город','Комсомольская','Коньково','Красногвардейская','Краснопресненская','Красносельская','Кропоткинская','Крылатское','Кузнецкий мост','Кузьминки','Кунцевская','Курская','Кутузовская','Ленинский проспект','Лермонтовский проспект','Лубянка','Марксистская','Марьина роща','Марьино','Маяковская','Медведково','Международная','Менделеевская','Минская','Новокосино','Новокузнецкая','Новослободская','Новоясеневская','Октябрьская','Окружная','Орехово','Отрадное','Павелецкая','Парк культуры','Парк Победы','Партизанская','Первомайская','Перово','Петровско-Разумовская','Печатники','Пионерская','Планерная','Площадь Ильича','Площадь Революции','Преображенская площадь','Пятницкое шоссе','Речной вокзал','Римская','Ростокино','Румянцево','Савёловская','Свиблово','Севастопольская','Семёновская','Серпуховская','Славянский бульвар','Смоленская','Спортивная','Сретенский бульвар','Стахановская','Строгино','Студенческая','Сухаревская','Таганская','Тверская','Текстильщики','Театральная','Тимирязевская','Третьяковская','Тропарёво','Тульская','Тургеневская','Тушинская','Улица 1905 года','Улица Академика Янгеля','Улица Горчакова','Улица Скобелевская','Университет','Фили','Фрунзенская','Ховрино','Царицыно','Цветной бульвар','Черкизовская','Черёмушки','Чеховская','Чистые пруды','Чкаловская','Шаболовская','Шоссе Энтузиастов','Щукинская','Юго‑Западная','Южная','Ясенево'
];

export default function InstructorPage() {
  // Initialize state for the form fields
  const [formData, setFormData] = useState<InstructorFormData>({
    discipline: '',
    customDiscipline: '',
    station: '',
    price: '',
    groupTraining: false,
    individualTraining: false,
    employmentStatus: '',
    experience: '',
    photo: null,
    photoPreview: null,
  });

  // Generic handler for input and select changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement & HTMLSelectElement;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  // Handler for image selection. Creates a base64 preview to show immediately.
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission placeholder
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Future: integrate with Supabase or backend
    alert('Профиль сохранён (функционал сохранения не реализован)');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Кабинет преподавателя</h1>
        <p className="mb-6 text-gray-700">
          Заполните свой профиль, укажите дисциплины, станцию метро, стоимость, типы тренировок (групповые/индивидуальные), статус (самозанятый или физическое лицо) и расскажите о своём опыте.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Discipline selection */}
          <div>
            <label className="block font-medium mb-1">Дисциплина</label>
            <select
              name="discipline"
              value={formData.discipline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите дисциплину</option>
              {disciplines.map((disc, idx) => (
                <option key={idx} value={disc}>
                  {disc}
                </option>
              ))}
            </select>
            {formData.discipline === 'Другое' && (
              <input
                type="text"
                name="customDiscipline"
                value={formData.customDiscipline}
                onChange={handleChange}
                placeholder="Укажите свою дисциплину"
                className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Metro station selection */}
          <div>
            <label className="block font-medium mb-1">Станция метро</label>
            <select
              name="station"
              value={formData.station}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите станцию</option>
              {stations.map((st, idx) => (
                <option key={idx} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Price input */}
          <div>
            <label className="block font-medium mb-1">Стоимость, руб.</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Введите стоимость"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Training type checkboxes */}
          <div>
            <span className="block font-medium mb-1">Вид тренировок</span>
            <label className="inline-flex items-center mr-4">
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

          {/* Employment status radio selection */}
          <div>
            <label className="block font-medium mb-1">Статус</label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите статус</option>
              <option value="Самозанятый">Самозанятый</option>
              <option value="Физическое лицо">Физическое лицо</option>
            </select>
          </div>

          {/* Experience textarea */}
          <div>
            <label className="block font-medium mb-1">Стаж и опыт</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              placeholder="Опишите ваш опыт преподавания и достижения"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block font-medium mb-1">Фото</label>
            <div className="flex flex-col items-center">
              {formData.photoPreview ? (
                <img
                  src={formData.photoPreview}
                  alt="Предпросмотр аватарки"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <span className="text-gray-500">Нет фото</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
}
