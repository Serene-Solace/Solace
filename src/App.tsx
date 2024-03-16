import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UploadPage from './tab/uploadPage.tsx'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import React from 'react';
import Navbar from "./Navbar.tsx";
import About from "./tab/about.tsx";

type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

const App: React.FC<AppProps> = ({signOut, user}) => {
  return (
    <Router>
      <div className="nav">
      <Navbar />
        <ul>
          <li><Button onClick={signOut}>Sign out</Button></li>
        </ul>
      </div>
      <div>
        <Switch>
          <Route exact path="/about">
            <About />
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