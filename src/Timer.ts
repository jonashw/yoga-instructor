type TimerState = {progressFactor: number};
export const StartTimerProgression = (
    durationInSeconds: number,
    onProgress: (ts: TimerState) => void
): Promise<void> => new Promise(resolve => {
    const durationInMS = 1000 * durationInSeconds;
    const progressSteps = durationInSeconds * 30;
    const progressIntervalInMS = durationInMS / progressSteps;
    const started = window.performance.now();
    let interval = setInterval(
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