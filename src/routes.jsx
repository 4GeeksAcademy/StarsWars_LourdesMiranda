import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail.jsx";
import { Character } from "./pages/Character";
import { Films } from "./pages/Films";
import { Vehicles } from "./pages/Vehicles";
import { Planets } from "./pages/Planets";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Home principal */}
        <Route index element={<Home />} />

        {/* Rutas de Categorías */}
        <Route path="Character" element={<Character />} />
        <Route path="Films" element={<Films />} />
        <Route path="Vehicles" element={<Vehicles />} />
        <Route path="Planets" element={<Planets />} />
        <Route path=":type/:uid" element={<Detail />} />
        <Route path="single/:type/:uid" element={<Detail />} />

      </Route>
    )
);