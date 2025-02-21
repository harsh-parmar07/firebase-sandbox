// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{
    getDatabase,
    ref,
    child,
    get,
    push,
    set,
    onValue,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_lGSRuDFYJaSgvCdkFO4am0X-40h2IgM",
    authDomain: "humber-demo-harsh.firebaseapp.com",
    projectId: "humber-demo-harsh",
    storageBucket: "humber-demo-harsh.firebasestorage.app",
    messagingSenderId: "914698962435",
    appId: "1:914698962435:web:617e22a6d96528896b7036"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database,"/messages");

onValue (
    messages,
    (snapshot) => {
        // console.log(snapshot);

        const ul = document.getElementById("messages");
        ul.replaceChildren();

        snapshot.forEach((childSnapshot) => {

            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childKey);
            console.log(childData);

            const text = document.createTextNode(
                childData.message + " ~ " + childData.name
            );
            const li = document.createElement("li");
            li.appendChild(text);
            ul.appendChild(li);

        });

    },{
        onlyOnce: false,
    }
);

const add = document.getElementById("add");

add.addEventListener("click", function(e){

    const name = document.getElementById("name");
    const message = document.getElementById("message");

    const newMessageRef = push(messages);

    set(newMessageRef, {
        name: name.value,
        message: message.value,
        createdAt: serverTimestamp(),
    });

});