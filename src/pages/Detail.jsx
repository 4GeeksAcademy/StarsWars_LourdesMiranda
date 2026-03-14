import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { loadDetail } from "../services/swapi";

export const Detail = () => {
    const { type, uid } = useParams();
    const { store, dispatch } = useGlobalReducer();

    const item = store.detailCache[type]?.[uid];

    useEffect(() => {
        if (!item) {
            loadDetail(dispatch, type, uid);
        }
    }, [type, uid, item, dispatch]);

    const getNarrativeText = () => {
        if (!item) return "";
        const name = item.name;
        
        if (type === "people") {
            return `This detailed record has been retrieved from the central archives. A long time ago in a galaxy far, far away... the biological data and history of ${name} were fundamental to understanding the conflicts that defined an era of heroes and villains. Height: ${item.height}cm and eye color: ${item.eye_color}.`;
        }
        if (type === "planets") {
            return `Astrografic data retrieved from the star charts. This entry describes the environment of ${name}, a world with a ${item.climate} climate and ${item.terrain} terrain, whose resources were fundamental to the expansion of galactic civilizations.`;
        }
        if (type === "vehicles") {
            return `Technical specifications recovered from the manufacturer's core database. The engineering of the ${name}, designed by ${item.manufacturer}, played a fundamental role in deployments with a capacity for ${item.passengers} passengers.`;
        }
        return "";
    };

    if (!item) return <h1 className="text-center text-warning mt-5">Consulting Imperial Archives...</h1>;

    const folder = type === "people" ? "characters" : type;
    const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${folder}/${uid}.jpg`;

    return (
        <div className="container mt-5">
            {/* SECCIÓN SUPERIOR: IMAGEN Y NARRATIVA */}
            <div className="row bg-dark p-4 rounded border border-secondary shadow-lg">
                <div className="col-12 col-md-6 text-center">
                    <img
                        src={imageUrl}
                        className="img-fluid rounded border border-warning shadow"
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                    />
                </div>
                <div className="col-12 col-md-6 text-white text-center d-flex flex-column justify-content-center px-4">
                    <h1 className="display-3 colorWars" style={{ color: "#FFE81F" }}>{item.name}</h1>
                    <p className="lead mt-3 text-secondary" style={{ textAlign: "justify", lineHeight: "1.6" }}>
                        <strong className="text-warning">Detailed Dossier:</strong> {getNarrativeText()}
                    </p>
                </div>
            </div>

            <hr className="my-5 border-warning" />

            {/* SECCIÓN INFERIOR: DATOS TÉCNICOS ESPECÍFICOS */}
            <div className="row text-warning text-center fw-bold border-top border-bottom border-warning py-3 bg-black mx-1">
                <div className="col">
                    <p className="mb-1 text-uppercase small text-secondary">Name</p>
                    <p className="text-white m-0">{item.name}</p>
                </div>

                {type === "people" && (
                    <>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Birth Year</p><p className="text-white m-0">{item.birth_year}</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Gender</p><p className="text-white m-0">{item.gender}</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Height</p><p className="text-white m-0">{item.height} cm</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Eyes</p><p className="text-white m-0">{item.eye_color}</p></div>
                    </>
                )}

                {type === "planets" && (
                    <>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Climate</p><p className="text-white m-0">{item.climate}</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Population</p><p className="text-white m-0">{item.population}</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Diameter</p><p className="text-white m-0">{item.diameter} km</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Terrain</p><p className="text-white m-0">{item.terrain}</p></div>
                    </>
                )}

                {type === "vehicles" && (
                    <>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Model</p><p className="text-white m-0">{item.model}</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Manufacturer</p><p className="text-white m-0">{item.manufacturer}</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Cost</p><p className="text-white m-0">{item.cost_in_credits}</p></div>
                        <div className="col"><p className="mb-1 text-uppercase small text-secondary">Speed</p><p className="text-white m-0">{item.max_atmosphering_speed}</p></div>
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