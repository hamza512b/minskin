import * as THREE from "three";
import config from "../../config";

const scene = new THREE.Scene();
scene.background = new THREE.Color(config.backgroundColor || 0xF2F2F2);
scene.fog = new THREE.Fog(config.backgroundColor || 0xF2F2F2, 1, 40);

export default scene;