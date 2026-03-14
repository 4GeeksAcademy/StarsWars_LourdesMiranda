export const initialStore = () => {
  return {
    people: [],
    planets: [],
    vehicles: [],
    films: [],
    favorites: [],
    detailCache: {
      people: {},
      planets: {},
      vehicles: {}
    }
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_people':
      return { ...store, people: action.payload };
    case 'set_vehicles':
      return { ...store, vehicles: action.payload };
    case 'set_planets':
      return { ...store, planets: action.payload };
    case 'set_films':
      return { ...store, films: action.payload };
    case "add_favorite": {
      const { uid, name, type } = action.payload;
      const exists = store.favorites.some(fav => fav.uid === uid && fav.type === type);
      if (exists) return store;
      return { ...store, favorites: [...store.favorites, { uid, name, type }] };
    }
    case 'delete_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type))
      };
    case "set_detail":
      return {
        ...store,
        detailCache: {
          ...store.detailCache,
          [action.payload.type]: {
            ...store.detailCache[action.payload.type],
            [action.payload.uid]: action.payload.data
          }
        }
      };
    default:
      return store;
  }
}