import { combineReducers } from "redux";

const dummyReducer = (state = {}, action: any) => {
  return state;
};

export const rootReducer = combineReducers({
  dummy: dummyReducer
});

export type RootState = ReturnType<typeof rootReducer>;
