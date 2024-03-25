import JobList from "./jobList";
import useFetch from "./useFetch";
import {auth} from './FB-config/firebase-config';


const Home = () => {
  const {data:jobs,isLoading,error} = useFetch('http://localhost:8000/jobs');
  const email=auth?.currentUser?.email;

  return (
    <div className="home">
      Welcome {email} !
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {jobs && <JobList jobs={jobs} title="All jobs" />}
    </div>
  );
};

export default Home;