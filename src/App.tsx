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
          <Grid item xs={4} key={i}>
            <PoseCard pose={pose}/>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default App
