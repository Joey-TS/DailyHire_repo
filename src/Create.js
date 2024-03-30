import { useHistory } from 'react-router-dom';
import {db} from './FB-config/firebase-config';
import {collection, addDoc} from 'firebase/firestore';
import { useState } from "react";

const Create = () => {



const [newtitle, setTitle] = useState('');
const [newbody, setBody] = useState('');
const [newauthor, setAuthor] = useState(' ');
const [newlocation, setLocation] = useState(' ');
const [newseats, setSeats] = useState(0);
const [isPending, setIsPending] = useState(false); /*Used for indicating loading */
const history = useHistory();                      /*Used for redirecting to a different page */
const jobCollectionRef=collection(db,"Jobs");

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); // Add this line to check if handleSubmit is being called
    try {
        setIsPending(true); // Set isPending to true while the operation is in progress
        await addDoc(jobCollectionRef, {
            author: newauthor,
            body: newbody,
            location: newlocation,
            seats: newseats,
            title: newtitle
        });
        setIsPending(false); // Set isPending back to false when the operation is complete
        history.push('/Home'); // Redirect to a different page after successful addition
    } catch (err) {
        console.error("Error adding document: ", err);
        setIsPending(false); // Ensure isPending is set to false even if there's an error
    }
};

    return ( 
        <div className="create">
            <h2>Add a new job</h2>
            <form onSubmit={handleSubmit}>
                <label>Job title:</label>
                <input 
                    type="text" 
                    required
                    value={newtitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Job description:</label>
                <textarea 
                    required
                    value={newbody}
                    onChange={(e) => setBody(e.target.value)}>
                </textarea>
                <label>Job author:</label>
                <input 
                    type="text" 
                    required
                    value={newauthor}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <label>Location of job</label>
                <input
                    type='text'
                    required
                    value={newlocation}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label>Number of seats</label>
                <input
                    type='number' min='1'
                    required
                    value={newseats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                />
                {!isPending && <button type="submit">Add job</button>}
                {isPending && <button disabled>Adding job...</button>}  {/*Disables the button when the job is being added */}
            </form>
        </div>
     );
}
 
export default Create;