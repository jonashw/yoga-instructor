import { useContext, useState } from "react";
import {  RoutinePose } from "./Pose";
import { PoseImageUrl } from './PoseImageUrl';
import Announcer from "./Announcer";
import { Container, Fab, Stack, TextField, Typography } from "@mui/material";
import { PoseDataContext } from "./PoseDataContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useParams } from "react-router-dom";
import { PageHeading } from "./PageHeading";


const RoutineRoute = () => {
    const poseData = useContext(PoseDataContext);
    const {routineId} = useParams();
    const [currentPose,setCurrentPose] = useState<RoutinePose|undefined>();
    const routine = poseData.value.routines.filter(r => r.Id.toString() === routineId)[0];
    if(!routine){
        return <div>Loading...</div>;
    }
    const poses = routine.RoutinePoses;
    const play = () => {
        let p = currentPose;
        const loop = () => {
            let i = p ? poses.indexOf(p) + 1 : 0;
            console.log('loop',{i});
            if(i < poses.length){
                setCurrentPose(p = poses[i]);
                Announcer.announce(p.Pose.Name).then(() => {
                    setTimeout(loop, p!.DurationInSeconds * 1000);
                });
            } else {
                setCurrentPose(undefined)
            }
        };
        loop();
    };
    return (
        <Container>
        {currentPose 
            ?  <Stack direction="column" spacing={2}>
                    <img src={PoseImageUrl(currentPose.Pose.Id)} style={{maxWidth:'100%'}}/>
                    <Typography textAlign="center" variant="h5">{currentPose.Pose.Name}</Typography>
                    <Typography textAlign="center">{currentPose.DurationInSeconds}s</Typography>
                </Stack>
            : <div>
                <PageHeading>
                    {routine.Name}
                </PageHeading>
                <Fab size="large" color="primary" aria-label="add" onClick={play}>
                    <PlayArrowIcon />
                </Fab>
                <Stack direction="column" spacing={2}>
                    {poses.map(p => <div>
                        <Stack direction="row" spacing={2} justifyContent="space-between" key={p.Pose.Id}>
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
            </div>}
        </Container>
    );
};

export default RoutineRoute;