import { green, grey } from '@mui/material/colors';

export const ProgressRing = ({
    progress, sideLength, strokeWidth, style
}: {
    progress: number;
    sideLength: number;
    strokeWidth?: number;
    style?:React.CSSProperties
}) => {
    const sw = strokeWidth ?? 4;
    const r = (sideLength / 2) - sw/2;
    const R = (sideLength / 2);
    const c = r * 2 * Math.PI;
    const offset = c - progress * c;
    return (
        <svg
            className="progress-ring"
            width={sideLength}
            height={sideLength}
            style={{
                ...style,
            }}
        >
            <g transform={`translate(${R},${R}) rotate(-90 0 0)`}>
                <circle
                    className="progress-ring__circle"
                    stroke={grey[200]}
                    strokeWidth={sw}
                    fill="transparent"
                    r={r}
                    cx={0}
                    cy={0} />
                <circle
                    strokeDasharray={`${c} ${c}`}
                    strokeDashoffset={offset}
                    className="progress-ring__circle"
                    stroke={green[500]}
                    strokeWidth={sw}
                    fill="transparent"
                    r={r}
                    cx={0}
                    cy={0} />
            </g>
        </svg>);
};
