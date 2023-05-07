import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../firebase/index.js';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';



export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
	const [admin, setAdmin] = useState({});
	// const [loading, setLoading] = useState(true);

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
			setAdmin(userCredential.admin);
			return userCredential.admin;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	const logout = () => {
		return signOut(auth)
	}

	useEffect(() => {
		// Initialize Firebase SDK objects here
		const firebaseAuth = firebase.auth();
		const firestore = firebase.firestore();

		const unsubscribe = onAuthStateChanged(auth, (admin) => {
			console.log(admin);
			setAdmin(admin);
		});
		return () => {
			unsubscribe();
		};
	}, [auth]);

	return (
		<AdminAuthContext.Provider value={{ admin, logout, signInAdmin }}>
			{children}
		</AdminAuthContext.Provider>
	)
}

export const AdminUserAuth = () => {
	return useContext(AdminAuthContext);
}