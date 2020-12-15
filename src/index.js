// Webpack
import javaUrl from "./assets/geometry/java.gltf";
import pocketUrl from "./assets/geometry/pocket.gltf";
import steveText from "./assets/textures/steve.png";
import testText from "./assets/textures/test.png";


// Threejs
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Style
import "./style.scss"

// Main
import scene from "./main/scene";
import renderer from "./main/renderer"
import camera from "./main/camera"
import light from "./main/light";

// Meshes
import ground from "./mesh/ground"
import loadSkin from "./mesh/skin"
import updateTexture from './api/updateTexture';
import { getCursorPosition, rotJoint } from './api/rotateHead';
import config from '../config';

// Nodes
const spinner = document.querySelector("div.spinner");
const canvas = document.querySelector("canvas");
const toggleBtn = document.getElementById("changeEdtion");

// Main 
async function main() {
    try {
        const java = (await loadSkin(javaUrl));
        const pocket = (await loadSkin(pocketUrl));
        let isJava = config.isJava;

        // Add Stuff
        scene.add(light);
        scene.add(ground);
        scene.add(isJava ? java.skin : pocket.skin);

        // Event listners
        let url;
        document.getElementById("userImage").addEventListener("change", ev => {
            const image = ev.target.files[0];
            url = URL.createObjectURL(image);
            updateTexture(isJava ? java.skin : pocket.skin, url);
        });     

        window.addEventListener("resize", () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        });

        window.addEventListener("mousemove", ev => {
            // Angle of the camera
            const angle = Math.abs(orbit.getAzimuthalAngle());
            if (angle > (config.joinLimit || 0.8)) return

            const pos = getCursorPosition(ev);
            rotJoint(isJava ? java.head : pocket.head, pos)
            renderer.render(scene, camera);
        });

        toggleBtn.textContent = isJava ? "Java Edtion" : "Pocket Edtion";
        toggleBtn.addEventListener("click", () => {
            if (isJava) {
                scene.remove(java.skin);
                scene.add(pocket.skin);
                updateTexture(pocket.skin, url);
            }
            else {
                scene.remove(pocket.skin);
                scene.add(java.skin);
                updateTexture(java.skin, url);
            }
            isJava = !isJava;
            toggleBtn.textContent = isJava ? "Java Edtion" : "Pocket Edtion";
        });

        // Display
        renderer.render(scene, camera);
        spinner.remove();
        if (config.testSkin) updateTexture(skin, config.testSkinURL)

        // Animation
        animate();
    } catch (err) {
        console.log(err);
    }
}


// Display
const orbit = new OrbitControls(camera, canvas);
let isOrbitControlsActivited = false, k = .05;
orbit.enabled = false;
orbit.enablePan = false;
orbit.maxDistance = 10;
orbit.minDistance = 1;
orbit.maxPolarAngle = 1.9;
// Start animation
const animate = () => {
    if (!isOrbitControlsActivited) {
        if (camera.position.z > 4) {
            camera.position.z -= k;
            k += 0.01;
        } else {
            orbit.enabled = true;
            isOrbitControlsActivited = true;
        }
    }

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

main();