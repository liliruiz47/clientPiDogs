/*import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
  );
} 
export default App;*/

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import landingPage from './components/LandigPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import DogCreate from './components/DogCreate/DogCreate';



function App() {
  return (
    <BrowserRouter>
    <div className='App-header' >
    <Switch>
        <Route exact path= '/' component ={landingPage}/>
        <Route path = '/home' component ={Home}/>
        <Route path= '/dogs/:id' component ={Detail}/>
        <Route path= '/dogs' component ={DogCreate}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;



