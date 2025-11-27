'use client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { studioSchema } from '@/lib/validations/studio';
import { METRO_STATIONS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import MultiSelect from '@/components/ui/MultiSelect';
import FileUpload from '@/components/ui/FileUpload';
import YandexMapPicker from '@/components/YandexMapPicker';
import { getErrorMessage } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  stations: string[];
  contactEmail: string;
  contactPhone: string;
  mainPhoto: File | null;
  additionalPhotos: File[];
}

interface FormErrors {
  [key: string]: string;
}

export default function StudioRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    stations: [],
    contactEmail: '',
    contactPhone: '',
    mainPhoto: null,
    additionalPhotos: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const dataToValidate = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        stations: formData.stations,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      };

      const validated = studioSchema.parse(dataToValidate);

      // TODO: Интеграция с Supabase
      // TODO: Загрузка фотографий в Supabase Storage
      console.log('Validated data:', validated);
      console.log('Photos:', {
        main: formData.mainPhoto,
        additional: formData.additionalPhotos,
        coordinates: { lat: formData.latitude, lng: formData.longitude },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Студия успешно зарегистрирована!');

      // Перенаправляем в dashboard студии
      router.push('/studio/dashboard');
    } catch (error: any) {
      if (error.errors) {
        const formErrors: FormErrors = {};
        error.errors.forEach((err: any) => {
          const path = err.path[0];
          formErrors[path] = err.message;
        });
        setErrors(formErrors);
      } else {
        alert('Ошибка: ' + getErrorMessage(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Регистрация студии</h1>
          <p className="text-gray-600">
            Создайте профиль вашей студии, чтобы начать поиск преподавателей
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Основная информация</h2>

            <div className="space-y-4">
              <Input
                label="Название студии *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Yoga Studio Moscow"
                error={errors.name}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание студии *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Расскажите о вашей студии, её особенностях, атмосфере..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Местоположение */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Местоположение</h2>

            <div className="space-y-4">
              <Input
                label="Адрес *"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="г. Москва, ул. Примерная, д. 1"
                error={errors.address}
                helperText="Адрес будет обновлен автоматически при выборе точки на карте"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите местоположение на карте *
                </label>
                <YandexMapPicker
                  onLocationSelect={(lat, lng, address) => {
                    setFormData({
                      ...formData,
                      latitude: lat.toString(),
                      longitude: lng.toString(),
                      address: address || formData.address,
                    });
                  }}
                  height="400px"
                />
              </div>

              <div>
                <MultiSelect
                  label="Ближайшие станции метро *"
                  options={[...METRO_STATIONS]}
                  value={formData.stations}
                  onChange={(stations) => setFormData({ ...formData, stations })}
                  error={errors.stations}
                  placeholder="Выберите станции метро..."
                />
              </div>
            </div>
          </div>

          {/* Контактная информация */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Контактная информация</h2>

            <div className="space-y-4">
              <Input
                label="Email *"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="studio@example.com"
                error={errors.contactEmail}
              />

              <Input
                label="Телефон *"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
                error={errors.contactPhone}
                helperText="Формат: +7XXXXXXXXXX"
              />
            </div>
          </div>

          {/* Фотографии */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Фотографии</h2>

            <div className="space-y-4">
              <FileUpload
                label="Фото главного входа *"
                accept="image/*"
                onChange={(file) => setFormData({ ...formData, mainPhoto: file })}
                error={errors.mainPhoto}
                helperText="Фото, которое увидят преподаватели при поиске"
                preview={true}
              />

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Дополнительные фотографии (интерьер, залы, раздевалки)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData({ ...formData, additionalPhotos: files });
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50"
                />
                {formData.additionalPhotos.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Выбрано файлов: {formData.additionalPhotos.length}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" isLoading={isLoading} size="lg">
              Зарегистрировать студию
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push('/')}
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
