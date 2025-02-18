import { ConfirmationDialogAction } from "../actions/confirmDialogAction";

export interface ConfirmationDialog {
    id: String;
    value?: String;
    open: boolean;
    title: String;
    content?: String;
    onClose: (isOk?: boolean, isClose?: boolean) => void;
    active?: boolean;
    labelOk?: String;
    labelCancel?: String;
    component?: any;
}

export interface ConfirmationDialogState {
    dialogContext: ConfirmationDialog;
}

const initialState: ConfirmationDialogState = {
    dialogContext: {
        id: "",
        open: false,
        title: "",
        onClose: () => {},
        labelOk: "Đồng ý",
        labelCancel: "Hủy",
        component: null,
    },
};

export const confirmationDialogReducer = (state: ConfirmationDialogState = initialState, action: ConfirmationDialogAction) => {
    switch (action.type) {
        case "OPENDIALOG":
            return { ...state, dialogContext: { ...action.confirmationDialog } };
        case "CLOSEDIALOG":
            return { ...state, dialogContext: { ...action.confirmationDialog } };
        default:
            return state;
    }
};
