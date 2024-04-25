import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import user_icon from "./assests/user_icon.png";
import email_icon from "./assests/email_icon.png";
import password_icon from "./assests/password_icon.png";
import {auth, db} from './FB-config/firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import doc and setDoc functions for Firestore

const Signup = () => {
const [username, setUserName] = useState('');
const [email, setEmail] = useState('');
const [password, setpassword] = useState('');
const [usertype, setUserType] = useState('');
const history = useHistory();                         /*Used for redirecting to a different page */
const [isPending, setIsPending] = useState(false);    /*Used for indicating loading */


const signIn = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  setIsPending(true); // Set isPending state to true to indicate signing in

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;          // Get user object from userCredential

    // Add user data to Firestore "users" collection with uid as document id
    await setDoc(doc(db, 'users', user.uid), { // Set document in 'users' collection with user's uid
      username,                                // Set username field in document
      email,                                   // Set email field in document
      usertype                                 // Set usertype field in document
    });

    // Redirect to home page after successful signup
    history.push('/Home');
  } catch (error) {
    console.log(error);       // Log any errors that occur during sign up
    setIsPending(false);      // Set isPending state to false if sign up fails
  }
};

  const handleLogin = () => {
    history.push('/login')      // Redirect to login page
  }

  return ( 
    <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={signIn}>        {/* Call signIn function when form is submitted */}
            <div className="inputs">
              <div className="input">
                <img src={user_icon} alt="" />
                <input 
                    type="text" 
                    required
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={email_icon} alt="" />
                <input 
                    type="email" 
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="" />
                <input 
                    type="password" 
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="input">
                <input type="radio" id='vendor' name="user_type" value='vendor' onChange={(e) => setUserType(e.target.value)}/>
                <label for="vendor">Vendor/Hoster</label>

                <input type="radio" id='seeker' name="user_type" value='seeker' onChange={(e) => setUserType(e.target.value)}/>
                <label for="seeker">Job seeker</label>
              </div>

              <div className="submit-container">
              {!isPending && <button type="submit">Sign Up</button>}  {/* Display sign up button when not signing in */}
              {isPending && <button disabled>Signing in...</button>}  {/*Disables the button when the job is being added */}

              <button onClick={handleLogin}>Login</button>            {/* Redirect to login page */}
              </div>
            </div>
        </form>
    </div>
 );
};

export default Signup;