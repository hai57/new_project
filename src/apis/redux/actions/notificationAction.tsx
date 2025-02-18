import { AlertMessage } from "../reducers/notificationReducer";

export type NotificationAction = {
    type: "OPEN" | "CLOSE";
    alertMessage: AlertMessage;
};

export const openNotification = (alertMessage: AlertMessage): NotificationAction => {
    return {
        type: "OPEN",
        alertMessage: alertMessage,
    };
};

export const closeNotification = (): NotificationAction => {
    return {
        type: "CLOSE",
        alertMessage: {
            content: "",
            open: false,
            severity: "success",
        },
    };
};
