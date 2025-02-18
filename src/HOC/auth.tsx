/* eslint-disable react-refresh/only-export-components */
import { RootState } from "apis/redux/reducers/rootReducer";
import { setKeyC_Data } from "helpers/localStorage";
import React from "react";
import { doLogout } from "redux/actions/AuthenticateAction";
import { connect } from "react-redux";
import { doLogin, failAuthen } from "redux/actions/AuthenticateAction";
import { UserInfo } from "redux/reducers/authenticateReducer";
import StringUtil from "utils/stringUtils";
import { LogDTO } from "models/user";
import { SaveLogService } from "apis/saveLog/saveLogService";
import { dispatchClearSessionChatBot, dispatchLogoutLocalAdmin } from "actions/signOut";
import { store } from "redux/store";
// import { LOAD_CHAT_BOT } from "constants/function";
export interface AuthProps {
    Component: any;
    reload?: boolean;
    originalPath?: string;
    siteCode?: string;
}

let timeOut: number;

export default function ({ Component }: AuthProps) {
    class AuthenticationCheck extends React.Component<any, any> {
        state = { loading: true, token: "" };

        componentDidMount() {
            const contextPath = window.location.href.slice(window.location.href.indexOf("?q"));
            const urlParams: any = new URLSearchParams(contextPath);

            if (urlParams) {
                const encodeBody = urlParams.get("q");
                if (encodeBody) {
                    const encodeBodyParse = JSON.parse(encodeBody.replaceAll("\\", ""));
                    let action: string;
                    let param: { maHeThong: any; };
                    if (encodeBodyParse) {
                        action = encodeBodyParse.action;
                        if (!StringUtil.isNullOrEmty(encodeBodyParse.param)) {
                            param = encodeBodyParse.param;
                        }
                    }

                    if (action && action === "dang-xuat") {
                        localStorage.setItem("q", JSON.stringify(encodeBodyParse));
                        // localStorage.setItem("isAction", ACTION_CHATBOT.DANG_XUAT.toString());
                    }

                    if (action && action === "dong-tro-ly-ao") {
                        localStorage.setItem("q", JSON.stringify(encodeBodyParse));
                        // localStorage.setItem("isAction", ACTION_CHATBOT.DONG_TRO_LY_AO.toString());
                    }
                    if (action && action === "thu-hoi-tai-nguyen") {
                        localStorage.setItem("q", JSON.stringify(encodeBodyParse));
                        // localStorage.setItem("isAction", ACTION_CHATBOT.THU_HOI_TAI_NGUYEN.toString());
                    }

                    if (action && action === "chuyen-trang") {
                        localStorage.setItem("q", JSON.stringify(encodeBodyParse));
                        // localStorage.setItem("isAction", ACTION_CHATBOT.CHUYEN_TRANG.toString());
                        if (param.maHeThong && !StringUtil.isNullOrEmty(param.maHeThong)) {
                            setKeyC_Data("siteDefault", param.maHeThong);
                            switch (param.maHeThong) {
                                case "TTKTXH":
                                    localStorage.setItem("SITE_SELECTED", "Trung tâm kinh tế xã hội");
                                    break;
                                case "CDS":
                                    localStorage.setItem("SITE_SELECTED", "Công dân số");
                                    break;
                                case "KPDL":
                                    localStorage.setItem("SITE_SELECTED", "Khai phá dữ liệu");
                                    break;
                            }
                        }
                    }
                }
            }
            this.checkAuthenticate();

            // const { isAuthenticated, userInfo } = this.props;
            this.setState({ loading: false });
            // if (timeOut) {
            //     clearInterval(timeOut);
            // }

            timeOut = setInterval(() => {
                const value = localStorage.getItem("q");
                let action: string;
                let param: { urlSiteCode?: any; subParameters?: any; keyRouter?: any; };
                let domain = window.location.protocol + "//" + window.location.host;
                if (value) {
                    const valueParse = JSON.parse(value);
                    action = valueParse.action;
                    param = valueParse.param;

                    if (action && action === "dang-xuat") {
                        this.logOut();
                        // window.location.href = window.location.href;
                        // logout();
                        localStorage.setItem("q", "");
                    }

                    if (action && action === "dong-tro-ly-ao") {
                        // let element: HTMLElement = document.getElementsByClassName("fpt_ai_livechat_container_header_close_button")[0] as HTMLElement;
                        const chatBotContainer = document.getElementById("fpt_ai_livechat_display_container");
                        // if (element) {
                        //     element.click();
                        // }
                        if (chatBotContainer) {
                            chatBotContainer.setAttribute("style", "display:none;");
                        }
                        localStorage.setItem("q", "");
                    }
                    if (action && action === "thu-hoi-tai-nguyen") {
                        // let element: HTMLElement = document.getElementsByClassName("fpt_ai_livechat_container_header_close_button")[0] as HTMLElement;
                        const chatBotContainer = document.getElementById("fpt_ai_livechat_display_container");
                        // if (element) {
                        //     element.click();
                        // }
                        if (chatBotContainer) {
                            chatBotContainer.setAttribute("style", "display:none;");
                        }
                        // LOAD_CHAT_BOT();
                        localStorage.setItem("q", "");
                    }

                    if (action && action === "chuyen-trang") {
                        if (param && Object.keys(param).length !== 0) {
                            if (param.urlSiteCode) {
                                if (param.subParameters && Object.keys(param.subParameters).length > 0) {
                                    if (param.keyRouter === "DSYCGS") {
                                        window.location.href =
                                            domain +
                                            param.urlSiteCode +
                                            "?maDichVu=" +
                                            param.subParameters.maDichVu +
                                            "&noiDung=" +
                                            param.subParameters.noiDung +
                                            "&maTinhTrang=" +
                                            param.subParameters.maTinhTrang +
                                            "&isAI=" +
                                            param.subParameters.isAI +
                                            "&id=" +
                                            param.subParameters.id;
                                        localStorage.setItem("q", "");
                                    }
                                    if (param.keyRouter === "DSCDDH") {
                                        window.location.href =
                                            domain +
                                            param.urlSiteCode +
                                            "?maDichVu=" +
                                            param.subParameters.maDichVu +
                                            "&noiDung=" +
                                            param.subParameters.noiDung +
                                            "&tenBieuDo=" +
                                            param.subParameters.tenBieuDo +
                                            "&maBieuDo=" +
                                            param.subParameters.maBieuDo +
                                            "&tenDichVu=" +
                                            param.subParameters.tenDichVu +
                                            "&phongBanId" +
                                            param.subParameters.phongBanId +
                                            "&maNguoiNhan=" +
                                            param.subParameters.maNguoiNhan +
                                            "&maTinhTrang=" +
                                            param.subParameters.maTinhTrang +
                                            "&lastModifiedDate=" +
                                            param.subParameters.lastModifiedDate +
                                            "&lastModifiedBy=" +
                                            param.subParameters.lastModifiedBy +
                                            "&nguoiGuiId=" +
                                            param.subParameters.nguoiGuiId +
                                            "&id=" +
                                            param.subParameters.id;
                                        localStorage.setItem("q", "");
                                    }
                                    if (param.keyRouter === "DSPAKN") {
                                        window.location.href =
                                            domain +
                                            param.urlSiteCode +
                                            "?maDichVu=" +
                                            param.subParameters.maDichVu +
                                            "&noiDungPhanAnh=" +
                                            param.subParameters.noiDungPhanAnh +
                                            "&maTinhTrang=" +
                                            param.subParameters.maTinhTrang +
                                            "&id=" +
                                            param.subParameters.id +
                                            "&siteCode=" +
                                            param.subParameters.siteCode +
                                            "&tenBieuDo=" +
                                            param.subParameters.tenBieuDo +
                                            "&tenDichVu=" +
                                            param.subParameters.tenDichVu +
                                            "&tenTieuDe" +
                                            param.subParameters.tenTieuDe +
                                            "&tenTinhTrang=" +
                                            param.subParameters.tenTinhTrang;
                                        localStorage.setItem("q", "");
                                    }
                                    if (param.keyRouter === "DSTQDL") {
                                        window.location.href =
                                            domain +
                                            param.urlSiteCode +
                                            "?maLinhVuc=" +
                                            param.subParameters.maLinhVuc +
                                            "&maDichVu=" +
                                            param.subParameters.maDichVu +
                                            "&loaiTrucQuan=" +
                                            param.subParameters.loaiTrucQuan +
                                            "&uuid=" +
                                            param.subParameters.uuid;
                                        localStorage.setItem("q", "");
                                    }
                                } else {
                                    window.location.href = domain + param.urlSiteCode;
                                    localStorage.setItem("q", "");
                                }
                            }
                        }
                    }
                }
            }, 1000) as unknown as number;
        }
        componentWillUnmount() {
            this.setState({ loading: false });
        }

        logOut() {
            const requestDTO: LogDTO = {
                action: "logout",
                phanHe: "QuanTriHeThong",
            };
            new SaveLogService().log(requestDTO).then();
            dispatchLogoutLocalAdmin();
            dispatchClearSessionChatBot();
            setTimeout(() => {
                store.dispatch(doLogout());
                localStorage.clear();
                window.location.href = "/authenticate";
                // history.push(`${Login.displayName}`);
            }, 30);
            localStorage.removeItem("C_USER_DATA");
        }

        async handleEditItem() {
            const id = localStorage.getItem("id_flow");
            if (id) {
                localStorage.setItem("id_flow", "");
            }
        }

        async checkAuthenticate() {
            this.handleEditItem();
        }

        render() {
            if (this.state.loading) return <div>Loading......</div>;
            return Component;
        }
    }
    function mapStateToProps(state: RootState) {
        return {
            isAuthenticated: state.authenticate.isAuthenticated,
            userInfo: state.authenticate.userInfo,
        };
    }
    const mapDispatchToProps = (dispatch: any) => {
        return {
            failAuthen: () => dispatch(failAuthen()),
            login: (payload: UserInfo) => dispatch(doLogin(payload)),
        };
    };
    return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}
