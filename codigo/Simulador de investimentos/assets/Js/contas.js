

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
        montante *= (1 + taxaJuros);
    }

    document.getElementById('resultadoRendaFixa').innerText = `Montante final: ${montante.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`;
}

function calcularInvestimentoMensal() {
    const investimentoMensal = parseFloat(document.getElementById('investimentoMensal').value);
    const taxaJurosMensal = parseFloat(document.getElementById('taxaJurosMensal').value) / 100;
    const idade = parseFloat(document.getElementById('idade').value);
    const aposetara = parseFloat(document.getElementById('iraAposentar').value);
    const tempoContribuicao = 12 * (aposetara - idade);
    const desejada = parseFloat(document.getElementById('desejada').value);

    let montante = investimentoMensal;
    for (let i = 0; i < tempoContribuicao; i++) {
        montante += investimentoMensal;
        montante *= (1 + taxaJurosMensal);
    }
    const acima = montante - desejada
    const abaixo = montante - desejada
    if (montante > desejada) {
        document.getElementById('resultadoInvestimentoMensal').innerText = `Seu patrimônio ao se aposentar será de: ${montante.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}. Você está ${acima.toLocaleString("pt-br", { style: "currency", currency: "BRL" })} acima da sua meta.`;
    } else {
        document.getElementById('resultadoInvestimentoMensal').innerHTML = `Seu patrimônio ao se aposentar será de: ${montante.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}. Você está ${abaixo.toLocaleString("pt-br", { style: "currency", currency: "BRL" })} abaixo da sua meta. Procure melhores investimentos ou aumente seu investimento mensal. <a href="URL_DA_ABA_DE_CURSOS">Entre na nossa aba de cursos para entender como você pode fazer isso</a>.`;
    }
}
