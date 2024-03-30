//This deal with the retrieving of job details and displaying it in the home page
//Creates clickable links to job details , provided by jobdetails.js

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {db} from './FB-config/firebase-config';
import {getDocs, collection} from 'firebase/firestore';
import { useEffect, useState } from "react";



const JobList = ({ jobs, title }) => {

  const [joblist,setjoblist]=useState([]);
  const jobCollectionRef=collection(db,"Jobs");

  //Attempts to retrieve data from firebase
  useEffect(() => {
      const getJobList = async () => {
        try
          {
            const jobdata = await getDocs(jobCollectionRef);
            const filteredJobData=jobdata.docs.map((doc)=>({
              ...doc.data(),
              id:doc.id
              }));
          setjoblist(filteredJobData);
          }
        catch(err){
          console.log(err);
          }
      };

      getJobList();
  }, []);

  return (
    <div className="job-list">
      {joblist.map((Jobs) => (
        <div key={Jobs.id}>
          <h2>{title}</h2>
          <div className="job-preview">
            <Link to={`/Jobs/${Jobs.id}`}>
              <h2>{Jobs.title}</h2>
              <p>
                <posted>Posted by : {Jobs.author}</posted>{" "}
                <location>Location: {Jobs.location}</location>{" "}
                <seats>seats: {Jobs.seats}</seats>
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList