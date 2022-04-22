import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Connections from "./pages/Connections"
import InGameInfo from "./pages/InGameInfo"
import Communication from './pages/Communication'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Navbar />}
          <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login"></Redirect>}
                {user && <Home />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/ingame"></Redirect>}
                {!user && <SignUp />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/"></Redirect>}
                {!user && <Login />}
              </Route>
              <Route path='/about'>
                {!user && <Redirect to="/login"></Redirect>}
                {user && <About />}
              </Route>
              <Route path='/connections'>
                {!user && <Redirect to="/login"></Redirect>}
                {user && <Connections />}
              </Route>
              <Route path='/ingame'>
                {user && <InGameInfo />}
              </Route>
              <Route path='/communication'>
                <Communication />
              </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  )}
export default App;
