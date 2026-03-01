import React from "react";
import { Link } from "react-router-dom";
import StarWarsImageUrl from "../assets/img/Star_Wars_Logo.png";
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <div className="d-flex justify-content-between align-items-center bg-black px-4">
            <div className="logo-container">
                <Link to="/">
                    <img className="logoSW" src={StarWarsImageUrl} alt="Star Wars Logo" />
                </Link>
            </div>
            <nav className="navbar navbar-expand-lg bg-black shadow" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link colorWars" to="/Character">Characters</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link colorWars" to="/Films">Films</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link colorWars" to="/Vehicles">Vehicles</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link colorWars" to="/Planets">Planets</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle colorWarsFav d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Favorites
                                    <FontAwesomeIcon icon={faHeart} className="ms-2" style={{ color: "red", fontSize: "18px" }} />
                                    <span className="badge bg-warning text-black ms-2">{store.favorites.length}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">
                                    {store.favorites.length > 0 ? (
                                        store.favorites.map((fav, index) => (
                                            <li key={index} className="d-flex justify-content-between align-items-center px-3 py-1" onClick={(e) => e.stopPropagation()}>
                                                <span className="text-warning" style={{ fontSize: "14px" }}>{fav}</span>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="text-danger ms-3"
                                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        dispatch({ type: "delete_favorite", payload: fav });
                                                    }}
                                                />
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-center text-secondary p-2" style={{ fontSize: "12px" }}>Empty Galaxy</li>
                                    )}
                                </ul>
                            </li>
                        </ul> 
                    </div> 
                </div> 
            </nav>
        </div>
    );
};