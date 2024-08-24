function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  function submitLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
   // onauxclick("hello");
    // In a real-world scenario, you would send this information to the server for authentication.
    console.log(`Login form submitted:
        Username: ${username}
        Password: ${password}
    `);
}

function submitSignupForm() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // In a real-world scenario, you would send this information to the server for user registration.
    console.log(`Signup form submitted:
        New Username: ${newUsername}
        New Password: ${newPassword}
    `);
}
