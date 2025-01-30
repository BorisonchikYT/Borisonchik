// Пример динамического обновления информации о аниме
document.addEventListener("DOMContentLoaded", function() {
    const rating = document.getElementById("rating");
    const episodes = document.getElementById("episodes");
    const genre = document.getElementById("genre");

    // Здесь можно добавить логику для получения данных из API или другого источника
    // Например, обновление рейтинга, количества эпизодов и жанра

    // Пример статических данных
    const animeData = {
        rating: "9.0/10",
        episodes: "12",
        genre: "Приключения, Фэнтези"
    };

    // Обновление контента на странице
    rating.textContent = animeData.rating;
    episodes.textContent = animeData.episodes;
    genre.textContent = animeData.genre;

    // Дополнительные анимации или интерактивные элементы можно добавить здесь
});