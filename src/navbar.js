import { Link } from 'react-router-dom';
import { auth } from './FB-config/firebase-config';
import { signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { useEffect,useState } from 'react';




const NavBar = () => {
    const history = useHistory(); // Get the history object
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            setEmail(user.email);
          } else {
            // No user is signed in.
            setEmail(null);
          }
        });
    

    // Clean up subscription
    return () => unsubscribe();
  }, []);


    const logOut = async () => {
        try {  
          await signOut(auth); 
          history.push('/SignUp'); // Redirect to the login page after sign out
          setEmail(null);
        } catch (error) {
          console.log(error);
        }
    };
    
    return ( 
        <nav className="navbar">
            {console.log(email)}
            <h1>
                {email ? (
                    <Link to="Home/">DailyHire</Link>
                ) : (
                    <Link to="/">DailyHire</Link>
                )}
            </h1>
            <div className="links">
                {email && (
                    <Link to="/create" style={{
                        color: 'white', 
                        backgroundColor: '#f1356d',
                        borderRadius: '8px' 
                    }}>New Job</Link>
                )}
            </div>
            <button 
                style={{
                    color: 'white', 
                    backgroundColor: '#f1356d',
                    borderRadius: '8px',
                    padding: 6 
                }}
                onClick={logOut}
            >
                Log Out
            </button>
        </nav>
     );
}
 
export default NavBar;