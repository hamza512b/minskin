import * as THREE from "three";
import config from "../../config";

const camera = new THREE.PerspectiveCamera(config.FOV || 60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.lookAt(0, 0, 0)

export default camera;