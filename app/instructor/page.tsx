'use client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { instructorSchema } from '@/lib/validations/instructor';
import { DISCIPLINES, METRO_STATIONS, EMPLOYMENT_STATUS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import FileUpload from '@/components/ui/FileUpload';
import MultiSelect from '@/components/ui/MultiSelect';
import { getErrorMessage } from '@/lib/utils';

interface FormData {
  disciplines: string[];
  customDiscipline: string;
  stations: string[];
  price: string;
  groupTraining: boolean;
  individualTraining: boolean;
  employmentStatus: '' | 'selfEmployed' | 'individual';
  experience: string;
  photo: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function InstructorPage() {
  const [formData, setFormData] = useState<FormData>({
    disciplines: [],
    customDiscipline: '',
    stations: [],
    price: '',
    groupTraining: false,
    individualTraining: false,
    employmentStatus: '',
    experience: '',
    photo: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      const dataToValidate = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : 0,
      };

      const validated = instructorSchema.parse(dataToValidate);

      // TODO: Интеграция с Supabase
      console.log('Validated data:', validated);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      alert('Профиль успешно сохранён!');
    } catch (error: any) {
      if (error.errors) {
        const formErrors: FormErrors = {};
        error.errors.forEach((err: any) => {
          const path = err.path[0];
          formErrors[path] = err.message;
        });
        setErrors(formErrors);
      } else {
        setSubmitStatus('error');
        alert('Ошибка: ' + getErrorMessage(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Кабинет преподавателя</h1>
        <p className="mb-6 text-gray-600">
          Заполните свой профиль, чтобы студии могли находить вас для занятий
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Основная информация</h2>

            <div className="space-y-4">
              <div>
                <MultiSelect
                  label="Дисциплины *"
                  options={[...DISCIPLINES]}
                  value={formData.disciplines}
                  onChange={(disciplines) => setFormData({ ...formData, disciplines })}
                  error={errors.disciplines}
                  placeholder="Выберите дисциплины..."
                />
              </div>

              {formData.disciplines.includes('Другое') && (
                <Input
                  label="Укажите вашу дисциплину"
                  value={formData.customDiscipline}
                  onChange={(e) => setFormData({ ...formData, customDiscipline: e.target.value })}
                  placeholder="Например, акройога"
                  error={errors.customDiscipline}
                />
              )}

              <div>
                <MultiSelect
                  label="Станции метро *"
                  options={[...METRO_STATIONS]}
                  value={formData.stations}
                  onChange={(stations) => setFormData({ ...formData, stations })}
                  error={errors.stations}
                  placeholder="Выберите станции метро..."
                />
              </div>

              <Input
                label="Стоимость занятия (руб.) *"
                type="number"
                min="0"
                step="100"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="3000"
                error={errors.price}
                helperText="Укажите среднюю стоимость за одно занятие"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Тип занятий</h2>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.groupTraining}
                  onChange={(e) => setFormData({ ...formData, groupTraining: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Групповые занятия</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.individualTraining}
                  onChange={(e) => setFormData({ ...formData, individualTraining: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Индивидуальные занятия</span>
              </label>

              {errors.groupTraining && (
                <p className="text-sm text-red-600">{errors.groupTraining}</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Дополнительная информация</h2>

            <div className="space-y-4">
              <Select
                label="Статус *"
                options={[
                  { value: '', label: 'Выберите статус' },
                  ...EMPLOYMENT_STATUS,
                ]}
                value={formData.employmentStatus}
                onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value as any })}
                error={errors.employmentStatus}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Опыт и квалификация *
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={5}
                  placeholder="Расскажите о своём опыте работы, образовании, сертификатах..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
                )}
              </div>

              <FileUpload
                label="Фото профиля"
                accept="image/*"
                onChange={(file) => setFormData({ ...formData, photo: file })}
                error={errors.photo}
                helperText="Рекомендуемый размер: 400x400px"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" isLoading={isLoading} size="lg">
              Сохранить профиль
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => window.location.reload()}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
