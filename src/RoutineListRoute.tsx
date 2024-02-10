import { useContext } from "react";
import { PoseDataContext } from "./PoseDataContext";
import { Container, Grid } from "@mui/material";
import RoutineCard from "./RoutineCard";
import { PageHeading } from "./PageHeading";

export default function RoutineListRoute() {
    const poseData = useContext(PoseDataContext);
    const routines = poseData.value.routines;

    return (
        <Container>
            <PageHeading>
                Yoga Routines ({routines.length})
            </PageHeading>

            <Grid container spacing={2}>
                {routines.map((routine, i) => 
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                        <RoutineCard routine={routine} />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}