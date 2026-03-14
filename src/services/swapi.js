const BASE_URL = "https://www.swapi.tech/api/";

const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`Error en la galaxia: ${response.statusText}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo en la comunicación:", error);
        throw error;
    }
};

export const loadCatalog = async (dispatch) => {
    try {
        const [people, planets, vehicles] = await Promise.all([
            fetchData("people"),
            fetchData("planets"),
            fetchData("vehicles")
        ]);

        dispatch({ type: "set_people", payload: people.results });
        dispatch({ type: "set_planets", payload: planets.results });
        dispatch({ type: "set_vehicles", payload: vehicles.results });

    } catch (error) {
        console.error("No se pudo cargar el catálogo completo");
    }
};

export const loadDetail = async (dispatch, type, uid, cachedDetail) => {
    if (cachedDetail) return;

    try {
        const data = await fetchData(`${type}/${uid}`);
        dispatch({
            type: "set_detail",
            payload: {
                type: type,
                uid: uid,
                data: data.result.properties
            }
        });
    } catch (error) {
        console.error(`Error cargando detalle de ${type}`);
    }
};