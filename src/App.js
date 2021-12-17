import './styles/App.css';
import './styles/basicComponents.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, Dashboard, DemandCake, DemandDilevry, Offers, Posts, AddPosts, EditPosts } from './components/adminComponents'
import { Home, Livraison} from './components/userComponents'
import { ProtectedRoute } from './basicComponents';
import useAuth from './hooks/useAuth';

function App() {

  const [isAuth, login, logout] = useAuth(true);

  return (
    <Router>
      {isAuth && <Nav/>}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/livraison" exact element={<Livraison />} />    
        
        <Route path="/demand/tarte" exact element={<DemandCake />} />
        <Route path="/demand/livraison" exact element={<DemandDilevry />} />
        <Route path="/offres" exact element={<Offers />} />
        <Route path="/posts" exact element={<Posts />} />
        <Route path="/posts/add" exact element={<AddPosts />} />
        <Route path="/posts/edit/:id" exact element={<EditPosts />} />
        <Route path="/dashboard" exact auth={isAuth}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
            
      </Routes>
    </Router>
  );
}

export default App;
