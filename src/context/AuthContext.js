import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../firebase/Firebase.js';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const signIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const userDoc = await firebase.firestore()
				.collection("users")
				.doc("qIglLalZbFgIOnO0r3Zu")
				.collection("basic_users")
				.doc(userCredential.user.uid)
				.get();

			// Check if the user exists in the sub-collection
			if (!userDoc.exists) {
				console.log("User does not exist in the sub-collection");
				return null;
			}

			// Set the user state to the authenticated user
			setUser(userCredential.user);
			return userCredential.user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	const signInAdmin = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const userDoc = await firebase.firestore()
				.collection("users")
				.doc("qIglLalZbFgIOnO0r3Zu")
				.collection("admin_users")
				.doc(userCredential.user.uid)
				.get();

			// Check if the user exists in the sub-collection
			if (!userDoc.exists) {
				console.log("User does not exist in the sub-collection");
				return null;
			}

			// Set the user state to the authenticated user
			setUser(userCredential.user);
			return userCredential.user;
		} catch (error) {
			console.error(error);
			return null;
		}
	}


	const createUser = async (role, status, firstName, lastName, username, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const uid = userCredential.user.uid;

			// create a new document in the basic_users collection with the user's uid as the document id
			await firebase.firestore()
				.collection("users")
				.doc("qIglLalZbFgIOnO0r3Zu")
				.collection("basic_users")
				.doc(uid)
				.set({
					uid: uid,
					role: 'Basic',
					status: true,
					firstName: firstName,
					lastName: lastName,
					username: username,
					email: email,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					signedInAt: firebase.firestore.FieldValue.serverTimestamp()
				});

			return userCredential;
		} catch (error) {
			throw new Error(error.message);
		}
	}


	const logout = () => {
		return signOut(auth)
	}

	useEffect(() => {
		// Initialize Firebase SDK objects here
		const firebaseAuth = firebase.auth();
		const firestore = firebase.firestore();

		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser);
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, [auth]);

	return (
		<AuthContext.Provider value={{ createUser, user, logout, signIn, signInAdmin }}>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(AuthContext);
}