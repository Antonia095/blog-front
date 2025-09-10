import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import CriaPost from './pages/CriaPost';
import Postagens from './pages/Postagens';
import DetalhesPostagem from './pages/DetalhesPostagem';
import EditarPostagem from './pages/EditarPostagem';


const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/sobre" element={<Sobre />} /> 
      <Route path="/criar-post" element={<CriaPost />} />
      <Route path="/viagens" element={<Postagens />} />
      <Route path="/viagem/:id" element={<DetalhesPostagem />} />
      <Route path="/atualizar-postagem/:id" element={<EditarPostagem />} />
    </Routes>
  </Router>
);

export default AppRoutes;
