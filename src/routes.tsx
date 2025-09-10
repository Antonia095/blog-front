import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import CriaPost from './pages/CriaPost';
import Postagens from './pages/Postagens';


const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/sobre" element={<Sobre />} /> 
      <Route path="/criar-post" element={<CriaPost />} />
      <Route path="/viagens" element={<Postagens />} />
    </Routes>
  </Router>
);

export default AppRoutes;
