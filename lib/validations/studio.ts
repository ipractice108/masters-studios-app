import { z } from 'zod';

export const studioSchema = z.object({
  name: z.string().min(2, 'Название должно содержать минимум 2 символа'),
  description: z.string().min(10, 'Описание должно содержать минимум 10 символов'),
  address: z.string().min(5, 'Адрес должен содержать минимум 5 символов'),
  stations: z.array(z.string()).min(1, 'Выберите хотя бы одну станцию метро'),
  contactEmail: z.string().email('Некорректный email'),
  contactPhone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Некорректный номер телефона'),
});

export const jobRequestSchema = z.object({
  discipline: z.string().min(1, 'Выберите дисциплину'),
  date: z.string().min(1, 'Укажите дату'),
  time: z.string().min(1, 'Укажите время'),
  station: z.string().min(1, 'Выберите станцию метро'),
  trainingType: z.enum(['group', 'individual']),
  payment: z.number().min(0, 'Оплата должна быть положительной').or(
    z.string().transform((val) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) throw new Error('Некорректная оплата');
      return parsed;
    })
  ),
  description: z.string().min(10, 'Описание должно содержать минимум 10 символов'),
});

export type StudioFormData = z.infer<typeof studioSchema>;
export type JobRequestFormData = z.infer<typeof jobRequestSchema>;
