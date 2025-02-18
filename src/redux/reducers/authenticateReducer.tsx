import { AuthenticateAction } from "../actions/AuthenticateAction";
export interface Site {
    id: number;
    name: string;
    code: string;
}
export interface Organization {
    //id: number;
    name: string;
    code: string;
    siteCode: string;
}
export interface UserInfo {
    userName: string;
    fullName: string;
    avatar: string;
    type?: "LOCAL_ADMIN" | "SSO_USER";
}
export interface AuthenticateState {
    isAuthenticated: boolean | null;
    userInfo?: UserInfo;
}

const initialState = {
    isAuthenticated: null,
    userInfo: {
        userName: "",
        avatar: "",
        fullName: "",
    },
};

export const authenticateReducer = (state: AuthenticateState = initialState, action: AuthenticateAction) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, isAuthenticated: true, userInfo: action.userInfo };
        case "LOGOUT":
            // localStorage.clear();
            return { ...state, isAuthenticated: false, userInfo: undefined };
        case "AUTHENTICATION_FAIL":
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};
