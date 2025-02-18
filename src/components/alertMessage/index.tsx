import React from "react";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeNotification } from "redux/actions/notificationAction";
import { RootState } from "redux/reducers/rootReducer";
import { CustomAlert } from "../common/alert";

export const AlertMessage = () => {
    const { alertMessage } = useSelector((state: RootState) => state.notification);
    const [state, setstate] = React.useState<{ width: number; height: number }>(getWindowDimensions());
    const dispatch = useDispatch();
    function handleCloseAlertMessage() {
        dispatch(closeNotification());
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    return (
        <>
            {alertMessage.open && (
                <Snackbar
                    open={alertMessage.open}
                    onClose={handleCloseAlertMessage}
                    anchorOrigin={{ vertical: "top", horizontal: state.width > 765 ? "right" : "center" }}
                    autoHideDuration={3000}
                >
                    <CustomAlert onClose={handleCloseAlertMessage} severity={alertMessage.severity}>
                        {alertMessage.content}
                    </CustomAlert>
                </Snackbar>
            )}
        </>
    );
};
