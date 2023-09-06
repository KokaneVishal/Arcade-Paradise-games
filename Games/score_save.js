// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, get, child, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";



// Your web app's Firebase configuration
const firebaseConfig = {

    // your firebase config js code


};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// get scores 
// change to 'sessionStorage'
var rock_hscore = localStorage.getItem("rock_key")
var snake_hscore = localStorage.getItem("snake_key")
var flappy_hscore = localStorage.getItem("flappy_key")
var tetris_hscore = localStorage.getItem("tetris_key")
var space_hscore = localStorage.getItem("space_key")
var dino_hscore = localStorage.getItem("dino_key");
var pong_hscore = localStorage.getItem("pong_key");
var catchapple_hscore = localStorage.getItem("catchapple_key")

// console.log("rock:" + rock_hscore);
// console.log("snake:" + snake_hscore);
// console.log("flappy:" + flappy_hscore);
// console.log("tetris:" + tetris_hscore);
// console.log("space:" + space_hscore);
// console.log("dino:" + dino_hscore);
// console.log("pong:" + pong_hscore);
// console.log("apple:" + catchapple_hscore);


//get current user 
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {

        console.log("=>current-user profile");
        console.log(user);

        //insert scores in db 
        const dts = new Date();
        update(ref(database, 'gamers/' + user.uid + "/scores"), {
            aa_last_score_save: dts
            // ,pong_Score: pong_hscore,
            // dino_Score: dino_hscore,
            // flappy_Score: flappy_hscore,
            // tetris_Score: tetris_hscore,
            // snake_Score: snake_hscore,
            // space_Score: space_hscore,
            // apple_Score: catchapple_hscore,
            // rockpaper_Score: rock_hscore

        }).then(() => {
            // 
            console.log("set score-in+time DB")
        })
            .catch((error) => {
                console.log(error)
            });


        //get email from db
        const dbRef = ref(database);

        get(child(dbRef, 'gamers/' + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("get email-out DB")
                let profile_data = snapshot.val();
                //console.log(profile_data);
                //put data into fields
                document.getElementById("nameBox").innerHTML = profile_data.name,
                    document.getElementById("emailBox").innerHTML = profile_data.email,
                    document.getElementById("lastloginBox").innerHTML = profile_data.aa_last_login

            } else {
                console.log("No profile-data available");
            }
        }).catch((error) => {
            console.error(error);
        });



    } else {
        // User is signed out
        console.log("NO current-user profile");

    }
});

get_scoreBtn.addEventListener('click', (e) => {

    //get scores from db
    onAuthStateChanged(auth, (user) => {
        if (user) {

            const dbRef = ref(database);
            get(child(dbRef, 'gamers/' + user.uid + "/scores"))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log("get score-out DB")
                        let score_data = snapshot.val();
                        //console.log(score_data);
                        //put data into fields
                        //if (score_data.value == undefined) {
                        document.getElementById("save_time").innerHTML = score_data.aa_last_score_save,
                            document.getElementById("pong_score").innerHTML = 0,
                            document.getElementById("dino_score").innerHTML = 0,
                            document.getElementById("flappy_score").innerHTML = 0,
                            document.getElementById("tetris_score").innerHTML = 0,
                            document.getElementById("snake_score").innerHTML = 0,
                            document.getElementById("space_score").innerHTML = 0,
                            document.getElementById("apple_score").innerHTML = 0,
                            document.getElementById("rock_score").innerHTML = 0
                        // } else {
                        document.getElementById("save_time").innerHTML = score_data.aa_last_score_save,
                            document.getElementById("pong_score").innerHTML = score_data.pong_Score,
                            document.getElementById("dino_score").innerHTML = score_data.dino_Score,
                            document.getElementById("flappy_score").innerHTML = score_data.flappy_Score,
                            document.getElementById("tetris_score").innerHTML = score_data.tetris_Score,
                            document.getElementById("snake_score").innerHTML = score_data.snake_Score,
                            document.getElementById("space_score").innerHTML = score_data.space_Score,
                            document.getElementById("apple_score").innerHTML = score_data.apple_Score,
                            document.getElementById("rock_score").innerHTML = score_data.rockpaper_Score
                        //}

                    } else {
                        console.log("No score-data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });


        } else {
            // User is signed out
            console.log("NO current-user profile");

        }
    });

    document.getElementById("show_scores").style.display = 'inline';
});

//logout
logoutBtnP.addEventListener('click', (e) => {

    signOut(auth).then(() => {
        // Sign-out successful.
        alert('Gamer logged out...!');
        localStorage.clear();
        window.location.replace("./index.html");

    }).catch((error) => {
        // An error happened.
        alert(error);
    });

});

