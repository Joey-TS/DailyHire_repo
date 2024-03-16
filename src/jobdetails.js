import { useHistory,useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from './useFetch';

const JobDetails = () => {
    const {id}= useParams();
    const history = useHistory();
    const {data: job, isLoading, error} = useFetch('http://localhost:8000/jobs/' + id);
    const handleDelete=()=>{
        fetch('http://localhost:8000/jobs/'+job.id,{
            method : 'DELETE'
            }).then(()=>{
            history.push('/Home'); /*Redirects to the home page after deletion*/
        })

    }

    return ( 
        <div className="job-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {job && (
                <article>
                    <h2>{job.title}</h2>
                    <p>Posted by : {job.author}</p>
                    <div>{job.body}</div>
                    <button onClick={handleDelete}>Delete job</button>
                </article>
            )}
        </div>
     );
}
 
export default JobDetails;