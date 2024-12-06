# Запуск

```bash
# сборка фронтенда
cd frontend
npm i
npm run build

# запуск docker-compose
cd ..
docker-compose up
```

Для запуска docker-compose необходим файл `.env` со следующими параметрами:
```bash
POSTGRES_USER = user # Пользователь БД
POSTGRES_PASSWORD = password # Пароль пользователя БД
POSTGRES_DB = database # Имя БД
SERVER_PORT = 8000 # внутренний порт бэкенд сервера
```