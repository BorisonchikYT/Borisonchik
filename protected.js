function checkUserLoggedIn() {
    const username = localStorage.getItem("logged_in_user");
    if (!username) {
        showModal(); // Показать модальное окно, если пользователь не зарегистрирован
    }
}

function showModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block"; // Отобразить модальное окно
    
    const closeButton = document.querySelector(".close-button");
    closeButton.onclick = function() {
        modal.style.display = "none"; // Скрыть модальное окно при нажатии на кнопку закрытия
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Скрыть модальное окно при клике вне окна
        }
    }
}

// Проверка, авторизован ли пользователь при загрузке страницы
checkUserLoggedIn();