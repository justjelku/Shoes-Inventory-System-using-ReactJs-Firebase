// import { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { db } from '../firebase';
// import {
//   query,
//   collection,
//   onSnapshot,
// } from 'firebase/firestore';

// export const UserTables = () => {
//   const [userList, setUserList] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);


//   useEffect(() => {
//     const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         setUserId(null);
//       }
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const getUsers = query(
//         collection(
//           db,
//           'users',
//           'qIglLalZbFgIOnO0r3Zu',
//           'basic_users',
//         )
//       );
//       const unsubscribe = onSnapshot(getUsers, (querySnapshot) => {
//         let usersArr = [];
//         querySnapshot.forEach((doc) => {
// 			usersArr.push({ id: doc.id, ...doc.data() }); // Include all fields in the object
//         });
//         setUserList(usersArr);
//       });
//       return () => unsubscribe();
//     }
//   }, [setUserList, userId]);

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>User ID</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Username</th>
//           <th>Email</th>
//           <th>Role</th>
//         </tr>
//       </thead>
//       <tbody>
//         {userList.map((userinfo) => (
//           <tr key={userinfo.id}>
//             <td data-label="User ID">{userinfo.id}</td>
//             <td data-label="First Name">{userinfo['first name']}</td>
//             <td data-label="Last Name">{userinfo['last name']}</td>
//             <td data-label="Username">{userinfo.username}</td>
//             <td data-label="Email">{userinfo.email}</td>
// 			<td data-label="Role">{userinfo.role}</td>
//             {/* <td data-label="Role"><img src={users.productImage} style={{height:'100px', width: '100px'}} alt={product.productTitle}/></td> */}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };
