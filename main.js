// Imports and Setup

import * as THREE from "three";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(loop);
document.body.appendChild(renderer.domElement);

/*
import * as THREE from 'three';

class <name> {
    map() {
        this.texture = new THREE.TextureLoader().load("data:image/jpeg;base64,<base64>");
        return this.texture;
    };
};

export default <name>;
*/

import uvTexture from "./textures/uvTexture.js";

import grassBlockTop from "./textures/grass/top.js";
import grassBlockSides from "./textures/grass/sides.js";
import grassBlockBottom from "./textures/grass/bottom.js";

// Textures

const uvTextureMap = new uvTexture().map();

const grassBlockTopMap = new grassBlockTop().map();
const grassBlockSidesMap = new grassBlockSides().map();
const grassBlockBottomMap = new grassBlockBottom().map();

// Initialization

camera.rotation.order = "YXZ";

camera.position.z = 5;

const screen = {
    fov: 75,
};

const mouse = {
    x: 0,
    y: 0,
};

const player = {
    vx: 0,
    vy: 0,
    vz: 0,
    inAir: false,
    settings: {
        speed: 0.01,
        friction: 0.9,
        gravity: 0.006,
    },
};

const objects = {
    index: -1,
    length: [],
    width: [],
    height: [],
    x: [],
    y: [],
    z: [],
    texture: [],
};

// World Objects

function createObject(width, height, length, x, y, z, texture1, texture2, texture3, texture4, texture5, texture6) {
    objects.index++;
    objects.length.push(length);
    objects.length.push(width);
    objects.length.push(height);
    objects.x.push(x);
    objects.y.push(y);
    objects.z.push(z);
    let geometry = new THREE.BoxGeometry(width, height, length);
    const cubeMaterials = [
        new THREE.MeshBasicMaterial({map: texture1,transparent:true, side:THREE.DoubleSide}), //right side
        new THREE.MeshBasicMaterial({map: texture2,transparent:true, side:THREE.DoubleSide}), //left side
        new THREE.MeshBasicMaterial({map: texture3,transparent:true, side:THREE.DoubleSide}), //top side
        new THREE.MeshBasicMaterial({map: texture4,transparent:true, side:THREE.DoubleSide}), //bottom side
        new THREE.MeshBasicMaterial({map: texture5,transparent:true, side:THREE.DoubleSide}), //front side
        new THREE.MeshBasicMaterial({map: texture6,transparent:true, side:THREE.DoubleSide}), //back side
    ];
    let object = new THREE.Mesh(geometry, cubeMaterials);
    object.position.set(x, y, z);
    scene.add(object);
};

const createBlock = {
    grass: (x, y, z) => {
        createObject(1, 1, 1, x, y, z, grassBlockSidesMap, grassBlockSidesMap, grassBlockTopMap, grassBlockBottomMap, grassBlockSidesMap, grassBlockSidesMap);
    },
};
createBlock.grass(0, -1, 0);
createObject(20, 1, 20, 0, -2, 0, uvTextureMap, uvTextureMap, uvTextureMap, uvTextureMap, uvTextureMap, uvTextureMap);

// Camera Controls

document.body.onclick = () => {
    document.body.requestPointerLock();
};

onmousemove = e => {
    if(document.pointerLockElement == document.body) {
        mouse.x += e.movementX;
        mouse.y += e.movementY;
    };
};

function cameraTick() {
    camera.rotation.x = -mouse.y / 360;
    camera.rotation.y = -mouse.x / 360;
};

// Keys

const keypressed = new Set();
onkeydown = e => {
    keypressed.add(e.code);
};

onkeyup = e => {
    keypressed.delete(e.code);
};

// Loop

function loop() {
    // Camera

    cameraTick();

    if(camera.rotation.x < -1.5) {
        camera.rotation.x = -1.5;
        mouse.y = 540;
    };

    if(camera.rotation.x > 1.5) {
        camera.rotation.x = 1.5;
        mouse.y = -540;
    };

    camera.fov += (screen.fov - camera.fov) / 3;

    camera.updateProjectionMatrix();

    // Movement Detection

    if(keypressed.has("KeyW")) {
        player.vx -= Math.sin(camera.rotation.y) * player.settings.speed;
        player.vz -= Math.cos(camera.rotation.y) * player.settings.speed;
    };
    if(keypressed.has("KeyA")) {
        player.vx -= Math.cos(camera.rotation.y) * player.settings.speed;
        player.vz += Math.sin(camera.rotation.y) * player.settings.speed;
    };
    if(keypressed.has("KeyS")) {
        player.vx += Math.sin(camera.rotation.y) * player.settings.speed;
        player.vz += Math.cos(camera.rotation.y) * player.settings.speed;
    };
    if(keypressed.has("KeyD")) {
        player.vx += Math.cos(camera.rotation.y) * player.settings.speed;
        player.vz -= Math.sin(camera.rotation.y) * player.settings.speed;
    };

    // Friction and Gravity

    player.vx *= player.settings.friction;
    player.vz *= player.settings.friction;
    player.vy -= player.settings.gravity;

    // Movement

    camera.position.x += player.vx;
    camera.position.y += player.vy;
    camera.position.z += player.vz;

    // Jump Detection and World Floor

    if(!player.inAir) {
        if(keypressed.has("Space")) {
            player.vy = 0.1;
        };
    };

    if(camera.position.y < 0) {
        camera.position.y = 0;
        player.inAir = false;
    } else {
        player.inAir = true;
    };

    // Other / Effects

    if(player.inAir) {
        player.settings.friction = 0.92;
    } else {
        player.settings.friction = 0.9;
    };

    if(keypressed.has("KeyR")) {
        player.settings.speed = 0.02;
        screen.fov = 85;
    } else if(keypressed.has("ShiftLeft")) {
        if(!player.inAir) {
            player.settings.speed = 0.003;
            camera.position.y -= 0.2;
            screen.fov = 70;
        };
    } else {
        player.settings.speed = 0.01;
        screen.fov = 70;
    };

    // Render

	renderer.render( scene, camera );

};