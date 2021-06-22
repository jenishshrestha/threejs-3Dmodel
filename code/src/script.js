import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { toLength } from "lodash";

const gltfLoader = new GLTFLoader();

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

let tl = gsap.timeline();

// 3D object
gltfLoader.load("iPod.gltf", (gltf) => {
  gltf.scene.scale.set(0.007, 0.007, 0.007);
  gltf.scene.rotation.set(0, 0, 0);

  scene.add(gltf.scene);

  // const rotation = gui.addFolder("Rotation");
  // rotation.add(gltf.scene.rotation, "x").min(-10).max(10);
  // rotation.add(gltf.scene.rotation, "y").min(-10).max(10);
  // rotation.add(gltf.scene.rotation, "z").min(-10).max(10);

  //   const scale = gui.addFolder("Scale");
  //   scale.add(gltf.scene.scale, "x").min(0).max(10).step(0.001);
  //   scale.add(gltf.scene.scale, "y").min(0).max(10).step(0.001);
  //   scale.add(gltf.scene.scale, "z").min(0).max(10).step(0.001);

  tl.to(gltf.scene.rotation, { y: 3, duration: 2 });
  tl.to(gltf.scene.scale, { x: 0.005, y: 0.005, z: 0.005, duration: 2 }, "-=1");
  tl.to(gltf.scene.rotation, { y: 2.5, duration: 1 });
  tl.to(gltf.scene.scale, { x: 0.007, y: 0.007, z: 0.007, duration: 1 }, "-=1");
});

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// const pointLight1 = gui.addFolder("Light1");
// pointLight1.add(pointLight.position, "x").min(-10).max(10);
// pointLight1.add(pointLight.position, "y").min(-10).max(10);
// pointLight1.add(pointLight.position, "z").min(-10).max(10);

const directionalLight = new THREE.DirectionalLight(0x000000, 0.3);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// const light = new THREE.PointLight(0xc4c4c4, 0.3);
// light.position.set(0, 300, 500);
// scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 0.5);
light2.position.set(500, 100, 0);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 0.5);
light3.position.set(0, 100, -500);
scene.add(light3);

const light4 = new THREE.PointLight(0xffffff, 0.5);
light4.position.set(-500, 300, 500);
scene.add(light4);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1.3;
scene.add(camera);

// gui.add(camera.position, "x").min(-10).max(10);
// gui.add(camera.position, "y").min(-10).max(10);
// gui.add(camera.position, "z").min(-10).max(10);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
