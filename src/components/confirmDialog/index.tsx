import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/rootReducer";
import { ConfirmationDialogRaw } from "../common/dialog/confirmDialog";

export const ConfirmDialog = () => {
    const { dialogContext } = useSelector((state: RootState) => state.confirmationDialog);

    return (
        <>
            {dialogContext.open && (
                <ConfirmationDialogRaw
                    id={`${dialogContext.id}`}
                    keepMounted
                    open={dialogContext.open}
                    title={`${dialogContext.title}`}
                    content={dialogContext.content}
                    onClose={dialogContext.onClose}
                    value={`${dialogContext.value}` as "error" | "info" | "warn"}
                    active={dialogContext.active}
                    labelCancel={dialogContext.labelCancel as string}
                    labelOk={dialogContext.labelOk as string}
                    component={dialogContext.component}
                />
            )}
        </>
    );
};
