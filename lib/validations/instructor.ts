import { z } from 'zod';

export const instructorSchema = z.object({
  disciplines: z.array(z.string()).min(1, 'Выберите хотя бы одну дисциплину'),
  customDiscipline: z.string().optional(),
  stations: z.array(z.string()).min(1, 'Выберите хотя бы одну станцию метро'),
  price: z.number().min(0, 'Цена должна быть положительной').or(
    z.string().transform((val) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) throw new Error('Некорректная цена');
      return parsed;
    })
  ),
  groupTraining: z.boolean(),
  individualTraining: z.boolean(),
  employmentStatus: z.enum(['selfEmployed', 'individual', '']),
  experience: z.string().min(10, 'Опишите ваш опыт более подробно (минимум 10 символов)'),
  photo: z.instanceof(File).optional(),
}).refine(
  (data) => data.groupTraining || data.individualTraining,
  {
    message: 'Выберите хотя бы один тип тренировок',
    path: ['groupTraining'],
  }
);

export type InstructorFormData = z.infer<typeof instructorSchema>;
