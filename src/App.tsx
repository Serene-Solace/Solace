import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './tab/home.tsx'
import UploadPage from './tab/uploadPage.tsx'

function App() {
  return (
    <Router>
      <div>
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

export default App
