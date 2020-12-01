import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// // TODO: remvove in production
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import "./style.scss"

// Variables
const allowHellpers = false;
const FOV = 60;
const backgroundColor = 0xF2F2F2;
const lightColor = 0xFFFFFF;
const primaryColor = 0x3399CC;
const groundColor = 0xE5EAEF;
const fileLocation = "./skin.glb";

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

// Orbit control 
const controls = new OrbitControls(camera, canvas);

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
let head;
loader.load(fileLocation, res => {
    const model = res.scene;
    model.traverse((obj) => {
        obj.castShadow = true;
        if (obj.name === "Head") head = obj;
    })
    model.position.y = -.5
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
plane.position.y = -1.5;
plane.receiveShadow = true;
scene.add(plane);

// Fellow cursor 
window.addEventListener("mousemove", ev => {
    const pos = getCursorPosition(ev);
    rotJoint(pos)
    renderer.render(scene, camera);
});
const getCursorPosition = ev => ({
    x: (ev.clientX / window.innerWidth) * 2 - 1,
    y: - (ev.clientY / window.innerHeight) * 2 + 1
});

const rotJoint = pos => {
    // Left Right
    head.rotation.y = limitWithinRange((Math.PI * 2) + (Math.PI / 2 * pos.x), 6, 6.5);

    // Top Bottom
    head.rotation.x = limitWithinRange((Math.PI * 2) - (Math.PI / 2 * pos.y), 6.1, 6.4);
};

const limitWithinRange = (num, min, max) => Math.min(Math.max(num, min), max);

// Resizing
window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

// Display
let isOrbitControlsActivited = false;
const animate = () => {
    if (!isOrbitControlsActivited) zoomInInitally();
    

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};


// Start animation
let k = .05;
function zoomInInitally() {
    if (!isOrbitControlsActivited && camera.position.z > 4 || spotLight.position.z > 4) {
        camera.position.z -= k;
        spotLight.position.z -= k;
        k += 0.01;
    } else {
        isOrbitControlsActivited = true;
        controls.update();

    }
}