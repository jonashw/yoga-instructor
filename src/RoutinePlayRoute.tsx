import React, { useContext, useState } from "react";
import { RoutinePose } from "./Pose";
import { PoseImageUrl } from './PoseImageUrl';
import Announcer from "./Announcer";
import { Button, Container, Stack, Typography } from "@mui/material";
import { PoseDataContext } from "./PoseDataContext";
import { useParams } from "react-router-dom";
import { StartTimerProgression } from "./Timer";
import { ProgressRing } from "./ProgressRing";
import { UserInteractedContext } from "./UserInteractedContext";

const RoutinePlayRoute = () => {
    const poseData = useContext(PoseDataContext);
    const userHasInteracted = useContext(UserInteractedContext);
    const { routineId } = useParams();
    const [currentPose, setCurrentPose] = useState<RoutinePose | undefined>();
    const [progress, setProgress] = useState(0);
    const routine = poseData.value.routines.filter(r => r.Id.toString() === routineId)[0];

    const play = (poses: RoutinePose[]) => {
        let p = currentPose;
        const loop = () => {
            let i = p ? poses.indexOf(p) + 1 : 0;
            console.log('loop', { i });
            if (i < poses.length) {
                setCurrentPose(p = poses[i]);
                Announcer.announce(p.Pose.Name).then(() => {
                    StartTimerProgression(p!.DurationInSeconds, state => {
                        //console.log(state);
                        setProgress(state.progressFactor);
                    }).then(loop);
                });
            } else {
                setCurrentPose(undefined);
            }
        };
        loop();
    };

    React.useEffect(() => {
        if (!routine) {
            return;
        }
        if(userHasInteracted){
            console.log('starting')
            play(routine.RoutinePoses);
        }
    }, [routine]);

    if (!routine) {
        return <div>Loading...</div>;
    }
    return (
        <Container>
            <Stack direction="column" spacing={2} alignItems="center">
                {!currentPose
                ?
                    <>
                        <Button color="primary" variant="outlined" onClick={() => {
                            play(routine.RoutinePoses);
                        }}>Start Routine</Button>
                    </>
                : 
                    <>
                        <div>{(progress * 100).toFixed(2)}%</div>
                        <div style={{ position: 'relative', width:500 }}>
                            <ProgressRing
                                sideLength={500}
                                progress={progress}
                                strokeWidth={10}
                                style={{
                                    position:'absolute',
                                    zIndex:1000,
                                    backgroundImage:`url(${PoseImageUrl(currentPose.Pose.Id)})`,
                                    backgroundPosition:'center',
                                    backgroundSize:'cover'

                                }}
                            />
                        </div>
                        <Typography textAlign="center" variant="h5">{currentPose.Pose.Name}</Typography>
                        <Typography textAlign="center">{currentPose.DurationInSeconds}s</Typography>
                    </>
                }
            </Stack>
        </Container>
    );
};

export default RoutinePlayRoute;