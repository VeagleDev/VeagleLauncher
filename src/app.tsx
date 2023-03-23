import {HashRouter, Route, Routes} from "react-router-dom"
import Layout from './components/Layout'
import Library from './components/Library'
import Game from './components/Game'
import Connexion from './components/Connexion'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Library />}/>
          <Route path="game" element={<Game />}/>
          <Route path="connexion" element={<Connexion />}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
