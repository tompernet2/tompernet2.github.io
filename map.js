import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { getFresnelMat } from "./src/getFresnelMat.js";

// --- SCÈNE & CAMÉRA ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1 pour div carrée
camera.position.z = 1.5; // Plus petit = plus proche = zoom

// --- RENDERER ---
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(285, 285);
renderer.setClearColor(0x000000, 0); // Fond transparent
document.getElementById("globe-container").appendChild(renderer.domElement);

// --- LUMIÈRE AMBIENTE (Éclaire uniformément) ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Lumière ambiante avec une intensité plus faible
scene.add(ambientLight);

// --- GLOBE TERRESTRE ---
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.position.x = -0.7; // Décalage vers la gauche
scene.add(earthGroup);


const earthMesh = new THREE.Mesh(
  geometry,
  new THREE.MeshPhongMaterial({
    map: loader.load("./textures/00_earthmap1k.jpg"),
    specularMap: loader.load("./textures/02_earthspec1k.jpg"),
    bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
    bumpScale: 0.04,
  })
);
earthGroup.add(earthMesh);

const lightsMesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({
    map: loader.load("./textures/03_earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
  })
);
earthGroup.add(lightsMesh);

const cloudsMesh = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({
    map: loader.load("./textures/04_earthcloudmap.jpg"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load("./textures/05_earthcloudmaptrans.jpg"),
  })
);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const glowMesh = new THREE.Mesh(geometry, getFresnelMat());
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// --- CONTRÔLES ORBITALS ---

// --- ANIMATION ---
function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();


// Mettre à jour l'heure actuelle en France
// Mettre à jour l'heure actuelle en France
function updateTime() {
  const date = new Date();
  const options = {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,  // Utiliser le format 24 heures
  };
  const timeString = date.toLocaleTimeString('fr-FR', options);

  // Mettre à jour l'heure dans le div en haut à droite
  document.getElementById('text-top-right').textContent = `${timeString}`;
}

// Appeler la fonction toutes les minutes pour mettre à jour l'heure
setInterval(updateTime, 60000); // Mise à jour chaque minute
updateTime(); // Appel initial pour afficher immédiatement l'heure au chargement
