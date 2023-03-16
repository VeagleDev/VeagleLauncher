import { HashRouter, Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Library from './components/Library'
import Game from './components/Game'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Library />}/>
          <Route path="game" element={<Game />}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
