import { UserInfo } from "../reducers/authenticateReducer";

export type AuthenticateAction = {
    type: "LOGIN" | "LOGOUT";
    userInfo: UserInfo;
};

export const doLogin = (userInfo: UserInfo): AuthenticateAction => {
    return {
        type: "LOGIN",
        userInfo: userInfo,
    };
};
export const doLogout = (): AuthenticateAction => ({
    type: "LOGOUT",
    userInfo: {
        userName: "",
        avatar: "",
    },
});
