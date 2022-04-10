import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Connections from "./pages/Connections"
import InGameInfo from "./pages/InGameInfo"
import Communication from './pages/Communication'

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
            <Route path='/ingame'>
              <InGameInfo />
            </Route>
            <Route path='/communication'>
              <Communication />
            </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )}

export default App;
