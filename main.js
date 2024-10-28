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

var fps = 60;

var fpsTick = 0;

var oldFps;

const screen = {
    fov: 75,
};

const mouse = {
    x: 0,
    y: 0,
};

// acceleration = (force (n) * friction) / mass (kg)
// speed = acceleration * time

const player = {
    x: 0,
    y: 2,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    inAir: false,
    settings: {
        acceleration: 0.02,
        friction: 0.84,
        gravity: 0.006,
        thickness: 0.2,
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
};

// World Objects

function createObject(width, height, length, x, y, z, texture1, texture2, texture3, texture4, texture5, texture6) {
    objects.index++;
    objects.length.push(length);
    objects.width.push(width);
    objects.height.push(height);
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
createBlock.grass(1, -1, 0);
createBlock.grass(2, 1, 1);
createBlock.grass(2, 0, 0);
// createObject(20, 1, 20, 0, -2, 0, uvTextureMap, uvTextureMap, uvTextureMap, uvTextureMap, uvTextureMap, uvTextureMap);

objects.index++;
objects.length.push(21);
objects.width.push(21);
objects.height.push(1);
objects.x.push(0);
objects.y.push(-2);
objects.z.push(0);
let textureThing1 = new grassBlockSides().map();
textureThing1.wrapS = THREE.RepeatWrapping;
textureThing1.wrapT = THREE.RepeatWrapping;
textureThing1.repeat.set(21, 1);
let textureThing2 = new grassBlockTop().map();
textureThing2.wrapS = THREE.RepeatWrapping;
textureThing2.wrapT = THREE.RepeatWrapping;
textureThing2.repeat.set(21, 21);
let textureThing3 = new grassBlockBottom().map();
textureThing3.wrapS = THREE.RepeatWrapping;
textureThing3.wrapT = THREE.RepeatWrapping;
textureThing3.repeat.set(21, 21);
let objectThing = new THREE.Mesh(new THREE.BoxGeometry(21, 1, 21), [
    new THREE.MeshBasicMaterial({map: textureThing1,transparent:true, side:THREE.DoubleSide}), //right side
    new THREE.MeshBasicMaterial({map: textureThing1,transparent:true, side:THREE.DoubleSide}), //left side
    new THREE.MeshBasicMaterial({map: textureThing2,transparent:true, side:THREE.DoubleSide}), //top side
    new THREE.MeshBasicMaterial({map: textureThing3,transparent:true, side:THREE.DoubleSide}), //bottom side
    new THREE.MeshBasicMaterial({map: textureThing1,transparent:true, side:THREE.DoubleSide}), //front side
    new THREE.MeshBasicMaterial({map: textureThing1,transparent:true, side:THREE.DoubleSide}), //back side
]);
objectThing.position.set(0, -2, 0);
scene.add(objectThing);

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

    // Movement

    if(keypressed.has("KeyW")) {
        player.vx -= Math.sin(camera.rotation.y) * player.settings.acceleration;
        player.vz -= Math.cos(camera.rotation.y) * player.settings.acceleration;
    };
    if(keypressed.has("KeyA")) {
        player.vx -= Math.cos(camera.rotation.y) * player.settings.acceleration;
        player.vz += Math.sin(camera.rotation.y) * player.settings.acceleration;
    };
    if(keypressed.has("KeyS")) {
        player.vx += Math.sin(camera.rotation.y) * player.settings.acceleration;
        player.vz += Math.cos(camera.rotation.y) * player.settings.acceleration;
    };
    if(keypressed.has("KeyD")) {
        player.vx += Math.cos(camera.rotation.y) * player.settings.acceleration;
        player.vz -= Math.sin(camera.rotation.y) * player.settings.acceleration;
    };

    player.vx *= player.settings.friction;
    player.vz *= player.settings.friction;
    player.vy -= player.settings.gravity;

    // Collisions


    player.x += player.vx;
    if(collisionDetection()) {
        player.x -= player.vx;
        player.vx = 0;
    };

    player.y += player.vy;
    if(collisionDetection()) {
        let holdJump = -Math.abs(player.vy) == player.vy;
        player.y -= player.vy;
        player.vy = 0;
        if(keypressed.has("Space") && holdJump) {
            player.vy = 0.12;
        };
    };

    player.z += player.vz;
    if(collisionDetection()) {
        player.z -= player.vz;
        player.vz = 0;
    };

    /*
    player.y = objects.y[i] + (objects.height[i] / 2);
    player.vy = 0;
    if(keypressed.has("Space")) {
        player.vy = 0.1;
    };
    */

    // Position

    camera.position.set(player.x, player.y + 1.8, player.z);
    document.getElementById("cords").innerText = "X: " + Math.floor(player.x) + ", Y: " + Math.floor(player.y) + ", Z: " + Math.floor(player.z) + "\n FPS: " + fps;

    if(player.y < -50) {
        player.x = 0;
        player.y = 5;
        player.z = 0;
        player.vy = 0;
    };

    // Other

    if(keypressed.has("KeyR")) {
        player.settings.acceleration = 0.04;
        screen.fov = 80;
    } else {
        player.settings.acceleration = 0.02;
        screen.fov = 70;
    };

    // Render

	renderer.render( scene, camera );

};

function collisionDetection() {
    let touching = false;
    for(let index = 0; index < 2; index += 0.1) {
        for(let i = 0; i < (objects.index + 1); i++) {
            if(player.y + index + 0.1 < objects.y[i] + (objects.height[i] / 2) && player.y + index + 0.1 > objects.y[i] - (objects.height[i] / 2)) {
                if(player.x > objects.x[i] - (objects.width[i] / 2) - player.settings.thickness && player.x < objects.x[i] + (objects.width[i] / 2) + player.settings.thickness) {
                    if(player.z > objects.z[i] - (objects.length[i] / 2) - player.settings.thickness && player.z < objects.z[i] + (objects.length[i] / 2) + player.settings.thickness) {
                        touching = true;
                    };
                };
            };
        };
    };
    return touching;
};

function fpsLoop() {
    if(fpsTick > 60) {
        fps = new Date();
        fps -= oldFps;
        oldFps = new Date();
        fpsTick = 0;
    };

    fpsTick++;

    window.requestAnimationFrame(fpsLoop);
};
fpsLoop();