const profileName = localStorage.getItem('profileName') || 'Гость';
const discussionsKey = 'discussions'; // Ключ для хранения обсуждений в localStorage
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL для API

// Загрузка обсуждений из localStorage
function loadDiscussionsFromStorage() {
    const discussions = JSON.parse(localStorage.getItem(discussionsKey)) || [];
    discussions.forEach(discussion => {
        addDiscussionToDOM(discussion.title, discussion.body, discussion.comments);
    });
}

// Добавление обсуждения в DOM
function addDiscussionToDOM(title, content, comments = []) {
    const discussionDiv = document.createElement('div');
    discussionDiv.className = 'discussion';
    discussionDiv.innerHTML = `
        <h4 class="discussion-title">${title}</h4>
        <p>${content}</p>
        <button class="comment-btn btn">Комментировать</button>
        <div class="comments"></div>
        <div class="comment-form" style="display: none;">
            <input type="text" class="comment-input" placeholder="Ваш комментарий..." required>
            <button class="submit-comment btn">Отправить</button>
        </div>
        <button class="edit-btn btn">Изменить</button>
        <button class="delete-btn btn">Удалить</button>
        <button class="report-btn btn">Пожаловаться</button>
    `;
    document.getElementById('discussions').prepend(discussionDiv);

    // Отображение комментариев
    comments.forEach(comment => {
        displayComment(discussionDiv, comment);
    });

    // Обработчики событий
    discussionDiv.querySelector('.comment-btn').addEventListener('click', function() {
        const commentForm = discussionDiv.querySelector('.comment-form');
        commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
    });

    discussionDiv.querySelector('.submit-comment').addEventListener('click', function() {
        const commentInput = discussionDiv.querySelector('.comment-input');
        if (commentInput.value.trim()) {
            const comment = { user: profileName, text: commentInput.value };
            displayComment(discussionDiv, comment);
            saveCommentToStorage(title, comment);
            commentInput.value = ''; // Очистка поля ввода комментария
        }
    });

    discussionDiv.querySelector('.edit-btn').addEventListener('click', function() {
        const newTitle = prompt("Введите новый заголовок обсуждения:", title);
        if (newTitle) {
            const titleElement = discussionDiv.querySelector('.discussion-title');
            titleElement.textContent = newTitle;
            updateDiscussionInStorage(title, newTitle, content);
        }
    });

    discussionDiv.querySelector('.delete-btn').addEventListener('click', function() {
        if (confirm("Вы уверены, что хотите удалить это обсуждение?")) {
            discussionDiv.remove();
            deleteDiscussionFromStorage(title);
        }
    });

    discussionDiv.querySelector('.report-btn').addEventListener('click', function() {
        alert("Спасибо за ваше сообщение. Мы рассмотрим вашу жалобу.");
        // Здесь можно добавить функциональность для отправки жалобы на сервер
    });
}

// Функция для отображения комментария
function displayComment(discussionDiv, comment) {
    const commentsContainer = discussionDiv.querySelector('.comments');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `<strong>${comment.user}:</strong> ${comment.text}`;
    commentsContainer.appendChild(commentDiv);
}

// Сохранение обсуждения и комментариев в localStorage
function saveDiscussionToStorage(title, content) {
    const discussions = JSON.parse(localStorage.getItem(discussionsKey)) || [];
    discussions.push({ title, body: content, comments: [] });
    localStorage.setItem(discussionsKey, JSON.stringify(discussions));
}

// Сохранение комментария в localStorage
function saveCommentToStorage(title, comment) {
    const discussions = JSON.parse(localStorage.getItem(discussionsKey)) || [];
    const discussion = discussions.find(d => d.title === title);
    if (discussion) {
        discussion.comments.push(comment);
        localStorage.setItem(discussionsKey, JSON.stringify(discussions));
    }
}

// Обновление заголовка обсуждения в localStorage
function updateDiscussionInStorage(oldTitle, newTitle, content) {
    const discussions = JSON.parse(localStorage.getItem(discussionsKey)) || [];
    const discussion = discussions.find(d => d.title === oldTitle);
    if (discussion) {
        discussion.title = newTitle; // Обновляем заголовок
        localStorage.setItem(discussionsKey, JSON.stringify(discussions));
    }
}

// Удаление обсуждения из localStorage
function deleteDiscussionFromStorage(title) {
    const discussions = JSON.parse(localStorage.getItem(discussionsKey)) || [];
    const updatedDiscussions = discussions.filter(d => d.title !== title);
    localStorage.setItem(discussionsKey, JSON.stringify(updatedDiscussions));
}

// Обработчик отправки нового обсуждения
document.getElementById('discussion-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const title = document.getElementById('discussion-title').value;
    const content = document.getElementById('discussion-content').value;

    const newDiscussion = {
        title: title,
        body: content,
        userId: 1 // Пример ID пользователя
    };

    // Отправляем новое обсуждение на сервер
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscussion),
    });

    // Добавляем новое обсуждение в DOM и сохраняем в localStorage
    addDiscussionToDOM(title, content);
    saveDiscussionToStorage(title, content);

    // Очищаем поля формы
    document.getElementById('discussion-title').value = '';
    document.getElementById('discussion-content').value = '';
});

// Загружаем обсуждения при загрузке страницы
loadDiscussionsFromStorage();
