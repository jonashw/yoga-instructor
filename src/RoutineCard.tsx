import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardActionArea, CardHeader, Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import {  Routine } from './Pose';
import { PoseImageUrl } from './PoseImageUrl';
import { useNavigate } from 'react-router-dom';

export default function RoutineCard({ routine }: { routine: Routine; }) {
    const navigate = useNavigate();
    return (
        <Card>
            <CardActionArea onClick={() => navigate(`/routine/${routine.Id}`)} >
                <CardHeader
                    avatar={<Avatar aria-label="routine" sx={{ background: red[500] }}>
                        R
                    </Avatar>}
                    title={routine.Name} />
                <CardContent>
                    <Grid container spacing={1}>
                        {routine.RoutinePoses.map(rp => 
                            <Grid item xs={3} key={rp.Pose.Name}>
                                <Avatar aria-label={rp.Pose.Name} src={PoseImageUrl(rp.Pose.Id)}/>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}