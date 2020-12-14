const limitWithinRange = (num, min, max) => Math.min(Math.max(num, min), max);

// Fellow cursor  stuff
export const getCursorPosition = ev => ({
    x: (ev.clientX / window.innerWidth) * 2 - 1,
    y: - (ev.clientY / window.innerHeight) * 2 + 1
});

export const rotJoint = (joint, pos) => {
    // Left Right
    joint.rotation.y = limitWithinRange((Math.PI * 2) + (Math.PI / 2 * -pos.x), 6, 6.5) + Math.PI * 2;

    // Top Bottom
    joint.rotation.x = limitWithinRange((Math.PI * 2) - (Math.PI / 2 * pos.y), 6.1, 6.4) + Math.PI;
};