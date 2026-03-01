export const initialStore = () => {
  return {
    message: null,
    people: [],
    films: [],
    planets: [],
    vehicles: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_people':
      return {
        ...store,
        people: action.payload 
      };

    case 'set_films':
      return {
        ...store,
        films: action.payload
      };

    case 'set_vehicles':
      return {
        ...store,
        vehicles: action.payload
      };

    case 'set_planets':
      return {
        ...store,
        planets: action.payload
      };

    case 'add_favorite':
      if (store.favorites.includes(action.payload)) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'delete_favorite':
      return {
        ...store,
        favorites: store.favorites.filter((fav) => fav !== action.payload)
      };
    default:
      console.warn('Unknown action:', action.type);
      return store;
  }
}
