function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function calcularRendaFixa() {
    const valorInicial = parseFloat(document.getElementById('valorInicial').value.replace(/[R$\.,]/g, '')) || 0;
    const valorMensal = parseFloat(document.getElementById('valorMensal').value.replace(/[R$\.,]/g, '')) || 0;
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100 || 0;
    const tempoInvestimento = parseFloat(document.getElementById('tempoInvestimento').value) || 0;

    let montante = valorInicial;
    for (let i = 0; i < tempoInvestimento; i++) {
        montante += valorMensal;
        montante *= (1 + taxaJuros);
    }

    document.getElementById('resultadoRendaFixa').innerText = `Montante final: ${montante.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`;
}

function calcularInvestimentoMensal() {
    const investimentoMensal = parseFloat(document.getElementById('investimentoMensal').value.replace(/[R$\.,]/g, '')) || 0;
    const taxaJurosMensal = parseFloat(document.getElementById('taxaJurosMensal').value) / 100 || 0;
    const idade = parseFloat(document.getElementById('idade').value) || 0;
    const aposetara = parseFloat(document.getElementById('iraAposentar').value) || 0;
    const tempoContribuicao = 12 * (aposetara - idade);
    const desejada = parseFloat(document.getElementById('desejada').value.replace(/[R$\.,]/g, '')) || 0;

    let montante = 0;
    for (let i = 0; i < tempoContribuicao; i++) {
        montante += investimentoMensal;
        montante *= (1 + taxaJurosMensal);
    }

    const diferenca = montante - desejada;
    if (montante > desejada) {
        document.getElementById('resultadoInvestimentoMensal').innerText = `Seu patrimônio ao se aposentar será de: ${montante.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}. Você está ${diferenca.toLocaleString("pt-br", { style: "currency", currency: "BRL" })} acima da sua meta.`;
    } else {
        document.getElementById('resultadoInvestimentoMensal').innerHTML = `Seu patrimônio ao se aposentar será de: ${montante.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}. Você está ${Math.abs(diferenca).toLocaleString("pt-br", { style: "currency", currency: "BRL" })} abaixo da sua meta. Procure melhores investimentos ou aumente seu investimento mensal. <a href="URL_DA_ABA_DE_CURSOS">Entre na nossa aba de cursos para entender como você pode fazer isso</a>.`;
    }
}

function calcularReserva() {
    const opcoes = document.getElementsByName('opcao');
    let opcaoSelecionada = '';
    for (const opcao of opcoes) {
        if (opcao.checked) {
            opcaoSelecionada = opcao.value;
            break;
        }
    }

    const custo = parseFloat(document.getElementById('custo').value.replace(/[R$\.,]/g, '')) || 0;
    let multiplicador = 0;

    switch (opcaoSelecionada) {
        case 'CLT':
            multiplicador = 6;
            break;
        case 'FP':
            multiplicador = 3;
            break;
        case 'PJ':
            multiplicador = 12;
            break;
        default:
            alert('Nenhuma opção selecionada');
            return;
    }

    const reserva = custo * multiplicador;
    document.getElementById('resultadoReservaEmergencia').innerText = `Sua reserva de emergência deve ser de: ${reserva.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}.`;
}
