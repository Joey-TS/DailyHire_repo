import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry !</h2>
            <p>ㄟ( ▔, ▔ )ㄏ</p>
            <p>This page does not exist</p>
            <button><Link to="/">Back to the homepage</Link></button>
        </div>
     );
}
 
export default NotFound;