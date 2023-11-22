getComments();
function addComment() {
    var commentText = document.getElementById('comment').value;
    var name = sessionStorage.getItem('loggedInUser');;
  
  
    // Отправка комментария на сервер
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
          // Обновление списка комментариев после успешной отправки
          getComments();
        } else {
          console.error('Failed to add comment');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
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
          commentElement.innerHTML = '<strong>' + comment.name + ':</strong> ' + comment.commentText;
          commentsContainer.appendChild(commentElement);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }






















/*function addComment() {
    // Get input values
    var commentText = document.getElementById('comment').value;

    // Если поле name пустое, попробуйте получить значение из sessionStorage
    if (name) {
        var loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            name = loggedInUser;
        }
    }

    // Create new comment element
    var commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = '<strong>' + name + ':</strong> ' + commentText;

    // Append the new comment to the comments container
    document.getElementById('comments').appendChild(commentElement);

    // Clear the form
    document.getElementById('comment').value = '';
}*/