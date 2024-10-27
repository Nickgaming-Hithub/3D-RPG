import * as THREE from 'three';

class grassBlockBottom {
    map() {
        this.texture = new THREE.TextureLoader().load("data:image/jpeg;base64,<base64>");
        return this.texture;
    };
};

export default grassBlockBottom;