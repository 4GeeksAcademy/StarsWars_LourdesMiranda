import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Card = (props) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.includes(props.title);

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({
                type: "delete_favorite",
                payload: props.title
            });
        } else {
            dispatch({
                type: "add_favorite",
                payload: props.title
            });
        }
    };

    return (
        <div className="h-100">
            <div className="card h-100 bg-dark text-white border-secondary">
                <img src={props.imageUrl} className="card-img-top" alt={props.title} />
                <div className="card-body text-center">
                    <h5 className="card-title">{props.title}</h5>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center bg-transparent border-top-0 pb-3">
                    <Link to={`/single/${props.type}/${props.id}`}>
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