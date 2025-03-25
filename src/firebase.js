import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDAxJjXwnLD7Ksba0CfbkGhEObnKKajK8g",
    authDomain: "bitbybitai-frontend.firebaseapp.com",
    projectId: "bitbybitai-frontend",
    storageBucket: "bitbybitai-frontend.firebasestorage.app",
    messagingSenderId: "132435512239",
    appId: "1:132435512239:web:07fd9b349fb8f5fbfc3d5a",
    measurementId: "G-6087SK8E59"
};
// const firebaseApp = firebase.initializeApp(fireba)
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const perf = firebase.performance();
export { auth, provider, storage, perf };
export default db;

