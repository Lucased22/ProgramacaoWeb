let pontuacao = 0;

function jogarJokenpo() {
  while (true) {
    const escolhaJogador = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));

    if (![1, 2, 3].includes(escolhaJogador)) {
      alert("Jogada inválida! Você perdeu a rodada.");
      break;
    }

    const escolhas = ["Papel", "Pedra", "Tesoura"];
    const escolhaComputador = Math.floor(Math.random() * 3) + 1;

    alert(`Você escolheu ${escolhas[escolhaJogador - 1]}.\nComputador escolheu ${escolhas[escolhaComputador - 1]}.`);

    if (
      (escolhaJogador === 1 && escolhaComputador === 2) || // Papel vence Pedra
      (escolhaJogador === 2 && escolhaComputador === 3) || // Pedra vence Tesoura
      (escolhaJogador === 3 && escolhaComputador === 1)    // Tesoura vence Papel
    ) {
      pontuacao++;
      alert("Você venceu a rodada! Pontuação: " + pontuacao);
    } else if (escolhaJogador === escolhaComputador) {
      alert("Empate! A rodada será repetida.");
    } else {
      alert("Você perdeu a rodada!");
      break;
    }
  }

  alert("Fim de jogo! Sua pontuação final: " + pontuacao);
}

jogarJokenpo();
