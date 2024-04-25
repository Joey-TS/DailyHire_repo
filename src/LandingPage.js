import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LandingPage = () => {
    const history = useHistory();

    const handleStart = () => {
        history.push('/SignUp')
      }

    return (
        <div className='LandingPage'>
            <h1>Welcome to DailyHire!</h1>
            <p>Find the perfect freelancer / freelancing job for your project.</p>
            <button onClick={handleStart}>Get Started</button>
        </div>
    );
};

export default LandingPage;