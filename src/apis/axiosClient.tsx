import axios from "axios";
import { getOrgsDefault, getSiteDefault, getToken, getUserType } from "helpers/localStorage";
import { doLogout } from "redux/actions/AuthenticateAction";
import { store } from "redux/store";
import APP_CONFIG from '../../app.config.json';
import NewLogin from "pages/login/newLogin";
const AXIOS_INSTANCE = axios.create({
    baseURL: APP_CONFIG['REACT_APP_ENDPOINT_API'],
    timeout: 10000 * 120,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "vi;",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Expose-Headers": "csrf-token,csrf-session",
    },
});
//Dùng hàm có sử dụng DIPFILE
export const URL_UPLOAD_FILE = `${AXIOS_INSTANCE.defaults.baseURL}/file-mgt-service/common-ud-file/upload-file`;
export const URL_UPLOAD_FILE_DIP = `${AXIOS_INSTANCE.defaults.baseURL}/file-mgt-service/common-ud-file/upload-file`;
export const GOOGLE_MAP_API_KEY = "";
export const URL_FORTUNA = APP_CONFIG['REACT_APP_ENDPOINT_API'];
export const URL_EFORM = APP_CONFIG['REACT_APP_ENDPOINT_API'];
export const URL_EFORM_MANAGEMENT = APP_CONFIG['REACT_APP_ENDPOINT_API'] + "/quan-ly-danh-sach-dieu-kien";

AXIOS_INSTANCE.interceptors.request.use(
    (config) => {
        const TOKEN = getToken();
        if (TOKEN) {
            config.headers.Authorization = `Bearer ${TOKEN}`;
        }
        const clent_type = localStorage.getItem("CLIENT_TYPE");
        config.headers.maHeThong = getSiteDefault();
        config.headers.userType = getUserType();
        if ((clent_type && clent_type != "WEB") || (config.headers.clientType && config.headers.clientType != "WEB")) {
            config.headers.clientType == "APP";
        } else {
            config.headers.clientType = "WEB";
        }
        config.headers.orgCode = getOrgsDefault();
        (config as any).meta = (config as any).meta || {};
        (config as any).meta.requestStartedAt = new Date().getTime();
        if (localStorage.getItem("csrf-token") && localStorage.getItem("csrf-session")) {
            config.headers["csrf-token"] = localStorage.getItem("csrf-token");
            config.headers["csrf-session"] = localStorage.getItem("csrf-session");
        }
        return config;
    },
    (error) => {
        console.log("AXIOS_INSTANCE.interceptors.request ", error);
    }
);

AXIOS_INSTANCE.interceptors.response.use(
    (response) => {
        (response.config as any).meta = `${new Date().getTime() - (response.config as any).meta.requestStartedAt} ms`;
        if (response.headers["csrf-token"] && response.headers["csrf-session"]) {
            localStorage.setItem("csrf-token", response.headers["csrf-token"]);
            localStorage.setItem("csrf-session", response.headers["csrf-session"]);
        }
        return response;
    },
    (error) => {
        console.log("error ", error);
        if (error && error.response && error.response.status) {
            if (error.response.status === 401 || error.response.status === 403) {
               store.dispatch(doLogout());
               localStorage.clear();
               window.location.href = `${NewLogin.displayName}`;
            } else {
                if (!error.response) {
                    return Promise.reject({ message: "Server không thể thực hiện" });
                } else {
                    return error.response;
                }
            }
        } else {
            return Promise.reject({ message: "Server không thể thực hiện" });
        }
    }
);

export default AXIOS_INSTANCE;
