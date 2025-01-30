function checkAccess() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        alert(`Добро пожаловать, ${user.username}!`);
        window.location.reload(); // Перезагрузить страницу для отображения приветственного сообщения
    }
}

// Проверка доступа при загрузке страницы
checkAccess();

// Логика выхода
document.getElementById('logout')?.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    localStorage.removeItem('loggedInUser'); // Удаление информации о вошедшем пользователе
    alert('Вы успешно вышли из системы.');
    window.location.reload(); // Перезагрузить страницу
});

// Логика регистрации
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
        document.getElementById('errorMessage').textContent = "Пароли не совпадают!";
        return;
    }

    // Проверяем, существует ли пользователь
    const existingUser = localStorage.getItem('loggedInUser');
    if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.username === username) {
            document.getElementById('errorMessage').textContent = "Пользователь с таким логином уже существует!";
            return;
        }
    }

    // Создание объекта пользователя
    const user = {
        username: username,
        email: email,
        password: password
    };

    // Сохранение пользователя в localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    alert('Регистрация прошла успешно! Вы можете войти в систему.');
    window.location.reload(); // Перезагрузка страницы для отображения имени пользователя
});

// Логика входа
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);

        // Проверка на правильность логина и пароля
        if (user.username === username && user.password === password) {
            alert('Вы успешно вошли в систему!');
            window.location.reload(); // Перезагрузить страницу
        } else {
            document.getElementById('loginErrorMessage').textContent = "Неверный логин или пароль!";
        }
    } else {
        document.getElementById('loginErrorMessage').textContent = "Пользователь не найден!";
    }
});

// Логика переключения между формами
document.getElementById('toggleButton').addEventListener('click', function() {
    const registrationFormContainer = document.getElementById('registration-form-container');
    const loginFormContainer = document.getElementById('login-form-container');

    if (registrationFormContainer.style.display === 'none') {
        registrationFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
        this.textContent = 'Переключиться на вход';
    } else {
        registrationFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
        this.textContent = 'Переключиться на регистрацию';
    }
});