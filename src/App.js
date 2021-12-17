import './styles/App.css';
import './styles/basicComponents.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import Home from './componenets/userComponents/home';

import Livraison from './componenets/userComponents/livraison';

function App() {

  return (
    <Router>
        <Livraison />
    </Router>
  );
}

export default App;
