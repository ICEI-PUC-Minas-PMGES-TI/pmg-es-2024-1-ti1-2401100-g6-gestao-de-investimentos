function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function calcularRendaFixa() {
    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const valorMensal = parseFloat(document.getElementById('valorMensal').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;
    const tempoInvestimento = parseFloat(document.getElementById('tempoInvestimento').value);

    let montante = valorInicial;
    for (let i = 0; i < tempoInvestimento; i++) {
        montante += valorMensal;
        montante *= (1 + taxaJuros); // Correção: atribuindo o resultado de volta a montante
    }

    document.getElementById('resultadoRendaFixa').innerText = `Montante final: R$ ${montante.toFixed(2)}`;
}

function calcularInvestimentoMensal() {
    const valorMensalDesejado = parseFloat(document.getElementById('valorMensalDesejado').value);
    const taxaJurosMensal = parseFloat(document.getElementById('taxaJurosMensal').value) / 100;
    const tempoAposentadoria = parseFloat(document.getElementById('tempoAposentadoria').value) * 12;
    const tempoContribuicao = parseFloat(document.getElementById('tempoContribuicao').value) * 12;

    const montanteNecessario = valorMensalDesejado * ((1 - Math.pow(1 + taxaJurosMensal, -tempoAposentadoria)) / taxaJurosMensal);
    const valorMensalInvestimento = montanteNecessario / ((Math.pow(1 + taxaJurosMensal, tempoContribuicao) - 1) / taxaJurosMensal);

    document.getElementById('resultadoInvestimentoMensal').innerText = `Valor a ser investido mensalmente: R$ ${valorMensalInvestimento.toLocaleString("pt-br",{style:"currency",currency:"BRL"})}`;
}
 