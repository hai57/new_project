import { Backdrop, CircularProgress, Theme } from "@mui/material";
import { makeStyles, createStyles} from "@mui/styles"
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
            background: "transparent"
        },
    })
);
export const ThemedSuspense = () => {
    const classes = useStyles();
    return (
            <Backdrop className={classes.backdrop} open>
                <CircularProgress color="primary" />
            </Backdrop>
    );
};
