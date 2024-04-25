import NavBar from './navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from './Create';
import JobDetails from './jobdetails';
import NotFound from './notFound';
import Login from './Login';
import Signup from './SignUp';
import Home2 from './Home2';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router> 
    <div className="App">
      <NavBar />
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/SignUp'>
            <Signup />
          </Route>
          <Route exact path='/Login'>
            <Login />
          </Route>
          <Route exact path='/Home'> {/*Home page = '/' */}
            <Home />
          </Route>
          <Route exact path='/Create'>
            <Create />
          </Route>
          <Route exact path='/jobs/:id'>
            <JobDetails />
          </Route>
          <Route path='*'> {/*Catches any route other than above shows 404 page*/}
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;