import { BrowserRouter, Switch, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import './App.css';
import Navbar from './components/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Connections from "./pages/Connections";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/connections'>
              <Connections />
            </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )}

export default App;
