import { useEffect, useState } from "react";
import JobList from "./jobList";
import useFetch from "./useFetch";
import { auth } from './FB-config/firebase-config';

const Home = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        setEmail(user.email);
      } else {
        // No user is signed in.
        setEmail(null);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const { data: jobs, isLoading, error } = useFetch('http://localhost:8000/jobs');

  return (
    <div className="home">
      Welcome {email || 'Guest'}!
      <h2>All Jobs</h2>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {jobs && <JobList jobs={jobs}/>}
    </div>
  );
};

export default Home;
