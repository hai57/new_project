import { ConfirmationDialogAction } from "../actions/confirmDialogAction";

export interface ConfirmationDialog {
    id: String;
    value?: String;
    open: boolean;
    title: String;
    content?: String;
    onClose: (isOk?: boolean) => void;
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
