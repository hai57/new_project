import React from "react";
import Alert, { AlertProps } from "@mui/material/Alert";
export type AlertMessage = {
    severity: "success" | "error";
    open: boolean;
    content: string;
};
export const CustomAlert = (props: AlertProps) => {
    return <Alert elevation={6} variant="filled" {...props} />;
};
