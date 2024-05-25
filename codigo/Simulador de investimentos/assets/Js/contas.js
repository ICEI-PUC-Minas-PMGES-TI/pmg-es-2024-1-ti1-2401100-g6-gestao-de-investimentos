jQuery(document).ready(function ($) {
    $('.money').mask('000.000.000.000.000,00', {reverse: true});
  });
function openPopup(popupId) {
    document.getElementById('popup' + popupId.charAt(0).toUpperCase() + popupId.slice(1)).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById('popup' + popupId.charAt(0).toUpperCase() + popupId.slice(1)).style.display = 'none';
}

function calcularRendaFixa() {
    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const valorMensal = parseFloat(document.getElementById('valorMensal').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;
    const tempoInvestimento = parseFloat(document.getElementById('tempoInvestimento').value);

    let montante = valorInicial;
    for (let i = 0; i < tempoInvestimento; i++) {
        montante += valorMensal;
        montante *= (1 + taxaJuros);
    }

    document.getElementById('resultadoRendaFixa').innerText = `Montante Final: R$ ${montante.toFixed(2)}`;
}

function calcularAposentadoria() {
    const valorMensal = parseFloat(document.getElementById('valorMensalAposentadoria').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJurosAposentadoria').value) / 100;
    const tempoAposentadoria = parseFloat(document.getElementById('tempoAposentadoria').value) * 12;

    let montanteNecessario = valorMensal * tempoAposentadoria / taxaJuros;
    
    document.getElementById('resultadoAposentadoria').innerText = `Montante Necessário: R$ ${montanteNecessario.toFixed(2)}`;
}
