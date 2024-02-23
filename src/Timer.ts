type TimerState = {progressFactor: number};
export const StartTimerProgression = (
    durationInSeconds: number,
    onProgress: (ts: TimerState) => void
) => {
    let interval: number;
    const finished = new Promise<void>(resolve => {
        const durationInMS = 1000 * durationInSeconds;
        const progressSteps = durationInSeconds * 30;
        const progressIntervalInMS = durationInMS / progressSteps;
        const started = window.performance.now();
        interval = setInterval(
            () => {
                var elapsedInMS = Math.min(durationInMS,window.performance.now() - started);
                onProgress({progressFactor: elapsedInMS/durationInMS});
                if(elapsedInMS >= durationInMS){
                    clearInterval(interval);
                    resolve();
                }
            },
            progressIntervalInMS);
    });
    return {finished};
}