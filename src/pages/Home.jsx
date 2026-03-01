import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "./Card.jsx";
import './Home.css';

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const BASE_URL = import.meta.env.VITE_API_URL;

    const getPeople = async () => {
        try {
            const response = await fetch(`${BASE_URL}people`);
            if (!response.ok) throw new Error("Fallo en la comunicación con la galaxia");

            const data = await response.json();

            dispatch({
                type: "set_people",
                payload: data.results
            });

        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const getFilms = async () => {
        try {
            const response = await fetch(`${BASE_URL}films`);
            if (!response.ok) throw new Error("Fallo en la comunicación con la galaxia");

            const data = await response.json();

            dispatch({
                type: "set_films",
                payload: data.result
            });

        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const getVehicles = async () => {
        try {
            const response = await fetch(`${BASE_URL}vehicles`);
            if (!response.ok) throw new Error("Fallo en la comunicación con la galaxia");

            const data = await response.json();

            dispatch({
                type: "set_vehicles",
                payload: data.results
            });

        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const getPlanets = async () => {
        try {
            const response = await fetch(`${BASE_URL}planets`);
            if (!response.ok) throw new Error("Fallo en la comunicación con la galaxia");

            const data = await response.json();

            dispatch({
                type: "set_planets",
                payload: data.results
            });

        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        getPeople();
        getFilms();
        getVehicles();
        getPlanets();
    }, []);

    return (
        <div className="text-center mt-5">
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
            <h1 className="text-white home-title">Films</h1>
            <div className="container">
                <div className="row pb-5 mt-5">
                    {store.films && store.films.length > 0 ? (
                        store.films.slice(0, 3).map((film) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={film.uid}>
                                <Card
                                    title={film.properties?.title || film.name}
                                    imageUrl={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/films/${film.uid}.jpg`}
                                    id={film.uid}
                                    // CAMBIADO: de "film" a "films" para que coincida con la API y la carpeta de fotos
                                    type="films"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Revisando películas...</p>
                    )}
                </div>
            </div>
            <h1 className="text-white home-title">Vehicles</h1>
            <div className="container">
                <div className="row pb-5 mt-5">
                    {store.vehicles && store.vehicles.length > 0 ? (
                        store.vehicles.slice(0, 3).map((v) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={v.uid}>
                                <Card
                                    title={v.name}
                                    imageUrl={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/vehicles/${v.uid}.jpg`}
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
            <h1 className="text-white home-title">Planets</h1>
            <div className="container">
                <div className="row pb-5 mt-5">
                    {store.planets && store.planets.length > 0 ? (
                        store.planets.slice(1, 4).map((planets) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={planets.uid}>
                                <Card
                                    title={planets.name}
                                    imageUrl={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/planets/${planets.uid}.jpg`}
                                    id={planets.uid}
                                    type="planets"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Conectando con el galaxias...</p>
                    )}
                </div>
            </div>
        </div>
    );
}; 