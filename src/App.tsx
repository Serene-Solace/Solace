import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import About from "./tab/about.tsx";
import HomePage from './components/HomePage/HomePage.tsx';
import ExplorePage from './components/ExplorePage/ExplorePage.tsx';
import Header from './components/Header/Header.tsx';
import { WithAuthenticatorProps } from '@aws-amplify/ui-react';

const App: React.FC<WithAuthenticatorProps> = (data) => {

  return (
    <Router>
      {
        <>
          <Header signOut={data.signOut} />
          <div>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route path="/upload">
                <ExplorePage />
              </Route>
            </Switch>
          </div>
        </>
      }
    </Router>
  )
}

export default App;