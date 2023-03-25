import {HashRouter, Route, Routes} from "react-router-dom"
import Layout from './components/Layout'
import Library from './components/Library'
import Game from './components/Game'
import Connexion from './components/Connexion'

function App(props: any) {

    if (!props || typeof props.connected !== 'boolean') {
        return <div>Erreur: les props sont incorrectes.</div>;
    }

  return (
    <HashRouter>
      <Routes>
          { props.connected ?
              <Route path='/' element={<Layout/>} >
                  <Route index element={<Library games={props}/>}/>
                  <Route path="game" element={<Game />}/>
              </Route>
              :
                <Route path='/' element={<Connexion />}/>
          }
      </Routes>
    </HashRouter>
  );
}

export default App;
