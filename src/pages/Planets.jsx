// Import necessary components from react-router-dom and other parts of the application.
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import Card from "./Card.jsx";
const BASE_URL = import.meta.env.VITE_API_URL;
import './Home.css';

export const Planets = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const BASE_URL = import.meta.env.VITE_API_URL;


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
    getPlanets();
  }, []);

  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1 className="home-title mb-5">Galactic Worlds</h1>

        <div className="row pb-5 mt-5">
          {store.planets && store.planets.length > 0 ? (
            store.planets.map((planets) => (
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
            <div className="col-12">
              <p className="text-white">Consultando los mapas estelares...</p>
            </div>
          )}
        </div>

        <Link to="/">
          <button className="btn btn-star-wars">Back home</button>
        </Link>
      </div>
    </div>
  );
};
