import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // import firebase
import { Link, useNavigate } from 'react-router-dom';
import 'firebase/compat/firestore';
import { auth } from '../firebase/Firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { UserAuth } from '../context/AuthContext.js';


const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { createUser } = UserAuth();

  // const signUp = async (e) => { 
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);

  //   if (!username || !email || !password || !confirmPassword) {
  //     setError('Please fill in all required fields.');
  //     setLoading(false);
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     setError('Passwords do not match.');
  //     setLoading(false);
  //     return;
  //   } 

  //   try {
  //     if (validatePassword()) {
  //       // Create a new user with email and password using firebase
  //       const { user } = await createUserWithEmailAndPassword(auth, email, password);

  //       // Add user details to Firestore
  //       // const userDetailsRef = adminUsersRef.doc(;
  //       const userDetailsRef = adminUsersRef.doc(auth.currentUser.uid);
  //       const userDetails = {
  //         firstName: '',
  //         lastName: '',
  //         username,
  //         email,
  //         enabled: true,
  //         role: 'admin',
  //       };
  //       await userDetailsRef.set(userDetails);

  //       setLoading(false);
  //       setUsername('');
  //       setEmail('');
  //       setPassword('');
  //       setConfirmPassword('');
  //       setError(null);
  //       alert('Account created!');
  //       navigate('/', { replace: true });
  //     }
  //   } catch (e) {
  //     setLoading(false);
  //     if (e.code === 'auth/email-already-in-use') {
  //       _showMessage('The account already exists for that email.');
  //     } else if (e.code === 'auth/invalid-email') {
  //       _showMessage('The email address is not valid.');
  //     } else if (e.code === 'auth/weak-password') {
  //       _showMessage('The password is too weak.');
  //     } else {
  //       _showMessage(`Error: ${e.message}`);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try{
      await createUser(firstName, lastName, username, email, password);
      navigate('/')
    } catch(e){
      setError(e.message);
      console.log(e.message); 
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header  bg-primary text-light">
              <h3>Register</h3>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <form className="w-100" onSubmit={handleSubmit}>
              <div className="form-group w-75">
                  <label htmlFor="firstname">First Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                    </div>
                    <input type="firstname" className="form-control" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                </div>
                <div className="form-group w-75">
                  <label htmlFor="lastname">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                    </div>
                    <input type="lastname" className="form-control" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="form-group w-75">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                    </div>
                    <input type="username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>
                <div className="form-group w-75">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                    </div>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="form-group w-75">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                    </div>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="form-group w-75">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                    </div>
                    <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-75" ><span className="text-light">Login</span></button>
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
