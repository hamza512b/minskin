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

// Main 
async function main() {
    try {
        const { skin, head } = (await loadSkin("/skin.glb"));

        // Add Stuff
        scene.add(light);
        scene.add(ground);
        scene.add(skin);

        // Display
        renderer.render(scene, camera);
        spinner.remove();

        // Event listners
        document.getElementById("userImage").addEventListener("change", ev => {
            const image = ev.target.files[0];
            const url = URL.createObjectURL(image);
            updateTexture(skin, url);
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
            rotJoint(head, pos)
            renderer.render(scene, camera);
        });

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