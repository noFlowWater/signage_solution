import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
import routes from './routes';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
        <Switch>
          {routes.map((route) => {
            return <Route key={route.path} exact path={route.path} component={route.component} />
          })}
        </Switch>
    </Router>
  );
}

export default App;
