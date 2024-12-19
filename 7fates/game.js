let player1Score = 0;
let player2Score = 0;

const cards = {
    1: { name: "Hosu", strength: 80, weakness: 40, special: "Arqueiro!" },
    2: { name: "Zeha", strength: 90, weakness: 50, special: "Pode virar um Tigre/Beom!" },
    3: { name: "Dogeon", strength: 75, weakness: 60, special: "Criminoso/Pistoleiro!" },
    4: { name: "Haru", strength: 110, weakness: 30, special: "Mestre Sábio!" }
};

let player1SelectedCard = null;
let player2SelectedCard = null;

function selectCard(cardId, player) {
    const playerCards = document.querySelectorAll(`#${player}-cards .card`);
    
    playerCards.forEach(card => {
        card.style.opacity = "1";  // Restaura a opacidade original
        card.style.border = "2px solid #780e0e";  // Restaura a borda original
        card.style.backgroundColor = "#780e0e";  // Restaura o fundo original
    });

    const selectedCard = document.querySelector(`#${player}-cards .card:nth-child(${cardId})`);
    selectedCard.style.opacity = "0.5";  // Diminui a opacidade da carta selecionada
    selectedCard.style.border = "3px solid #ff0000";  // Borda verde para indicar seleção
    selectedCard.style.backgroundColor = player === 'player1' ? '#780e0e' : '#780e0e';  // Cor de fundo para indicar o jogador

    if (player === 'player1') {
        player1SelectedCard = cardId;
    } else {
        player2SelectedCard = cardId;
    }

    console.log(`${player} escolheu: ${cards[cardId].name}`);
}

function fight() {
    if (player1SelectedCard === null || player2SelectedCard === null) {
        alert("Ambos os jogadores precisam escolher uma carta!");
        return;
    }

    const card1 = cards[player1SelectedCard];
    const card2 = cards[player2SelectedCard];

    let result = "";

    if (card1.strength > card2.strength) {
        result = `Jogador 1 venceu! ${card1.name} é mais forte que ${card2.name}.`;
        player1Score++;
    } else if (card2.strength > card1.strength) {
        result = `Jogador 2 venceu! ${card2.name} é mais forte que ${card1.name}.`;
        player2Score++;
    } else {
        result = `Empate! Ambos os jogadores escolheram cartas com forças iguais.`;
    }

    document.getElementById("score1").textContent = player1Score;
    document.getElementById("score2").textContent = player2Score;
    document.getElementById("result").textContent = result;  // Mensagem de resultado
}