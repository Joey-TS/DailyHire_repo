import JobList from "./jobList";
import useFetch from "./useFetch";

const Home = () => {
  const {data:jobs,isLoading,error} = useFetch('http://localhost:8000/jobs');

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {jobs && <JobList jobs={jobs} title="All jobs" />}
    </div>
  );
};

export default Home;
