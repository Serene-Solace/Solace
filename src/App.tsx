import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './tab/home.tsx'
import UploadPage from './tab/uploadPage.tsx'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import React from 'react';

type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

const App: React.FC<AppProps> = ({signOut, user}) => {
  return (
    <Router>
      <div>
        <Heading level={1}>Hello {user.username}</Heading>
        <Button onClick={signOut}>Sign out</Button>
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
            <Home />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default withAuthenticator(App);