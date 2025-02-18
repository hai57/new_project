import { AuthenticateAction } from "../actions/AuthenticateAction";

export interface UserInfo {
    userName: string;
    avatar: string;
    type?: "LOCAL_ADMIN" | "SSO_USER";
}
export interface AuthenticateState {
    isAuthenticated: boolean;
    userInfo: UserInfo;
}

const initialState = {
    isAuthenticated: false,
    userInfo: {
        userName: "",
        avatar: "",
    },
};

export const authenticateReducer = (state: AuthenticateState = initialState, action: AuthenticateAction) => {
    if (action.type === "LOGIN") {
        state = { isAuthenticated: true, userInfo: action.userInfo };
    } else {
        state = { ...state };
    }
    return state;
};
