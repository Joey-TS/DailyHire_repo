import {db} from './FB-config/firebase-config';
import {getDocs, collection} from 'firebase/firestore';
import { useEffect, useState } from "react";

function Home2(){
    const [joblist,setjoblist]=useState([]);
    const jobCollectionRef=collection(db,"Jobs");

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
        <div>
            {joblist.map((Jobs) => (
                <div>
                    <h1>{Jobs.title}</h1>
                    <p>{Jobs.author}</p>
                    <p>{Jobs.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Home2;