'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../../components/Navbar';

// Define available disciplines and metro stations
const disciplinesList = [
  'Йога',
  'Фитнес',
  'Стретчинг',
  'ОФП',
  'Цигун',
  'Танцы',
  'Пилон',
  'Пилатес',
  'Аэробика',
  'Йога-нидра',
  'Барре',
  'Калланетика',
  'Кроссфит',
  'Медитация',
  'Силовые тренировки',
  'Тай-чи'
];

// List of Moscow metro stations (popular ones). Add more if needed.
const stationsList = [
  'Авиамоторная', 'Академическая', 'Александровский сад', 'Алексеевская', 'Алтуфьево',
  'Арбатская', 'Аэропорт', 'Бабушкинская', 'Багратионовская', 'Библиотека имени Ленина',
  'Борисово', 'Ботанический сад', 'Бульвар Адмирала Ушакова', 'Бульвар Дмитрия Донского',
  'Бунинская аллея', 'ВДНХ', 'Вернадского проспект', 'Владыкино', 'Водный стадион',
  'Войковская', 'Волгоградский проспект', 'Волжская', 'Волоколамская', 'Воробьёвы горы',
  'Выставочная', 'Выхино', 'Деловой центр', 'Динамо', 'Дмитровская', 'Добрынинская',
  'Домодедовская', 'Достоевская', 'Дубровка', 'Жулебино', 'Зябликово',
  'Измайловская', 'Калужская', 'Кантемировская', 'Каховская', 'Каширская',
  'Киевская', 'Китай-город', 'Кожуховская', 'Коломенская', 'Комсомольская',
  'Коньково', 'Красногвардейская', 'Краснопресненская', 'Красносельская',
  'Красные ворота', 'Кропоткинская', 'Крылатское', 'Кузнецкий мост', 'Кузьминки',
  'Кунцевская', 'Курская', 'Кутузовская', 'Ленинский проспект', 'Лермонтовский проспект',
  'Лубянка', 'Лужники', 'Лухмановская', 'Люблино', 'Марксистская', 'Маяковская',
  'Медведково', 'Международная', 'Минская', 'Новогиреево', 'Новокосино', 'Новокузнецкая',
  'Новослободская', 'Новохохловская', 'Новоясеневская', 'Новые Черёмушки', 'Октябрьская',
  'Октябрьское поле', 'Окружная', 'Ольховая', 'Орехово', 'Отрадное', 'Охотный ряд',
  'Павелецкая', 'Парк культуры', 'Парк Победы', 'Партизанская', 'Перово', 'Печатники',
  'Пионерская', 'Планерная', 'Площадь Ильича', 'Площадь Революции', 'Полежаевская',
  'Пражская', 'Преображенская площадь', 'Проспект Вернадского', 'Проспект Мира',
  'Профсоюзная', 'Пушкинская', 'Пятницкое шоссе', 'Раменки', 'Речной вокзал',
  'Римская', 'Рязанский проспект', 'Савёловская', 'Свиблово', 'Севастопольская',
  'Семеновская', 'Серпуховская', 'Славянский бульвар', 'Смоленская', 'Сокол',
  'Сокольники', 'Спартак', 'Спортивная', 'Сретенский бульвар', 'Строгино',
  'Студенческая', 'Сухаревская', 'Таганская', 'Тверская', 'Текстильщики', 'Театральная',
  'Теплый стан', 'Тимирязевская', 'Третьяковская', 'Тропарёво', 'Тушинская',
  'Угрешская', 'Улица 1905 года', 'Улица Академика Королёва', 'Улица Гастелло',
  'Улица Сергея Эйзенштейна', 'Улица Скобелевская', 'Улица Старокачаловская',
  'Улица Шёлковая', 'Университет', 'Филевский парк', 'Фили', 'Ховрино', 'Хорошёво',
  'Чеховская', 'Черкизовская', 'Чистые пруды', 'Шаболовская', 'Шелепиха', 'Щёлковская',
  'Щукинская', 'Электрозаводская', 'Юго-Западная', 'Южная', 'Ясенево'
];

interface FormData {
  name: string;
  discipline: string;
  customDiscipline: string;
  station: string;
  price: string;
  groupTraining: boolean;
  individualTraining: boolean;
  employmentStatus: string;
  experience: string;
  photo: File | null;
  photoPreview: string | null;
}

export default function InstructorPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    discipline: '',
    customDiscipline: '',
    station: '',
    price: '',
    groupTraining: false,
    individualTraining: false,
    employmentStatus: 'samozanyatyy',
    experience: '',
    photo: null,
    photoPreview: null,
  });

  // handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target as any;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  // handle photo upload and preview
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: file, photoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, photo: null, photoPreview: null }));
    }
  };

  // handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Use formData to submit to backend or database
    // For now, just log to console and reset form
    const finalDiscipline = formData.discipline === 'other' ? formData.customDiscipline : formData.discipline;
    const payload = { ...formData, discipline: finalDiscipline };
    console.log(payload);
    alert('Ваш профиль обновлён! (Функциональность сохранения не реализована)');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Кабинет преподавателя</h1>
        <p className="mb-6 text-gray-600">
          Заполните свой профиль, выберите дисциплины и станции метро, укажите стоимость и типы тренировок, расскажите о своём опыте.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1" htmlFor="name">Ваше имя</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Как вас зовут"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="discipline">Дисциплина</label>
            <select
              id="discipline"
              name="discipline"
              value={formData.discipline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите направление</option>
              {disciplinesList.map((disc) => (
                <option key={disc} value={disc}>
                  {disc}
                </option>
              ))}
              <option value="other">Другое</option>
            </select>
            {formData.discipline === 'other' && (
              <input
                type="text"
                name="customDiscipline"
                value={formData.customDiscipline}
                onChange={handleChange}
                placeholder="Введите своё направление"
                className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="station">Станция метро</label>
            <select
              id="station"
              name="station"
              value={formData.station}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите станцию метро</option>
              {stationsList.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="price">Стоимость занятия (₽)</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Цена, например 1500"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <span className="block font-medium mb-1">Тип тренировки</span>
              <div className="flex items-center mb-1">
                <input
                  id="groupTraining"
                  type="checkbox"
                  name="groupTraining"
                  checked={formData.groupTraining}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="groupTraining">Групповая</label>
              </div>
              <div className="flex items-center">
                <input
                  id="individualTraining"
                  type="checkbox"
                  name="individualTraining"
                  checked={formData.individualTraining}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="individualTraining">Индивидуальная</label>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Статус занятости</label>
            <div className="flex items-center mb-1">
              <input
                type="radio"
                id="samozanyatyy"
                name="employmentStatus"
                value="samozanyatyy"
                checked={formData.employmentStatus === 'samozanyatyy'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="samozanyatyy">Самозанятый</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="fizLitso"
                name="employmentStatus"
                value="fizLitso"
                checked={formData.employmentStatus === 'fizLitso'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="fizLitso">Физическое лицо</label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="experience">Опыт и квалификация</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              placeholder="Расскажите о своём опыте, образовании, сертификатах..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="photo">Фото профиля</label>
            <input
              id="photo"
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.photoPreview && (
              <div className="mt-4 flex justify-start">
                <img
                  src={formData.photoPreview}
                  alt="Превью фото"
                  className="h-32 w-32 rounded-full object-cover border border-gray-300"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Сохранить профиль
          </button>
        </form>
      </div>
    </>
  );
}
