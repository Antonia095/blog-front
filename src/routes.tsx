import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import CriaPost from './pages/CriaPost';


const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/sobre" element={<Sobre />} /> 
      <Route path="/criar-post" element={<CriaPost />} /> 
    </Routes>
  </Router>
);

export default AppRoutes;
