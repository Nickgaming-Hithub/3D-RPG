// Imports and Setup

import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(loop);
document.body.appendChild(renderer.domElement);

// Initialization

camera.rotation.order = "YXZ";

camera.position.set(0, 0, 5);
camera.rotation.set(0, 0, 0);

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

// World Objects

function createObject(width, height, length, x, y, z, texture) {
    let geometry = new THREE.BoxGeometry(width, height, length);
    let material = new THREE.MeshBasicMaterial({
        color: texture
    });
    let object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    scene.add(object);
};

createObject(1, 1, 1, 0, -1, 0, 0x00ff00);
createObject(20, 1, 20, 0, -2, 0, 0x00fff0);

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

    cameraLoop();

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

    // Render

	renderer.render( scene, camera );

};