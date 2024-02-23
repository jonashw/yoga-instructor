type TimerState = {progressFactor: number};
export const StartTimerProgression = (
    durationInSeconds: number,
    onProgress: (ts: TimerState) => void
): TimerProgression => {
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
    const stop = () => {
        if(!interval){
            console.log('no timer interval set')
            return;
        }
        console.log('timer interval cleared');
        clearInterval(interval);
    };
    return {finished,stop};
}

export type TimerProgression = {
    finished: Promise<void>,
    stop: () => void
}