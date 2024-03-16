import { Link } from 'react-router-dom';

const NavBar = () => {
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
        </nav>
     );
}
 
export default NavBar;