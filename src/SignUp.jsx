import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import user_icon from "./assests/user_icon.png";
import email_icon from "./assests/email_icon.png";
import password_icon from "./assests/password_icon.png";

const Signup = () => {

const [username, setUserName] = useState('');
const [email, setEmail] = useState('');
const [password, setpassword] = useState('');
const history = useHistory();     /*Used for redirecting to a different page */
const [isPending, setIsPending] = useState(false); /*Used for indicating loading */

const handleSubmit = (e) => 
{
  e.preventDefault();                         /*Prevents the submit button from refreshing the site on being pressed */
  const user_data = { username, email, password };        /*Generates an object consisting of values obtained from form */
  setIsPending(true);                         
  fetch('http://localhost:8000/user_data',{                                        /*The second arguement of fetch is where data is tackled and fetch method is defined*/
      method : 'POST',
      headers : {"Content-Type" : "application/json"},    /*Sends server info about the data */
      body : JSON.stringify(user_data)                          /* We need to convert the blog object into JSON string*/
      }).then(() => {
          setIsPending(false);
          //history.go(-1);                                 /*Redirects to the previous page (-1 = 1 page BACK)*/
          history.push('/Home') 
          console.log(user_data)                                /*Redirects to the home page */
      })
  }

  const handleLogin = () => {
    history.push('/login')
  }

  return ( 
    <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
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

              <div className="submit-container">
              {!isPending && <button>Sign Up</button>}
              {isPending && <button disabled>Signing in...</button>}  {/*Disables the button when the job is being added */}

              <button onClick={handleLogin}>Login</button>
              </div>
            </div>
        </form>
    </div>
 );
};

export default Signup;
