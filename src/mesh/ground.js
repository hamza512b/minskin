import * as THREE from "three";
import config from "../../config";

const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1000);
const planeMaterial = new THREE.MeshPhongMaterial({ color: config.groundColor || 0xE5EAEF });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - Math.PI / 2;
plane.position.y = -1.5;
plane.receiveShadow = true;

export default plane;