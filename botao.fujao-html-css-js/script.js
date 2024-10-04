function fuja() {
    var botaoNao = document.getElementById("nao");
    var larguraJanela = window.innerWidth;
    var alturaJanela = window.innerHeight;  // Corrigido para window.innerHeight
    var maxX = larguraJanela - botaoNao.offsetWidth;
    var maxY = alturaJanela - botaoNao.offsetHeight;
    var aleatorioX = Math.floor(Math.random() * maxX);
    var aleatorioY = Math.floor(Math.random() * maxY);  // Corrigido para Math.random()
    botaoNao.style.left = aleatorioX + "px";
    botaoNao.style.top = aleatorioY + "px";
}
