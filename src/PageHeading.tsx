import { ReactNode } from "react";
import { Typography } from "@mui/material";

export const PageHeading = ({ children }: { children: ReactNode; }) => <>
    <Typography variant="h5" sx={{ mb: '1em' }}>
        {children}
    </Typography>
</>;
