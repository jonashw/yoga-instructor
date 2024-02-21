import { createContext, useEffect, useState } from 'react';
import {Pose, Routine} from "./Pose";

type ContextValue<T> = {loading: boolean, value: T};

type PoseData = {
    poses: Pose[],
    routines: Routine[]
};

export const PoseDataContext = createContext<ContextValue<PoseData>>({
    loading:true,
    value:{ poses: [], routines: [] }
});

export const PoseDataProvider  = ({children}: {children: React.ReactElement}) => {
    const [value, setValue] = useState<PoseData>({ poses: [], routines: [] });
    const [loading, setLoading] = useState(false);

    const loadPoseData = async () => {
        setLoading(true);
        const poses: Pose[] = await fetch('/poses.json').then(r => r.json());
        const routines: Routine[] = [{
            Id: 1,
            Name: 'Wake Up',
            RoutinePoses: poses.map(Pose => ({
                DurationInSeconds: 5,
                Pose
            }))
        }];
        setValue({ poses, routines });
        setLoading(false);
    }

    useEffect(() => {
        loadPoseData();
    }, [])

    return (
        <PoseDataContext.Provider value={{ loading, value }}>
            {children}
        </PoseDataContext.Provider>
    );
};