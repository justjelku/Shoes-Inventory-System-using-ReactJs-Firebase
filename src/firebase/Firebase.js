import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
	apiKey: "AIzaSyDoH11PS0y0rAm3koscH3VQNlkmv26bwuY",
	authDomain: "my-anonymity-app.firebaseapp.com",
	databaseURL: "https://my-anonymity-app-default-rtdb.firebaseio.com",
	projectId: "my-anonymity-app",
	storageBucket: "my-anonymity-app.appspot.com",
	messagingSenderId: "149998370320",
	appId: "1:149998370320:web:038ecbe5e259727b501495"
};

firebase.initializeApp(firebaseConfig);
const firestoreInstance = firebase.firestore();
const adminUsersRef = firestoreInstance.collection('users').doc("qIglLalZbFgIOnO0r3Zu").collection("admin_users");
const basicUsersRef = firestoreInstance.collection('users').doc("qIglLalZbFgIOnO0r3Zu").collection("basic_users");
const auth = firebase.auth();

adminUsersRef.get().then((querySnapshot) => {
	const adminUsers = querySnapshot.docs.map((doc) => doc.data());
	console.log(adminUsers);
});

basicUsersRef.get().then((querySnapshot) => {
	const basicUsers = querySnapshot.docs.map((doc) => doc.data());
	console.log(basicUsers);
});

export { firestoreInstance, adminUsersRef, basicUsersRef, auth };
export default firestoreInstance;

