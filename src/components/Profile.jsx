import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users'),
          where('userId', '==', userId)
        ),
        (querySnapshot) => {
          let userArr = [];
          querySnapshot.forEach((doc) => {
            userArr.push({ id: doc.id, ...doc.data() }); // Include all fields in the object
          });
          setUser(userArr[0]); // Assuming there is only one user document
        }
      );

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'profilePhoto'),
        ),
        (querySnapshot) => {
          let userPhoto = [];
          querySnapshot.forEach((doc) => {
            userPhoto.push({ id: doc.id, ...doc.data() }); // Include all fields in the object
          });
          setPhoto(userPhoto[0]); // Assuming there is only one user document
        }
      );

      return () => unsubscribe();
    }
  }, [userId]);

  const handleLogout = async () => {
    // Handle logout logic
  };

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-blue-500 text-white p-4">
          {photo && photo['profileUrl'] ? (
            <img
              src={photo['profileUrl']}
              alt="Profile"
              style={{ maxWidth: '20%', backgroundColor: 'white' }}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <FaUser size={32} />
          )}
        </div>
        <h1 className="text-2xl font-bold py-4">Profile</h1>
        {user && (
          <>
            <p>
              Name: {user['first name']} {user['last name']}
            </p>
            <p>User Email: {user.email}</p>
            {/* Display other user information */}
          </>
        )}
        <button onClick={handleLogout} className="border px-6 py-2 my-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
