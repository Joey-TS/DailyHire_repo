import { Link } from 'react-router-dom';
import {auth} from './FB-config/firebase-config';
import { signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';

const email=auth?.currentUser?.email;
const password=auth?.currentUser?.password;

const NavBar = () => {
    const history = useHistory(); // Get the history object
    const logOut = async () => {
        try {  
          await signOut(auth); // Assuming 'auth' is your Firebase authentication object
          history.push('/'); // Redirect to the login page after sign out
        } catch (error) {
          console.log(error);
        }
    };
    
    return ( 
        <nav className="navbar">
            <h1><Link to="Home/">DailyHire</Link></h1>
            <div className="links">
                <Link to="/create" style={{
                    color: 'white', 
                    backgroundColor: '#f1356d',
                    borderRadius: '8px' 
                }}>New Job</Link>
            </div>
            <button style={{color: 'white', 
                    backgroundColor: '#f1356d',
                    borderRadius: '8px',
                    padding: 6 }}
                    onClick={logOut}>Log Out</button>
        </nav>
     );
}
 
export default NavBar;