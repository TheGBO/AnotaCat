import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notepad from './components/Notepad';
import { AppEntry } from './components/AppEntry';

function App() {
  return (
    <div className="App">

        <main className="wrapper">
        <Router>
          <Routes>
            <Route path="/" exact element={<HomePage/>}></Route>
            <Route path="/login" exact element={<LoginPage type={"Login"}/>}/>
            <Route path="/register" exact element={<LoginPage type={"Register"}/>}/>
            <Route path='/app' exact element={<AppEntry/>}/>
          </Routes>
        </Router>
        </main>
      </div>
  );
}

export default App;
