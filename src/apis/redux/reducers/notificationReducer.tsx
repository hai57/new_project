import { NotificationAction } from "../actions/notificationAction";
export interface AlertMessage {
    severity: "success" | "error" | "warning";
    open?: boolean;
    content?: string;
}

export interface NotificationState {
    alertMessage: AlertMessage;
}

const initialState: NotificationState = {
    alertMessage: {
        severity: "success",
        open: false,
        content: "",
    },
};

export const notificationReducer = (state: NotificationState = initialState, action: NotificationAction) => {
    switch (action.type) {
        case "OPEN":
            return { ...state, alertMessage: { ...action.alertMessage } };
        case "CLOSE":
            return { ...state, alertMessage: { ...action.alertMessage } };
        default:
            return state;
    }
};
