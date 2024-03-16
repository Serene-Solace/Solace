import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <Router>
      <div>
        <h1>Welcome to My Website</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <h2>Home Page Content</h2>
            <p>This is the home page content.</p>
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Home;