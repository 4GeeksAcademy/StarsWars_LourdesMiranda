import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  
import Card from "../components/Card.jsx";
const BASE_URL = import.meta.env.VITE_API_URL;
import './Home.css';

export const Films = () => {
  const { store, dispatch } = useGlobalReducer()
  const BASE_URL = import.meta.env.VITE_API_URL;

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


  useEffect(() => {
    getFilms();
  }, []);

  return (
<div className="container">
  <div className="text-center mt-5">
    <h1 className="home-title mb-5">Galactic Films</h1> 

    <div className="row pb-5 mt-5">
      {store.films && store.films.length > 0 ? (
        store.films.map((film) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={film.uid}>
            <Card
              title={film.properties?.title || film.name}
              imageUrl={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/films/${film.uid}.jpg`}
              id={film.uid}
              type="films"
            />
          </div>
        ))
      ) : (
        <div className="col-12">
          <p className="text-white">Consultando los archivos de la Biblioteca Jedi...</p>
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
