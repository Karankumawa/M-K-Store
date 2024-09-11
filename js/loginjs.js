// Firebase Google Sign-In
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());

    // Get Google ID token
    var id_token = googleUser.getAuthResponse().id_token;

    // Authenticate with Firebase using the Google ID token
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

    firebase.auth().signInWithCredential(credential)
    .then((result) => {
        console.log('User signed in with Firebase:', result.user);
    })
    .catch((error) => {
        console.error('Error during Firebase sign-in:', error);
    });
}

// Firebase Email/Password Login
function submitLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
    })
    .catch((error) => {
        console.error('Error during login:', error);
    });
}

// Firebase Email/Password Sign Up
function submitSignupForm() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    firebase.auth().createUserWithEmailAndPassword(newUsername, newPassword)
    .then((userCredential) => {
        console.log('User signed up:', userCredential.user);
    })
    .catch((error) => {
        console.error('Error during signup:', error);
    });
}
