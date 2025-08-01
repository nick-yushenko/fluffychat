#!/bin/bash

# Скрипт для деплоя FluffyChat в Netlify
# Использование: ./scripts/deploy-netlify.sh [--prod]

set -e

echo "🚀 Начинаем деплой FluffyChat в Netlify..."

# Проверяем, что мы в корневой папке проекта
if [ ! -f "pubspec.yaml" ]; then
    echo "❌ Ошибка: Запустите скрипт из корневой папки проекта"
    exit 1
fi

# Очищаем предыдущую сборку
echo "🧹 Очищаем предыдущую сборку..."
flutter clean

# Получаем зависимости
echo "📦 Получаем зависимости..."
flutter pub get

# Генерируем локализацию
echo "🌐 Генерируем локализацию..."
flutter gen-l10n

# Собираем веб-версию
echo "🔨 Собираем веб-версию..."
flutter build web --release

# Проверяем, что сборка прошла успешно
if [ ! -d "build/web" ]; then
    echo "❌ Ошибка: Сборка не создала папку build/web"
    exit 1
fi

# Деплоим в Netlify
echo "📤 Деплоим в Netlify..."

if [ "$1" = "--prod" ]; then
    echo "🚀 Продакшн деплой..."
    netlify deploy --dir=build/web --prod
else
    echo "🧪 Тестовый деплой..."
    netlify deploy --dir=build/web
fi

echo "✅ Деплой завершен!"
echo "🌐 Сайт доступен по адресу: https://fluffy-liza.netlify.app" 