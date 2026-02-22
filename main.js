// main.js - versão completa otimizada para Points

// Setup básico do Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / 500, // o canvas tem altura 500px
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById('galaxy').appendChild(renderer.domElement);

// Variáveis globais
let stars = [];
let starObjects = {};

// Função para carregar as estrelas do JSON
fetch('data/stars.json')
  .then(res => res.json())
  .then(data => {
    stars = data;
    populateDropdowns();
    addStarsToScene();
  });

// Preencher os dropdowns com os nomes das estrelas
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

// Adicionar todas as estrelas à cena como Points
function addStarsToScene() {
  const positions = [];

  stars.forEach(star => {
    positions.push(star.x, star.y, star.z);
    starObjects[star.name] = star; // manter referência para cálculos
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffff00,  // cor das estrelas
    size: 0.2         // tamanho dos pontos
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);
}

// Função para calcular distância entre duas estrelas
function distance(star1, star2) {
  const dx = star2.x - star1.x;
  const dy = star2.y - star1.y;
  const dz = star2.z - star1.z;
  return Math.sqrt(dx*dx + dy*dy + dz*dz).toFixed(2); // retorna em anos-luz
}

// Evento do botão de cálculo
document.getElementById('calcBtn').addEventListener('click', () => {
  const name1 = document.getElementById('star1').value;
  const name2 = document.getElementById('star2').value;

  if (name1 === name2) {
    document.getElementById('result').textContent = "Escolha duas estrelas diferentes!";
    return;
  }

  const star1 = starObjects[name1];
  const star2 = starObjects[name2];
  const dist = distance(star1, star2);

  document.getElementById('result').textContent = `Distância: ${dist} anos-luz`;
});

// Configurar câmera e animação
camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
