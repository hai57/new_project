import { decodeIdToken, getAllSessionParameters, isValidSession } from "actions/session";
// import { DanhMucDungRiengService } from "apis/danhMuc/danhMucDungRiengService";
import { AlertMessage } from "components/alertMessage";
import { ConfirmDialog } from "components/confirmDialog";

import PageError from "components/pageError";
import { ThemedSuspense } from "components/themedSuspense";
import Auth, { AuthProps } from "HOC/auth";


import React, { JSX, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import "./App.css";
// import DialogViewBaoCaoPublic from "pages/trucQuanDuLieu/danhSach/chiTietBaoCaoPublic";
// import ViewDichVuThongTinChuyenDeDetail from "pages/cauHinhTrucQuanTheoChuyenDe/dichVuThongTin/viewTrucQuanChuyenDeChiTiet";

const NewLogin = React.lazy(() => import("pages/login/newLogin"));

// const ViewDetailDichVuThongTin = React.lazy(() => import("pages/dichVuThongTin/chartDetail"));
// const ViewDetailDichVuThongTinDuBao = React.lazy(() => import("pages/dichVuThongTin/chartDetailDuBao"));
// const ViewDichVuThongTinMobile = React.lazy(() => import("pages/dichVuThongTin/dichVuThongTin"));
// const HomeKTXH = React.lazy(() => import("pages/Home"));
// const HomeMobileTTKTXH = React.lazy(() => import("pages/Home/homeMobile"));
// const ViewDetailDichVuThongTinIframe = React.lazy(() => import("pages/iframe/cauhinh/iframeViewDetail"));
// const TrucQuanDuLieu = React.lazy(() => import("pages/trucQuanDuLieu"));
// const TrucQuanDuLieuHinhAnh = React.lazy(() => import("pages/trucQuanHinhAnh"));
// const TrucQuanDuLieuVideo = React.lazy(() => import("pages/trucQuanVideo"));
// const ViewDichVuThongTin = React.lazy(() => import("pages/dichVuThongTin"));
// const ViewDichVuThongTinDuBao = React.lazy(() => import("pages/dichVuThongTin/dichVuDuBao"));
// const DashBoard = React.lazy(() => import("pages/dashboard"));
// const ChatBotWeb = React.lazy(() => import("pages/chatBot/webChatbot"));
// const ChatVoidBotWeb = React.lazy(() => import("pages/chatBot/webVoidChatBot"));
// const HomeDuBao = React.lazy(() => import("pages/Home/homeDuBao"));

// const ChatBot = React.lazy(() => import("pages/chatBot"));
// const DuyetLichHop = React.lazy(() => import("pages/hopKhongGiayTo/quanlylichhop/DuyetLichHop"));
const App = (): JSX.Element => {
    const [checkingSession, setCheckingSession] = useState(true);

    React.useEffect(() => {
        async function validateSessionStore() {
            // See if there is a valid session.
            // if (await invalidLocalSessionAdmin()) {
            //     setIsLoggedIn(true);
            //     setCheckingSession(false);
            //     return;
            // }
            if (isValidSession()) {
                const session = getAllSessionParameters();
                const _tokenResponse = {
                    access_token: session.ACCESS_TOKEN,
                    refresh_token: session.REFRESH_TOKEN,
                    scope: session.SCOPE,
                    id_token: session.ID_TOKEN,
                    token_type: session.TOKEN_TYPE,
                    expires_in: Number.parseInt(session.EXPIRES_IN, 0),
                };
                // setTokenResponse(_tokenResponse);
                // setIdToken(decodeIdToken(session.ID_TOKEN));
                // setIsLoggedIn(true);
                setCheckingSession(false);
                return;
            }
            // Reads the URL and retrieves the `code` param.
            const code = new URL(window.location.href).searchParams.get("code");
            // If a authorization code exists, sends a token request.
            if (code) {
                // await sendTokenRequest(code)
                //     .then((response) => {
                //         setTokenResponse(response[0]);
                //         setIdToken(response[1]);
                //         setIsLoggedIn(true);
                //     })
                //     .catch((error) => {
                //         setIsLoggedIn(false);
                //     });
            }
            setCheckingSession(false);
        }
        validateSessionStore();
    }, []);

    React.useEffect(() => {
        // console.log("current: app");
        if (window.location.pathname !== "/authenticate") {
            let originalPath = window.location.pathname;
            let siteCode = new URL(window.location.href).searchParams.get("site_code");
            if (originalPath && siteCode) {
                // new DanhMucDungRiengService().checkAccessHeThong(siteCode).then((response) => {
                //     if (String(response.result) === "true") {
                //         setKeyC_Data("siteDefault", siteCode);
                //         dispatchMenu(loadMenuUser());
                //         dispatchMenu(loadCaNhanHoa());
                //     } else {
                //         deleteKeyC_Data("siteDefault");
                //         window.location.replace("/home");
                //     }
                // });
                console.log(originalPath);
            }
        }
    }, []);
    const [state, setstate] = React.useState<{ width: number; height: number }>(getWindowDimensions());
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }
    const AuthWrapper = (props: AuthProps) => {
        const AuthComponent = Auth(props);  // Call Auth HOC with props
        return <AuthComponent />;  // Render the resulting component
      };
    return (
        <>
            {!checkingSession && (
                <Suspense fallback={<ThemedSuspense />}>
                    <Router>
                        <Routes>
                            {/* <Route element={ThuKy} path="/thu-ky"  /> */}
                            {/* <Route element={VaiTroMgt} path="/vai-tro"  />
                            <Route element={NhomVaiTroMgt} path="/nhom-vai-tro"  /> */}
                            {/* <Route element={DanhMucBuoiHop} path="/danh-muc-buoi-hop"  /> */}
                            {/* <Route element={QuanLyNguoiThamGiaHop} path="/quan-ly-nguoi-tham-gia-hop"  />
                            <Route element={DanhMucPhienHop} path="/danh-muc-phien-hop"  />
                            <Route element={BieuQuyetTuDo} path="/quan-ly-bieu-quyet"  />
                            <Route element={QuanLyChuyenMuc} path="/quan-ly-chuyen-muc"  />
                            <Route element={QuanLyTinTucThongBao} path="/quan-ly-tin-tuc-thong-bao"  />
                            <Route element={danhSachTaiLieuXinYKien} path="/danh-sach-tai-lieu-xin-y-kien"  />
                            <Route element={QuanLyDonViThamGiaHop} path="/quan-ly-don-vi-tham-gia"  />
                            <Route element={QuanLyKhachMoiThamGiaHop} path="/quan-ly-khach-moi-tham-gia"  />
                            <Route element={QuanLyDanhSachCuocHop} path="/quan-ly-danh-sach-cuoc-hop"  />
                            <Route element={QuanLyNhomTaiLieu} path="/quan-ly-nhom-tai-lieu"  />
                            <Route element={ThongKeTaiLieuXinYKien} path="/tec"  /> */}
                            {/* <Route element={ViewDichVuThongTin} path="/truc-quan-cong-khai"  /> */}
                            {/* <Route element={HomeMobileTTKTXH} path="/public/truc-quan-bieu-do/:maHeThong"  />
                            <Route element={ChatBot} path="/mobile-chat-bot"  />
                            <Route element={ChatBotWeb} path="/web-chat-bot"  />
                            <Route element={ChatVoidBotWeb} path="/web-void-chat-bot"  />
                            <Route
                                element={state.width < 765 ? <ViewDichVuThongTinMobile/> : <ViewDichVuThongTin/>}
                                path="/public/dash-board-public/:maHeThong/:maLinhVuc/:darkMode"

                            />
                            <Route element={HomeKTXH} path="/public/home-public/:maHeThong"  />
                            <Route element={HomeDuBao} path="/public/dubao/home-public/:maHeThong"  />
                            <Route
                                element={ViewDetailDichVuThongTinIframe}
                                path="/public/iframe-public/:maHeThong/detail/:maLinhVuc/:IframeID?/:PageID?/:itemID?"

                            /> */}
                            //WEB (chart) //// Từ Lĩnh vực
                            {/* <Route
                                element={state.width < 765 ? <ViewDichVuThongTinMobile/> : <ViewDichVuThongTin/>}
                                path="/web/public/dash-board-public/:maHeThong/:maLinhVuc"

                            />
                            //// Xem chi tiết từ layout vào
                            <Route
                                element={ViewDetailDichVuThongTin}
                                path="/web/public/dash-board-public/detail/:maHeThong/:maLinhVuc/:LayoutID?/:PageID?/:itemID?"

                            />
                            //web (dubao) //// Từ Lĩnh vực
                            <Route
                                element={state.width < 765 ? ViewDichVuThongTinMobile : ViewDichVuThongTinDuBao}
                                path="/web/dubao/public/dash-board-public/:maHeThong/:maLinhVuc"

                            />
                            //// Xem chi tiết từ layout vào
                            <Route
                                element={ViewDetailDichVuThongTinDuBao}
                                path="/web/dubao/public/dash-board-public/detail/:maHeThong/:maLinhVuc/:LayoutID?/:PageID?/:itemID?"

                            />
                            //WEB (chuyên đề) //// Từ Lĩnh vực
                            <Route
                                element={state.width < 765 ? ViewDichVuThongTinMobile : ViewDichVuThongTinChuyenDe}
                                path="/web/public/dash-board-public-chuyen-de/:maHeThong/:maLinhVuc"

                            /> */}
                            //// Xem chi tiết từ layout vào
                            {/* <Route
                                element={state.width < 765 ? ViewDichVuThongTinMobile : ViewDichVuThongTinChuyenDe}
                                path="/web/public/dash-board-public-chuyen-de/detail/:maHeThong/:maLinhVuc/:LayoutID?/:PageID?/:itemID?"

                            /> */}
                            {/* <Route
                                element={
                                    <>
                                        <TrucQuanDuLieu />
                                        <ConfirmDialog />
                                        <AlertMessage />
                                    </>
                                }
                                path="/truc-quan-du-lieu/thong-tin-chi-tiet/:id/:token/:maHeThong/:view"
                            />
                            <Route
                                element={
                                    <>
                                        <DialogViewBaoCaoPublic
                                        />
                                    </>
                                }
                                path="/truc-quan-du-lieu/thong-tin-chi-tiet-bao-cao/:id"
                            />
                            <Route
                                element={
                                    <>
                                        <TrucQuanDuLieuHinhAnh />
                                        <AlertMessage />
                                        <ConfirmDialog />
                                    </>
                                }
                                path="/truc-quan-hinh-anh/thong-tin-chi-tiet/:id/:token/:maHeThong/:mode"

                            />
                            <Route
                                element={
                                    <>
                                        <TrucQuanDuLieuVideo />
                                        <AlertMessage />
                                        <ConfirmDialog />
                                    </>
                                }
                                path="/truc-quan-video/thong-tin-chi-tiet/:id/:token/:maHeThong/:mode"

                            /> */}
                            <Route
                                element={
                                    <AuthWrapper
                                        Component={<NewLogin />}
                                        reload={false}
                                        originalPath={new URL(window.location.href).searchParams.get("site_code") ? window.location.pathname : "/home"}
                                        siteCode={String(new URL(window.location.href).searchParams.get("site_code"))}
                                    />
                                }
                                path={"/authenticate"}

                            />
                            {/* <Route
                                element={
                                    <AuthWrapper
                                        Component= {<DashBoard />}
                                    />
                                }
                            /> */}
                            <Route element={<PageError/>} path={PageError.displayName}  />
                        </Routes>
                    </Router>
                </Suspense>
            )}
        </>
    );
};
``;
export default App;
``;
