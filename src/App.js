import './styles/App.css';
import './styles/basicComponents.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Nav,Dashboard,DemandCake,DemandDilevry,Offers,Posts} from './components/adminComponents'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard/>}/>
        <Route path="/demand/tarte" exact element={<DemandCake/>}/>
        <Route path="/demand/livraison" exact element={<DemandDilevry/>}/>
        <Route path="/offres" exact element={<Offers/>}/>
        <Route path="/posts" exact element={<Posts/>}/>
      </Routes> 
      <div>
        <Nav/>
      </div>
    </Router>
  );
}

export default App;
