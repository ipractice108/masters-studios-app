'use client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { jobRequestSchema } from '@/lib/validations/studio';
import { DISCIPLINES, METRO_STATIONS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { getErrorMessage } from '@/lib/utils';

interface FormData {
  discipline: string;
  date: string;
  time: string;
  station: string;
  trainingType: 'group' | 'individual' | '';
  payment: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function StudioPage() {
  const [formData, setFormData] = useState<FormData>({
    discipline: '',
    date: '',
    time: '',
    station: '',
    trainingType: '',
    payment: '',
    description: '',
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
        payment: formData.payment ? parseFloat(formData.payment) : 0,
      };

      const validated = jobRequestSchema.parse(dataToValidate);

      // TODO: Интеграция с Supabase
      console.log('Validated data:', validated);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      alert('Запрос успешно создан! Подходящие инструкторы получат уведомление.');

      // Reset form
      setFormData({
        discipline: '',
        date: '',
        time: '',
        station: '',
        trainingType: '',
        payment: '',
        description: '',
      });
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
        <h1 className="text-3xl font-bold mb-2">Кабинет студии</h1>
        <p className="mb-6 text-gray-600">
          Создайте запрос на поиск преподавателя. Инструкторы, соответствующие вашим требованиям, получат уведомление.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Детали занятия</h2>

            <div className="space-y-4">
              <Select
                label="Дисциплина *"
                options={[
                  { value: '', label: 'Выберите дисциплину' },
                  ...DISCIPLINES.map((d) => ({ value: d, label: d })),
                ]}
                value={formData.discipline}
                onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                error={errors.discipline}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Дата *"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  error={errors.date}
                  min={new Date().toISOString().split('T')[0]}
                />

                <Input
                  label="Время *"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  error={errors.time}
                />
              </div>

              <Select
                label="Станция метро *"
                options={[
                  { value: '', label: 'Выберите станцию метро' },
                  ...METRO_STATIONS.map((s) => ({ value: s, label: s })),
                ]}
                value={formData.station}
                onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                error={errors.station}
              />

              <Select
                label="Тип занятия *"
                options={[
                  { value: '', label: 'Выберите тип занятия' },
                  { value: 'group', label: 'Групповое' },
                  { value: 'individual', label: 'Индивидуальное' },
                ]}
                value={formData.trainingType}
                onChange={(e) => setFormData({ ...formData, trainingType: e.target.value as any })}
                error={errors.trainingType}
              />

              <Input
                label="Оплата (руб.) *"
                type="number"
                min="0"
                step="100"
                value={formData.payment}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                placeholder="3000"
                error={errors.payment}
                helperText="Укажите оплату за занятие"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание и требования *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  placeholder="Опишите требования к преподавателю, особенности занятия, уровень группы..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" isLoading={isLoading} size="lg">
              Создать запрос
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setFormData({
                  discipline: '',
                  date: '',
                  time: '',
                  station: '',
                  trainingType: '',
                  payment: '',
                  description: '',
                });
                setErrors({});
              }}
            >
              Очистить
            </Button>
          </div>
        </form>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">Как это работает?</h3>
          <ol className="space-y-2 text-blue-800">
            <li>1. Заполните форму с деталями занятия</li>
            <li>2. Инструкторы с подходящими параметрами получат уведомление</li>
            <li>3. Заинтересованные преподаватели откликнутся на ваш запрос</li>
            <li>4. Выберите подходящего кандидата и договоритесь о деталях</li>
          </ol>
        </div>
      </div>
    </>
  );
}
