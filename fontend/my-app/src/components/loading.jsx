import { Box, CircularProgress, Typography } from "@mui/material";
import "../assets/styles/loading.css"
export default function Loading() {
    return (
        <div className="loading">
            <>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress></CircularProgress>
                    <Typography>Loading..</Typography>
                </Box>
            </>
        </div>
    );
}