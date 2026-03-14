import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Card = (props) => {
    console.log("Imagen de " + props.title + ": " + props.imageUrl);
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(
        (fav) => fav.uid === props.id && fav.type === props.type
    );

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({
                type: "delete_favorite",
                payload: { uid: props.id, type: props.type }
            });
        } else {
            dispatch({
                type: "add_favorite",
                payload: {
                    uid: props.id,
                    name: props.title,
                    type: props.type
                }
            });
        }
    };

    return (
        <div className="h-100">
            <div className="card h-100 bg-dark text-white border-secondary">
                <img
                    src={props.imageUrl}
                    referrerPolicy="no-referrer"
                    className="card-img-top"
                    alt={props.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                    }}
                />
                <div className="card-body text-center">
                    <h5 className="card-title">{props.title}</h5>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center bg-transparent border-top-0 pb-3">
                    <Link to={`/${props.type}/${props.id}`}>
                        <button className="btn btn-star-wars">Ver más</button>
                    </Link>

                    <button className="btn btn-favorite" onClick={handleFavorite}>
                        <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart text-warning`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;