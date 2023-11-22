// Simple user database stored in memory
let users = [];

function signup() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Check if the username is unique
    if (users.some(user => user.username === username)) {
        showMessage('Username already exists. Please choose a different one.', 'error');
        return;
    }

    // Add the new user to the database
    users.push({ username, password });
    showMessage('User registered successfully!', 'success');
}

function login() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    // Check if the username and password match a user in the database
    if (users.some(user => user.username === username && user.password === password)) {
        // Save the username in session storage (you might use a more secure method in a real app)
        sessionStorage.setItem('loggedInUser', username);

        // Redirect to the home page
        redirectToHome();
    } else {
        showMessage('Incorrect username or password. Please try again.', 'error');
    }
}

function redirectToHome() {
    // Get the username from session storage
    let loggedInUser = sessionStorage.getItem('loggedInUser');

    // Redirect to the index page with the username as a query parameter
    window.location.href = 'index.html?username=' + loggedInUser;
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