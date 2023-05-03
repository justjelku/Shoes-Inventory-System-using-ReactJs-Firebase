// import React, { createContext, useContext, useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { auth } from '../firebase/Firebase.js';
// import { AuthContext, AuthProvider } from '../context/AuthContext.js';

// const UserContext = createContext(null);

// function UserContextProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-center">Loading...</p>
//       </div>
//     );
//   }

//   return (
//       <UserContext.Provider value={{ currentUser }}>
//         {children}
//       </UserContext.Provider>
//   );
// }

// export { UserContextProvider, UserContext };
