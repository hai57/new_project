import { Box, Divider, Paper, Typography } from "@mui/material";
import NewLogin from "pages/login/newLogin";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageError: React.FC<object> = ({}) => {
    const title = "PAGE ERROR";

    const navigate = useNavigate();

    useEffect(() => {
        document.title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

        // Chuyển hướng sau 2.5 giây
        const timer = setTimeout(() => {
            navigate(NewLogin.displayName, { replace: true });
            localStorage.clear();
        }, 2500);

        return () => clearTimeout(timer); // Cleanup timeout khi component bị unmount
    }, [navigate]);

    return (
        <Paper component="div" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Box style={{ display: "flex" }}>
                <Typography variant="h3" component="h3" style={{ marginRight: 20 }}>
                    403
                </Typography>
                <Divider orientation="vertical" flexItem style={{ backgroundColor: "#000" }} />
                <Typography variant="h6" gutterBottom style={{ marginTop: 10, marginLeft: 20 }}>
                    Truy cập không hợp lệ ! Vui lòng thử phiên đăng nhập mới
                </Typography>
            </Box>
        </Paper>
    );
};

PageError.displayName = "/error";

export default PageError;
