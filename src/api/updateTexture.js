import * as THREE from "three";

// update texture
export default (skin, url) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, tex => {
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.LinearMipMapLinearFilter;
        tex.flipY = false;
        tex.encoding = THREE.sRGBEncoding;

        if (tex.image.width === 64 && tex.image.height === 64) {
            skin.traverse(obj => {
                if (obj.isMesh) obj.material.map = tex;
            })
        } else console.log("Not a texture");
    });
}
