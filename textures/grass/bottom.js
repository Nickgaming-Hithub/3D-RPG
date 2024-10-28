import * as THREE from 'three';

class grassBlockBottom {
    map() {
        this.texture = new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAl5JREFUOE9Vk81OU0EUx39Tohs/uBcCbSFtkdaNCwsxsDCxwE4Mxp07E8LaF/ABfAZ36Du4AFfWykqN5Wp0ofTrkrTeCm0pGxd6x5zT3qbMZs5Mzpzz/zhj3jx/YqutU2T57R5Yw0Y+Sy3oENoQP+iDCam3OiwkpzRvPZ+l6FV0N88e37XpWYeSV9UEay2ZxBS9uXW+7r0knZhkI5+j0jrlWBoAUb7ERhBINbBUW1127q9Q9Kp6HnTLUfSONJYlSGRta14F8+LpA/uNRR4mz3h7eEQm7nLg1ckkJllbukmleYIx4Ac90nFHaQp0oS2xFpBAYOWS0+zuf6KQv4Hf7gMh6RmH0heh53I+e4dr7c8jCkJZNRBYhfyiQmsEXdXgoFwhNAPYC/MuchgXMhJTNXi1/1EFjGG5svyI8/Jr1UD4yx4pLo8kFrQR6pGIwisGHI0svUghQqhWD51QFyINsJZ03B1R8IMz6s0TMnMuCzOujMdgTsbcUA2kgNxFc4ANaQR9rA3JJFyMWDC2BOk4lWEBg9/usiaTheWdV6Nwe5Fa65T3XpXtzVVCva+QmnU1pzd/j375tSDYso12B6MUprGEZJPTlMo15uPX+R7LcosfGHsJv91RJwr5HH7QpfarG9nYVRsbQYdM3MESI5t0KR1W1UopamxMdVBCFtaWB1R0DlIzDse/e/yzfwknrnI5/EMqLlAHcyFddzZX2d37oHZHk3jBhXqzw/bmCsXyTxVRBPRbJ6SGP1DElEJyrzYOG4xsjKqKJcfBGc7SFk6zSGgm9IH8BYEkQ6Tndk8L/gdLEVrKnyItwAAAAABJRU5ErkJggg==");
        this.texture.magFilter = THREE.NearestFilter;
        return this.texture;
    };
};

export default grassBlockBottom;