//import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Connections from "./pages/Connections";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path='/about' element={<About />} />
        <Route path='/connections' element={<Connections />} />
      </Routes>
    </Router>
  );
}

export default App;
