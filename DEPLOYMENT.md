# Руководство по деплою на Vercel

## Шаг 1: Создание Pull Request

Pull request уже создан! Перейдите по ссылке:
```
https://github.com/ipractice108/masters-studios-app/pull/new/claude/improve-app-overall-015Bz8TxCecdAbLDgSWoukbR
```

Или создайте его вручную:
1. Откройте GitHub репозиторий
2. Нажмите "Pull requests"
3. Нажмите "New pull request"
4. Выберите ветку `claude/improve-app-overall-015Bz8TxCecdAbLDgSWoukbR`
5. Нажмите "Create pull request"

## Шаг 2: Настройка Supabase

Перед деплоем создайте проект в Supabase:

1. Перейдите на https://supabase.com
2. Создайте новый проект
3. Перейдите в SQL Editor
4. Скопируйте содержимое файла `supabase/schema.sql`
5. Выполните SQL скрипт
6. Перейдите в Settings → API
7. Скопируйте:
   - Project URL
   - Anon public key

## Шаг 3: Деплой на Vercel

### Вариант 1: Через веб-интерфейс (рекомендуется)

1. **Перейдите на https://vercel.com**
2. **Войдите с GitHub аккаунтом**
3. **Нажмите "Add New Project"**
4. **Выберите репозиторий `masters-studios-app`**
5. **Настройте проект:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Добавьте Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```
7. **Нажмите "Deploy"**

### Вариант 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в Vercel
vercel login

# Деплой
vercel

# Добавьте environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Production деплой
vercel --prod
```

## Шаг 4: После деплоя

1. **Проверьте URL** - Vercel предоставит URL вашего приложения
2. **Протестируйте функциональность:**
   - Откройте главную страницу
   - Перейдите на страницу инструктора
   - Заполните форму и проверьте валидацию
   - Перейдите на страницу студии
   - Проверьте создание запроса

## Автоматический деплой

После настройки, каждый push в основную ветку будет автоматически деплоиться на Vercel.

### Preview deployments

Каждый pull request получит свой preview URL для тестирования изменений.

## Мониторинг

В Vercel Dashboard вы можете:
- Просматривать логи
- Мониторить производительность
- Управлять доменами
- Настраивать алерты

## Troubleshooting

### Ошибка при сборке
- Проверьте, что все зависимости в package.json
- Убедитесь, что TypeScript не выдает ошибок

### Ошибки окружения
- Проверьте, что все environment variables добавлены
- Убедитесь, что используете правильные ключи из Supabase

### Проблемы с Supabase
- Проверьте Row Level Security политики
- Убедитесь, что таблицы созданы корректно
