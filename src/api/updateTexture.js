import * as THREE from "three";

// update texture
export default (skin, url, name) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, tex => {
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.LinearMipMapLinearFilter;
        tex.flipY = false;
        tex.encoding = THREE.sRGBEncoding;

        let valid = true;
        let width = tex.image.width;
        let height = tex.image.height;
        if (tex.image.width === 64 && tex.image.height === 64) {
            skin.traverse(obj => {
                if (obj.isMesh) obj.material.map = tex;
            })
        } else valid = false;

        document.getElementById("imageInfo").textContent = `${valid ? "valid" : "invalid"} | size ${width + "x" + height} | ${name}`;
    });
}
