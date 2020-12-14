import * as THREE from "three";
import config from "../../config";

const lightGrup = new THREE.Group();

// Ambient Light
export const ambientLight = new THREE.AmbientLight(0x404040, config.ambientLightStrength || 2.5);
lightGrup.add(ambientLight);

// Direactional Light
export const dirLight = new THREE.DirectionalLight(config.dirLightColor || 0xFFFFFF, config.dirLightStrength || .5);
dirLight.castShadow = true;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 1500;
dirLight.position.set(4, 5, 4);
dirLight.lookAt(0, 0, 0);
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
if (config.allowLightHellpers || false) {
    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 5);
    lightGrup.add(dirLightHelper);
}
lightGrup.add(dirLight);

// Hemisphere Light
export const hemLight = new THREE.HemisphereLight(config.hemLighColor || 0x3399CC, 0x44445b, config.hemLightStrength || .1);
if (config.allowLightHellpers || false) {
    const hemLightHelper = new THREE.HemisphereLightHelper(hemLight, 3);
    lightGrup.add(hemLightHelper);
}
lightGrup.add(hemLight);

// Spot Light
export const spotLight = new THREE.SpotLight(0xffffff, config.spotLightStrength || 0.6);
spotLight.position.set(0, 0, 30);
lightGrup.add(spotLight);
const spotLight2 = spotLight.clone();

spotLight2.position.set(0, 0, -30);
lightGrup.add(spotLight2);
export default lightGrup;