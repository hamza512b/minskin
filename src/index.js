import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// // TODO: remvove in production
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import "./style.scss"

// Variables
const allowHellpers = false;
const FOV = 50;
const backgroundColor = 0xF2F2F2;
const lightColor = 0xFFFFFF;
const primaryColor = 0x3399CC;
const groundColor = 0xE5EAEF;
const fileLocation = "/skin.glb";

// Nodes
const canvas = document.querySelector("canvas");
const spinner = document.querySelector("div.spinner");

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(backgroundColor);
scene.fog = new THREE.Fog(backgroundColor, 1, 40);


// Camera Setup
const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.lookAt(0, 0, 0)

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight, false);

// // Orbit control 
// const controls = new OrbitControls(camera, canvas);
// controls.update();

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Direactional Light
const dl = new THREE.DirectionalLight(lightColor, 1);
dl.castShadow = true;
dl.shadow.camera.near = 0.1;
dl.shadow.camera.far = 1500;
dl.position.set(4, 5, 4);
dl.lookAt(0, 0, 0);
dl.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dl);

if (allowHellpers) {
    const helper = new THREE.DirectionalLightHelper(dl, 5);
    scene.add(helper);
}

// Hemisphere Light
const hemLight = new THREE.HemisphereLight(primaryColor, 0x44445b, .1);
const hemLightHelper = new THREE.HemisphereLightHelper(hemLight, 3);

if (allowHellpers) {
    scene.add(hemLight);
    scene.add(hemLightHelper);
}

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 0.6);
spotLight.position.set(0, 0, 16);
scene.add(spotLight);

if (allowHellpers) {
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);
}

// Content
const loader = new GLTFLoader();
let model;
loader.load(fileLocation, res => {
    model = res.scene;
    model.traverse((obj) => {
        obj.castShadow = true;
    })

    scene.add(model);
    // Disable loader
    spinner.remove();
    animate();
}, undefined, (error) => console.log(error));


// Ground
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1000);
const planeMaterial = new THREE.MeshPhongMaterial({ color: groundColor });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;

const d = 5;
dl.shadow.camera.left = - d;
dl.shadow.camera.right = d;
dl.shadow.camera.top = d;
dl.shadow.camera.bottom = - d;

scene.add(plane);


// Display
renderer.render(scene, camera);

let k = .05;
const animate = function () {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;

    camera.updateProjectionMatrix();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (camera.position.z > 3.5) {
        camera.position.z -= k;
        k += 0.01;
    }
    if (spotLight.position.z > 3.5) {
        spotLight.position.z -= k;
        k += 0.01;
    }
};