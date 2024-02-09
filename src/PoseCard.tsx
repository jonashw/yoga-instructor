import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardActionArea, CardActions, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pose } from './Pose';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const announce = (msg: string) => {
  const voice = "Joanna";
  const urlSafeMsg = window.encodeURIComponent(msg);
  let url = `https://us-west1-jonashw-dev-personal-website.cloudfunctions.net/jonashw-dev-speech-synthesis-proxy?voice=${voice}&msg=${urlSafeMsg}`;
  console.log({urlSafeMsg,url});
  fetch(url,{redirect: 'follow'})
  .then(r => r.blob())
  .then(b => {
    const audio = new Audio();
    console.log({audio});
    audio.controls = true;
    audio.autoplay = true;
    audio.src = window.URL.createObjectURL(b);
  })
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export function PoseCard({ pose }: { pose: Pose; }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return <Card>
    <CardActionArea
      onClick={handleExpandClick}
    >
      <CardHeader
        /*action={<IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>}*/
        avatar={<Avatar aria-label="pose" sx={{ background: red[500] }}>
          P
        </Avatar>}
        title={pose.Name} />
      <CardMedia
        component="img"
        image={`/pose_illustrations/pose${pose.Id.toString().padStart(2, "0")}.jpg`}
        alt={"Pose illustration: " + pose.Name} />
      <CardActions disableSpacing>
        {/*
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        */}
        <IconButton aria-label="Say name" onClick={e => {
          e.stopPropagation();
          announce(pose.Name);
        }}>
          <RecordVoiceOverIcon/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {["Instructions", "Benefits"].map(subtitle => <div key={subtitle}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {subtitle}
            </Typography>
            <Typography variant="body2">
              {(pose as any)[subtitle]}
            </Typography>
          </div>
          )}
        </CardContent>
      </Collapse>
    </CardActionArea>
  </Card>;
}
