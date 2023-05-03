import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // import firebase
import { auth, adminUsersRef, basicUsersRef } from '../firebase/Firebase.js';
import 'firebase/compat/firestore';
import AlertDialog from './Alertdiaglog.jsx';


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      const userDoc = await firebase.firestore() // use firebase.firestore()
        .collection("users")
        .doc("qIglLalZbFgIOnO0r3Zu")
        .collection("admin_users")
        .doc(userCredential.user.uid)
        .get();

      if (userDoc.exists && userDoc.get("enabled") === true) {
        console.log('Login successful');
        setAlertMessage("Logged In Successful!", true);
        navigate('/', { replace: true });
      } else {
        setAlertMessage("User account is disabled.", false);
        await auth.signOut();
      }
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        setShowAlert(true);
        setAlertTitle('Invalid Email or Password');
        setAlertMessage('The email or password you entered is incorrect. Please try again.');
      } else if (e.code === 'auth/wrong-password') {
        setShowAlert(true);
        setAlertTitle('Invalid Email or Password');
        setAlertMessage('The email or password you entered is incorrect. Please try again.');
      } else {
        setShowAlert(true);
        setAlertTitle('Error');
        setAlertMessage(`An error occurred: ${e.message}`);
      }
    }
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
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-light">
              <h3>Admin Portal</h3>
			  <p className="bg-primary text-light"><Link to="/user">User Portal</Link></p>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <form className="w-100" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
                <div className="form-group w-75">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                    </div>
                    <input type="email" className="form-control" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                  </div>
                </div>
                <div className="form-group w-75">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-lock"></i></div>
                    </div>
                    <input type="password" className="form-control" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-75"><span className="text-light">Login</span></button>
              </form>
			  {/* render the alert dialog if showAlert is true */}
                {showAlert && (
                  <AlertDialog
                    isOpen={showAlert}
                    title={alertTitle}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
