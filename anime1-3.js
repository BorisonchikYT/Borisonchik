// Скрипт для управления отображением рейтинга
document.querySelector('.rating-toggle').addEventListener('click', function() {
    const ratingDiv = document.querySelector('.rating');
    ratingDiv.style.display = ratingDiv.style.display === 'none' ? 'block' : 'none';
});

// Обработчик события для изменения рейтинга
const ratingInput = document.querySelector('.rating input[type="number"]');
ratingInput.addEventListener('change', function() {
    const newRating = parseFloat(ratingInput.value);
    if (newRating >= 0 && newRating <= 10) {
        document.querySelector('.rating-section p').innerText = `${newRating}/10`;
        alert(`Вы оценили аниме на ${newRating}/10`);
        ratingInput.value = ''; // Сбросить поле ввода
        document.querySelector('.rating').style.display = 'none'; // Скрыть форму после оценки
    } else {
        alert('Пожалуйста, введите значение от 0 до 10.');
    }
});
