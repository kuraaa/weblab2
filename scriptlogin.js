const BASE_URL = 'http://localhost:3000';

function generateRandomKey(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
  
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charset.length;
      result += charset.charAt(randomIndex);
    }
  
    return result;
  }



function signup() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let key = generateRandomKey(4);
    fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, key}),
    })
    .then(response => response.json())
    .then(data => {
        showMessage(data.message, 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred. Please try again later.', 'error');
    });
}

function login() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;
    fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        showMessage(data.message, 'success');
        sessionStorage.setItem('loggedInUser', username);
        sessionStorage.setItem('key', data.key);
        redirectToHome();
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred. Please try again later.', 'error');
    });
}

function showMessage(message, type) {
    let messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;
    messageDiv.className = type;
    setTimeout(() => {
        messageDiv.innerHTML = '';
        messageDiv.className = '';
    }, 3000);
}


function redirectToHome() {
    let loggedInUser = sessionStorage.getItem('loggedInUser');
    let key = sessionStorage.getItem('key');
    window.location.href = 'index.html';
}
