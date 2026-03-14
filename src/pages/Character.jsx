import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  
import Card from "../components/Card.jsx";
const BASE_URL = import.meta.env.VITE_API_URL;
import './Home.css';

export const Character = () => {
  const { store, dispatch } = useGlobalReducer()
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

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1 className="home-title mb-5">Galactic Characters</h1>

        <div className="row pb-5 mt-5">
          {store.people && store.people.length > 0 ? (
            store.people.map((person) => (
              <div className="col-12 col-md-6 col-lg-3 mb-4" key={person.uid}>
                <Card
                  title={person.name}
                  imageUrl={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/characters/${person.uid}.jpg`}
                  description={`Un legendario personaje con ID ${person.uid} de la saga Star Wars.`}
                  id={person.uid}
                  type="people"
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-white">Buscando personajes en los archivos Jedi...</p>
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
