//This page deals with what you see after clicking on a job in the home page
//It shows the details of the job and also has buttons to apply to the job or leave the job

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from './FB-config/firebase-config';
import { doc, getDoc, updateDoc,deleteDoc } from 'firebase/firestore';

const JobDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobRef = doc(db, "Jobs", id);
                const jobSnap = await getDoc(jobRef);
                if (jobSnap.exists()) {
                    setJob({ id: jobSnap.id, ...jobSnap.data() });
                } else {
                    setError("Job not found");
                }
            } catch (error) {
                setError("Error fetching job details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "Jobs", job.id));
            history.push('/Home');
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleJobApply = async () => {
        const updatedSeats = parseInt(job.seats) - 1;
        try {
            await updateDoc(doc(db, "Jobs", job.id), { seats: updatedSeats, applied: true });
            alert('Successfully applied!');
            history.push('/Home');
        } catch (error) {
            console.error('Error applying for job:', error);
        }
    };

    const handleJobLeave = async () => {
        if (!job.applied) {
            alert("You haven't applied to this job yet.");
            return;
        }

        const updatedSeats = parseInt(job.seats) + 1;
        try {
            await updateDoc(doc(db, "Jobs", job.id), { seats: updatedSeats, applied: false });
            alert('Successfully left the job!');
            history.push('/Home');
        } catch (error) {
            console.error('Error leaving the job:', error);
        }
    };

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
                    <br />
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
