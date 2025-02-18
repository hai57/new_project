import { LoadingAction } from "../actions/applicationAction";

export interface ApplicationState {
    isLoading: boolean;
}

const initialState = {
    isLoading: false,
};

export const applicationReducer = (state: ApplicationState = initialState, action: LoadingAction) => {
    return action.type === "SHOW";
};
