getComments();
function addComment() {
    var commentText = document.getElementById('comment').value;
    var name = sessionStorage.getItem('loggedInUser');

    if (name != null) {
    fetch('http://localhost:3000/add-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        commentText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          getComments();
        } else {
          console.error('Failed to add comment');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }
  
  /*function getComments() {
    // Получение комментариев с сервера
    fetch('http://localhost:3000/get-comments')
      .then((response) => response.json())
      .then((comments) => {
        // Вывод всех комментариев
        var commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = '';
  
        comments.forEach((comment) => {
          var commentElement = document.createElement('div');
          commentElement.className = 'comment';
          commentElement.innerHTML = '<strong>' + comment.name + ':</strong> ' + comment.commentText;
          commentsContainer.appendChild(commentElement);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }*/
  function getComments() {
    // Получение комментариев с сервера
    fetch('http://localhost:3000/get-comments')
      .then((response) => response.json())
      .then((comments) => {
        // Вывод всех комментариев
        var commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = '';
  
        comments.forEach((comment) => {
          var commentElement = document.createElement('div');
          commentElement.className = 'comment';
  
          // Добавляем имя и текст комментария
          commentElement.innerHTML = '<strong>' + comment.name + ':</strong> ' + comment.commentText;
  
          // Добавляем кнопку "Удалить" с атрибутом data-comment-id
          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Удалить';
          deleteButton.setAttribute('data-comment-id', comment.id); // Предположим, что в комментарии есть поле id
          deleteButton.addEventListener('click', deleteComment);
          commentElement.appendChild(deleteButton);
  
          commentsContainer.appendChild(commentElement);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }







  function deleteComment(event) {
    var commentId = event.target.getAttribute('data-comment-id');
    fetch('http://localhost:3000/delete-comment/' + commentId, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          getComments();
        } else {
          console.error('Failed to delete comment');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }



