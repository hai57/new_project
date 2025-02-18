/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// import { UserManagementService } from "../apis/userMgt/userManagementService";

/**
 * Initialize authenticated user session.\
 */
export const initAuthenticatedSession = (data: any) => {
    // setCookie("ACCESS_TOKEN", data.access_token);
    // setCookie("REFRESH_TOKEN", data.refresh_token);
    // setCookie("SCOPE", data.scope);
    // setCookie("ID_TOKEN", data.id_token);
    // setCookie("TOKEN_TYPE", data.token_type);
    // setCookie("EXPIRES_IN", data.expires_in);
};

/**
 * Get session parameter from cookie storage.
 *
 * @param key
 * @return {string}
 */
export const getSessionParameter = (key: string) => {
    return localStorage.getItem(key);
};

/**
 * Reset authenticated session.
 */
export const resetAuthenticatedSession = () => {

};

/**
 * Returns whether session is valid.
 *
 * @return {boolean}
 */
export const isValidSession = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return !!token;
};

export const invalidLocalSessionAdmin = async () => {
    let result = false;
    const sessionId = localStorage.getItem("ADMIN_SSID");
    if (sessionId) {
        // let userSevice = new UserManagementService();
        // await userSevice.validateSession(sessionId).then((p) => {
        //     result = p;
        // });
    }
    return result;
};
/**
 * Get all session parameters.
 *
 * @returns {{}}
 */
export const getAllSessionParameters = () => {
    const session: any = {};

    session["ACCESS_TOKEN"] = localStorage.getItem("ACCESS_TOKEN");
    session["REFRESH_TOKEN"] = localStorage.getItem("REFRESH_TOKEN");
    session["SCOPE"] = localStorage.getItem("SCOPE");
    session["ID_TOKEN"] = localStorage.getItem("ID_TOKEN");
    session["TOKEN_TYPE"] = localStorage.getItem("TOKEN_TYPE");
    session["EXPIRES_IN"] = localStorage.getItem("EXPIRES_IN");

    return session;
};

/**
 * Base64 decodes the ID token
 *
 * @param token id token
 * @return {any}
 */
export const decodeIdToken = (token: string) => {
    return JSON.parse(atob(token.split(".")[1]));
};
