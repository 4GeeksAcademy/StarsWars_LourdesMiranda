import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "./Card.jsx";
import './Home.css';

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1 className="text-white home-title">Character</h1>
			<div className="container">
                <div className="row pb-5 mt-5">
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Naked Series"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="Domina las calles con la agilidad de la serie MT."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="R-World"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="ADN de competición para los amantes de la velocidad."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Sport Heritage"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="El estilo vintage se une a la potencia moderna."
                        />
                    </div>
                </div>
            </div>
			<h1 className="text-white home-title">Films</h1>
			<div className="container">
                <div className="row pb-5 mt-5">
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Naked Series"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="Domina las calles con la agilidad de la serie MT."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="R-World"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="ADN de competición para los amantes de la velocidad."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Sport Heritage"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="El estilo vintage se une a la potencia moderna."
                        />
                    </div>
                </div>
            </div>
			<h1 className="text-white home-title">Vehicles</h1>
			<div className="container">
                <div className="row pb-5 mt-5">
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Naked Series"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="Domina las calles con la agilidad de la serie MT."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="R-World"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="ADN de competición para los amantes de la velocidad."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Sport Heritage"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="El estilo vintage se une a la potencia moderna."
                        />
                    </div>
                </div>
            </div>
			<h1 className="text-white home-title">Planets</h1>
			<div className="container">
                <div className="row pb-5 mt-5">
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Naked Series"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="Domina las calles con la agilidad de la serie MT."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="R-World"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="ADN de competición para los amantes de la velocidad."
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card
                            title="Sport Heritage"
                            imageUrl="https://starwars-visualguide.com/assets/img/characters/1.jpg"
                            description="El estilo vintage se une a la potencia moderna."
                        />
                    </div>
                </div>
            </div>
		</div>
	);
}; 