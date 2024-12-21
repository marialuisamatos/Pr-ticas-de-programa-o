const emojis = ['🎄', '🎅🏻', '🫎', '⭐', '🍾', '🎁', '🍷', '❤️', '🍗', '🍞'];
const gameBoard = document.querySelector('.game-board');
const restartButton = document.querySelector('.restart-button');
let cards = [];
let flippedCards = [];
let matchedCards = 0;

function initializeGame() {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    restartButton.style.display = 'none';

    cards = [...emojis, ...emojis]; // Duplicar os emojis para formar pares
    cards = cards.sort(() => Math.random() - 0.5);

    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        gameBoard.appendChild(card);
    });
}

gameBoard.addEventListener('click', (e) => {
    const clickedCard = e.target;

    // Ignorar cliques inválidos
    if (!clickedCard.classList.contains('card') || clickedCard.classList.contains('flipped')) return;

    // Mostrar o emoji
    clickedCard.textContent = clickedCard.dataset.emoji;
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            // Cartas combinam
            matchedCards += 2;
            flippedCards = [];

            if (matchedCards === cards.length) {
                setTimeout(() => {
                    alert('Parabéns! Feliz Natal e um Feliz 2025!');
                    restartButton.style.display = 'inline-block';
                }, 500);
            }
        } else {
            // Cartas não combinam
            setTimeout(() => {
                firstCard.textContent = '';
                secondCard.textContent = '';
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                flippedCards = [];
            }, 400);
        }
    }
});

restartButton.addEventListener('click', initializeGame);

// Inicializar o jogo na primeira vez
initializeGame();