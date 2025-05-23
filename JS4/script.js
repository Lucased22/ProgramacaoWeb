function circ(containerId) {
    const container = document.getElementById(containerId);

    container.innerHTML = `
        <form id="entradaForm">
            <label for="raio">Informe o Raio:</label>
            <input type="text" id="raio" name="raio" placeholder="Insira o raio">
            <button type="button" id="calculaButton">Calcular</button>
        </form>
        <br>
        <form id="resultForm">
            <label for="area">Área do círculo :</label>
            <input type="text" id="area" name="area" readonly>
            <br>
            <label for="circunferencia">Circunferênciaa:</label>
            <input type="text" id="circunferencia" name="circunferencia" readonly>
        </form>
    `;

    const raioInput = document.getElementById('raio');
    const areaOutput = document.getElementById('area');
    const circunferenciaOutput = document.getElementById('circunferencia');

    document.getElementById('calculaButton').addEventListener('click', () => {
        const raio = parseFloat(raioInput.value);
        const area = Math.PI * raio * raio;
        const circunferencia = 2 * Math.PI * raio;

        areaOutput.value = area.toFixed(2);
        circunferenciaOutput.value = circunferencia.toFixed(2);
    });
}

// Inicializa a calculadora de círculo ao carregar o script
circ('calc');