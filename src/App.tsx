import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import HomePage from './components/HomePage/HomePage.tsx';
import ExplorePage from './components/ExplorePage/ExplorePage.tsx';
import Header from './components/Header/Header.tsx';
import AboutPage from './about.tsx';

const App: React.FC = () => {

  return (
    <Router>
      {
        <>
          <Header/>
          <div>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/about">
                <AboutPage />
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