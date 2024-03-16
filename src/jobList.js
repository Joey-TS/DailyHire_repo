import { Link } from "react-router-dom/cjs/react-router-dom.min";

const JobList = ({jobs,title,}) => {

    return ( 
        <div className="job-list:">
            <h2>{ title }</h2>
            {jobs.map(job =>(
                <div className="job-preview" key={job.id} >
                <Link to={`/jobs/${job.id}`}>
                <h2>{ job.title }</h2>
                <p>Posted by : { job.author }</p>
                </Link>
                </div>
            ))}
        </div>
     );
}
 
export default JobList;