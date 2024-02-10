import { useContext, useState } from "react";
import {  RoutinePose } from "./Pose";
import { PoseImageUrl } from './PoseImageUrl';
import Announcer from "./Announcer";
import { Fab, Stack, Typography } from "@mui/material";
import { PoseDataContext } from "./PoseDataContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useParams } from "react-router-dom";

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
        currentPose 
        ?  <Stack direction="row" spacing={2}>
                <img src={PoseImageUrl(currentPose.Pose.Id)} />
                <Typography>{currentPose.Pose.Name}</Typography>
                <Typography>{currentPose.DurationInSeconds}s</Typography>
            </Stack>
        : <div>
            <Fab size="small" color="secondary" aria-label="add" onClick={play}>
                <PlayArrowIcon />
            </Fab>
            {poses.map(p => <div>
                <Stack direction="row" spacing={2}>
                    <img src={PoseImageUrl(p.Pose.Id)} style={{maxWidth:'100px'}}/>
                    <Typography>{p.Pose.Name}</Typography>
                </Stack>
            </div>)}
        </div>
    );
};

export default RoutineRoute;