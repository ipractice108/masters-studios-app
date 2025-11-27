import { createClient } from '@supabase/supabase-js';

// Инициализация Supabase с данными из переменных окружения
// Используем фиктивные значения по умолчанию для сборки проекта
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);