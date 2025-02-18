import { combineReducers } from "redux";
import { notificationReducer } from "./notificationReducer";
import { authenticateReducer } from "./authenticateReducer";
import { applicationReducer } from "./applicationReducer";
import { caNhanHoaReducer }from "./caNhanHoaReducer"
import { confirmationDialogReducer } from "./confirmDialogReducer";

export const rootReducer = combineReducers({
  application: applicationReducer,
  authenticate: authenticateReducer,
  notification: notificationReducer,
  caNhanHoaReducer: caNhanHoaReducer,
  confirmationDialog: confirmationDialogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
