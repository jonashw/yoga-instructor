const voice = "Joanna";

const announce = async (msg: string) => {
    const urlSafeMsg = window.encodeURIComponent(msg);
    let url = `https://us-west1-jonashw-dev-personal-website.cloudfunctions.net/jonashw-dev-speech-synthesis-proxy?voice=${voice}&msg=${urlSafeMsg}`;
    const r = await fetch(url, { redirect: 'follow' });
    const b = await r.blob();
    const audio = new Audio();
    const ended = new Promise<void>(resolve => {
        audio.onended = () => resolve();
    });
    const started = new Promise<void>(resolve => {
        audio.onplay = () => resolve();
    });
    audio.controls = true;
    audio.autoplay = true;
    audio.src = window.URL.createObjectURL(b);
    return { ended, started };
};

export default {
    announce
};