# Проект: Movies-explorer-frontend

Данный проект представляет собой фронтэнд часть дипломного проекта.

* Макет проекта можно посмотреть [тут](https://disk.yandex.ru/d/pnDO61zF0_IRjA)
* [Ссылка на Фронтенд](https://movies.hedgehog.nomoredomains.club)
* [Ссылка на API](https://api.movies.hedgehog.nomoredomains.club)
* Публичный IPv4: 51.250.76.176
* [Ссылка на пул-реквест](https://github.com/hedgehogscodes/movies-explorer-frontend/pull/2)

**Роуты**
1. по роуту / отображается страница «О проекте»;
2. по роуту /movies отображается страница «Фильмы»;
3. по роуту /saved-movies отображается страница «Сохранённые фильмы»;
4. по роуту /profile отображается страница с профилем пользователя;
5. по роутам /signin и /signup отображаются страницы авторизации и регистрации.
6. по другим роутам отображается страница 404.

**Функциональные возможности проекта:**
1. Запрос к API для получения списка фильмов (используется API [BeatFilm](https://api.nomoreparties.co/beatfilm-movies));
2. Запросы к API для регистрации, авторизации, редактирования данных пользователя, сохранения фильма пользователем и его удаления из сохраненных (использвуется API [Movies](https://api.movies.hedgehog.nomoredomains.club), созданный на этапе разработки бэкенда);
3. Real-time валидация данных;
4. Поиск фильмов по заданному параметру;
5. Фильтрация фильмов по длительности;
6. Подгрузка фильмов по нажатию кнопки "Ещё".

**Технологии использованные в проекте:**
1. HTML.
2. CSS.
3. Flex CSS.
4. Grid CSS.
5. Media queries.
6. BEM.
7. Nested file structure.
8. Webpack.
9. JS.
10. REACT.js(functional components && hooks).
11. REST API.
12. Used localStorage.
