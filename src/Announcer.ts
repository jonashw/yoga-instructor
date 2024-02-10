const voice = "Joanna";

const announce = (msg: string) => {
  const urlSafeMsg = window.encodeURIComponent(msg);
  let url = `https://us-west1-jonashw-dev-personal-website.cloudfunctions.net/jonashw-dev-speech-synthesis-proxy?voice=${voice}&msg=${urlSafeMsg}`;
  return fetch(url,{redirect: 'follow'})
  .then(r => r.blob())
  .then(b => 
    new Promise<void>(resolve => {
        const audio = new Audio();
        console.log({audio});
        audio.controls = true;
        audio.autoplay = true;
        audio.src = window.URL.createObjectURL(b);
        audio.onended = () => resolve();
    }))
};

export default {
    announce
};