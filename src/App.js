import { Component } from 'react';
import './App.css';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Modal from './components/UI/Modal/Modal';
import NavBar from './components/UI/Nav/Navbar';


class App extends Component {

  render()
  {    
    return (
      <div className="App">
        <NavBar/>
        <Dashboard />
        <Modal/>
      </div>
    );
  }
}

export default App;
