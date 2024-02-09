import { useState,useEffect } from 'react';
import './App.css';
import { Grid } from '@mui/material';
import { Pose } from './Pose';
import { PoseCard } from './PoseCard';


function App() {
  const [poses, setPoses] = useState<Pose[]>([]);

  useEffect(() => {
    fetch('/poses.json')
    .then(r => r.json())
    .then(poses => {
      setPoses(poses);
      console.log({poses});
    });
  },[]);

  return (
    <>
      <h1>Yoga Poses ({poses.length})</h1>
      <Grid container spacing={2}>
        {poses.map((pose,i) =>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
            <PoseCard pose={pose}/>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default App
