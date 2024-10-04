let chosenNumber = null;
let attempts = 0;
document.getElementById('setNumber').addEventListener('click', function() {
    chosenNumber = Number(document.getElementById('chosenNumber').value);
    if (chosenNumber < 1 || chosenNumber > 100 || isNaN(chosenNumber)) {
        alert('Por favor, escolha um número entre 1 e 100.');
        return;
    }
    document.getElementById('game').style.display = 'block';
    document.getElementById('chosenNumber').value = '';
    document.getElementById('chosenNumber').disabled = true;
    document.getElementById('setNumber').style.display = 'none';
});
document.getElementById('submit').addEventListener('click', function() {
    const userGuess = Number(document.getElementById('guess').value);
    attempts++;
    let message = '';
    if (userGuess === chosenNumber) {
        message = `Parabéns! Você adivinhou o número ${chosenNumber} em ${attempts} tentativas.`;
        document.getElementById('restart').style.display = 'block';
    } else if (userGuess < chosenNumber) {
        message = 'Tente um número maior!';
    } else {
        message = 'Tente um número menor!';
    }
    document.getElementById('message').textContent = message;
    document.getElementById('guess').value = '';
});
document.getElementById('restart').addEventListener('click', function() {
    chosenNumber = null;
    attempts = 0;
    document.getElementById('message').textContent = '';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('chosenNumber').disabled = false;
    document.getElementById('setNumber').style.display = 'inline-block';
});