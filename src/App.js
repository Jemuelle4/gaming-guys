import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import About from './pages/About'
import Connections from "./pages/Connections"
import InGameInfo from "./pages/InGameInfo"
import Communication from './pages/Communication'
import Role from './pages/Role'
import LandingPage from './pages/LandingPage'
import UserProfile from './pages/UserProfile'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/landingpage"></Redirect>}
                {user && <Home/>}
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
                {!user && <Redirect to="/landingpage"></Redirect>}
                {user && <About />}
              </Route>
              <Route path='/connections'>
                {!user && <Redirect to="/landingpage"></Redirect>}
                {user && <Connections uid={user.uid}/>}
              </Route>
              <Route path='/ingame'>
                {!user && <Redirect to="/landingpage"></Redirect>}
                {user && <InGameInfo />}
              </Route>
              <Route path='/communication'>
                {!user && <Redirect to="/landingpage"></Redirect>}
                {user && <Communication />}
              </Route>
              <Route path='/role'>
                {!user && <Redirect to="/landingpage"></Redirect>}
                {user && <Role />}
              </Route>
              <Route path="/landingpage">
                {!user && <LandingPage/>}
                {user && <Home/>}
              </Route>
              <Route path="/profile">
                {!user && <LandingPage/>}
                {user && <UserProfile uid ={user.uid}/>}
              </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  )}
export default App;
