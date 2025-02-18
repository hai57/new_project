import React from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, IconButton,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import InfoIcon from "@mui/icons-material/Info"
import WarningIcon from "@mui/icons-material/Warning"
import CancelIcon from "@mui/icons-material/Cancel"
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/rootReducer";

import { CaNhanHoaThongBao, TypeCaNhanHoa } from "apis/caNhanHoaService/caNhanHoaService";
import { getUserId } from "helpers/localStorage";

export interface ConfirmationDialogRawProps {
    id: string;
    keepMounted: boolean;
    value?: "info" | "warn" | "error"; // Specific value types for better type safety
    open: boolean;
    onClose: (isOk?: boolean, isClose?: boolean) => void;
    title: string;
    content: React.ReactNode | string; // Allow content to be a string or ReactNode
    active?: boolean;
    labelOk?: string;
    labelCancel?: string;
    component?: React.ReactNode; // Specified as ReactNode for clarity
}

export const ConfirmationDialogRaw: React.FC<ConfirmationDialogRawProps> = ({
    onClose,
    open,
    labelOk,
    labelCancel,
    component,
    active,
    id,
    keepMounted,
    title,
    content,
    value
}) => {
    const userId = getUserId();
    const { caNhanHoa } = useSelector((state: RootState) => state.caNhanHoaReducer);

    // Font properties
    let fontColor = "black";
    let fontFamily = "Arial";
    let fontSize = 13;
    let width: "sm" | "md" | "lg" | "xl" | false = "sm"; // Default value

    // Type guard to check if the item is of type CaNhanHoaThongBao
    const isCaNhanHoaThongBao = (item: any): item is CaNhanHoaThongBao => {
        return item &&
               item.type === TypeCaNhanHoa.THONG_BAO &&
               typeof item.content === 'object' &&
               'fontChu' in item.content &&
               'fontSize' in item.content;
    };

    const caNhanHoaTab = caNhanHoa.find(isCaNhanHoaThongBao);
    const caNhanHoaCaNhan = caNhanHoa.find(item => item.userId === userId && isCaNhanHoaThongBao(item));

    // Update font properties based on the found items
    if (caNhanHoaTab?.content && active) {
        fontColor = caNhanHoaTab.content.color;
    }

    if (caNhanHoaCaNhan?.content && active) {
        fontColor = caNhanHoaCaNhan.content.color;
    }

    return (
        <Dialog
            disableEscapeKeyDown
            fullWidth
            maxWidth={width}
            aria-labelledby="confirmation-dialog-title"
            open={open}
        >
            <DialogTitle id={id}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {title}
                    <IconButton onClick={() => onClose(false)} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                {component}
                <Box style={{ display: "flex", alignItems: "center", color: fontColor, fontFamily, fontSize }}>
                    {value === "info" && (
                        <InfoIcon color="primary" style={{ marginRight: 5, fontSize }} />
                    )}
                    {value === "warn" && (
                        <WarningIcon style={{ color: "#ffd600", marginRight: 5, fontSize }} />
                    )}
                    {value === "error" && (
                        <CancelIcon color="secondary" style={{ marginRight: 5, fontSize }} />
                    )}
                    {typeof content === "string" ? (
                        <span>{content}</span>
                    ) : (
                        content
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" disableElevation onClick={() => onClose(true)}>
                    {labelOk || "Đồng ý"}
                </Button>
                <Button variant="contained" color="inherit" disableElevation onClick={() => onClose(false)}>
                    {labelCancel || "Hủy"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
