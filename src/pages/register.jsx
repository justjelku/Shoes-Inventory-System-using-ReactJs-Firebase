import React, { useState,useEffect } from 'react';
import firebase from 'firebase/compat/app'; // import firebase
import { Link, useNavigate } from 'react-router-dom';
import 'firebase/compat/firestore';
import { auth, adminUsersRef, basicUsersRef } from './firebase.js';


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create user in Firebase Auth
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          email, 
          password
        );

      // Add user details to Firestore
      const userDetailsRef = adminUsersRef.doc(auth.currentUser.uid);
      const userDetails = {
        firstName: '',
        lastName: '',
        username: username,
        email: email,
        enabled: true,
        role: 'admin',
      };
      await userDetailsRef.set(userDetails);


      setLoading(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      alert('Account created!');
      navigate('/', { replace: true });
    } catch (e) {
      setLoading(false);
      if (e.code === 'auth/email-already-in-use') {
        _showMessage('The account already exists for that email.');
      } else if (e.code === 'auth/invalid-email') {
        _showMessage('The email address is not valid.');
      } else if (e.code === 'auth/weak-password') {
        _showMessage('The password is too weak.');
      } else {
        _showMessage(`Error: ${e.message}`);
      }
    }
  };

  // const addUserDetails = async (firstName, lastName, username, email, status, role) => {
  //   const userRef = firebase.firestore().collection('users')
  //     .doc('qIglLalZbFgIOnO0r3Zu');
  //   const userDetailsRef = userRef.collection('admin_users')
  //     .doc(auth.currentUser.uid);
  //   const userDetails = {
  //     'first name': firstName,
  //     'last name': lastName,
  //     'username': username,
  //     'email': email,
  //     'enabled': status,
  //     'role': role,
  //   };
  //   await userDetailsRef.set(userDetails);
  // };

  const _showMessage = (message, success) => {
    setMessage(message);
    setMessageType(success ? "success" : "error");
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  useEffect(() => {
    // Initialize Firebase SDK objects here
    const firebaseAuth = firebase.auth();
    const firestore = firebase.firestore();
  
    // Set up Firebase Auth state change listener
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in");
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });
  
    // Unsubscribe from Firebase Auth state change listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);
  

  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h3>Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={(event) => { event.preventDefault(); signUp(); }}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>Register</button>
                {error && <p className="text-danger mt-3">{error}</p>}
				<p className="mt-3 text-center">Already have an account? <Link to="/">Login here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
