// Setup básico do Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById('galaxy').appendChild(renderer.domElement);

// Variáveis globais
let stars = [];
let starObjects = {};

// Carregar estrelas do JSON
fetch('data/stars.json')
  .then(res => res.json())
  .then(data => {
    stars = data;
    populateDropdowns();
    addStarsToScene();
  });

// Preencher dropdowns
function populateDropdowns() {
  const star1Select = document.getElementById('star1');
  const star2Select = document.getElementById('star2');

  stars.forEach(star => {
    const option1 = document.createElement('option');
    option1.value = star.name;
    option1.textContent = star.name;
    star1Select.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = star.name;
    option2.textContent = star.name;
    star2Select.appendChild(option2);
  });
}

// Adicionar estrelas à cena
function addStarsToScene() {
  stars.forEach(star => {
    const geometry = new THREE.SphereGeometry(0.2, 12, 12);
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(star.x, star.y, star.z);
    scene.add(sphere);
    starObjects[star.name] = star;
  });
}

// Calcular distância
function distance(star1, star2) {
  const dx = star2.x - star1.x;
  const dy = star2.y - star1.y;
  const dz = star2.z - star1.z;
  return Math.sqrt(dx*dx + dy*dy + dz*dz).toFixed(2);
}

// Botão de cálculo
document.getElementById('calcBtn').addEventListener('click', () => {
  const name1 = document.getElementById('star1').value;
  const name2 = document.getElementById('star2').value;
  const star1 = starObjects[name1];
  const star2 = starObjects[name2];
  const dist = distance(star1, star2);
  document.getElementById('result').textContent = `Distância: ${dist} anos-luz`;
});

// Animate Three.js
camera.position.z = 15;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
