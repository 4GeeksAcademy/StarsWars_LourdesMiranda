import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";
import { loadCatalog } from "../services/swapi";
import './Home.css';

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.people.length === 0) {
            loadCatalog(dispatch);
        }
    }, [dispatch, store.people.length]);

    const GITHUB_IMG_BASE = "https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img";

    return (
        <div className="text-center mt-5">
            {/* SECCIÓN PERSONAJES */}
            <h1 className="text-white home-title">Characters</h1>
            <div className="container">
                <div className="row pb-5 mt-5">
                    {store.people && store.people.length > 0 ? (
                        store.people.slice(0, 3).map((person) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={person.uid}>
                                <Card
                                    title={person.name}
                                    imageUrl={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${person.uid}.jpg`}
                                    id={person.uid}
                                    type="people"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Conectando con el hiperespacio...</p>
                    )}
                </div>
            </div>

            {/* SECCIÓN VEHÍCULOS */}
            <h1 className="text-white home-title">Vehicles</h1>
            <div className="container">
                <div className="row pb-5 mt-5">
                    {store.vehicles && store.vehicles.length > 0 ? (
                        store.vehicles.slice(0, 3).map((v) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={v.uid}>
                                <Card
                                    title={v.name}
                                    imageUrl={`${GITHUB_IMG_BASE}/vehicles/${v.uid}.jpg`}
                                    id={v.uid}
                                    type="vehicles"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Arrancando motores...</p>
                    )}
                </div>
            </div>

            {/* SECCIÓN PLANETAS */}
            <h1 className="text-white home-title">Planets</h1>
            <div className="container">
                <div className="row pb-5 mt-5">
                    {store.planets && store.planets.length > 0 ? (
                        store.planets.slice(0, 3).map((planet) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={planet.uid}>
                                <Card
                                    title={planet.name}
                                    imageUrl={`${GITHUB_IMG_BASE}/planets/${planet.uid}.jpg`}
                                    id={planet.uid}
                                    type="planets"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Conectando con las galaxias...</p>
                    )}
                </div>
            </div>
        </div>
    );
};