import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { dataRoot, userReducer } from "./reducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";


const persistConfig = {
  key: "root",
  storage, //controlador o libreria que se encarga de almacenar la info
  whitelist: ['userReducer'], //que elementos queremos persistir
}

const rootReducer = combineReducers({ //Contiene los reducer que necesitamos
  dataRoot,
  userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});



// const rootReducer = combineReducers({
//   reducerroot,
//   user: userReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
// });

export default store;