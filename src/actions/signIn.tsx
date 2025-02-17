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

import { CONFIG, ENDPOINT } from "../config";
import { decodeIdToken, initAuthenticatedSession } from "./session";
/**
 * Sends an authorization request.
 */
export const sendAuthorizationRequest = () => {
    let authorizeRequest = `${CONFIG.AUTHORIZE_ENDPOINT}?response_type=${CONFIG.RESPONSE_TYPE}&scope=${CONFIG.SCOPE}&redirect_uri=${CONFIG.REDIRECT_URI}&client_id=${CONFIG.CLIENT_ID}`;
    window.location.href = authorizeRequest;
};

/**
 * Sends a token request.
 *
 * @param code Authorization code
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const sendTokenRequest = (code: string) => {
    // const body = [];
    // body.push(`client_id=${CONFIG.CLIENT_ID}`);
    // body.push(`client_secret=${CONFIG.CLIENT_SECRET}`);
    // body.push(`code=${code}`);
    // body.push(`grant_type=${CONFIG.GRANT_TYPE}`);
    // body.push(`redirect_uri=${CONFIG.REDIRECT_URI}`);

    // return axios
    //     .post(`${ENDPOINT.TOKEN_ENDPOINT}`, body.join("&"), getTokenRequestHeaders())
    //     .then((response: any) => {
    //         if (response.status !== 200) {
    //             return Promise.reject(new Error("Invalid status code received in the token response: " + response.status));
    //         }
    //         // Store the response in the session storage
    //         initAuthenticatedSession(response.data.data);
    //         return [response.data.data, decodeIdToken(response.data.data.id_token)];
    //     })
    //     .catch((error: any) => {
    //         return Promise.reject(error);
    //     });
};

/**
 * Sends a token request.
 *
 * @param code Authorization code
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const getUserinfo = (): Promise<any> => {
    // var accessToken = localStorage.getItem("ACCESS_TOKEN");
    // return axios
    //     .get(`${ENDPOINT.USER_INFO_ENDPOINT}`, getUserInfoBearTokenHeader(accessToken ? accessToken : ""))
    //     .then((response: any) => {
    //         if (response.status !== 200) {
    //             return Promise.reject(new Error("Invalid status code received in the token response: " + response.status));
    //         }
    //         // Store the response in the session storage
    //         return response.data.data;
    //     })
    //     .catch((error: any) => {
    //         return Promise.reject(error);
    //     });
    return Promise.reject("error");
};

/**
 * Helper to set request headers.
 *
 * @return {{headers: {Accept: string, "Access-Control-Allow-Origin": string, "Content-Type": string}}}
 */
const getTokenRequestHeaders = () => {
    return {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
};

const getUserInfoBearTokenHeader = (accessToken: string) => {
    return {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
        },
    };
};
