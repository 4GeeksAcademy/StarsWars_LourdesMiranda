// Import necessary components from react-router-dom and other parts of the application.
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import Card from "../components/Card.jsx";
const BASE_URL = import.meta.env.VITE_API_URL;
import './Home.css';

export const Vehicles = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const BASE_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1 className="home-title mb-5">Galactic Vehicles</h1>

        <div className="row pb-5 mt-5">
          {store.vehicles && store.vehicles.length > 0 ? (

          
            store.vehicles.map((v) => (
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
            <div className="col-12">
              <p className="text-white">Preparando los motores en el hangar...</p>
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
