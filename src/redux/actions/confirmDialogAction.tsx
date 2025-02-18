import { ConfirmationDialog } from "../reducers/confirmDialogReducer";

export interface ConfirmationDialogAction {
    type: "OPENDIALOG" | "CLOSEDIALOG";
    confirmationDialog: ConfirmationDialog;
}

export const openConfirmation = (confirmationDialog: ConfirmationDialog): ConfirmationDialogAction => {
    return {
        type: "OPENDIALOG",
        confirmationDialog,
    };
};

export const closeConfirmation = (): ConfirmationDialogAction => {
    return {
        type: "CLOSEDIALOG",
        confirmationDialog: {
            id: "",
            open: false,
            content: "",
            title: "",
            onClose: () => {},
        },
    };
};
