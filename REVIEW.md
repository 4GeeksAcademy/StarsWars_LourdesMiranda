# 📝 Revisión del proyecto: Starwars Blog Reading List

## ✅ Aspectos Positivos

1. **Identidad visual clara**: El proyecto ya tenía una dirección visual reconocible de Star Wars, con branding, fondo temático y una navegación entendible.

2. **Uso real de estado global**: Ya existían `store.js` y `useGlobalReducer.jsx`, y los favoritos se estaban resolviendo con `dispatch`, que era una buena base para crecer.

3. **Consumo de SWAPI real**: La app ya cargaba datos desde la API y mostraba varias categorías, así que la funcionalidad principal estaba encaminada.

4. **Actualizaciones inmutables en favoritos**: La lógica original de añadir y eliminar favoritos evitaba mutar el estado directamente.

---

## 🔍 Áreas de Mejora

### 1. Centralizar SWAPI en una capa de servicios

En el estado original, las peticiones HTTP estaban repetidas en `Home.jsx`, `Character.jsx`, `Films.jsx`, `Vehicles.jsx` y `Planets.jsx`. Eso hacía difícil mantener la app y rompía el criterio de arquitectura de la rúbrica.

**Código actual:**

```jsx
const getPeople = async () => {
  const response = await fetch(`${BASE_URL}people`);
  const data = await response.json();

  dispatch({
    type: "set_people",
    payload: data.results
  });
};

useEffect(() => {
  getPeople();
  getFilms();
  getVehicles();
  getPlanets();
}, []);
```

**Código mejorado:**

```jsx
export const loadCatalog = async (
  dispatch,
  { hasLoaded = false, forceReload = false } = {}
) => {
  if (hasLoaded && !forceReload) return;

  dispatch({ type: ACTION_TYPES.loadCatalogStart });

  try {
    const catalog = await fetchCatalog();
    dispatch({
      type: ACTION_TYPES.loadCatalogSuccess,
      payload: catalog
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.loadCatalogError,
      payload: error.message || "Unable to load the Star Wars catalog."
    });
  }
};
```

**¿Por qué es mejor?**

- El HTTP vive fuera de las pages, como pide la rúbrica.
- Se evita duplicación de lógica entre varias pantallas.
- El `store` queda como fuente única de verdad.
- Añadir `loading`, `error` y `retry` resulta mucho más simple.

### 2. Hacer que el detalle use la ruta correcta y el store global

El detalle original usaba `/single/:type/:theId` y resolvía la información con estado local dentro de `Single.jsx`. Eso dejaba fuera el caché global y no seguía la ruta pedida por la solución.

**Código actual:**

```jsx
const { type, theId } = useParams();
const [item, setItem] = useState(null);

const getDetails = async () => {
  const response = await fetch(`https://www.swapi.tech/api/${type}/${theId}`);
  const data = await response.json();
  setItem(data.result.properties);
};
```

**Código mejorado:**

```jsx
const cachedDetail = isSupportedType(type)
  ? store.detailCache[type][safeUid]
  : null;

useEffect(() => {
  if (!isSupportedType(type)) return;

  loadDetail(dispatch, {
    type,
    uid: safeUid,
    cachedDetail
  });
}, [cachedDetail, dispatch, safeUid, type]);
```

**¿Por qué es mejor?**

- La app usa la ruta pedida por la rúbrica: `/:type/:uid`.
- El detalle reutiliza caché antes de volver a pedir datos.
- La UI puede mostrar `loading`, error y `retry` sin repetir lógica.
- Las rutas inválidas ya no rompen la experiencia.

### 3. Guardar favoritos con contexto útil

En el estado original, favoritos guardaba solo el nombre del recurso. Eso impedía enlazarlo bien desde el dropdown y hacía más frágil la eliminación cuando dos recursos compartiesen el mismo texto.

**Código actual:**

```jsx
case "add_favorite":
  return {
    ...store,
    favorites: [...store.favorites, action.payload]
  };
```

**Código mejorado:**

```jsx
const favorite = {
  uid: String(action.payload.uid),
  type: action.payload.type,
  name: action.payload.name
};

const exists = store.favorites.some(
  (item) => item.uid === favorite.uid && item.type === favorite.type
);
```

**¿Por qué es mejor?**

- Cada favorito queda asociado a un recurso real.
- El dropdown puede enlazar al detalle correcto.
- Se evitan colisiones por nombres repetidos.
- El patrón es reutilizable en proyectos futuros con listas guardadas.

---

## 🎯 Patrones y Anti-patrones Identificados

### Patrones Positivos Encontrados ✅

#### 1. Reducer puro

**Tipo:** Patrón ✅

**Dónde aparece:**
- `src/store.js`

**Descripción:** El reducer original transformaba el estado sin hacer `fetch` ni mutaciones directas.

**¿Por qué es importante?**

- Facilita depuración.
- Hace el flujo de datos más predecible.
- Mantiene separado el estado global de los efectos secundarios.

#### 2. Actualizaciones inmutables

**Tipo:** Patrón ✅

**Dónde aparece:**
- `src/store.js`

**Descripción:** El borrado de favoritos ya se resolvía con `filter`, evitando mutar el array original.

**¿Por qué es importante?**

- Respeta el flujo esperado por React.
- Evita bugs difíciles de rastrear.
- Mantiene consistencia con `useReducer`.

### Anti-patrones a Mejorar ❌

#### 1. Fetch mezclado con UI y duplicado

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/pages/Home.jsx`
- `src/pages/Character.jsx`
- `src/pages/Films.jsx`
- `src/pages/Vehicles.jsx`
- `src/pages/Planets.jsx`

**Descripción:** La misma lógica de carga se repetía en varias páginas.

**Alternativa aplicada:**

```jsx
// src/services/swapi.js
export const loadCatalog = async (dispatch, options) => {
  // ...
};
```

**Conceptos relacionados:**

- DRY
- Separación de responsabilidades
- Capa de servicios

#### 2. Detalle fuera del store global

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/pages/Single.jsx`

**Descripción:** El detalle usaba `useState` local y no aprovechaba el store ni el caché.

**Alternativa aplicada:**

```jsx
loadDetail(dispatch, {
  type,
  uid: safeUid,
  cachedDetail
});
```

**Conceptos relacionados:**

- Cache
- Estado global
- Rutas dinámicas

#### 3. Archivos legacy y estructura poco consistente

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/pages/Card.jsx`
- `src/pages/Character.jsx`
- `src/pages/Films.jsx`
- `src/pages/Vehicles.jsx`
- `src/pages/Planets.jsx`
- `eslint.cjs`

**Descripción:** Había archivos que mezclaban responsabilidades o ya no aportaban una estructura mantenible.

**Alternativa aplicada:**

```jsx
src/components/Card.jsx
src/pages/CollectionPage.jsx
src/pages/Detail.jsx
src/services/swapi.js
.eslintrc.cjs
```

**Conceptos relacionados:**

- Organización de carpetas
- Componentes reutilizables
- Mantenibilidad

---

## 📊 Evaluación Detallada

### Criterios de Evaluación (Total: 62/100)

| Criterio | Puntos | Obtenido | Comentario |
|----------|--------|----------|------------|
| **Funcionalidad Básica** | 30 | 20 | La home cargaba categorías reales y el detalle existía, pero la ruta no seguía la convención pedida y faltaban errores/retry claros |
| **Código Limpio** | 20 | 12 | Buena base visual y naming razonable, pero había duplicación, archivos legacy y tooling sin cerrar |
| **Estructura** | 15 | 9 | `store.js` era puro y `useGlobalReducer` existía, pero faltaba separar SWAPI en servicios |
| **Buenas Prácticas** | 15 | 8 | Había `dispatch` e inmutabilidad, pero sin caché, sin defensa suficiente y con fetch repartido por la UI |
| **HTML/CSS** | 10 | 8 | La experiencia visual estaba bien enfocada, aunque había typos CSS y algunos estilos globales demasiado agresivos |
| **UX/Animaciones** | 10 | 5 | Buenos favoritos visuales y ambientación, pero faltaban retry y fallbacks consistentes |
| **TOTAL** | **100** | **62** | **NECESITA MEJORA** |

### Desglose de Puntos Perdidos (-38 puntos)

1. **-6 puntos** - Las peticiones a SWAPI estaban duplicadas en varias pages y no existía una capa de servicios reutilizable.
2. **-5 puntos** - La ruta de detalle no seguía `/:type/:uid` y el detalle se resolvía fuera del store global.
3. **-4 puntos** - No había un flujo claro de `retry` para errores de carga en el catálogo.
4. **-4 puntos** - Favoritos guardaba strings sueltos en lugar de objetos con `uid`, `type` y `name`.
5. **-4 puntos** - La estructura mezclaba responsabilidades con `Card.jsx` dentro de `pages` y varias pantallas casi idénticas.
6. **-3 puntos** - `ScrollToTop` no recibía `location`, así que el comportamiento esperado no estaba realmente activo.
7. **-3 puntos** - El lint no funcionaba porque la configuración estaba en `eslint.cjs` en vez de `.eslintrc.cjs`.
8. **-3 puntos** - Había typos CSS (`heigth`, `margin-rigth`) y reglas globales que podían afectar Bootstrap más de la cuenta.
9. **-3 puntos** - El detalle no protegía bien rutas inválidas ni recursos ausentes antes de hacer la carga.
10. **-3 puntos** - Las acciones y flujos asíncronos no estaban centralizados, lo que dificultaba escalar el proyecto.

### Cómo Llegar a 100/100

Aplicando las correcciones de este PR:

- ✅ +6 puntos - Se movió todo SWAPI a `src/services/swapi.js`.
- ✅ +5 puntos - Se rehizo el detalle sobre `/:type/:uid` y se mantuvo además compatibilidad con `/single/:type/:uid`.
- ✅ +4 puntos - Se añadió manejo de error con `retry` tanto en catálogo como en detalle.
- ✅ +4 puntos - Favoritos ahora guarda objetos completos y puede enlazar al recurso correcto.
- ✅ +4 puntos - Se limpiaron archivos duplicados y `Card` pasó a `src/components`.
- ✅ +3 puntos - `ScrollToTop` ahora usa `useLocation` y funciona en cada cambio de ruta.
- ✅ +3 puntos - Se corrigió el nombre del archivo de ESLint y `npm run lint` ya pasa.
- ✅ +3 puntos - Se corrigieron los problemas CSS y se consolidó un layout más estable.
- ✅ +3 puntos - El detalle ahora protege tipos inválidos, recursos ausentes e imágenes rotas.
- ✅ +3 puntos - Las acciones quedaron centralizadas y el store mantiene caché de detalle.

**= 100/100** 🎉

---

## 📊 Resumen

| Aspecto | Estado |
|---------|--------|
| Funcionalidad principal | ✅ Encaminada |
| Arquitectura global | ⚠️ Necesitaba refactor |
| Gestión de estado | ✅ Buena base |
| Capa de servicios | ⚠️ Ausente en el original |
| UX de error y retry | ⚠️ Incompleta |
| Estilo visual | ✅ Bien resuelto |

**Nota final**: Había una base visual atractiva y varios conceptos bien orientados. El salto importante aquí no era “hacer que funcione”, sino ordenar la arquitectura para que el proyecto quedara alineado con la solución y con el patrón correcto de React + reducer global. Con este PR, el proyecto queda como una referencia mucho más sólida para futuros ejercicios.
