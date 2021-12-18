import React,{useEffect, useState} from 'react';
import './styles/App.css';
import './styles/basicComponents.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, Dashboard, DemandCake, DemandDilevry, Offers, Posts, AddPosts, EditPosts } from './components/adminComponents'
import { Home, Livraison,Cakes,Login} from './components/userComponents'


function App() {

  const [isAuth,setIsAuth] = useState(false);

  const getFromLocal = () => {
    if(localStorage.getItem("loggedIn")){
      setIsAuth(JSON.parse(localStorage.getItem("loggedIn")))
    }
  }

  useEffect(()=>{
    getFromLocal()
  }, [])

  return (
    <Router>
      {isAuth && <Nav />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/livraison" exact element={<Livraison />} />    
        <Route path="/cakes" exact element={<Cakes />} />    
        <Route path="/login" exact element={<Login />} />    

        <Route path="/demand/tarte" exact element={<DemandCake />} />
        <Route path="/demand/livraison" exact element={<DemandDilevry />} />
        <Route path="/offres" exact element={<Offers />} />
        <Route path="/posts" exact element={<Posts />} />
        <Route path="/posts/add" exact element={<AddPosts />} />
        <Route path="/posts/edit/:id" exact element={<EditPosts />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
            
      </Routes>
    </Router>
  );
}

export default App;
