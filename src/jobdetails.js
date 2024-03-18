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

    const handleJobApply = () => {
        const updatedSeats = parseInt(job.seats) - 1; // Decrementing seats
        fetch('http://localhost:8000/jobs/' + job.id, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ seats: updatedSeats, applied: true})
        })
        .then(() => {
            alert('Successfully applied!');
            history.push('/Home');
        })
        .catch(error => {
            console.error('Error applying for job:', error);
        });
    }

    const handleJobLeave = () => {
        if (!job.applied) {
            alert("You haven't applied to this job yet.");
            return;
        }
    
        const updatedSeats = parseInt(job.seats) + 1; // Incrementing seats
    
        fetch('http://localhost:8000/jobs/' + job.id, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ seats: updatedSeats, applied: false }) // Updating seats and applied value
        })
        .then(() => {
            alert('Successfully left the job!');
            history.push('/Home');
        })
        .catch(error => {
            console.error('Error leaving the job:', error);
        });
    }
    return ( 
        <div className="job-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {job && (
                <article>
                    <h2>{job.title}</h2>
                    <p>Posted by : {job.author}</p>
                    <p>Location : {job.location}</p>
                    <p>Seats available : {job.seats}</p>
                    <br></br>
                    <p>Applied : {job.applied ? 'Yes' : 'No'}</p>
                    <div>{job.body}</div>
                    <button onClick={handleDelete}>Delete job</button>
                    <button onClick={handleJobApply} disabled={job.applied}>Apply to job</button>
                    <button onClick={handleJobLeave} disabled={!job.applied}>Leave job</button>
                </article>
            )}
        </div>
     );
}
 
export default JobDetails;