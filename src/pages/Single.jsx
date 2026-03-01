import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const Single = () => {
  const { type, theId } = useParams();
  const [item, setItem] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

      const getDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.swapi.tech/api/${type}/${theId}`);
            
            if (!response.ok) throw new Error("Error connecting to the galaxy archives");

            const data = await response.json();

            
            setItem(data.result.properties);
            setDescription(data.result.description);
            
        } catch (error) {
            console.error("Mission error:", error.message);
        } finally {
           
            setLoading(false);
        }
    };


useEffect(() => {
    getDetails();
}, [type, theId]);

  const getNarrativeText = () => {
    if (!item) return "";
    const name = item.name || item.title;
        
            if (type === "people") {
                    return `${name} is a notable individual within the galactic records. Standing at ${item.height} cm tall with ${item.eye_color} eyes, this ${item.gender} figure was born in ${item.birth_year}. Their physical presence and history are fundamental to understanding the legacy of heroes and villains that defined this era.`;
                        }
    if (type === "planets") {
        return `${name} is a world characterized by its ${item.climate} climate and ${item.terrain} terrain. With a diameter of ${item.diameter} km and a population of ${item.population} inhabitants, its strategic importance and unique gravity of ${item.gravity} have made it a key location in galactic star charts.`;
    }
    if (type === "vehicles") {
        return `The ${name}, manufactured by ${item.manufacturer}, is a ${item.model} model designed for high-performance operations. Capable of reaching speeds of ${item.max_atmosphering_speed}, this vessel can carry ${item.passengers} passengers and was valued at ${item.cost_in_credits} credits during its peak usage in galactic conflicts.`;
    }
    if (type === "films") {
        return `"${name}" (Episode ${item.episode_id}) is a historical cinematic record directed by ${item.director} and produced by ${item.producer}. Released on ${item.release_date}, it narrates a pivotal chapter of the struggle for the galaxy, serving as a fundamental document of the Force's legacy.`;
    }
    return "";
  };

  if (loading) return <h1 className="text-center text-warning mt-5">Consulting Imperial Archives...</h1>;
  if (!item) return <h1 className="text-center text-danger mt-5">Error: Signal lost in deep space.</h1>;

  const getImageUrl = () => {
    const folder = type === "people" ? "characters" : type;
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${folder}/${theId}.jpg`;
  };

  return (
    <div className="container mt-5">
      <div className="row bg-dark p-4 rounded border border-secondary shadow-lg">
        <div className="col-12 col-md-6 text-center">
          <img
            src={getImageUrl()}
            className="img-fluid rounded border border-warning shadow"
            alt={item.name || item.title}
            onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
          />
        </div>
        <div className="col-12 col-md-6 text-white text-center d-flex flex-column justify-content-center px-4">
          <h1 className="display-3 colorWars">{item.name || item.title}</h1>
          <p className="lead mt-3 text-secondary" style={{ textAlign: "justify", lineHeight: "1.6" }}>
            <strong className="text-warning">{description}</strong>. {getNarrativeText()}
          </p>
        </div>
      </div>

      <hr className="my-5 border-warning" />

      <div className="row text-warning text-center fw-bold border-top border-bottom border-warning py-3 bg-black mx-1">
        <div className="col">
          <p className="mb-1 text-uppercase small text-secondary">Name</p>
          <p className="text-white m-0">{item.name || item.title}</p>
        </div>

        {type === "people" && (
          <>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Birth Year</p><p className="text-white m-0">{item.birth_year}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Gender</p><p className="text-white m-0">{item.gender}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Height</p><p className="text-white m-0">{item.height} cm</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Skin Color</p><p className="text-white m-0">{item.skin_color}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Eye Color</p><p className="text-white m-0">{item.eye_color}</p></div>
          </>
        )}

        {type === "films" && (
          <>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Director</p><p className="text-white m-0">{item.director}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Producer</p><p className="text-white m-0">{item.producer}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Release</p><p className="text-white m-0">{item.release_date}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Episode</p><p className="text-white m-0">{item.episode_id}</p></div>
          </>
        )}

        {type === "planets" && (
          <>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Climate</p><p className="text-white m-0">{item.climate}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Population</p><p className="text-white m-0">{item.population}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Diameter</p><p className="text-white m-0">{item.diameter} km</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Gravity</p><p className="text-white m-0">{item.gravity}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Terrain</p><p className="text-white m-0">{item.terrain}</p></div>
          </>
        )}

        {type === "vehicles" && (
          <>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Model</p><p className="text-white m-0">{item.model}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Manufacturer</p><p className="text-white m-0">{item.manufacturer}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Cost</p><p className="text-white m-0">{item.cost_in_credits}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Passengers</p><p className="text-white m-0">{item.passengers}</p></div>
            <div className="col"><p className="mb-1 text-uppercase small text-secondary">Max Speed</p><p className="text-white m-0">{item.max_atmosphering_speed}</p></div>
          </>
        )}
      </div>

      <div className="text-center mt-5 pb-5">
        <Link to="/">
          <button className="btn btn-outline-warning btn-lg fw-bold">
            Back to the Galaxy
          </button>
        </Link>
      </div>
    </div>
  );
};