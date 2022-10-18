import { BrowserRouter,Routes,Route } from "react-router-dom"
import Header from "../components/Header/Header"
import Favourites from "../pages/Favourites"
import Home from "../pages/Home"
import PokemonDetail from "../pages/PokemonDetail"


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/pokemon-detail/:id" element={<PokemonDetail/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter