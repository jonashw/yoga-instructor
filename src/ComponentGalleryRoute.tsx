import { Container, Stack, Typography } from "@mui/material";
import { ProgressRing } from "./ProgressRing";
import { blue } from "@mui/material/colors";

const ComponentGalleryRoute = () => {
    return (
        <Container>
            <Typography variant="h5"><code>&lt;ProgressRing/&gt;</code></Typography>
            <Stack direction="row" spacing={2}>
                {[1,4,10].map(sw => 
                    <Stack direction="column" spacing={2} key={sw}>
                        {Array(6).fill(undefined)
                            .map((_,i,arr) => i/(arr.length-1))
                            .map(p => {
                                const s = 80;
                                return <div
                                    key={p}
                                    style={{position:'relative', height:s, width:s,border:`1px solid ${blue[500]}`}}>
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