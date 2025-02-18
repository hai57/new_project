import { UserInfo } from "../reducers/authenticateReducer";

export interface AuthenticateAction {
    type: "LOGIN" | "LOGOUT" | "AUTHENTICATION_FAIL";
    userInfo?: UserInfo;
}

export const doLogin = (userInfo: UserInfo): AuthenticateAction => {
    return {
        type: "LOGIN",
        userInfo,
    };
};

export const doLogout = (): AuthenticateAction => ({
    type: "LOGOUT",
    userInfo: {
        userName: "",
        avatar: "",
        fullName: "",
        type: "LOCAL_ADMIN",
    },
});

export const failAuthen = (): AuthenticateAction => ({
    type: "AUTHENTICATION_FAIL",
});
