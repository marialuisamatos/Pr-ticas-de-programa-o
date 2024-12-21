 // Definindo o Canvas e o contexto de desenho
 const canvas = document.getElementById('gameCanvas');
 const ctx = canvas.getContext('2d');

 // Constantes do Jogo
 const PACMAN_SIZE = 30;
 const GHOST_SIZE = 30;
 const PELLET_SIZE = 10;
 const BOARD_SIZE = 600; // Tamanho aumentado do canvas
 const PACMAN_SPEED = 7; // Velocidade aumentada para o Pac-Man

 // Variáveis de controle do jogo
 let pacmanPosX = 270, pacmanPosY = 270;
 let pacmanDir = 'right';
 let score = 0;
 let gameOver = false;
 let level = 1;

 // Sons
 const eatSound = document.getElementById('eat-sound');
 const gameOverSound = document.getElementById('game-over-sound');

 // Fantasmas
 const ghosts = [
     { x: 100, y: 100, direction: 'down', color: 'red' },
     { x: 500, y: 100, direction: 'down', color: 'blue' },
     { x: 100, y: 500, direction: 'up', color: 'green' },
     { x: 500, y: 500, direction: 'up', color: 'yellow' },
 ];

 // Pastilhas
 let pellets = [
     { x: 50, y: 50 },
     { x: 550, y: 50 },
     { x: 50, y: 550 },
     { x: 550, y: 550 },
     { x: 200, y: 200 },
     { x: 400, y: 200 },
     { x: 200, y: 400 },
     { x: 400, y: 400 },
 ];

 // Labirinto - paredes e com espaçamento pro pacman passar
 const walls = [
     { x: 0, y: 0, width: 600, height: 10 }, // Cima
     { x: 0, y: 600 - 10, width: 600, height: 10 }, // Baixo
     { x: 0, y: 0, width: 10, height: 600 }, // Esquerda
     { x: 600 - 10, y: 0, width: 10, height: 600 }, // Direita
     { x: 150, y: 150, width: 300, height: 10 }, // Barra horizontal
     { x: 150, y: 250, width: 10, height: 100 }, // Barra vertical (aumentado o espaçamento)
     { x: 300, y: 350, width: 10, height: 100 }, // Barra vertical
     { x: 150, y: 450, width: 300, height: 10 }, // Barra horizontal
     { x: 250, y: 250, width: 100, height: 10 }, // Barra central
     { x: 250, y: 350, width: 100, height: 10 }, // Barra central
 ];

 // Função para desenhar o Pac-Man
 function drawPacman() {
     ctx.beginPath();
     ctx.arc(pacmanPosX + PACMAN_SIZE / 2, pacmanPosY + PACMAN_SIZE / 2, PACMAN_SIZE / 2, 0.2 * Math.PI, 1.8 * Math.PI);
     ctx.lineTo(pacmanPosX + PACMAN_SIZE / 2, pacmanPosY + PACMAN_SIZE / 2);
     ctx.fillStyle = 'yellow';
     ctx.fill();
 }

 // Função para desenhar os Fantasmas no formato clássico
 function drawGhosts() {
     ghosts.forEach(ghost => {
         // Corpo do fantasma
         ctx.beginPath();
         ctx.arc(ghost.x + GHOST_SIZE / 2, ghost.y + GHOST_SIZE / 2, GHOST_SIZE / 2, Math.PI, 0, false); // Cabeça
         ctx.lineTo(ghost.x - GHOST_SIZE / 2, ghost.y + GHOST_SIZE / 2); // Linha até a base
         ctx.lineTo(ghost.x + GHOST_SIZE / 2, ghost.y + GHOST_SIZE / 2); // Linha até a base
         ctx.fillStyle = ghost.color;
         ctx.fill();

         // Pés do fantasma
         ctx.beginPath();
         ctx.arc(ghost.x + GHOST_SIZE / 4, ghost.y + GHOST_SIZE - 5, 5, Math.PI, 0, true);
         ctx.arc(ghost.x + (3 * GHOST_SIZE) / 4, ghost.y + GHOST_SIZE - 5, 5, Math.PI, 0, true);
         ctx.fillStyle = ghost.color;
         ctx.fill();

         // Olhos do fantasma (horizontalmente)
         const eyeOffsetX = -5; // Ajuste para a posição dos olhos em X
         const eyeOffsetY = -8; // Ajuste para a posição dos olhos em Y

         // Olhos - dois círculos brancos
         ctx.beginPath();
         ctx.arc(ghost.x + GHOST_SIZE / 2 + eyeOffsetX, ghost.y + GHOST_SIZE / 3 + eyeOffsetY, 5, 0, 2 * Math.PI);
         ctx.arc(ghost.x + GHOST_SIZE / 2 - eyeOffsetX, ghost.y + GHOST_SIZE / 3 + eyeOffsetY, 5, 0, 2 * Math.PI);
         ctx.fillStyle = 'white';
         ctx.fill();

         // Pupilas - dois círculos negros
         ctx.beginPath();
         ctx.arc(ghost.x + GHOST_SIZE / 2 + eyeOffsetX, ghost.y + GHOST_SIZE / 3 + eyeOffsetY, 2, 0, 2 * Math.PI);
         ctx.arc(ghost.x + GHOST_SIZE / 2 - eyeOffsetX, ghost.y + GHOST_SIZE / 3 + eyeOffsetY, 2, 0, 2 * Math.PI);
         ctx.fillStyle = 'black';
         ctx.fill();
     });
 }

 // Função para desenhar as pastilhas
 function drawPellets() {
     pellets.forEach(pellet => {
         ctx.beginPath();
         ctx.arc(pellet.x + PELLET_SIZE / 2, pellet.y + PELLET_SIZE / 2, PELLET_SIZE / 2, 0, 2 * Math.PI);
         ctx.fillStyle = 'white';
         ctx.fill();
     });
 }

 // Função para desenhar o labirinto (paredes)
 function drawWalls() {
     walls.forEach(wall => {
         ctx.fillStyle = 'blue';
         ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
     });
 }

 // Função para desenhar o placar
 function drawScore() {
     ctx.font = '16px Arial';
     ctx.fillStyle = 'white';
     ctx.fillText(`Pontos: ${score}`, 10, 20);
 }

 // Função para verificar a colisão do Pac-Man com as pastilhas
 function checkPelletCollision() {
     pellets.forEach((pellet, index) => {
         if (pacmanPosX < pellet.x + PELLET_SIZE &&
             pacmanPosX + PACMAN_SIZE > pellet.x &&
             pacmanPosY < pellet.y + PELLET_SIZE &&
             pacmanPosY + PACMAN_SIZE > pellet.y) {
             pellets.splice(index, 1); // Remove a pastilha
             score += 10;
             eatSound.play(); // Som ao comer a pastilha
         }
     });
 }

 // Função para verificar a colisão com os fantasmas
 function checkGhostCollision() {
     ghosts.forEach(ghost => {
         if (pacmanPosX < ghost.x + GHOST_SIZE &&
             pacmanPosX + PACMAN_SIZE > ghost.x &&
             pacmanPosY < ghost.y + GHOST_SIZE &&
             pacmanPosY + PACMAN_SIZE > ghost.y) {
             gameOverSound.play(); // Som de Game Over
             gameOver = true;
             document.getElementById('restartButton').style.display = 'block'; // Exibe o botão de reinício
             alert('Game Over! Você foi pego pelos fantasmas!');
         }
     });
 }

 // Função para verificar a colisão com as paredes
 function checkWallCollision(newX, newY) {
     for (let wall of walls) {
         if (newX < wall.x + wall.width &&
             newX + PACMAN_SIZE > wall.x &&
             newY < wall.y + wall.height &&
             newY + PACMAN_SIZE > wall.y) {
             return true; // Colidiu com uma parede
         }
     }
     return false;
 }

 // Função para mover o Pac-Man
 function movePacman(event) {
     if (gameOver) return;

     let newX = pacmanPosX;
     let newY = pacmanPosY;

     switch (event.key) {
         case 'ArrowUp':
             newY -= PACMAN_SPEED;
             break;
         case 'ArrowDown':
             newY += PACMAN_SPEED;
             break;
         case 'ArrowLeft':
             newX -= PACMAN_SPEED;
             break;
         case 'ArrowRight':
             newX += PACMAN_SPEED;
             break;
     }

     // Verifica se o novo movimento colide com alguma parede
     if (!checkWallCollision(newX, newY)) {
         pacmanPosX = newX;
         pacmanPosY = newY;
     }

     checkPelletCollision();
     checkGhostCollision();
 }

 // Função para mover os fantasmas
 function moveGhosts() {
     ghosts.forEach(ghost => {
         if (ghost.direction === 'down') {
             ghost.y += 1;
             if (ghost.y > BOARD_SIZE - GHOST_SIZE) ghost.direction = 'up';
         }
         if (ghost.direction === 'up') {
             ghost.y -= 1;
             if (ghost.y < 0) ghost.direction = 'down';
         }
     });
 }

 // Função de atualização do jogo
 function updateGame() {
     if (gameOver) return;

     // Limpa o canvas
     ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

     // Desenha todos os elementos
     drawWalls();       // Desenha as paredes (labirinto)
     drawPacman();      // Desenha o Pac-Man
     drawGhosts();      // Desenha os fantasmas com olhos retos
     drawPellets();     // Desenha as pastilhas
     drawScore();       // Exibe o placar

     // Move os fantasmas
     moveGhosts();

     // Requisição para o próximo quadro
     requestAnimationFrame(updateGame);
 }

 // Função para reiniciar o jogo
 function resetGame() {
     pacmanPosX = 270;
     pacmanPosY = 270;
     score = 0;
     gameOver = false;
     pellets = [
         { x: 50, y: 50 },
         { x: 550, y: 50 },
         { x: 50, y: 550 },
         { x: 550, y: 550 },
         { x: 200, y: 200 },
         { x: 400, y: 200 },
         { x: 200, y: 400 },
         { x: 400, y: 400 },
     ];
     document.getElementById('restartButton').style.display = 'none'; // Esconde o botão de reinício
     updateGame();
 }

 // Inicializa o jogo
 document.addEventListener('keydown', movePacman);
 document.getElementById('restartButton').addEventListener('click', resetGame);
 updateGame();