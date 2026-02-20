import React from "react";

const Card = (props) => {
    return (
        <div>
            <div className="card h-100">
                <img src={props.imageUrl} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
                <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary">Ver más</a>
                </div>
            </div>
        </div>
    );
};

export default Card;