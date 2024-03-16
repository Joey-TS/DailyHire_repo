import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {

const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [author, setAuthor] = useState(' ');
const [isPending, setIsPending] = useState(false); /*Used for indicating loading */
const history = useHistory();                      /*Used for redirecting to a different page */


const handleSubmit = (e) => {
    e.preventDefault();                         /*Prevents the submit button from refreshing the site on being pressed */
    const job = { title, body, author };        /*Generates an object consisting of values obtained from form */
    setIsPending(true);                         
    /*The second arguement of fetch is where data is tackled and
    fetch method is defined*/
    fetch('http://localhost:8000/jobs',{
        method : 'POST',
        headers : {"Content-Type" : "application/json"},    /*Sends server info about the data */
        body : JSON.stringify(job)                          /* We need to convert the blog object into JSON string*/
        }).then(() => {
            setIsPending(false);
            //history.go(-1);                                 /*Redirects to the previous page (-1 = 1 page BACK)*/
            history.push('/Home')                                 /*Redirects to the home page */
        })
    }


    return ( 
        <div className="create">
            <h2>Add a new job</h2>
            <form onSubmit={handleSubmit}>
                <label>Job title:</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Job description:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}>
                </textarea>
                <label>Job author:</label>
                <input 
                    type="text" 
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {!isPending && <button>Add job</button>}
                {isPending && <button disabled>Adding job...</button>}  {/*Disables the button when the job is being added */}
            </form>
        </div>
     );
}
 
export default Create;