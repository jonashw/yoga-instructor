import { useContext } from "react";
import { PoseImageUrl } from './PoseImageUrl';
import { Container, Fab, Stack, TextField, Typography } from "@mui/material";
import { PoseDataContext } from "./PoseDataContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeading } from "./PageHeading";

const RoutineRoute = () => {
    const poseData = useContext(PoseDataContext);
    const {routineId} = useParams();
    const routine = poseData.value.routines.filter(r => r.Id.toString() === routineId)[0];
    const navigate = useNavigate();
    if(!routine){
        return <div>Loading...</div>;
    }
    const poses = routine.RoutinePoses;
    const play = () => {
        navigate('play');
    };
    return (
        <Container>
            <div>
                <PageHeading>
                    {routine.Name}
                </PageHeading>
                <Fab size="large" color="primary" aria-label="add" onClick={play}>
                    <PlayArrowIcon />
                </Fab>
                <Stack direction="column" spacing={2}>
                    {poses.map(p => <div key={p.Pose.Id}>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <img src={PoseImageUrl(p.Pose.Id)} style={{maxWidth:'64px'}}/>
                                <Typography>{p.Pose.Name}</Typography>
                            </Stack>
                            <TextField
                            sx={{
                                width:'8em'
                            }}
                                label="Duration (s)"
                                type="number"
                                value={p.DurationInSeconds}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Stack>
                    </div>)}
                </Stack>
            </div>
        </Container>
    );
};

export default RoutineRoute;