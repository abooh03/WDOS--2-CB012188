// Retrieve JSON from local storage or initialize if not present
var authenticated_users = JSON.parse(localStorage.getItem('authenticated_users'));
if (!authenticated_users) {
    authenticated_users = {
        users: [
            {
                username: "admin",
                password: "admin",
                role: "admin",
                email: "admin@admin.com",
                loggedIn: false // Add loggedIn property
            },
            {
                username: "user",
                password: "password",
                role: "site_user",
                email: "user@user.com",
                loggedIn: false // Add loggedIn property
            }
        ]
    };
    localStorage.setItem('authenticated_users', JSON.stringify(authenticated_users));
}

function goBack() {
    window.location.href = "home.html";
}

// Function to hide registration form and display login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

// Function to hide login form and display registration form
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Show login form by default
showLoginForm();

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Find user in the store
    const userIndex = authenticated_users.users.findIndex(user => user.username === username && user.password === password);
    
    if (userIndex !== -1) {
        // Authentication successful, update loggedIn property and redirect based on role
        authenticated_users.users[userIndex].loggedIn = true;
        localStorage.setItem('authenticated_users', JSON.stringify(authenticated_users));
        
        if (username === 'admin') {
            window.location.href = 'admin_dashboard.html';
        } else if (username === 'user') {
            window.location.href = 'user_dashboard.html';
        } else {
            window.location.href = 'home.html';
        }
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get input values
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const email = document.getElementById('email').value;
    
    // Check if the username already exists
    const existingUser = authenticated_users.users.find(user => user.username === newUsername);
    
    if (existingUser) {
        alert('Username already exists. Please choose a different username.');
    } else {
        // Add the new user to the list of authenticated users
        authenticated_users.users.push({
            username: newUsername,
            password: newPassword,
            role: "site_user",
            email: email,
            loggedIn: false // Add loggedIn property
        });
        localStorage.setItem('authenticated_users', JSON.stringify(authenticated_users));
        alert('Registration successful. Please login with your new credentials.');
        // Once registered, show the login form again
        showLoginForm();
    }
});

// Handle click on sign up link to show registration form
document.getElementById('signup-link').addEventListener('click', function(e) {
    e.preventDefault();
    showRegisterForm();
});

// Handle click on login link to show login form
document.getElementById('login-link').addEventListener('click', function(e) {
    e.preventDefault();
    showLoginForm();
});
