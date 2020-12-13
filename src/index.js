import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import "./style.scss"

// Configuration
import config from "../config.js"

// Nodes
const canvas = document.querySelector("canvas");
const spinner = document.querySelector("div.spinner");

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(config.backgroundColor);
scene.fog = new THREE.Fog(config.backgroundColor, 1, 40);


// Camera Setup
const camera = new THREE.PerspectiveCamera(config.FOV, window.innerWidth / window.innerHeight, 0.1, 1000);
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
const ambientLight = new THREE.AmbientLight(0x404040, config.ambientLightStrength);
scene.add(ambientLight);

// Direactional Light
const dl = new THREE.DirectionalLight(config.lightColor, config.dirLightStrength);
dl.castShadow = true;
dl.shadow.camera.near = 0.1;
dl.shadow.camera.far = 1500;
dl.position.set(4, 5, 4);
dl.lookAt(0, 0, 0);
dl.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dl);

if (config.allowHellpers) {
    const dirLightHelper = new THREE.DirectionalLightHelper(dl, 5);
    scene.add(dirLightHelper);
}

// Hemisphere Light
const hemLight = new THREE.HemisphereLight(config.primaryColor, 0x44445b, .1);
if (config.allowHellpers) {
    const hemLightHelper = new THREE.HemisphereLightHelper(hemLight, 3);
    scene.add(hemLight);
    scene.add(hemLightHelper);
}

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 0.6);
spotLight.position.set(0, 0, 16);
scene.add(spotLight);

if (config.allowHellpers) {
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);
}


// Object
const updateSkinMap = url => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, tex => {
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.LinearMipMapLinearFilter;
        tex.flipY = false;

        if (tex.image.width === 64 && tex.image.height === 64) skin.traverse(obj => {
            if (obj.isMesh) obj.material.map = tex;
        })
    });
}


let head, skin;
const loader = new GLTFLoader();
loader.load(config.skinLocation, gltf => {
    skin = gltf.scene;

    skin.traverse(obj => {
        obj.castShadow = true;
        if (obj.name === "head") head = obj;
    })
    skin.position.y = -.5

    scene.add(skin);

    // Event listners
    document.getElementById("userImage").addEventListener("change", ev => {
        const image = ev.target.files[0];
        const url = URL.createObjectURL(image);
        updateSkinMap(url);
    });

    window.addEventListener("mousemove", ev => {
        // Angle of the camera
        const angle = Math.abs(controls.getAzimuthalAngle());
        if (angle > config.joinLimit) return

        const pos = getCursorPosition(ev);
        rotJoint(pos)
        renderer.render(scene, camera);
    });

    if (config.testSkin) updateSkinMap(config.testSkinURL)

    // Disable loader
    spinner.remove();
    animate();
}, undefined, (error) => console.log(error));

// Ground
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1000);
const planeMaterial = new THREE.MeshPhongMaterial({ color: config.groundColor });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - Math.PI / 2;
plane.position.y = -1.5;
plane.receiveShadow = true;
scene.add(plane);

// Fellow cursor  stuff
const getCursorPosition = ev => ({
    x: (ev.clientX / window.innerWidth) * 2 - 1,
    y: - (ev.clientY / window.innerHeight) * 2 + 1
});

const rotJoint = pos => {
    // Left Right
    head.rotation.y = limitWithinRange((Math.PI * 2) + (Math.PI / 2 * -pos.x), 6, 6.5) + Math.PI * 2;

    // Top Bottom
    head.rotation.x = limitWithinRange((Math.PI * 2) - (Math.PI / 2 * pos.y), 6.1, 6.4) + Math.PI;
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
        controls.enableZoom = false;
        controls.ena = false;
        controls.update();
    }
}