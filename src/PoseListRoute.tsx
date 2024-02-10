import { useContext } from "react";
import { PoseDataContext } from "./PoseDataContext";
import { Container, Grid } from "@mui/material";
import { PoseCard } from "./PoseCard";

export default function PoseListRoute() {
    const poseData = useContext(PoseDataContext);
    const poses = poseData.value.poses;

    return (
        <Container>
            <h1>Yoga Poses ({poses.length})</h1>

            <Grid container spacing={2}>
                {poses.map((pose, i) => <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                    <PoseCard pose={pose} />
                </Grid>
                )}
            </Grid>
        </Container>
    );
}