import type { Object3D, Vector2 } from "three";

function limitWithinRange(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}


export function rotJoint(joint: Object3D, pos: Vector2) {
  // Left Right
  joint.rotation.y = limitWithinRange((Math.PI * 2) + (Math.PI / 2 * -pos.x), 6, 6.5) + Math.PI * 2;

  // Top Bottom
  joint.rotation.x = limitWithinRange((Math.PI * 2) - (Math.PI / 2 * pos.y), 6.1, 6.4) + Math.PI;
}