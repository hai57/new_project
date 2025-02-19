import { Box, Button, Card, Checkbox, FormControlLabel, Grid2, Snackbar, Alert, Theme, alpha, InputBase, FormHelperText, Link } from "@mui/material";
import { withStyles, createStyles, makeStyles } from "@mui/styles";
import React, { Dispatch, useState } from "react";
import axios from "axios";
import { getIn, useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import AXIOS_INSTANCE from "apis/axiosClient";
import loginLogo from "assets/images/new-login-logo.png";
import leftBg from "assets/loginImages/left-background.png";
import tut1 from "assets/loginImages/tutLogin1.png";
import tut10 from "assets/loginImages/tutLogin10.png";
import tut2 from "assets/loginImages/tutLogin2.png";
import tut3 from "assets/loginImages/tutLogin3.png";
import tut4 from "assets/loginImages/tutLogin4.png";
import tut5 from "assets/loginImages/tutLogin5.png";
import tut6 from "assets/loginImages/tutLogin6.png";
import tut7 from "assets/loginImages/tutLogin7.png";
import tut8 from "assets/loginImages/tutLogin8.png";
import tut9 from "assets/loginImages/tutLogin9.png";
import { motion } from "framer-motion";
import { getToken, setKeyC_Data } from "helpers/localStorage";
import { hideLoading, LoadingAction, showLoading } from "redux/actions/applicationAction";
import { doLogin } from "redux/actions/AuthenticateAction";
import { openNotification } from "redux/actions/notificationAction";
// import { openNotification } from "apis/redux/actions/notificationAction";
import StringUtil from "utils/stringUtils";
import * as Yup from "yup";
import { THONGTINHETHONG } from "constants/constants";

export interface NewLoginProps {}

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "label + &": {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            width: "100%",
            borderRadius: 8,
            position: "relative",
            // backgroundColor: theme.palette.common.white,
            transition: "color .2s ease, background-color .2s ease",
            backgroundColor: "#f5f8fa",
            border: "1px solid #f5f8fa",
            fontSize: 16,
            padding: "10px 12px",
            // transition: theme.transitions.create(["border-color", "box-shadow"]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
            "&:focus": {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
            // Style placeholder
            "&::placeholder": {
                fontWeight: "bold",
            },
        },
    })
)(InputBase);

const useStyles = makeStyles({
    root: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        padding: "0px",
        paddingRight: "10px",
    },
    icon: {
        borderRadius: 4,
        width: 20,
        height: 20,
        boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
        backgroundColor: "#f5f8fa",
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
        "$root.Mui-focusVisible &": {
            outline: "2px auto rgba(19,124,189,.6)",
            outlineOffset: 2,
        },
        "input:hover ~ &": {
            backgroundColor: "##E8E8E8",
        },
        "input:disabled ~ &": {
            boxShadow: "none",
            background: "rgba(206,217,224,.5)",
        },
    },
    checkedIcon: {
        backgroundColor: "#207DC3",
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
        "&:before": {
            display: "block",
            width: 20,
            height: 20,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        "input:hover ~ &": {
            backgroundColor: "#207DC3",
        },
    },
});

const NewLogin: React.FC<NewLoginProps> = ({}) => {
    const classes = useStyles();

    const title = "Đăng nhập";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertError, setAlertError] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(90);

    const [logoConfig, setLogoConfig] = React.useState<string>();
    const [emailConfig, setEmailConfig] = useState("");
    const [phoneConfig, setPhoneConfig] = useState("");
    const [headerConfig, setHeaderConfig] = useState("");
    const [footerConfig, setFooterConfig] = useState("");
    const [tenDonViConfig, setTenDonViConfig] = useState("");
    const [tenHeThongConfig, setTenHeThongConfig] = useState("");
    const [isError, setIsError] = useState(false);
    const [type, setType] = useState("PASSWORD"); // Tracks the authentication type

    const initialValues: any = {
        screenOptions: 0, // 0: Đăng nhập, 1: Quên mật khẩu, 2: Nhập mã xác nhận, 3: Nhập mật khẩu mới
        email: "",
        newPassword: "",
        newPasswordConfirm: "",
        recoveryCode: "",
        password: "",
        rememberMe: false,
    };
    React.useEffect(() => {
        // LOAD_CHAT_BOT();
    }, []);
    const validationSchema = Yup.object().shape({
        screenOptions: Yup.number(),

        email: Yup.string().when('screenOptions', {
          is: 1, // alternatively: (val) => val == 1
          then: (schema) => schema
            .required('Vui lòng nhập email...!')
            .matches(
              /(84|0)+([0-9]{9})\b|(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              'Định dạng email không đúng...!'
            ),
          otherwise: (schema) => schema.notRequired(),
        }),

        recoveryCode: Yup.string().when('screenOptions', {
          is: 2, // alternatively: (val) => val == 2
          then: (schema) => schema
            .required('Vui lòng nhập mã xác nhận...!')
            .matches(/^([0-9]{6})$/, 'Mã xác nhận bao gồm 6 kí tự...!'),
          otherwise: (schema) => schema.notRequired(),
        }),

        newPassword: Yup.string().when('screenOptions', {
          is: 3, // alternatively: (val) => val == 3
          then: (schema) => schema
            .required('Mật khẩu mới bắt buộc nhập...!')
            .min(8, 'Mật khẩu phải có độ dài lớn hơn 8 kí tự...!')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/,
              'Mật khẩu mới phải có chữ in thường, in hoa, chữ số và ký tự đặc biệt...!'
            ),
          otherwise: (schema) => schema.notRequired(),
        }),

        newPasswordConfirm: Yup.string().when(['screenOptions', 'newPassword'], {
          is: (screenOptions, newPassword) => screenOptions === 3 && newPassword,
          then: (schema) => schema
            .required('Vui lòng xác nhận mật khẩu mới...!')
            .test('passwords-match', 'Mật khẩu không trùng khớp...!', function(value) {
              return this.parent.newPassword === value;
            }),
          otherwise: (schema) => schema.notRequired(),
        }),
      });

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => handleSubmit(values),
        validationSchema,
        validateOnChange: false,
    });

    React.useEffect(() => {
        if (formik.values.screenOptions === 2 && seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        }
        if (formik.values.screenOptions === 0) {
            formik.setFieldValue("email", "");
            formik.setFieldValue("recoveryCode", "");
        }
    }, [formik.values.screenOptions, seconds]);

    React.useEffect(() => {
        document.title = title.toLowerCase().charAt(0).toUpperCase() + title.toLowerCase().slice(1);
        const message = location?.state?.message;
        if (message) {
            setAlertSuccess(true);
            setMessageSuccess(message);
        }
        const userName = location?.state?.userName;
        if (userName) {
            setUsername(userName);
            setPassword("");
        }
    }, []);

    React.useEffect(() => {
        const temp =localStorage.getItem("rememberMe");
        const tempToken = localStorage.getItem("rmmt");

        localStorage.clear();
        if (temp === null || temp === "null" || temp === undefined) {
            localStorage.removeItem("rmmt");
            formik.setFieldValue("rememberMe", false);
            localStorage.setItem("rememberMe", "false");
        } else {
            localStorage.setItem("rememberMe", temp);
            formik.setFieldValue("rememberMe", JSON.parse(temp));
            if (tempToken) {
                try {
                    // Decode the token
                    const payload: { sub: string; exp: number; iat: number } = jwtDecode(tempToken);
                    setUsername(payload.sub);
                    setPassword("*********");
                    setType("TOKEN"); // Update type when username and pass not change
                } catch (error) {
                    console.error("Invalid token or decoding failed:", error);
                }
            }
            localStorage.setItem("rmmt", tempToken || ""); // Re-set token if valid
        }

        // LOAD_CHAT_BOT();
        //HienLT52 - Hàm check GetInfoNoLogin
        checkGetSystemConfiguration();
        //AXIOS_INSTANCE.get("/csrf/get");
        checkAuth();
    }, []);

    //Start HienLT52
    async function checkGetSystemConfiguration() {
        if (localStorage.getItem("initSysConfiLogo") === null) {
            await axios.get(`${AXIOS_INSTANCE.defaults.baseURL}/control-app/no-auth/system-config/find-by-site-type?siteCode=&type=SYSTEM_INFO`).then(async(response) => {
                const updatedData: any = { id: response.data.id, ...response.data.data };
                console.log("update", updatedData)
                localStorage.setItem('initSysConfiLogo', JSON.stringify(updatedData));
                setStateInfo("");
            });
        }
        //Download file
        let files = getInfoConfigAndLogo().files;
        files = files && files.find((x: { isDeleted: boolean }) => x.isDeleted != true);
        if (files) {
            const id = files?.fileEntryId;
            id && localStorage.setItem("idFileConfig", id);
            // handleDownloadFile(files);
        }
    }
    //Set state
    const setStateInfo = (base64data: string) => {
        const itemConfig = localStorage.getItem("initSysConfiLogo") !== null && localStorage.getItem("initSysConfiLogo");
        if (itemConfig) {
            let sys = JSON.parse(itemConfig);
            setHeaderConfig(sys.headerInfo ? sys.headerInfo : "");
            setFooterConfig(sys.footerInfo ? sys.footerInfo : "");
            setTenDonViConfig(sys.orgName ? sys.orgName : "");
            setTenHeThongConfig(sys.systemName ? sys.systemName : "");
            setEmailConfig(sys.email ? sys.email : "");
            setPhoneConfig(sys.phone? sys.phone : "");
        }
        if (base64data != "") {
            localStorage.setItem("SysLogoLogin", base64data);
            let lStLogo = JSON.parse(base64data);
            setLogoConfig(lStLogo);
        }
    };

    function getInfoConfigAndLogo() {
        let objectSys = localStorage.getItem("initSysConfiLogo");
        if (objectSys != null) {
            return JSON.parse(objectSys && objectSys);
        }
    }
    //End HienLT52

    async function checkAuth() {
        const token = getToken();
        if (token) {
            try {
                const payload: { sub: string; exp: number; iat: number } = await jwtDecode(token);
                const nowDate = moment(new Date());
                const expDate = moment(new Date(payload.exp * 1000));
                if (moment(nowDate).isAfter(expDate)) {
                    navigate("/authenticate");
                } else {
                    navigate("/home");
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    function handleSubmit(values: any): void | Promise<any> {
        if (formik.values.screenOptions == 1) {
            getNewRecoveryCode();
        }
        if (formik.values.screenOptions == 2) {
            checkRecoveryCode();
        }
        if (formik.values.screenOptions == 3) {
            passwordRecovery();
        }
    }

    const handleLogin = () => {
        if (StringUtil.isNullOrEmty(username) || StringUtil.isNullOrEmty(password)) {
            setMessageError("Tên đăng nhập và mật khẩu bắt buộc nhập!");
            setAlertError(true);
            return;
        }
        dispatch(showLoading());
        const temp = localStorage.getItem("rememberMe");
        const rememberMe = JSON.parse(temp);
        const tempToken = localStorage.getItem("rmmt") || "";
        // new UserService()
        //     .doAuthenticate({ userName: username, password, rememberMe, token: tempToken, type
        //     })
        //     .then((p) => {
        //         if (p.isSuccess) {

        //             const { userInfo }= p.data;
        //             localStorage.setItem("rememberMe", formik.values.rememberMe);
        //             localStorage.setItem("avatar", userInfo.avatar);
        //             localStorage.setItem("C_USER_DATA", JSON.stringify(userInfo));
        //             if(formik.values.rememberMe){
        //             const token = getToken();
        //             localStorage.setItem("rmmt", token);
        //             }else{
        //                 localStorage.removeItem("rmmt");
        //             }
        //             dispatch(doLogin({ avatar: userInfo.avatar, userName: userInfo.userName, fullName: userInfo.fullName }));

        //             const originalPath = location?.state?.originalPath;
        //             const siteCode = location?.state?.siteCode;

        //             setKeyC_Data("siteDefault",siteCode);
        //             if (originalPath && siteCode) {
        //                 // new DanhMucDungRiengService().checkAccessHeThong(siteCode).then((response) => {
        //                 //     if (String(response.result) === "true") {
        //                 //         // user can access this site
        //                 //         navigate(originalPath + "?site_code=" + siteCode);
        //                 //     } else {
        //                 //         navigate("/home");
        //                 //     }
        //                 // });
        //                 console.log(originalPath);
        //             }else{
        //                 if(originalPath){
        //                     navigate(originalPath);
        //                 }else{
        //                     navigate("/home");
        //                 }
        //             }
        //             dispatch(openNotification({ severity: "success", content: "Đăng nhập thành công!", open: true }));
        //         } else {
        //             setMessageError(p.message);
        //             setAlertError(true);
        //         }
        //     })
        //     .finally(() => {
        //         dispatch(hideLoading());
        //     });
    };

    const onKeyEnter = (e: any) => {
        if (e.charCode && e.charCode === 13) {
            handleLogin();
        }
    };

    function goToForgotPasswordScreen() {
        setScreenOptions(1);
    }

    function goToCheckRecoveryCodeScreen() {
        setScreenOptions(2);
        setSeconds(90);
    }

    function getNewRecoveryCode() {
        setSeconds(300);
        formik.setFieldValue("recoveryCode", "");
        setIsError(false);
        forgotPassword();
    }

    function setScreenOptions(value: number) {
        formik.setFieldValue("screenOptions", value);
    }

    function forgotPassword() {
        dispatch(showLoading());
        // new UserService().forgotPassword(formik.values.email).then((p) => {
        //     if (p.status === 200) {
        //         setScreenOptions(2);
        //         setAlertSuccess(true);
        //         setMessageSuccess("Mã bảo mật đã được gửi tới email " + formik.values.email + " thành công!");
        //     } else {
        //         setMessageError(p.data.errors[0].message);
        //         setAlertError(true);
        //     }
        // });
    }

    function checkRecoveryCode() {
        if (StringUtil.isNullOrEmty(formik.values.email)) {
            setMessageError("Có lỗi xảy ra. Vui lòng thực hiện lại!");
            setAlertError(true);
            setScreenOptions(1);
            return;
        }
        dispatch(showLoading());
        // new UserService()
        //     .checkRecoveryCode(formik.values.email, formik.values.recoveryCode)
        //     .then((p) => {
        //         if (p.status == 200) {
        //             setScreenOptions(3);
        //         } else {
        //             setMessageError(p.data.errors[0].message);
        //             setAlertError(true);
        //             if (p.data.errors[0].message.includes("5 lần")) {
        //                 // setSeconds(0);
        //                 setIsError(true);
        //             }
        //         }
        //     })
        //     .finally(() => {
        //         dispatch(hideLoading());
        //     });
    }

    function passwordRecovery() {
        if (StringUtil.isNullOrEmty(formik.values.email)) {
            setMessageError("Có lỗi xảy ra. Vui lòng thực hiện lại!");
            setAlertError(true);
            setScreenOptions(1);
            return;
        }
        if (StringUtil.isNullOrEmty(formik.values.recoveryCode)) {
            setMessageError("Có lỗi xảy ra. Vui lòng thực hiện lại!");
            setAlertError(true);
            setScreenOptions(1);
            return;
        }
        dispatch(showLoading());
        // new UserService()
        //     .passwordRecovery(formik.values.email, formik.values.recoveryCode, formik.values.newPassword)
        //     .then((p) => {
        //         if (p.status == 200) {
        //             setUsername(p.data);
        //             setScreenOptions(0);
        //         } else {
        //             setMessageError(p.data.description);
        //             setAlertError(true);
        //         }
        //     })
        //     .finally(() => {
        //         dispatch(hideLoading());
        //     });
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setType("PASSWORD"); // Update type when username changes
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setType("PASSWORD"); // Update type when password changes
    };

    return (
        <Grid2 container>
            <Grid2
                className="leftLogin"
                component="div"
                style={{
                    // backgroundImage: `url(${leftBg})`,
                    // backgroundSize: "cover",
                    backgroundColor: "#0B0E2E",
                    maxWidth: "30%",
                    minWidth: "30%",
                    flexBasis: "30%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    overflow: "hidden",
                    minHeight: "500px"
                }}
            >
                <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      overflowY: "auto",
                }}>
                <img src={logoConfig != null ? logoConfig : loginLogo} className="logo_login" alt="logo" width="120px" height="120px" style={{ zIndex: 99 }} />
                <Box className="group_title" component="div" display="flex" flexDirection="column" style={{  }}>
                    <Box
                        className="font_login"
                        component="span"
                        fontSize="20px"
                        fontWeight="400"
                        lineHeight="24px"
                        color="#FFF"
                        textAlign="center"
                        paddingBottom={1}
                    >
                        {/* {StringUtil.isNullOrEmty(tenDonViConfig) ? tenDonViConfig.toLocaleUpperCase() : THONGTINHETHONG.TENDONVI.toLocaleUpperCase()} */}
                       <h1>
                            Chào mừng bạn đến với ...
                       </h1>
                    </Box>
                    <Box
                        className="font_login"
                        component="span"
                        fontSize="20px"
                        fontWeight="400"
                        lineHeight="24px"
                        color="#FFF"
                        textAlign="center"
                    >
                        {/* {StringUtil.isNullOrEmty(tenHeThongConfig) ? tenHeThongConfig.toLocaleUpperCase() : THONGTINHETHONG.TENHETHONG.toLocaleUpperCase()} */}
                        <p>
                            Hệ thống quản lý bệnh nhân thông minh
                        </p>
                        <p>
                            tích hợp điện toán đám mây và trí tuệ nhân tạo
                        </p>
                    </Box>
                </Box>
                </div>
                <div>

                </div>

            </Grid2>
            <Grid2 component="div" className="rightLogin" style={{ maxWidth: "70%", flexBasis: "70%" }}>
                {/* <img src={tut1} alt="tut1" style={{ position: "absolute", top: "0px", left: "0px", height: "175.09px", width: "156.68px" }} />
                <img src={tut2} alt="tut2" style={{ position: "absolute", top: "70px", left: "0px", height: "120px", width: "120px" }} />
                <img src={tut3} alt="tut3" style={{ position: "absolute", top: "218px", left: "18%", height: "200px", width: "200px" }} />
                <img src={tut4} alt="tut4" style={{ position: "absolute", bottom: "2%", left: "0px", height: "250px", width: "250px" }} />
                <img src={tut5} alt="tut5" style={{ position: "absolute", bottom: "1%", left: "178px", height: "80.6px", width: "86.25px" }} />
                <img src={tut6} alt="tut6" style={{ position: "absolute", bottom: "0px", left: "20%", height: "86.92px", width: "97.13px" }} />
                <img src={tut7} alt="tut7" style={{ position: "absolute", top: "0px", right: "2%", height: "86.92px", width: "97.13px" }} />
                <img src={tut8} alt="tut8" style={{ position: "absolute", top: "0px", right: "5%", height: "209.14px", width: "150.16px" }} />
                <img src={tut9} alt="tut9" style={{ position: "absolute", top: "200px", right: "7%", height: "209.14px", width: "187.16px" }} />
                <img src={tut10} alt="tut10" style={{ position: "absolute", bottom: "2%", right: "8.23px", height: "209.14px", width: "187.16px" }} /> */}
                <Grid2
                    component="div"
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "95vh",
                        // background: "linear-gradient(rgb(255, 255, 255) 0%, rgb(232 236 237 / 73%) 100%)",
                    }}
                >
                    <Box className="title_content" component="span"  fontSize="15px" fontWeight="400" textAlign="center" display="none">
                        {headerConfig != "" ? headerConfig.toLocaleUpperCase() : "CHÍNH QUYỀN ĐIỆN TỬ"}
                    </Box>
                    <Box
                        className="title_content_3"
                        component="span"
                        fontSize="15px"
                        fontWeight="400"
                        textAlign="center"
                        display="none"
                    >
                    PHẦN MỀM PHÂN TÍCH XỬ LÝ DỮ LIỆU
                    </Box>
                    <img
                        src={logoConfig != null ? logoConfig : loginLogo}
                        className="login_logo_r"
                        alt="logo"
                        width="70px"
                        height="70px"
                        style={{ display: "none" }}
                    />
                    <Card
                        className="form_login"
                        elevation={0}
                        style={{
                            width: "30%",
                            // boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                            borderRadius: "16px",
                            paddingLeft: "24px",
                            paddingRight: "24px",
                            zIndex: 99,
                            paddingBottom: "18px",
                        }}
                    >
                        {formik.values.screenOptions === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Box component="div" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Box
                                        className="title_form_login"
                                        component="span"
                                        style={{
                                            paddingTop: "27px",
                                            paddingBottom: "7px",
                                            fontSize: "25px",
                                            lineHeight: "32px",
                                            fontWeight: 700,
                                            fontFamily: "Roboto",
                                            color: "#262626",
                                            textAlign: "center",
                                            display:"flex",
                                            justifyContent:"center",
                                            flexDirection:"column"
                                        }}
                                    >
                                        <span>Đăng nhập</span>
                                        <span style={{ fontWeight: 500, color:"#b5b5c3", fontSize:"14px"}}>Chưa có tài khoản? <Link>Đăng ký ngay</Link></span>
                                    </Box>
                                </Box>
                                <Box className="group_input" component="div" display="flex" flexDirection="column" marginBottom="19px">
                                    <Box
                                        component="span"
                                        style={{
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            fontWeight: 600,
                                            fontFamily: "Roboto",
                                            color: "#262626",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Tên đăng nhập
                                    </Box>
                                    <BootstrapInput
                                        fullWidth
                                        placeholder="Tên đăng nhập"
                                        onKeyPress={onKeyEnter}
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </Box>
                                <Box className="group_input" component="div" display="flex" flexDirection="column" marginBottom="19px">
                                    <Box
                                        component="span"
                                        style={{
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            fontWeight: 600,
                                            fontFamily: "Roboto",
                                            color: "#262626",
                                            marginBottom: "8px",
                                            display:"flex",
                                            justifyContent:"space-between"
                                        }}
                                    >
                                        Mật khẩu
                                        <Box
                                        component="span"
                                        style={{
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            fontWeight: 400,
                                            fontFamily: "Roboto",
                                            color: "#1890FF",
                                            cursor: "pointer",
                                            textAlign: "center",
                                        }}
                                        onClick={() => setScreenOptions(1)}
                                    >
                                        Quên mật khẩu?
                                    </Box>
                                    </Box>
                                    <BootstrapInput
                                        type="password"
                                        fullWidth
                                        placeholder="Mật khẩu"
                                        onKeyPress={onKeyEnter}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </Box>
                                {/* <Box component="div">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="rememberMe"
                                                checked={formik.values.rememberMe}
                                                onChange={formik.handleChange}
                                                color="primary" // Màu của checkbox
                                            />
                                        }
                                        label={
                                            <span style={{ fontSize: "16px", fontWeight: 400, color: "rgb(38, 38, 38)", fontFamily: "Roboto" }}>
                                              Ghi nhớ đăng nhập
                                            </span>
                                        }
                                    />
                                </Box> */}
                                <Box component="div">
                                    <Button
                                        className="button_login"
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{
                                            width: "100%",
                                            paddingTop: "12px",
                                            paddingBottom: "12px",
                                            background: "#207DC3",
                                            marginTop: "10px",
                                            marginBottom: "17.5px",
                                            borderRadius: 8,
                                        }}
                                        onClick={() => handleLogin()}
                                    >
                                        <Box
                                            component="span"
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "22px",
                                                fontWeight: 500,
                                                fontFamily: "Roboto",
                                                color: "#FFF",
                                            }}
                                        >
                                            Đăng nhập
                                        </Box>
                                    </Button>
                                </Box>

                            </motion.div>
                        )}
                        {formik.values.screenOptions === 1 && (
                            <motion.div
                                initial={{
                                    x: 500,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <Box display="flex" flexDirection="column">
                                    <Box component="div" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Box
                                            className="title_form_login"
                                            component="span"
                                            style={{
                                                paddingTop: "27px",
                                                paddingBottom: "7px",
                                                fontSize: "25px",
                                                lineHeight: "32px",
                                                fontWeight: 700,
                                                fontFamily: "Roboto",
                                                color: "#262626",
                                                textAlign: "center",
                                            }}
                                        >
                                            Quên mật khẩu
                                        </Box>
                                    </Box>
                                    <Box component="div" display="flex" flexDirection="column" marginBottom="19px">
                                        <Box
                                            component="span"
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "22px",
                                                fontWeight: 400,
                                                fontFamily: "Roboto",
                                                color: "#262626",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Nhập email đã đăng ký
                                        </Box>
                                        <BootstrapInput
                                            fullWidth
                                            placeholder="Nhập email đã đăng ký"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={Boolean(getIn(formik.errors, "email"))}
                                        />
                                        {Boolean(getIn(formik && formik.errors, `email`)) && (
                                            <FormHelperText className="-error">{formik.errors.email.toString()}</FormHelperText>
                                        )}
                                    </Box>
                                    <Box>
                                        <Box component="div">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                style={{
                                                    width: "100%",
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                    background: "#207DC3",
                                                    marginBottom: "10.5px",
                                                    borderRadius: 8,
                                                }}
                                                onClick={() => formik.handleSubmit()}
                                            >
                                                <Box
                                                    component="span"
                                                    style={{
                                                        fontSize: "16px",
                                                        lineHeight: "22px",
                                                        fontWeight: 500,
                                                        fontFamily: "Roboto",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    Gửi mã xác nhận
                                                </Box>
                                            </Button>
                                        </Box>
                                        <Box component="div">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                style={{
                                                    width: "100%",
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                    background: "#D3D3D3",
                                                    marginBottom: "10.5px",
                                                    borderRadius: 8,
                                                }}
                                                onClick={() => setScreenOptions(0)}
                                            >
                                                <Box
                                                    component="span"
                                                    style={{
                                                        fontSize: "16px",
                                                        lineHeight: "22px",
                                                        fontWeight: 500,
                                                        fontFamily: "Roboto",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    Trở về
                                                </Box>
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        )}
                        {formik.values.screenOptions === 2 && (
                            <motion.div
                                initial={{
                                    x: 500,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <Box display="flex" flexDirection="column">
                                    <Box component="div" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Box
                                            className="title_form_login"
                                            component="span"
                                            style={{
                                                paddingTop: "27px",
                                                paddingBottom: "7px",
                                                fontSize: "25px",
                                                lineHeight: "32px",
                                                fontWeight: 700,
                                                fontFamily: "Roboto",
                                                color: "#262626",
                                                textAlign: "center",
                                            }}
                                        >
                                            Xác nhận lấy lại mật khẩu
                                        </Box>
                                    </Box>
                                    <Box component="div" display="flex" flexDirection="column" marginBottom="19px">
                                        <Box
                                            component="span"
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "22px",
                                                fontWeight: 400,
                                                fontFamily: "Roboto",
                                                color: "#262626",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Mã xác thực
                                        </Box>
                                        <BootstrapInput
                                            fullWidth
                                            placeholder="Nhập mã xác thực được gửi về email"
                                            name="recoveryCode"
                                            value={formik.values.recoveryCode}
                                            onChange={formik.handleChange}
                                            error={Boolean(getIn(formik.errors, "recoveryCode"))}
                                        />
                                        {Boolean(getIn(formik && formik.errors, `recoveryCode`)) && (
                                            <FormHelperText className="-error">{formik.errors.recoveryCode.toString()}</FormHelperText>
                                        )}
                                    </Box>
                                    <Box>
                                        <Box component="div">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={isError}
                                                disableElevation
                                                style={{
                                                    width: "100%",
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                    background: "#207DC3",
                                                    marginBottom: "10.5px",
                                                    borderRadius: 8,
                                                }}
                                                onClick={() => formik.handleSubmit()}
                                            >
                                                <Box
                                                    component="span"
                                                    style={{
                                                        fontSize: "16px",
                                                        lineHeight: "22px",
                                                        fontWeight: 500,
                                                        fontFamily: "Roboto",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    Xác nhận
                                                </Box>
                                            </Button>
                                        </Box>
                                        <Box component="div">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                style={{
                                                    width: "100%",
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                    background: "#D3D3D3",
                                                    marginBottom: "10.5px",
                                                    borderRadius: 8,
                                                }}
                                                onClick={() => setScreenOptions(0)}
                                            >
                                                <Box
                                                    component="span"
                                                    style={{
                                                        fontSize: "16px",
                                                        lineHeight: "22px",
                                                        fontWeight: 500,
                                                        fontFamily: "Roboto",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    Trở về
                                                </Box>
                                            </Button>
                                        </Box>
                                        {seconds > 0 ? (
                                            <Box style={{ marginTop: "10px" }} textAlign="center">
                                                {Math.floor(seconds / 60)} : {seconds % 60}
                                            </Box>
                                        ) : (
                                            <Box style={{ marginTop: "10px" }} textAlign="center">
                                                <Link href="#" color="inherit" onClick={getNewRecoveryCode}>
                                                    Gửi lại mã xác nhận
                                                </Link>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </motion.div>
                        )}
                        {formik.values.screenOptions === 3 && (
                            <motion.div
                                initial={{
                                    x: 500,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <Box display="flex" flexDirection="column">
                                    <Box component="div" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Box
                                            component="span"
                                            style={{
                                                paddingLeft: "88px",
                                                paddingRight: "88px",
                                                paddingTop: "27px",
                                                paddingBottom: "7px",
                                                fontSize: "25px",
                                                lineHeight: "32px",
                                                fontWeight: 700,
                                                fontFamily: "Roboto",
                                                color: "#262626",
                                            }}
                                        >
                                            Thay đổi mật khẩu
                                        </Box>
                                    </Box>
                                    <Box component="div" display="flex" flexDirection="column" marginBottom="19px">
                                        <Box
                                            component="span"
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "22px",
                                                fontWeight: 400,
                                                fontFamily: "Roboto",
                                                color: "#262626",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Mật khẩu mới
                                        </Box>
                                        <BootstrapInput
                                            fullWidth
                                            placeholder="Nhập mật khẩu mới"
                                            name="newPassword"
                                            type="password"
                                            value={formik.values.newPassword}
                                            onChange={formik.handleChange}
                                            error={Boolean(getIn(formik.errors, "newPassword"))}
                                        />
                                        {Boolean(getIn(formik && formik.errors, `newPassword`)) && (
                                            <FormHelperText className="-error">
                                                {formik.errors.newPassword.toString()}
                                            </FormHelperText>
                                        )}
                                    </Box>
                                    <Box component="div" display="flex" flexDirection="column" marginBottom="19px">
                                        <Box
                                            component="span"
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "22px",
                                                fontWeight: 400,
                                                fontFamily: "Roboto",
                                                color: "#262626",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            Nhập lại mật khẩu
                                        </Box>
                                        <BootstrapInput
                                            fullWidth
                                            placeholder="Nhập lại mật khẩu mới"
                                            name="newPasswordConfirm"
                                            type="password"
                                            value={formik.values.newPasswordConfirm}
                                            onChange={formik.handleChange}
                                            error={Boolean(getIn(formik.errors, "newPasswordConfirm"))}
                                        />
                                        {Boolean(getIn(formik && formik.errors, `newPasswordConfirm`)) && (
                                            <FormHelperText className="-error">{formik.errors.newPasswordConfirm.toString()}</FormHelperText>
                                        )}
                                    </Box>
                                    <Box>
                                        <Box component="div">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                style={{
                                                    width: "100%",
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                    background: "#207DC3",
                                                    marginBottom: "10.5px",
                                                    borderRadius: 8,
                                                }}
                                                onClick={() => formik.handleSubmit()}
                                            >
                                                <Box
                                                    component="span"
                                                    style={{
                                                        fontSize: "16px",
                                                        lineHeight: "22px",
                                                        fontWeight: 500,
                                                        fontFamily: "Roboto",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    Tiếp theo
                                                </Box>
                                            </Button>
                                        </Box>
                                        <Box component="div">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                style={{
                                                    width: "100%",
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                    background: "#D3D3D3",
                                                    marginBottom: "10.5px",
                                                    borderRadius: 8,
                                                }}
                                                onClick={() => setScreenOptions(0)}
                                            >
                                                <Box
                                                    component="span"
                                                    style={{
                                                        fontSize: "16px",
                                                        lineHeight: "22px",
                                                        fontWeight: 500,
                                                        fontFamily: "Roboto",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    Trở về
                                                </Box>
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        )}
                    </Card>
                </Grid2>
                <Grid2 component="div" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "5vh", width:"100%" }}>
                    <Box component="span" fontWeight="400" fontFamily="Roboto" lineHeight="22px" textAlign="center">
                        {/* © Bản quyền thuộc sở thông tin truyền thông Trà Vinh, Chính quyền điện tử tỉnh Trà Vinh. */}
                        {footerConfig}
                    </Box>
                </Grid2>
            </Grid2>
            <Snackbar open={alertError} onClose={() => setAlertError(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={3000}>
                <Alert onClose={() => setAlertError(false)} severity="error">
                    {messageError}
                </Alert>
            </Snackbar>
            <Snackbar
                open={alertSuccess}
                onClose={() => setAlertSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={3000}
            >
                <Alert onClose={() => setAlertSuccess(false)} severity="success">
                    {messageSuccess}
                </Alert>
            </Snackbar>
        </Grid2>
    );
};

NewLogin.displayName = "/authenticate";

export default NewLogin;
