# Запуск приложения
**Необходимые установки**<br>
Python 3.7
1) Установка Fast API: pip install fastapi <br>
2) Установка ASGI server Uvicorn: pip install "uvicorn[standard]" <br>
3) Установка либы tensorflow: Pip install tensorflow <br>
4) Установка нейронки: pip install rnnmorph<br>
5) Установка библиотеки для подключения к БД: pip install sqlalchemy alembic psycopg2<br>

**Работа с ветками**<br>
Для внесения изменений клонируется ветка main<br>
Все изменения заносятся в ветку test<br>
После утверждения изменений они добавлябтся в ветку main создателем<br>

**Запуск клиента и сервера проводника**<br>
Из папки servers/conductor вызвать команду npm run dev<br><br>
**Запуск анализатора**<br>
Из папки servers/analyzer вызвать Python3 -m uvicorn index:app --reload --port 8500