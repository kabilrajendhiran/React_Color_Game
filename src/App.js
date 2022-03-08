import { Component } from 'react';
import './App.css';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import NavBar from './components/UI/Nav/Navbar';

class App extends Component {

  render()
  {    
    return (
      <div className="App">
        <NavBar/>
        <Dashboard />
      </div>
    );
  }
}

export default App;
