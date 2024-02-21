import { Container, Stack, Typography } from "@mui/material";
import { ProgressRing } from "./ProgressRing";
import { blue } from "@mui/material/colors";

const ComponentGalleryRoute = () => {
    return (
        <Container>
            <Typography variant="h5"><code>&lt;ProgressRing/&gt;</code></Typography>
            <Stack direction="column" spacing={2}>
                {[1,4,10].map(sw => 
                    <Stack direction="row" spacing={2}>
                        {Array(10).fill(undefined)
                            .map((_,i,arr) => i*1/arr.length)
                            .map(p => {
                                const s = 80;
                                return <div style={{position:'relative', height:s, width:s,border:`1px solid ${blue[500]}`}}>
                                    <ProgressRing sideLength={s} progress={p} strokeWidth={sw}/>
                                </div>;
                            })}
                    </Stack>
                )}
            </Stack>
        </Container>
    );
};

export default ComponentGalleryRoute;