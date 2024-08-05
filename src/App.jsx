import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about/Index';
import "bootstrap/dist/css/bootstrap.min.css"
import Product from './pages/pruducts/Index';
import CustomNavbar from './components/customNavbar/CustomNavbar';
import Login from './pages/login';
import Roles from './pages/roles/roles';
import Catagories from './pages/catagories/Catagories';
import Tags from './pages/tags/Tags';
import Userss from './pages/users/Users.jsx';


function App() {
  
  
  return (
    <BrowserRouter>
    <CustomNavbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/Catagories" element={<Catagories />} />
            <Route path="/Tags" element={<Tags />} />
            <Route path="/Userss" element={<Userss/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;





