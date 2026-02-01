# User Management System (Itransition Task 4)

Веб-приложение для управления пользователями с функциями авторизации, блокировки и удаления.

**Ссылка на деплой:** [Netlify Frontend](https://magical-dasik-b793de.netlify.app)

## Технологии (Stack)
- **Frontend:** React (Vite), React-Bootstrap, React-Router-Dom, Axios.
- **Backend:** Node.js, Express, Passport.js (JWT Strategy), Bcrypt.js.
- **Database:** PostgreSQL.

## Основной функционал
- Регистрация и логин (хеширование паролей, уникальные email)  
- Админ-панель: таблица пользователей с сортировкой по последнему входу  
- Управление: массовая блокировка, разблокировка, удаление  
- Безопасность: заблокированные пользователи теряют доступ мгновенно  
- Axios Interceptor: автоматический логаут при 401 

## Локальный запуск

### 1. Предварительные требования
- Установленный **Node.js**
- Установленный **PostgreSQL**

### 2. Настройка Базы Данных
Создайте таблицу в вашей БД, используя следующий SQL-запрос:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL,    
    last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    registration_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    status VARCHAR(20) DEFAULT 'unconfirmed'
);
```
### 3. Установка и запуск
Клонируйте репозиторий.

- Backend:
Перейдите в cd server
Выполните npm install
```
PORT=5000
DB_USER=ваше_имя
DB_HOST=localhost
DB_NAME=имя_бд
DB_PASSWORD=пароль
DB_PORT=5432
JWT_SECRET=ваш_секрет
```
Запустите: npm run dev или node index.js

- Frontend:
Перейдите в cd client
Выполните npm install
Создайте файл .env и добавьте: VITE_API_URL=http://localhost:5000/api

Запустите: npm run dev

### 4. Особенности реализации
- Auth Middleware проверяет статус пользователя через JWT
- Bulk Actions оптимизированы через SQL WHERE id = ANY($1)
- Axios автоматически разлогинивает пользователя при 401

