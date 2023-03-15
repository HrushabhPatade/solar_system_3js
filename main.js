import * as THREE from 'three';
import "./style.css"
import { AmbientLight, Material } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import starTexture from './src/img/stars.jpg';
import sunTexture from './src/img/sun.jpg';
import mercuryTexture from './src/img/mercury.jpg';
import saturnTexture from './src/img/saturn.jpg';
import saturnRingTexture from './src/img/saturn ring.png';
import uranusRingTexture from './src/img/uranus ring.png';
import uranusTexture from './src/img/uranus.jpg';
import venusTexture from './src/img/venus.jpg';
import plutoTexture from './src/img/pluto.jpg';
import neptuneTexture from './src/img/neptune.jpg';
import jupiterTexture from './src/img/jupiter.jpg';
import earthTexture from './src/img/earth.jpg';
import marsTexture from './src/img/mars.jpg';

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//background

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture


]);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90,140,140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//planets

const textureload = new THREE.TextureLoader();
//sun
const sunGeo = new THREE.SphereGeometry(15, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({
  map:textureload.load(sunTexture)
})

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff, 3, 300);
scene.add(pointLight);

//other planets

function createPlanet(size, texture, position, ring){
  const geometry = new THREE.SphereGeometry(size, 25, 20);
  const material = new THREE.MeshStandardMaterial({
    map:textureload.load(texture)
  });
  const planet = new THREE.Mesh(geometry, material);
  const planetObj = new THREE.Object3D;
  planetObj.add(planet);
  scene.add(planetObj);
  planet.position.x = position;


  if(ring){
    const RingGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,30
      );
      const RingMat = new THREE.MeshStandardMaterial({
        map:textureload.load(ring.texture),
        side: THREE.DoubleSide
      });
      const Ring = new THREE.Mesh(RingGeo, RingMat);
      planetObj.add(Ring);

      Ring.position.x = position;
      Ring.rotation.x = -0.5 *Math.PI;

  }

  return {planet, planetObj};
}

const mercury = new createPlanet(5,mercuryTexture,35);
const venus = new createPlanet(6,venusTexture,55);
const earth = new createPlanet(6.8,earthTexture,70);
const mars = new createPlanet(6.3,marsTexture,95);
const jupiter = new createPlanet(8,jupiterTexture,115);
const saturn = new createPlanet(9, saturnTexture, 165,{
  innerRadius:10,
  outerRadius:20, 
  texture: saturnRingTexture
});
const uranus = new createPlanet(8.5,uranusTexture,220,{
  innerRadius:15,
  outerRadius:30, 
  texture: saturnRingTexture
});
const neptune = new createPlanet(6, neptuneTexture, 270);



function animate(){

  sun.rotateY(0.002);
  mercury.planet.rotateY(0.011);
  mercury.planetObj.rotateY(0.001);
  venus.planet.rotateY(0.0009);
  venus.planetObj.rotateY(0.0015);
  earth.planet.rotateY(0.028);
  earth.planetObj.rotateY(0.0012);
  mars.planet.rotateY(0.019);
  mars.planetObj.rotateY(0.0019);
  jupiter.planet.rotateY(0.09);
  jupiter.planetObj.rotateY(0.0023);
  saturn.planet.rotateY(0.07);
  saturn.planetObj.rotateY(0.0021);
  uranus.planet.rotateY(0.05);
  uranus.planetObj.rotateY(0.0015);
  neptune.planet.rotateY(0.04);
  neptune.planetObj.rotateY(0.001);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);