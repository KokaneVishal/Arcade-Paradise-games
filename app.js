//title change
// let doc_title = document.title;
// window.addEventListener("blur", () => {
//     document.title = "LET'S PLAY !"
// })
// window.addEventListener("focus", () => {
//     document.title = doc_title;
// })


//! database
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";




// Your web app's Firebase configuration
const firebaseConfig = {

    // your firebase config js code


};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// hide buttons
const hide_login = document.getElementById("login_signup");
const hide_logout = document.getElementById("logoutBtn");
const hide_profile = document.getElementById("profile");
const hide_login_signup_div = document.getElementById("login_signup_div");


//signup
signupBtn.addEventListener('click', (e) => {

    var name = document.getElementById('name').value;
    var signup_email = document.getElementById('signup_email').value;
    var signup_password = document.getElementById('signup_password').value;


    //validation
    if (name === "" || signup_email === "" || signup_password === "") {
        alert("All fields are required...!");
        return;
    }

    createUserWithEmailAndPassword(auth, signup_email, signup_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user)

            set(ref(database, 'gamers/' + user.uid), {
                name: name,
                email: signup_email
            })
                .then(() => {
                    // 
                    console.log("name & email save in DB")
                })
                .catch((error) => {
                    console.log(error)
                });

            alert('Gamer Account created...!');
            // ...

        })
        .catch((error) => {

            alert(error);
            // ..
        });

});

//login
loginBtn.addEventListener('click', (e) => {

    var login_email = document.getElementById('login_email').value;
    var login_password = document.getElementById('login_password').value;

    //validation
    if (login_email === "" || login_password === "") {
        alert("All fields are required...!");
        return;
    }

    signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //console.log(user);

            const dt = new Date();
            update(ref(database, 'gamers/' + user.uid), {
                aa_last_login: dt


            }).then(() => {
                // 
                console.log("login-time update in DB")
            })
                .catch((error) => {
                    console.log(error)
                });

            // hide button
            hide_login.style.display = 'none';
            hide_logout.style.display = 'inline';
            hide_profile.style.display = 'inline';
            hide_login_signup_div.style.display = 'none';
            localStorage.clear();
            alert('Gamer logged in...!');

        })
        .catch((error) => {

            alert(error);
        });

});

//get current user 
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        console.log("=>Current-user home");
        console.log(user);
        // hide button
        hide_login.style.display = 'none';
        hide_logout.style.display = 'inline';
        hide_profile.style.display = 'inline';
        hide_login_signup_div.style.display = 'none';
    } else {
        // User is signed out
        console.log("NO current-user home");
    }
});


//logout
logoutBtn.addEventListener('click', (e) => {

    signOut(auth).then(() => {
        // Sign-out successful.

        hide_login.style.display = 'inline';
        hide_logout.style.display = 'none';
        hide_profile.style.display = 'none';
        hide_login_signup_div.style.display = 'inline';

        alert('Gamer logged out...!');
        localStorage.clear();
        window.location.reload();

    }).catch((error) => {
        // An error happened.
        alert(error);
    });

});