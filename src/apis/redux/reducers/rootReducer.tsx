import { combineReducers } from "redux";
import { applicationReducer } from "./applicationReducer";
import { authenticateReducer } from "./authenticateReducer";
import { confirmationDialogReducer } from "./confirmDialogReducer";
import { notificationReducer } from "./notificationReducer";
export const rootReducer = combineReducers({
    application: applicationReducer,
    authenticate: authenticateReducer,
    notification: notificationReducer,
    confirmationDialog: confirmationDialogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
