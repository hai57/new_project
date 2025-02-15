import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk"; // no changes here 😀
import { rootReducer } from "./reducers/rootReducer";

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
